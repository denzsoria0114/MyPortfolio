import { h3, itemText } from "../lib/styles";
import Logo from "./Logo";
import Section from "./Section";
import { ArrowUpRightIcon } from "./icons";

export default function Projects({ profile }) {
  const { projects, labels } = profile;
  return (
    <Section id="projects" title={labels.projects}>
      <ul className="grid gap-3">
        {projects.map((p) => (
          <li
            key={p.name}
            className="-mx-3.5 grid grid-cols-[22px_minmax(0,1fr)] gap-x-3.5 rounded-md p-3.5 transition-colors duration-[250ms] hover:bg-soft"
          >
            <Logo logo={p.logo} name={p.name} />
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className={h3}>{p.name}</h3>
                {p.year && <p className="shrink-0 text-[11.5px] text-muted">{p.year}</p>}
              </div>
              {p.summary && <p className={itemText}>{p.summary}</p>}
              {p.tags?.length > 0 && (
                <ul className="mt-2.5 flex flex-wrap gap-1" aria-label="Built with">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="inline-flex h-[21px] items-center rounded-[3px] px-[7px] text-[11px] text-muted shadow-[inset_0_0_0_1px_var(--line)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              {p.links?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {p.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 text-[12px] font-medium pointer-coarse:py-2.5 text-ink underline decoration-line underline-offset-[3px] transition-colors hover:decoration-accent"
                    >
                      {l.label}
                      <ArrowUpRightIcon className="text-muted transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-accent" />
                      <span className="sr-only"> — {p.name} (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
