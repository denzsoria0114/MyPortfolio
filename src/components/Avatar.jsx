import { useId, useState } from "react";

/** Shows the photo at `src` once it loads; the illustrated portrait stays underneath as a fallback. */
export default function Avatar({ src, name, colors }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative row-span-2 size-[76px] overflow-hidden rounded-[3px] bg-soft2 split:row-auto split:mb-[18px]">
      <Portrait {...colors} />
      {src && !failed && (
        <img
          src={src}
          alt={name}
          width={76}
          height={76}
          className="absolute inset-0 size-full object-cover transition-opacity duration-300"
          style={{ opacity: loaded ? 1 : 0 }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function Portrait({ skin, hair, shirt, backdrop }) {
  const gradientId = useId() + "-bd";
  return (
    <svg className="block size-full" viewBox="0 0 88 88" width="88" height="88" aria-hidden="true">
      <defs>
        <radialGradient id={gradientId} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="88" height="88" fill={backdrop} />
      <rect width="88" height="88" fill={`url(#${gradientId})`} />
      <path d="M6 88c2-17 17-26 38-26s36 9 38 26Z" fill={shirt} />
      <path d="M35 50v12c4 5 14 5 18 0V50Z" fill={skin} />
      <path d="M35 57c4 3 14 3 18 0v5c-4 5-14 5-18 0Z" fill="#000" opacity="0.14" />
      <path d="M33 62.5 44 73l11-10.5" fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="1.4" />
      <ellipse cx="29.5" cy="41" rx="3" ry="4.6" fill={skin} />
      <ellipse cx="58.5" cy="41" rx="3" ry="4.6" fill={skin} />
      <ellipse cx="44" cy="39" rx="14.6" ry="17.6" fill={skin} />
      <path d="M31 44c1 9 6 13.6 13 13.6S56 53 57 44c-2 5-6 7.6-13 7.6S33 49 31 44Z" fill="#000" opacity="0.1" />
      <g fill={hair}>
        <path d="M28.4 38c-2.4-14 5.4-21 15.6-21s18 7 15.6 21c-1.2-5.6-3.4-8.6-6.6-9.6-5 2-12.4 2-18 0-3.4 1.2-5.4 4.2-6.6 9.6Z" />
        <circle cx="33" cy="23.6" r="4.6" />
        <circle cx="39.6" cy="19.8" r="5" />
        <circle cx="47" cy="19" r="5" />
        <circle cx="53.8" cy="22.4" r="4.6" />
        <circle cx="57.4" cy="28.2" r="3.6" />
        <circle cx="30" cy="29.4" r="3.4" />
      </g>
      <path
        d="M34.6 35.4c1.8-1 3.8-1 5.4-.2M48 35.2c1.6-.8 3.6-.8 5.4.2"
        fill="none"
        stroke={hair}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <g className="origin-center [transform-box:fill-box] motion-safe:animate-blink">
        <ellipse cx="37.6" cy="40.4" rx="1.5" ry="1.7" fill="#1e1510" />
        <ellipse cx="50.4" cy="40.4" rx="1.5" ry="1.7" fill="#1e1510" />
      </g>
      <path
        d="M44.4 41.4c-.8 3.2-1.8 5-.2 6"
        fill="none"
        stroke="#000"
        strokeOpacity="0.28"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path d="M39.4 51c3 2.2 7 2.2 9.8 0" fill="none" stroke="#7a3a2c" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
