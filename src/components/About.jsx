import { cx, normalize } from "../lib/cx";
import { prose } from "../lib/styles";
import Section from "./Section";

export default function About({ profile, filter, roleCount, onPickSkill }) {
  const { about, keySkills, labels } = profile;
  return (
    <Section id="about" title={labels.about}>
      {about.map((p, i) => (
        <p key={i} className={prose}>
          {p}
        </p>
      ))}
      {keySkills.length > 0 && (
        <>
          <p className="mt-5 mb-[9px] text-[12.5px] font-medium">{labels.keySkills}</p>
          <ul className="flex flex-wrap gap-1.5">
            {keySkills.map((skill) => {
              const count = roleCount(skill);
              const pressed = !!filter && normalize(filter) === normalize(skill);
              return (
                <li key={skill}>
                  <button
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => onPickSkill(skill, count > 0)}
                    title={count ? `Show the ${count} ${count === 1 ? "role" : "roles"} that used this` : undefined}
                    className={cx(
                      "inline-flex h-[27px] items-center gap-1.5 rounded-[3px] px-[9px] text-[12px] transition-[background-color,color,scale] duration-200 active:scale-[.97] pointer-coarse:h-8",
                      pressed ? "bg-accent-fill text-white" : "bg-soft2 text-ink hover:bg-soft3",
                    )}
                  >
                    {skill}
                    {pressed && count > 0 && <i className="text-[10.5px] not-italic opacity-80">{count}</i>}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </Section>
  );
}
