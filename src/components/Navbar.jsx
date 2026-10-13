import { useEffect, useRef, useState } from "react";
import { usePillPosition } from "../hooks/usePillPosition";
import { cx } from "../lib/cx";
import { btn, btnDark, btnSm } from "../lib/styles";
import { ChatIcon, MoonIcon, ProfileMarkIcon, SunIcon } from "./icons";

const ACTIVE = 'a[aria-current="location"]';

// On narrow screens the links scroll sideways; fade whichever edge has more links behind it.
const FADES = {
  none: "",
  left: "[mask-image:linear-gradient(to_right,transparent,#000_36px)]",
  right: "[mask-image:linear-gradient(to_left,transparent,#000_36px)]",
  both: "[mask-image:linear-gradient(to_right,transparent,#000_36px,#000_calc(100%-36px),transparent)]",
};

export default function Navbar({
  sections,
  active,
  scrolled,
  dark,
  onNavigate,
  onTop,
  onToggleTheme,
  onContact,
  contactLabel,
}) {
  const listRef = useRef(null);
  const pill = usePillPosition(listRef, ACTIVE, [active]);
  const [fade, setFade] = useState("none");

  const updateFade = () => {
    const el = listRef.current;
    if (!el) return;
    const left = el.scrollLeft > 2;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
    setFade(left && right ? "both" : left ? "left" : right ? "right" : "none");
  };

  useEffect(() => {
    updateFade();
    window.addEventListener("resize", updateFade);
    return () => window.removeEventListener("resize", updateFade);
  }, []);

  // Keep the active link visible when the list is scrolled sideways.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector(ACTIVE);
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    const target = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Sections"
      className={cx(
        "sticky top-0 z-10 flex h-[58px] items-center gap-3 border-b bg-paper/88 px-5 backdrop-blur-[10px] transition-[border-color] duration-300",
        "wide:px-8 split:h-[62px] split:px-11",
        scrolled ? "border-line" : "border-transparent",
      )}
    >
      <button
        type="button"
        aria-label="Back to top"
        onClick={onTop}
        className="grid size-7 shrink-0 place-items-center rounded-full text-accent transition-transform duration-[400ms] hover:scale-[1.06] hover:-rotate-12 pointer-coarse:size-10"
      >
        <ProfileMarkIcon />
      </button>

      <ul
        ref={listRef}
        onScroll={updateFade}
        className={cx(
          "no-scrollbar relative flex min-w-0 flex-1 gap-0.5 overflow-x-auto wide:gap-1 split:justify-center",
          FADES[fade],
        )}
      >
        <li
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-full rounded-full bg-soft2 transition-[translate,width,opacity] duration-[450ms] ease-[cubic-bezier(.3,1.3,.5,1)]"
          style={{ width: pill?.w ?? 0, translate: `${pill?.x ?? 0}px 0`, opacity: pill ? 1 : 0 }}
        />
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(id);
              }}
              className={cx(
                "relative z-[1] block rounded-full px-2 py-[5px] text-[12.5px] whitespace-nowrap transition-colors duration-200 hover:text-ink pointer-coarse:py-2.5",
                active === id ? "text-ink" : "text-muted",
              )}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Dark mode"
          aria-pressed={dark}
          title="Toggle dark mode"
          className="grid size-[34px] place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-soft2 hover:text-ink pointer-coarse:size-10"
        >
          <MoonIcon className="dark:hidden" />
          <SunIcon className="hidden dark:block" />
        </button>
        <button
          type="button"
          onClick={onContact}
          aria-label={contactLabel}
          className={cx(btn, btnSm, btnDark, "pointer-coarse:h-10")}
        >
          <ChatIcon />
          <span className="hidden wide:inline">{contactLabel}</span>
        </button>
      </div>
    </nav>
  );
}
