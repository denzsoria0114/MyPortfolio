import { useLayoutEffect, useState } from "react";

/** Measures the selected child inside a container so a sliding "pill" can sit under it. */
export function usePillPosition(containerRef, selector, deps) {
  const [pos, setPos] = useState(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measure = () => {
      const el = container.querySelector(selector);
      setPos(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return pos;
}
