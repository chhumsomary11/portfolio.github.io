import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  QuestLinks,
  QuestRows,
  QuestShot,
  QuestTech,
  QuestTitleMeta,
} from "./QuestFacts";

const FOCUSABLE = 'button, a[href], [tabindex]:not([tabindex="-1"])';

/**
 * Mobile full-screen story: band-colour veil, floating item, and a card sheet
 * that slides up from the bottom. Portal + focus trap, page scroll locked,
 * closes on x, Esc or a swipe down from the top of the sheet.
 */
export default function QuestStory({ q, onClose }) {
  const dialog = useRef(null);
  const closeBtn = useRef(null);
  const sheet = useRef(null);
  const touchY = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = dialog.current.querySelectorAll(FOCUSABLE);
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [onClose]);

  const onTouchStart = (e) => {
    touchY.current = sheet.current.scrollTop <= 0 ? e.touches[0].clientY : null;
  };
  const onTouchEnd = (e) => {
    if (touchY.current !== null && e.changedTouches[0].clientY - touchY.current > 90)
      onClose();
    touchY.current = null;
  };

  return createPortal(
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`${q.title} project story`}
      className="lotus ap-veil-in fixed inset-0 z-40 flex h-dvh w-full flex-col text-on-band"
      style={{ background: q.band }}
    >
      <div className="relative flex min-h-[220px] flex-[0_0_34vh] flex-col items-center justify-center gap-[10px]">
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Close story"
          className="absolute left-1/2 top-[14px] -ml-[22px] flex size-11 cursor-pointer items-center justify-center border-0 bg-white/15 text-on-band"
        >
          <svg width="14" height="14" viewBox="0 0 8 8" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
            <path d="M0 0h2v1h-2zM6 0h2v1h-2zM1 1h2v1h-2zM5 1h2v1h-2zM2 2h4v1h-4zM3 3h2v2h-2zM2 5h4v1h-4zM1 6h2v1h-2zM5 6h2v1h-2zM0 7h2v1h-2zM6 7h2v1h-2z" />
          </svg>
        </button>
        <img
          className="ap-float mt-[30px] block size-32 [image-rendering:pixelated]"
          src={q.img}
          alt=""
        />
        <span aria-hidden="true" className="-mt-1.5 h-2 w-[90px] bg-black/30" />
        <span className="font-label text-xs tracking-[0.1em] uppercase text-on-band-muted">
          {q.item}
        </span>
      </div>

      <div
        ref={sheet}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="ap-sheet-in flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto bg-card px-5 pt-[14px] pb-8 text-ink"
        style={{ boxShadow: "0 -5px 0 0 var(--line)" }}
      >
        <span aria-hidden="true" className="h-[5px] w-11 self-center bg-sage-line" />
        <div className="flex flex-col gap-1.5">
          <h3 className="m-0 font-pixel text-[32px] font-semibold leading-[1.1]">{q.title}</h3>
          <QuestTitleMeta q={q} />
        </div>
        <QuestShot q={q} />
        <QuestRows q={q} stacked />
        <QuestTech tech={q.tech} />
        <QuestLinks links={q.links} className="flex flex-col gap-4 p-1" linkClass="min-h-12 text-[17px]" />
      </div>
    </div>,
    document.body,
  );
}
