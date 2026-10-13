import { useMemo, useState } from "react";
import { signature } from "../lib/signature";
import { btn, btnDark, btnMd, btnSoft, serif } from "../lib/styles";
import { cx } from "../lib/cx";
import Avatar from "./Avatar";
import { AvailabilityBadge } from "./Contact";
import { DetailIcon, DownloadIcon, SocialIcon } from "./icons";

function Signature({ name, className }) {
  const sig = useMemo(() => signature(name), [name]);
  // Changing the key remounts the path, which replays the drawing animation.
  const [take, setTake] = useState(0);
  return (
    <button
      type="button"
      className={cx("-mt-1 -mb-1.5 -ml-1 w-max rounded-md p-1 text-ink hover:bg-soft", className)}
      onClick={() => setTake((t) => t + 1)}
      aria-label={`Signature of ${name}. Click to sign again.`}
      title="Sign again"
    >
      <svg key={take} viewBox={`0 0 ${sig.width} 52`} width={sig.width * 1.25} height={65} aria-hidden="true">
        <path
          d={sig.d}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.35}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="[stroke-dasharray:1] [stroke-dashoffset:0] motion-safe:animate-write"
        />
      </svg>
    </button>
  );
}

// Below 880px the sidebar sits above the content, so it is compacted there:
// no signature, details on one wrapping line, and socials + buttons on one row.
export default function Sidebar({ profile, hasCvFile, onDownloadCv, onCopyEmail }) {
  const { name, role, bio, avatarSrc, avatarIllustration, showSignature, details, socials, email, contact, labels } =
    profile;
  return (
    <aside
      aria-label="Profile"
      className={cx(
        "flex flex-col gap-3.5 border-b border-line px-5 pt-6 pb-[22px]",
        "wide:px-8 wide:py-7",
        "split:sticky split:top-0 split:h-svh split:gap-[18px] split:self-start split:overflow-y-auto split:border-r split:border-b-0 split:py-[26px] split:pr-[26px] split:pl-7 no-scrollbar",
      )}
    >
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1.5 split:grid-cols-1 split:gap-0">
        <Avatar src={avatarSrc} name={name} colors={avatarIllustration} />
        <div>
          {/* The page's main heading (in the hero) carries the name for screen readers. */}
          <p className={cx(serif, "m-0 text-[24px] leading-[1.1]")}>{name}</p>
          <p className="mt-[3px] text-[12.5px] text-muted">{role}</p>
        </div>
      </div>

      {bio && <p className="max-w-[34ch] text-[13px] leading-[1.6] text-muted">{bio}</p>}

      {contact.available && <AvailabilityBadge label={contact.availableLabel} />}

      {showSignature && <Signature name={name} className="hidden split:block" />}

      <hr className="m-0 h-px border-0 bg-line" />

      {details.length > 0 && (
        <ul className="flex flex-wrap gap-x-4 gap-y-[7px] text-[12.5px] split:grid">
          {details.map((d) => (
            <li key={d.label} className="flex items-center gap-[9px]">
              <DetailIcon icon={d.icon} />
              {d.label}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-1 flex flex-wrap items-center justify-between gap-3.5 split:mt-auto split:grid split:justify-normal">
        {socials.length > 0 && (
          <ul className="-ml-1.5 flex gap-1.5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid size-[30px] place-items-center rounded-md text-muted transition-[color,background-color,translate] duration-200 hover:-translate-y-0.5 hover:bg-soft2 hover:text-ink pointer-coarse:size-10"
                >
                  <SocialIcon icon={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className="flex grow basis-[216px] gap-1.5 split:grid split:grid-cols-[1fr_44px]">
          <button type="button" className={cx("group flex-1", btn, btnMd, btnDark)} onClick={onDownloadCv}>
            <DownloadIcon className="transition-transform duration-[250ms] group-hover:translate-y-0.5" />
            {hasCvFile ? labels.downloadCv : labels.downloadCvText}
          </button>
          <button
            type="button"
            className={cx(btn, btnMd, btnSoft)}
            onClick={onCopyEmail}
            aria-label={`Copy ${email}`}
            title={`Copy ${email}`}
          >
            <SocialIcon icon="mail" />
          </button>
        </div>
      </div>
    </aside>
  );
}
