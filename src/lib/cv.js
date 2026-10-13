// Builds a plain-text CV from the profile data and downloads it.

function buildCvText(p) {
  const lines = [];
  const heading = (title) => lines.push("", title.toUpperCase(), "-".repeat(title.length));

  lines.push(p.name, p.role);
  const contactLine = [p.email, ...p.details.map((d) => d.label)].filter(Boolean).join("  ·  ");
  if (contactLine) lines.push(contactLine);
  if (p.bio) lines.push("", p.bio);

  if (p.about.length) {
    heading("About");
    lines.push(...p.about);
  }
  if (p.experience.length) {
    heading("Experience");
    for (const co of p.experience)
      for (const r of co.roles) {
        lines.push("", `${r.title} — ${co.company}${r.type ? ` (${r.type})` : ""}`, `${r.start} – ${r.end}`);
        if (r.summary) lines.push(r.summary);
        for (const h of r.highlights ?? []) lines.push("  • " + h);
      }
  }
  if (p.projects?.length) {
    heading("Projects");
    for (const pr of p.projects) {
      lines.push("", `${pr.name}${pr.year ? ` (${pr.year})` : ""}`);
      if (pr.summary) lines.push(pr.summary);
      if (pr.tags?.length) lines.push("  " + pr.tags.join(", "));
    }
  }
  if (p.education.length) {
    heading("Education");
    for (const e of p.education) {
      lines.push("", `${e.degree} — ${e.school}`, `${e.start} – ${e.end}`);
      if (e.summary) lines.push(e.summary);
      for (const n of e.notes ?? []) lines.push("  • " + n);
    }
  }
  if (p.skills.length) {
    heading("Skills");
    for (const g of p.skills) lines.push(`${g.name}: ${g.items.map((i) => i.name).join(", ")}`);
  }
  return lines.join("\n") + "\n";
}

function triggerDownload(href, filename) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const slug = (name) => name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") || "cv";

/** True when the CV file (e.g. public/cv.pdf) really exists. */
export async function cvFileExists(url) {
  if (!url) return false;
  try {
    const res = await fetch(url, { method: "HEAD" });
    // Dev servers answer missing files with index.html, so check the type too.
    return res.ok && !(res.headers.get("content-type") || "").includes("text/html");
  } catch {
    return false;
  }
}

/** Downloads the CV file when it exists, otherwise a generated .txt CV. Returns a toast message. */
export function downloadCv(profile, hasFile) {
  if (hasFile) {
    const ext = profile.cvUrl.split(".").pop();
    triggerDownload(profile.cvUrl, `${slug(profile.name)}-cv.${ext}`);
    return "CV downloaded";
  }
  const url = URL.createObjectURL(new Blob([buildCvText(profile)], { type: "text/plain;charset=utf-8" }));
  triggerDownload(url, `${slug(profile.name)}-cv.txt`);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return "Text CV downloaded";
}
