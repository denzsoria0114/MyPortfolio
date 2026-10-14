import { cx } from "../lib/cx";
import { LogoGlyph } from "./icons";

/** Colored square (or circle) with a white glyph or initials. */
export default function Logo({ logo, name, size = 22, round = false, className }) {
  const color = logo?.color ?? "#6b6b6b";
  let text = logo?.text ?? (logo?.glyph ? "" : name.trim().charAt(0).toUpperCase());
  // Small logos only have room for one letter.
  if (size < 22) text = text.charAt(0);
  return (
    <span
      className={cx("grid shrink-0 place-items-center overflow-hidden", round ? "rounded-full" : "rounded", className)}
      style={{ width: size, height: size, background: color, color }}
      aria-hidden="true"
    >
      {text ? (
        <b className="text-[11px] leading-none font-semibold text-white">{text}</b>
      ) : (
        <svg viewBox="0 0 20 20" width={size * 0.66} height={size * 0.66}>
          <LogoGlyph glyph={logo?.glyph ?? "cube"} />
        </svg>
      )}
    </span>
  );
}
