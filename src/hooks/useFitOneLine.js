import { useLayoutEffect } from "react";

/**
 * Keeps an element's text on one line: it uses its normal (CSS) font size when that fits,
 * and shrinks just enough when the available width is narrower.
 *
 * The available width is the closest `[data-fit-bounds]` ancestor minus the side padding
 * of the closest `<main>`, so the text may grow wider than the reading column it sits in.
 */
export function useFitOneLine(ref, deps = []) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bounds = el.closest("[data-fit-bounds]") ?? el.parentElement;
    const main = el.closest("main");

    const fit = () => {
      el.style.fontSize = ""; // measure at the normal size first
      const pad = main ? parseFloat(getComputedStyle(main).paddingLeft) * 2 : 0;
      const available = bounds.clientWidth - pad;
      const natural = el.scrollWidth;
      if (natural > available) {
        const size = parseFloat(getComputedStyle(el).fontSize);
        el.style.fontSize = `${Math.floor(((size * available) / natural) * 10) / 10}px`;
      }
    };

    fit();
    // Re-measure once the web font has loaded (it changes the text width).
    document.fonts?.ready.then(fit);
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(fit);
    observer.observe(bounds);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
