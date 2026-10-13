import { useInView } from "../hooks/useInView";
import { cx } from "../lib/cx";
import { h2 } from "../lib/styles";

/** A content section with a top rule, serif heading and a fade-up reveal on first view.
 *  `children` may be a function that receives whether the section has been seen. */
export default function Section({ id, title, className, children }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={cx("border-t border-line pt-12 pb-11", className)}>
      <div
        ref={ref}
        className={cx(
          "motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]",
          !inView && "motion-safe:translate-y-4 motion-safe:opacity-0",
        )}
      >
        {title && (
          <h2 id={`${id}-h`} className={h2}>
            {title}
          </h2>
        )}
        {typeof children === "function" ? children(inView) : children}
      </div>
    </section>
  );
}
