import { useEffect, useRef, useState } from "react";
import { cx } from "../lib/cx";
import { btn, btnDark, btnMd, btnSoft, serif } from "../lib/styles";
import { CloseIcon } from "./icons";

const field = "mt-3 grid gap-[5px] text-[12px] text-muted";
const input =
  // 16px on touch screens stops iPhones from zooming in when the field is focused.
  "rounded border border-line bg-soft px-2.5 py-[9px] text-[13px] text-ink pointer-coarse:text-base outline-none transition-colors duration-200 focus:border-accent focus:bg-paper focus-visible:outline-none";

/** "Say hello" dialog. Opens a mailto: draft with the visitor's name and message. */
export default function ContactDialog({ email, onClose, onCopyEmail }) {
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const firstField = useRef(null);

  useEffect(() => {
    firstField.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  const href =
    `mailto:${email}?subject=` +
    encodeURIComponent("Hello from " + (from.trim() || "your portfolio")) +
    "&body=" +
    encodeURIComponent(message);

  return (
    <div
      className="fixed inset-0 z-40 grid place-items-center bg-[rgba(12,8,6,.38)] p-4 backdrop-blur-[3px] motion-safe:animate-fade"
      onPointerDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-dialog-title"
        className="max-h-full w-[min(420px,100%)] overflow-auto rounded-lg bg-paper p-[22px] shadow-[0_24px_60px_-20px_rgba(0,0,0,.4),0_0_0_1px_var(--line)] motion-safe:animate-pop"
      >
        <div className="mb-1.5 flex items-start justify-between gap-3">
          <div>
            <h2 id="contact-dialog-title" className={cx(serif, "m-0 text-[24px]")}>
              Say hello
            </h2>
            {/* Same look as `prose`, but with its own margins (mixing margin classes is unreliable). */}
            <p className="mt-1 max-w-[60ch] text-[13.5px] leading-[1.7] text-muted">
              This opens a draft to {email} in your mail app.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-[30px] shrink-0 place-items-center rounded-full text-muted hover:bg-soft2 hover:text-ink pointer-coarse:size-10"
          >
            <CloseIcon />
          </button>
        </div>
        <label className={field}>
          Your name
          <input
            ref={firstField}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Jane from Acme"
            className={input}
          />
        </label>
        <label className={field}>
          Message
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi! We're building…"
            className={cx(input, "resize-y")}
          />
        </label>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={onCopyEmail} className={cx(btn, btnMd, btnSoft, "flex-1")}>
            Copy email
          </button>
          <a href={href} onClick={() => setTimeout(onClose, 150)} className={cx(btn, btnMd, btnDark, "flex-1")}>
            Open draft
          </a>
        </div>
      </div>
    </div>
  );
}
