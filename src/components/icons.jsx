// Hand-drawn line icons from the template. All inherit `currentColor`.

const line = (strokeWidth) => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

/** 14px icons used in the sidebar details list. */
export function DetailIcon({ icon }) {
  const s = line(1.2);
  return (
    <svg className="shrink-0 text-muted" viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
      {icon === "pin" && (
        <g {...s}>
          <path d="M7 12.6s4.4-3.8 4.4-7a4.4 4.4 0 0 0-8.8 0c0 3.2 4.4 7 4.4 7Z" />
          <circle cx="7" cy="5.6" r="1.5" />
        </g>
      )}
      {icon === "briefcase" && (
        <g {...s}>
          <rect x="1.8" y="4.3" width="10.4" height="7.6" rx="1.5" />
          <path d="M5 4.3V3a.8.8 0 0 1 .8-.8h2.4A.8.8 0 0 1 9 3v1.3M1.8 7.8h10.4" />
        </g>
      )}
      {icon === "globe" && (
        <g {...s}>
          <circle cx="7" cy="7" r="5.2" />
          <ellipse cx="7" cy="7" rx="2.2" ry="5.2" />
          <path d="M1.8 7h10.4" />
        </g>
      )}
      {icon === "clock" && (
        <g {...s}>
          <circle cx="7" cy="7" r="5.2" />
          <path d="M7 4.2V7l1.9 1.2" />
        </g>
      )}
      {icon === "mail" && (
        <g {...s}>
          <rect x="1.5" y="3" width="11" height="8" rx="1.5" />
          <path d="m2 4 5 3.8L12 4" />
        </g>
      )}
      {icon === "spark" && (
        <path d="M7 1.5c.5 3 2 4.5 5.5 5.5C9 8 7.5 9.5 7 12.5 6.5 9.5 5 8 1.5 7 5 6 6.5 4.5 7 1.5Z" {...s} />
      )}
      {icon === "cap" && (
        <g {...s}>
          <path d="M1.2 5.6 7 2.8l5.8 2.8L7 8.4Z" />
          <path d="M3.8 6.9v2.8c1.8 1.4 4.6 1.4 6.4 0V6.9M12.8 5.6v3.2" />
        </g>
      )}
    </svg>
  );
}

/** 16px social / contact icons. */
export function SocialIcon({ icon, size = 16 }) {
  const s = line(1.25);
  let body;
  switch (icon) {
    case "linkedin":
      body = (
        <g {...s}>
          <rect x="2" y="2" width="12" height="12" rx="2.4" />
          <path d="M5.2 7.2v3.8M7.8 11V7.2m0 1.6c0-1.4 3-2.2 3 .2V11" />
          <circle cx="5.2" cy="5.1" r=".5" fill="currentColor" />
        </g>
      );
      break;
    case "x":
      body = (
        <g {...s}>
          <path d="M3 2.8h2.8l7.2 10.4h-2.8Z" />
          <path d="M12.8 2.8 8.9 7.2M7.1 8.9 3.2 13.2" />
        </g>
      );
      break;
    case "github":
      body = (
        <g {...s}>
          <path d="M6 13.6c-3.2-.9-4-3.2-4-5.4C2 4.8 4.7 2.4 8 2.4s6 2.4 6 5.8c0 2.2-.8 4.5-4 5.4" />
          <path d="M6 13.6v-2c0-.8.3-1.3.8-1.6-2-.2-3-1-3-3 0-.6.2-1.1.6-1.6l-.1-1.5 1.4.6a5.6 5.6 0 0 1 2.6 0l1.4-.6-.1 1.5c.4.5.6 1 .6 1.6 0 2-1 2.8-3 3 .5.3.8.8.8 1.6v2" />
        </g>
      );
      break;
    case "dribbble":
      body = (
        <g {...s}>
          <circle cx="8" cy="8" r="5.8" />
          <path d="M3.6 4.4c3.4 2.4 7 2.3 9-.3M2.3 9c3.6-1.2 7.6.1 9.6 3.8M5.9 2.6c2.3 2.7 3.8 6.6 4.2 11" />
        </g>
      );
      break;
    case "instagram":
      body = (
        <g {...s}>
          <rect x="2.2" y="2.2" width="11.6" height="11.6" rx="3.4" />
          <circle cx="8" cy="8" r="2.7" />
          <circle cx="11.4" cy="4.6" r=".5" fill="currentColor" />
        </g>
      );
      break;
    case "mail":
      body = (
        <g {...s}>
          <rect x="1.8" y="3.4" width="12.4" height="9.2" rx="1.6" />
          <path d="m2.4 4.4 5.6 4.2 5.6-4.2" />
        </g>
      );
      break;
    default:
      body = (
        <g {...s}>
          <circle cx="8" cy="8" r="5.8" />
          <ellipse cx="8" cy="8" rx="2.5" ry="5.8" />
          <path d="M2.2 8h11.6" />
        </g>
      );
  }
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true">
      {body}
    </svg>
  );
}

/** White glyphs drawn inside colored company / school logos. */
export function LogoGlyph({ glyph }) {
  const s = { fill: "none", stroke: "#fff", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (glyph) {
    case "orbit":
      return (
        <g {...s}>
          <circle cx="10" cy="10" r="1.8" fill="#fff" />
          <ellipse cx="10" cy="10" rx="7" ry="2.8" transform="rotate(-35 10 10)" />
          <ellipse cx="10" cy="10" rx="7" ry="2.8" transform="rotate(35 10 10)" />
        </g>
      );
    case "flower":
      return (
        <g fill="#fff">
          <circle cx="10" cy="5.8" r="3.2" />
          <circle cx="14.2" cy="10" r="3.2" />
          <circle cx="10" cy="14.2" r="3.2" />
          <circle cx="5.8" cy="10" r="3.2" />
          <circle cx="10" cy="10" r="1.6" fill="currentColor" />
        </g>
      );
    case "hash":
      return <path d="M8 3.5 6.8 16.5M13.2 3.5 12 16.5M4 7.6h12.2M3.6 12.4h12.2" {...s} />;
    case "cap":
      return (
        <g {...s}>
          <path d="M1.8 8 10 4l8.2 4L10 12Z" fill="#fff" />
          <path d="M5.4 9.9v3.6c2.6 2 6.6 2 9.2 0V9.9M18.2 8v4.4" />
        </g>
      );
    case "book":
      return <path d="M3 5c3-1 5-.6 7 1 2-1.6 4-2 7-1v10c-3-1-5-.6-7 1-2-1.6-4-2-7-1ZM10 6v10" {...s} />;
    case "spark":
      return (
        <path
          d="M10 2.4c.8 4.8 2.8 6.8 7.6 7.6-4.8.8-6.8 2.8-7.6 7.6-.8-4.8-2.8-6.8-7.6-7.6 4.8-.8 6.8-2.8 7.6-7.6Z"
          fill="#fff"
        />
      );
    case "bolt":
      return <path d="M11.2 2.4 4.4 11h5.2l-1 6.6L15.6 9h-5.2Z" fill="#fff" />;
    case "leaf":
      return <path d="M4 16c0-7.4 4.6-12 12-12 0 7.4-4.6 12-12 12Zm0 0 7.6-7.6" {...s} />;
    default:
      return <path d="M10 3 16.5 6.6v6.8L10 17l-6.5-3.6V6.6ZM3.5 6.6 10 10.2l6.5-3.6M10 10.2V17" {...s} />;
  }
}

// --- Small UI icons -------------------------------------------------

export const DownloadIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" {...line(1.3)}>
    <path d="M7 2v7M4 6.4 7 9.4l3-3M2.4 11.8h9.2" />
  </svg>
);

export const ArrowRightIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 14 14" width="13" height="13" aria-hidden="true" {...line(1.3)}>
    <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" />
  </svg>
);

export const ArrowUpRightIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 12 12" width="10" height="10" aria-hidden="true" {...line(1.3)}>
    <path d="M3.5 8.5 8.5 3.5M4.2 3.5h4.3v4.3" />
  </svg>
);

export const ChatIcon = () => (
  <svg viewBox="0 0 14 14" width="13" height="13" aria-hidden="true" {...line(1.3)}>
    <path d="M7 1.6c3 0 5.4 2 5.4 4.6S10 10.8 7 10.8c-.6 0-1.2-.1-1.8-.2L2.4 12l.7-2.4C2.1 8.7 1.6 7.5 1.6 6.2 1.6 3.6 4 1.6 7 1.6Z" />
  </svg>
);

export const MoonIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" {...line(1.3)}>
    <path d="M13.4 9.8A5.6 5.6 0 0 1 6.2 2.6a5.6 5.6 0 1 0 7.2 7.2Z" />
  </svg>
);

export const SunIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" {...line(1.3)}>
    <circle cx="8" cy="8" r="3" />
    <path d="M8 1.4v1.4M8 13.2v1.4M1.4 8h1.4M13.2 8h1.4M3.3 3.3l1 1M11.7 11.7l1 1M3.3 12.7l1-1M11.7 4.3l1-1" />
  </svg>
);

export const CloseIcon = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" {...line(1.4)}>
    <path d="m2.5 2.5 7 7M9.5 2.5l-7 7" />
  </svg>
);

export const CheckIcon = () => (
  <svg viewBox="0 0 14 14" width="13" height="13" aria-hidden="true" {...line(1.6)}>
    <path d="m3 7.4 2.6 2.6L11 4.4" />
  </svg>
);

export const ChevronIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 10 10" width="9" height="9" aria-hidden="true" {...line(1.4)}>
    <path d="m2 3.5 3 3 3-3" />
  </svg>
);

export const ProfileMarkIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="9.6" r="3.4" />
    <path d="M5.6 18.8c1.4-2.8 3.8-4.2 6.4-4.2s5 1.4 6.4 4.2" strokeLinecap="round" />
  </svg>
);
