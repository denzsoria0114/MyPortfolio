import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "./data/profile";
import { useActiveSection } from "./hooks/useActiveSection";
import { useNow } from "./hooks/useNow";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useTheme } from "./hooks/useTheme";
import { cvFileExists, downloadCv } from "./lib/cv";
import { normalize } from "./lib/cx";
import About from "./components/About";
import Contact from "./components/Contact";
import ContactDialog from "./components/ContactDialog";
import Education from "./components/Education";
import Experience, { roleUsesSkill } from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Sidebar from "./components/Sidebar";
import Skills from "./components/Skills";
import Toast from "./components/Toast";

const NAV_OFFSET = 56;

export default function App() {
  const p = profile;
  const { dark, toggle: toggleTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  const now = useNow();

  // Sections shown in the top nav (only the ones that have content).
  const sections = [
    ["about", p.about.length > 0 || p.keySkills.length > 0],
    ["experience", p.experience.length > 0],
    ["projects", p.projects?.length > 0],
    ["education", p.education.length > 0],
    ["skills", p.skills.length > 0],
  ]
    .filter(([, show]) => show)
    .map(([id]) => ({ id, label: p.labels[id] }));
  const { active, scrolled } = useActiveSection(sections.map((s) => s.id));

  useEffect(() => {
    document.title = `${p.name} — ${p.role}`;
  }, [p.name, p.role]);

  // Is there a real CV file (public/cv.pdf)? If not, the button offers a generated .txt.
  const [hasCvFile, setHasCvFile] = useState(false);
  useEffect(() => {
    cvFileExists(p.cvUrl).then(setHasCvFile);
  }, [p.cvUrl]);

  // --- toast ---------------------------------------------------------
  const [toast, setToast] = useState(null);
  const toastId = useRef(0);
  const showToast = useCallback((text) => {
    const id = ++toastId.current;
    setToast({ id, text });
    setTimeout(() => setToast((t) => (t?.id === id ? null : t)), 2400);
  }, []);

  const copyEmail = useCallback(() => {
    const fallback = () => showToast(p.email);
    try {
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(p.email).then(() => showToast("Copied " + p.email), fallback);
      else fallback();
    } catch {
      fallback();
    }
  }, [p.email, showToast]);

  const onDownloadCv = () => showToast(downloadCv(p, hasCvFile));

  // --- navigation ----------------------------------------------------
  const scrollToSection = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? "auto" : "smooth" });
    },
    [reducedMotion],
  );
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });

  // --- skill filter (highlights matching roles in Experience) --------
  const [filter, setFilter] = useState(null);
  const roleCount = (skill) =>
    p.experience.reduce((n, co) => n + co.roles.filter((r) => roleUsesSkill(r, skill)).length, 0);
  const pickSkill = (skill, jump) => {
    const next = filter && normalize(filter) === normalize(skill) ? null : skill;
    setFilter(next);
    if (next && jump) setTimeout(() => scrollToSection("experience"), 60);
  };

  // --- contact dialog ------------------------------------------------
  const [dialogOpen, setDialogOpen] = useState(false);
  const opener = useRef(null);
  const openDialog = (e) => {
    opener.current = e.currentTarget;
    setDialogOpen(true);
  };
  const closeDialog = useCallback(() => {
    setDialogOpen(false);
    // Wait a frame so the page is no longer inert before restoring focus.
    requestAnimationFrame(() => opener.current?.focus());
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-[3px] bg-ink px-4 py-2.5 text-[12.5px] font-medium text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {p.labels.skipToContent}
      </a>
      <div inert={dialogOpen} className="grid grid-cols-[minmax(0,1fr)] split:grid-cols-[minmax(260px,300px)_minmax(0,1fr)]">
        <Sidebar profile={p} hasCvFile={hasCvFile} onDownloadCv={onDownloadCv} onCopyEmail={copyEmail} />

        <div className="relative min-w-0">
          <Navbar
            sections={sections}
            active={active}
            scrolled={scrolled}
            dark={dark}
            onNavigate={scrollToSection}
            onTop={scrollToTop}
            onToggleTheme={toggleTheme}
            onContact={openDialog}
            contactLabel={p.labels.contactMe}
          />

          <main id="main" tabIndex={-1} className="mx-auto max-w-[600px] px-5 outline-none wide:px-8 split:px-11">
            <Hero profile={p} reducedMotion={reducedMotion} onViewExperience={() => scrollToSection("experience")} />
            {sections.some((s) => s.id === "about") && (
              <About profile={p} filter={filter} roleCount={roleCount} onPickSkill={pickSkill} />
            )}
            {p.experience.length > 0 && (
              <Experience
                profile={p}
                filter={filter}
                onPickSkill={pickSkill}
                onClearFilter={() => setFilter(null)}
                now={now}
              />
            )}
            {p.projects?.length > 0 && <Projects profile={p} />}
            {p.education.length > 0 && <Education profile={p} now={now} />}
            {p.skills.length > 0 && <Skills profile={p} reducedMotion={reducedMotion} />}
            <Contact profile={p} now={now} onCopyEmail={copyEmail} onContact={openDialog} />
          </main>
        </div>
      </div>

      {dialogOpen && <ContactDialog email={p.email} onClose={closeDialog} onCopyEmail={copyEmail} />}
      <Toast toast={toast} />
    </>
  );
}
