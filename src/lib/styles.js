// Shared button styles. Size classes are kept separate so they never
// conflict with each other.
export const btn =
  "inline-flex items-center justify-center rounded-[3px] font-medium transition-[background-color,translate,color] duration-200 active:translate-y-px";
export const btnMd = "h-[42px] gap-[9px] px-4 text-[12.5px]";
export const btnSm = "h-[34px] gap-[7px] px-[13px] text-[12px]";
export const btnDark = "bg-ink text-paper hover:bg-ink-hover";
export const btnSoft = "bg-soft2 text-ink hover:bg-soft3";

export const serif = "font-serif font-normal tracking-[-0.01em]";
export const h2 = `${serif} m-0 mb-4 text-[28px] leading-[1.15]`;
export const h3 = `${serif} m-0 text-[17px] leading-[1.25]`;
export const prose = "m-0 mb-3 max-w-[60ch] text-[13.5px] leading-[1.7] text-muted";
export const itemText = "mt-2.5 max-w-[60ch] text-[12.5px] leading-[1.65] text-muted";
export const bullets =
  "mt-2 list-disc pl-4 text-[12.5px] leading-[1.8] text-muted marker:text-faint";
