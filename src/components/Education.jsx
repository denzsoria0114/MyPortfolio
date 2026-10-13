import { useState } from "react";
import { cx } from "../lib/cx";
import { bullets, itemText } from "../lib/styles";
import { ItemHead } from "./Experience";
import Logo from "./Logo";
import Section from "./Section";
import { ChevronIcon } from "./icons";

export default function Education({ profile, now }) {
  const { education, labels } = profile;
  const [open, setOpen] = useState(null);
  return (
    <Section id="education" title={labels.education}>
      <ul className="grid gap-3">
        {education.map((e, i) => {
          const isOpen = open === i;
          const foldId = `edu-notes-${i}`;
          return (
            <li
              key={e.school + e.degree}
              className="-mx-3.5 grid grid-cols-[22px_minmax(0,1fr)] gap-x-3.5 rounded-md p-3.5 transition-colors duration-[250ms] hover:bg-soft"
            >
              <Logo logo={e.logo} name={e.school} />
              <div>
                <ItemHead title={e.degree} meta={e.school} start={e.start} end={e.end} now={now} />
                {e.summary && <p className={itemText}>{e.summary}</p>}
                {e.notes?.length > 0 && (
                  <>
                    <div
                      id={foldId}
                      className={cx(
                        "grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(.2,.8,.2,1)]",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <ul className={bullets}>
                          {e.notes.map((n) => (
                            <li key={n}>{n}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={foldId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="mt-2 inline-flex items-center gap-[5px] text-[12px] text-muted hover:text-ink pointer-coarse:py-2.5"
                    >
                      {isOpen ? "Less" : "Highlights"}
                      <ChevronIcon className={cx("transition-transform duration-300", isOpen && "rotate-180")} />
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
