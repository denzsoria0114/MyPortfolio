import { useEffect, useRef, useState } from "react";
import { usePillPosition } from "../hooks/usePillPosition";
import { cx } from "../lib/cx";
import Section from "./Section";

const SEGMENTS = 20;
const levelLabel = (n) => (n >= 90 ? "Expert" : n >= 80 ? "Advanced" : n >= 65 ? "Proficient" : "Familiar");

/** Segmented meter that fills left to right when `lit` turns on. */
function Meter({ level, lit }) {
  const on = Math.round((Math.max(0, Math.min(100, level)) / 100) * SEGMENTS);
  return (
    <span
      role="img"
      aria-label={`${level} out of 100`}
      className="col-span-full grid h-1.5 grid-cols-[repeat(20,1fr)] gap-0.5"
    >
      {Array.from({ length: SEGMENTS }, (_, i) => (
        <i
          key={i}
          style={{ transitionDelay: `${i * 22}ms` }}
          className={cx(
            "rounded-[1px] transition-colors duration-300",
            lit && i < on ? "bg-ink group-hover:bg-accent" : "bg-soft2",
          )}
        />
      ))}
    </span>
  );
}

function SkillList({ items, tab, tabCount, inView, reducedMotion }) {
  // Re-light the meters every time the tab changes.
  const [lit, setLit] = useState(reducedMotion);
  useEffect(() => {
    if (reducedMotion) return setLit(true);
    setLit(false);
    if (!inView) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => (inner = requestAnimationFrame(() => setLit(true))));
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [tab, inView, reducedMotion]);

  // Skills with a level get a meter row; the rest are shown as simple tags.
  const rated = items.filter((s) => s.level != null);
  const tags = items.filter((s) => s.level == null);
  const tagList = tags.length > 0 && (
    <ul className={cx("flex flex-wrap gap-2", rated.length > 0 && "mt-4")}>
      {tags.map((s) => (
        <li
          key={tab + s.name}
          className="inline-flex h-8 items-center gap-2 rounded-[3px] bg-soft2 px-3 text-[12.5px] text-ink"
        >
          {s.name}
          {s.years ? (
            <small className="text-[11px] text-muted">{s.years + (s.years === 1 ? " yr" : " yrs")}</small>
          ) : null}
        </li>
      ))}
    </ul>
  );

  const list = (
    <>
      {rated.length > 0 && (
        <ul className="grid gap-1">
          {rated.map((s) => (
            <li
              key={tab + s.name}
              className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 border-b border-dashed border-line py-[9px]"
            >
              <span className="text-[13px]">
                {s.name}
                {s.years ? (
                  <small className="ml-2 text-[11px] text-muted">{s.years + (s.years === 1 ? " yr" : " yrs")}</small>
                ) : null}
              </span>
              <span className="text-right text-[11px] text-muted">{levelLabel(s.level)}</span>
              <Meter level={s.level} lit={lit} />
            </li>
          ))}
        </ul>
      )}
      {tagList}
    </>
  );
  if (tabCount < 2) return list;
  return (
    <div id="skills-panel" role="tabpanel" aria-labelledby={`skills-tab-${tab}`} tabIndex={0} className="rounded-[3px]">
      {list}
    </div>
  );
}

export default function Skills({ profile, reducedMotion }) {
  const { skills, labels } = profile;
  const [tab, setTab] = useState(0);
  const tabsRef = useRef(null);
  const pill = usePillPosition(tabsRef, 'button[aria-selected="true"]', [tab, skills.length]);

  const names = [...skills.map((g) => g.name), labels.all];
  const items = tab >= skills.length ? skills.flatMap((g) => g.items) : (skills[tab]?.items ?? []);

  const onKeyDown = (e, i) => {
    const n = names.length;
    const next =
      e.key === "ArrowRight"
        ? (i + 1) % n
        : e.key === "ArrowLeft"
          ? (i - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    setTab(next);
    e.currentTarget.parentElement?.querySelectorAll("button")[next]?.focus();
  };

  return (
    <Section id="skills" title={labels.skills}>
      {(inView) => (
        <>
          {skills.length > 1 && (
            <div
              ref={tabsRef}
              role="tablist"
              aria-label={labels.skills}
              className="no-scrollbar relative mb-[18px] inline-flex max-w-full gap-0.5 overflow-x-auto rounded-md bg-soft p-[3px]"
            >
              <span
                aria-hidden="true"
                className="absolute top-[3px] left-0 h-7 rounded bg-paper shadow-[0_1px_2px_rgba(0,0,0,.08),0_0_0_1px_var(--line)] transition-[translate,width] duration-[400ms] ease-[cubic-bezier(.3,1.3,.5,1)]"
                style={{ width: pill?.w ?? 0, translate: `${pill?.x ?? 0}px 0`, opacity: pill ? 1 : 0 }}
              />
              {names.map((name, i) => (
                <button
                  key={name}
                  id={`skills-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={tab === i}
                  aria-controls="skills-panel"
                  tabIndex={tab === i ? 0 : -1}
                  onClick={() => setTab(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cx(
                    "relative z-[1] h-7 rounded px-3 text-[12px] whitespace-nowrap transition-colors duration-200",
                    tab === i ? "text-ink" : "text-muted",
                  )}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
          <SkillList
            items={items}
            tab={tab}
            tabCount={names.length - 1}
            inView={inView}
            reducedMotion={reducedMotion}
          />
        </>
      )}
    </Section>
  );
}
