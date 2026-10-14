import { useMemo, useState } from "react";
import { prefetchCvBuilder } from "../lib/cv";
import { signature } from "../lib/signature";
import { btn, btnDark, btnMd, btnSoft, heading } from "../lib/styles";
import { cx } from "../lib/cx";
import Avatar from "./Avatar";
import { DetailIcon, DownloadIcon, SocialIcon } from "./icons";

const DRAW_DELAY = 0.3; // seconds before the pen starts
const DRAW_TIME = 3; // seconds of actual drawing, shared by all strokes
const PEN_LIFT = 0.15; // pause between strokes

/** Draws the signature stroke by stroke, like a pen. Uses the traced signature when given. */
function Signature({ name, traced, className }) {
  const sig = useMemo(() => {
    if (traced) {
      const [, , w, h] = traced.viewBox.split(" ").map(Number);
      const height = 104;
      return { ...traced, width: (height * w) / h, height };
    }
    const g = signature(name);
    return {
      viewBox: `0 0 ${g.width} 52`,
      width: g.width * 1.25,
      height: 65,
      strokeWidth: 1.35,
      strokes: [{ d: g.d, length: 1 }],
    };
  }, [name, traced]);

  // Each stroke gets a share of the drawing time in proportion to its length.
  const total = sig.strokes.reduce((sum, s) => sum + s.length, 0);
  let start = DRAW_DELAY;
  const timing = sig.strokes.map((s) => {
    const duration = (DRAW_TIME * s.length) / total;
    // A gentle ease so long strokes keep an even, handwritten pace.
    const t = {
      animationDelay: `${start}s`,
      animationDuration: `${duration}s`,
      animationTimingFunction: "cubic-bezier(.4,0,.4,1)",
    };
    start += duration + PEN_LIFT;
    return t;
  });

  // Changing the key remounts the paths, which replays the drawing animation.
  const [take, setTake] = useState(0);
  return (
    <button
      type="button"
      className={cx("-mt-1 -mb-1.5 -ml-1 w-max rounded-md p-1 text-ink hover:bg-soft", className)}
      onClick={() => setTake((t) => t + 1)}
      aria-label={`Signature of ${name}. Click to sign again.`}
      title="Sign again"
    >
      <svg key={take} viewBox={sig.viewBox} width={sig.width} height={sig.height} aria-hidden="true">
        {sig.strokes.map((s, i) => (
          <path
            key={i}
            d={s.d}
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth={sig.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={timing[i]}
            className="[stroke-dasharray:1] [stroke-dashoffset:0] motion-safe:animate-write"
          />
        ))}
      </svg>
    </button>
  );
}

// Below 880px the sidebar sits above the content, so it is compacted there:
// no signature, details on one wrapping line, and socials + buttons on one row.
export default function Sidebar({ profile, cvBusy, onDownloadCv, onCopyEmail }) {
  const { name, role, bio, avatarSrc, avatarIllustration, showSignature, details, socials, email, labels } = profile;
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
          <p className={cx(heading, "m-0 text-[24px] leading-[1.1]")}>{name}</p>
          <p className="mt-[3px] text-[12.5px] text-muted">{role}</p>
        </div>
      </div>

      {bio && <p className="max-w-[34ch] text-[13px] leading-[1.6] text-muted">{bio}</p>}

      {showSignature && <Signature name={name} traced={profile.signature} className="hidden split:block" />}

      <hr className="m-0 h-px border-0 bg-line" />

      {details.length > 0 && (
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-[7px] text-[12.5px] split:grid">
          {details.map((d) => (
            <li key={d.label}>
              {d.href ? (
                <a href={d.href} className="flex items-center gap-[9px] hover:text-accent-text pointer-coarse:py-1.5">
                  <DetailIcon icon={d.icon} />
                  {d.label}
                </a>
              ) : (
                <span className="flex items-center gap-[9px]">
                  <DetailIcon icon={d.icon} />
                  {d.label}
                </span>
              )}
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
          <button
            type="button"
            className={cx("group flex-1", btn, btnMd, btnDark, cvBusy && "cursor-progress opacity-80")}
            onClick={onDownloadCv}
            onPointerEnter={prefetchCvBuilder}
            onFocus={prefetchCvBuilder}
            aria-busy={cvBusy}
          >
            <DownloadIcon className="transition-transform duration-[250ms] group-hover:translate-y-0.5" />
            {cvBusy ? labels.preparingCv : labels.downloadCv}
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
