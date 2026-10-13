/** Join class names, skipping falsy values. */
export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const normalize = (s) => s.trim().toLowerCase();
