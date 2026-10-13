import { useCallback, useEffect, useState } from "react";

const isDark = () => document.documentElement.classList.contains("dark");

/** Light/dark theme. Follows the system until the visitor toggles, then remembers the choice. */
export function useTheme() {
  const [dark, setDark] = useState(isDark);

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      let saved = null;
      try {
        saved = localStorage.getItem("theme");
      } catch {}
      if (!saved) setDark(e.matches);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggle = useCallback(() => {
    setDark((d) => {
      try {
        localStorage.setItem("theme", d ? "light" : "dark");
      } catch {}
      return !d;
    });
  }, []);

  return { dark, toggle };
}
