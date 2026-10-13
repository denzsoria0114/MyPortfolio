import { useEffect, useState } from "react";

/** Which section id is currently under the sticky nav, and whether the page has scrolled. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const key = ids.join();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setScrolled(window.scrollY > 8);
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && ids.length) current = ids[ids.length - 1];
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { active, scrolled };
}
