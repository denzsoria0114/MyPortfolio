import { localTime } from "../lib/dates";
import { btn, btnDark, btnMd, h2, prose } from "../lib/styles";
import { cx } from "../lib/cx";
import Section from "./Section";
import { SocialIcon } from "./icons";

/** Green pulsing "available" pill. Used in the sidebar and the Contact section. */
export function AvailabilityBadge({ label, className }) {
  return (
    <p
      className={cx(
        "inline-flex w-max items-center gap-2 rounded-full bg-soft py-1 pr-2.5 pl-2 text-[11.5px] text-muted",
        className,
      )}
    >
      <span aria-hidden="true" className="relative size-[7px] rounded-full bg-[#22a860]">
        <span className="absolute inset-0 rounded-full bg-[#22a860] motion-safe:animate-ring" />
      </span>
      {label}
    </p>
  );
}

export default function Contact({ profile, now, onCopyEmail, onContact }) {
  const { contact, email, name, city, timeZone, labels } = profile;
  const time = localTime(now, timeZone);
  return (
    <Section id="contact" className="pb-[30px]">
      {contact.available && <AvailabilityBadge label={contact.availableLabel} className="mb-3.5" />}
      <h2 id="contact-h" className={h2}>
        {contact.title}
      </h2>
      {contact.text && <p className={prose}>{contact.text}</p>}

      <div className="mt-[18px] mb-[26px] flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onCopyEmail}
          className="inline-flex h-[42px] items-center gap-2.5 rounded-[3px] px-3.5 text-[13px] shadow-[inset_0_0_0_1px_var(--line)] transition-shadow duration-200 hover:shadow-[inset_0_0_0_1px_var(--faint)]"
        >
          <SocialIcon icon="mail" size={15} />
          {email}
          <span className="text-[11px] text-muted">Copy</span>
        </button>
        <button type="button" onClick={onContact} className={cx(btn, btnMd, btnDark)}>
          {labels.contactMe}
        </button>
      </div>

      <footer className="flex flex-wrap justify-between gap-2 border-t border-line pt-[18px] text-[11.5px] text-muted">
        <span>
          © {now.getFullYear()} {name}
        </span>
        {time && (
          <span>
            {city ? `${city} · ` : ""}
            {time} local time
          </span>
        )}
      </footer>
    </Section>
  );
}
