import { duration } from "../lib/dates";
import { cx, normalize } from "../lib/cx";
import { bullets, h3, itemText } from "../lib/styles";
import Logo from "./Logo";
import Section from "./Section";

export const roleUsesSkill = (role, skill) => (role.skills ?? []).some((s) => normalize(s) === normalize(skill));

/** Title + meta on the left, dates and computed duration on the right. Shared with Education. */
export function ItemHead({ title, meta, start, end, now }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <div>
        <h3 className={h3}>{title}</h3>
        <p className="mt-0.5 text-[12px] text-muted">{meta}</p>
      </div>
      {(start || end) && (
        <p className="shrink-0 text-right text-[11.5px] whitespace-nowrap text-muted">
          {[start, end].filter(Boolean).join(" – ")}
          <small className="block h-[15px] text-[10.5px] text-muted">{start && end && duration(start, end, now)}</small>
        </p>
      )}
    </div>
  );
}

function Role({ company, role, first, filter, onPickSkill, now }) {
  const hit = filter ? roleUsesSkill(role, filter) : false;
  return (
    // The template renders each role in its muted 12.5px text style (titles included),
    // which sets role titles a shade softer than Education titles.
    <article
      className={cx(
        "group relative mt-[3px] rounded-[2px] text-[12.5px] text-muted transition-[background-color,box-shadow] duration-[350ms]",
        // Roles that use the picked skill get a soft tint (other roles stay fully readable).
        hit && "bg-accent-soft shadow-[0_0_0_10px_var(--accent-soft)]",
      )}
    >
      {/* timeline dot for later roles at the same company */}
      {!first && (
        <span
          aria-hidden="true"
          className={cx(
            "absolute top-1.5 -left-[28.5px] size-[7px] rounded-full transition-[background-color,box-shadow] duration-[250ms]",
            hit
              ? "bg-accent shadow-[inset_0_0_0_1.5px_var(--accent)]"
              : "bg-paper shadow-[inset_0_0_0_1.5px_var(--line)] group-hover:bg-accent group-hover:shadow-[inset_0_0_0_1.5px_var(--accent)]",
          )}
        />
      )}
      <ItemHead
        title={role.title}
        meta={[company, role.type, role.location].filter(Boolean).map((part, i) => (
          <span key={part}>
            {i > 0 && (
              <span aria-hidden="true" className="mx-[5px] opacity-70">
                •
              </span>
            )}
            {part}
          </span>
        ))}
        start={role.start}
        end={role.end}
        now={now}
      />
      {role.summary && <p className={itemText}>{role.summary}</p>}
      {role.highlights?.length > 0 && (
        <ul className={bullets}>
          {role.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      {role.skills?.length > 0 && (
        <ul className="mt-2.5 flex flex-wrap gap-1" aria-label="Skills used">
          {role.skills.map((s) => {
            const pressed = !!filter && normalize(filter) === normalize(s);
            return (
              <li key={s}>
                <button
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => onPickSkill(s, false)}
                  className={cx(
                    // Filled so they read as buttons (Projects tags are plain outlines).
                    "h-[21px] rounded-[3px] px-[7px] text-[11px] transition-[color,background-color] duration-200 pointer-coarse:h-7 pointer-coarse:px-2.5",
                    pressed ? "bg-accent-fill text-white" : "bg-soft text-muted hover:bg-soft2 hover:text-ink",
                  )}
                >
                  {s}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}

export default function Experience({ profile, filter, onPickSkill, onClearFilter, now }) {
  const { experience, labels } = profile;
  return (
    <Section id="experience" title={labels.experience}>
      {/* Always in the page so screen readers announce the filter when it changes. */}
      <div role="status">
        {filter && (
          <p className="-mt-1 mb-[18px] flex flex-wrap items-center gap-2 rounded bg-accent-soft px-2.5 py-2 text-[12.5px]">
            <span>
              Highlighting roles with <b className="font-semibold text-accent-text">{filter}</b>
            </span>
            <button
              type="button"
              onClick={onClearFilter}
              className="ml-auto text-[12px] text-muted underline underline-offset-[3px] hover:text-ink pointer-coarse:py-2"
            >
              Clear
            </button>
          </p>
        )}
      </div>
      <ol className="grid gap-[26px]">
        {experience.map((co) => (
          <li key={co.company} className="relative grid grid-cols-[22px_minmax(0,1fr)] gap-x-3.5">
            {co.roles.length > 1 && (
              <span aria-hidden="true" className="absolute top-[30px] bottom-1.5 left-[10.5px] w-px bg-line" />
            )}
            <Logo logo={co.logo} name={co.company} />
            <div className="grid gap-[22px]">
              {co.roles.map((role, i) => (
                <Role
                  key={role.title + role.start}
                  company={co.company}
                  role={role}
                  first={i === 0}
                  filter={filter}
                  onPickSkill={onPickSkill}
                  now={now}
                />
              ))}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
