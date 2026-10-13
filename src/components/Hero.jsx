import { cx } from "../lib/cx";
import { serif } from "../lib/styles";
import HeroArt from "./HeroArt";
import Logo from "./Logo";
import { ArrowRightIcon } from "./icons";

export default function Hero({ profile, reducedMotion, onViewExperience }) {
  const { name, headline, tagline, heroQuips, experience, labels } = profile;
  // "Currently <title> at <company>" from the latest role, if it is ongoing.
  const latest = experience[0]?.roles[0];
  const current = latest && /^(present|now|current)$/i.test(latest.end.trim()) ? latest : null;
  return (
    <header className="grid justify-items-center pt-6 pb-[52px] text-center wide:pt-[34px] split:pt-11">
      <HeroArt quips={heroQuips} reducedMotion={reducedMotion} />
      <h1 className={cx(serif, "mt-[18px] mb-3 text-[40px] leading-[1.05] text-balance wide:text-[44px]")}>
        <span className="sr-only">{name}, </span>
        {headline}
      </h1>
      {tagline && <p className="mx-auto mb-[22px] max-w-[44ch] text-[14px] leading-[1.6] text-muted">{tagline}</p>}
      {current && (
        <p className="-mt-2.5 mb-[22px] text-[12.5px] text-muted">
          {labels.currently} <span className="text-ink">{current.title}</span> at{" "}
          <span className="text-ink">{experience[0].company}</span>
        </p>
      )}
      {experience.length > 0 && (
        <button
          type="button"
          onClick={onViewExperience}
          className="group inline-flex h-10 min-w-[200px] items-center gap-3 rounded-[3px] bg-soft2 pr-3 pl-2 text-[12.5px] font-medium transition-colors duration-200 hover:bg-soft3"
        >
          <span className="flex">
            {experience.slice(0, 3).map((co, i) => (
              <Logo
                key={co.company}
                logo={co.logo}
                name={co.company}
                size={20}
                round
                className={cx(
                  "shadow-[0_0_0_2px_var(--soft2)] transition-[margin] duration-[350ms] ease-[cubic-bezier(.3,1.4,.5,1)]",
                  i > 0 && "-ml-[7px] group-hover:ml-0.5",
                )}
              />
            ))}
          </span>
          {labels.viewExperience}
          <ArrowRightIcon className="ml-auto transition-transform duration-300 group-hover:translate-x-[3px]" />
        </button>
      )}
    </header>
  );
}
