import { CheckIcon } from "./icons";

/** Small confirmation pill at the bottom of the screen, plus a screen-reader announcement. */
export default function Toast({ toast }) {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        {toast?.text}
      </div>
      {toast && (
        <div
          key={toast.id}
          aria-hidden="true"
          className="pointer-events-none fixed bottom-[18px] left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-3.5 py-[9px] text-[12.5px] text-paper shadow-[0_10px_30px_-10px_rgba(0,0,0,.4)] motion-safe:animate-toast"
        >
          <CheckIcon />
          {toast.text}
        </div>
      )}
    </>
  );
}
