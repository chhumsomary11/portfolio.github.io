import { useCallback, useEffect, useRef, useState } from "react";
import dialogue from "../data/dialogue.json";

const LINES = dialogue.lines;
const LETTER_MS = 30;

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const btnShadow = {
  primary:
    "0 -4px 0 0 var(--line), 0 4px 0 0 var(--line-deep), -4px 0 0 0 var(--line), 4px 0 0 0 var(--line)",
  outline:
    "0 -4px 0 0 var(--sage-line), 0 4px 0 0 var(--sage-line), -4px 0 0 0 var(--sage-line), 4px 0 0 0 var(--sage-line)",
};

const TAIL_PATH = (
  <>
    <path
      style={{ fill: "var(--line)" }}
      d="M0 0h1v1h-1zM6 0h1v1h-1zM1 1h1v1h-1zM5 1h1v1h-1zM2 2h1v1h-1zM4 2h1v1h-1zM3 3h1v1h-1z"
    />
    <path
      style={{ fill: "var(--card)" }}
      d="M1 0h5v1h-5zM2 1h3v1h-3zM3 2h1v1h-1z"
    />
  </>
);

/**
 * Clickable dialogue. Line 1 is the page <h1> and shows at once; the ▼ button
 * types out the following lines (30ms per letter) and loops after the last.
 * Desktop: floats over the hero (put it inside the hero's relative wrapper).
 * Mobile: sits under the scene with its tail pointing up at Mary.
 */
export default function SpeechBox() {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(LINES[0].length);
  const [typing, setTyping] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => clearInterval(timer.current), []);

  const next = useCallback(() => {
    clearInterval(timer.current);
    if (typing) {
      setChars(LINES[line].length);
      setTyping(false);
      return;
    }
    const n = (line + 1) % LINES.length;
    setLine(n);
    if (n === 0 || reducedMotion()) {
      setChars(LINES[n].length);
      setTyping(false);
      return;
    }
    setChars(0);
    setTyping(true);
    let c = 0;
    timer.current = setInterval(() => {
      c += 1;
      setChars(c);
      if (c >= LINES[n].length) {
        clearInterval(timer.current);
        setTyping(false);
      }
    }, LETTER_MS);
  }, [line, typing]);

  const last = line === LINES.length - 1;
  const nextLabel = typing
    ? "Show the whole line"
    : last
      ? "Start the introduction again"
      : `Next line (${line + 2} of ${LINES.length})`;

  return (
    <div
      className="relative mx-[21px] mt-[30px] mb-6 box-border flex flex-col gap-3 bg-card text-ink px-5 pt-7 pb-5
        md:absolute md:mx-0 md:mt-0 md:mb-0 md:left-[3.5%] md:top-[5%] md:w-[40%] md:max-w-[600px] md:gap-[14px] md:px-[30px] md:pt-[30px] md:pb-[26px]"
      style={{
        boxShadow:
          "0 -5px 0 0 var(--line), 0 5px 0 0 var(--line), -5px 0 0 0 var(--line), 5px 0 0 0 var(--line), 10px 14px 0 0 rgba(0,59,57,0.35)",
      }}
    >
      {/* tail: up at Mary on mobile, down on desktop */}
      <svg
        aria-hidden="true"
        width="35"
        height="20"
        viewBox="0 0 7 4"
        shapeRendering="crispEdges"
        className="absolute left-6 -top-[25px] md:hidden"
        style={{ transform: "scaleY(-1)" }}
      >
        {TAIL_PATH}
      </svg>
      <svg
        aria-hidden="true"
        width="35"
        height="20"
        viewBox="0 0 7 4"
        shapeRendering="crispEdges"
        className="absolute hidden md:block right-[14%] -bottom-[25px]"
      >
        <path
          style={{ fill: "var(--ink)" }}
          d="M0 0h1v1h-1zM6 0h1v1h-1zM1 1h1v1h-1zM5 1h1v1h-1zM2 2h1v1h-1zM4 2h1v1h-1zM3 3h1v1h-1z"
        />
        <path
          style={{ fill: "var(--card)" }}
          d="M1 0h5v1h-5zM2 1h3v1h-3zM3 2h1v1h-1z"
        />
      </svg>

      <span className="absolute left-[84px] -top-[18px] md:left-[18px] md:-top-5 px-3 md:px-[14px] py-0.5 md:py-[3px] bg-btn text-on-band font-pixel font-semibold text-base md:text-lg leading-[1.3]">
        Mary
      </span>

      <p className="m-0 font-label text-[11px] md:text-[13px] tracking-[0.08em] uppercase text-rose">
        Aspiring Software Developer · Phnom Penh
      </p>

      <div className="relative min-h-[104px] md:min-h-[136px]">
        <h1
          className={
            line === 0
              ? "m-0 font-pixel font-semibold text-[26px] md:text-[40px] leading-[1.1]"
              : "sr-only"
          }
        >
          {LINES[0]}
        </h1>
        {line > 0 && (
          <p
            aria-hidden="true"
            className="m-0 font-pixel font-medium text-[22px] md:text-[30px] leading-[1.25] md:leading-[1.2] text-ink"
          >
            {LINES[line].slice(0, chars)}
            {typing && <span className="ap-blink text-rose">_</span>}
          </p>
        )}
        <p aria-live="polite" className="sr-only">
          {line > 0 && !typing ? LINES[line] : ""}
        </p>
      </div>

      {/* progress dots + next button */}
      <div className="flex items-center justify-end gap-[10px] -mt-1.5 -mr-2 md:contents">
        <div
          aria-hidden="true"
          className="flex gap-[5px] md:absolute md:right-[66px] md:bottom-[26px]"
        >
          {LINES.map((_, i) => (
            <span
              key={i}
              className="size-[7px]"
              style={{
                background: i === line ? "var(--rose)" : "var(--dot-off)",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label={nextLabel}
          className="flex items-center justify-center p-0 border-0 bg-transparent cursor-pointer w-12 h-12 md:absolute md:right-2.5 md:bottom-2"
        >
          <svg
            className="ap-blink"
            width="21"
            height="12"
            viewBox="0 0 7 4"
            shapeRendering="crispEdges"
            aria-hidden="true"
          >
            <path
              style={{ fill: "var(--rose)" }}
              d="M0 0h7v1h-7zM1 1h5v1h-5zM2 2h3v1h-3zM3 3h1v1h-1z"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:flex-wrap gap-[18px] md:gap-5 p-1 md:mt-1">
        <a
          href="#contact"
          className="inline-flex items-center justify-center min-h-12 md:min-h-[46px] px-[22px] bg-btn text-on-band font-pixel font-semibold text-lg"
          style={{ boxShadow: btnShadow.primary }}
        >
          Contact me
        </a>
        <a
          href="public/files/Main_CV (1).docx"
          download
          className="inline-flex items-center justify-center gap-[10px] min-h-12 md:min-h-[46px] px-[22px] bg-card text-ink font-pixel font-semibold text-lg"
          style={{ boxShadow: btnShadow.outline }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 7 7"
            shapeRendering="crispEdges"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M3 0h1v4h-1zM1 2h1v1h-1zM5 2h1v1h-1zM2 3h1v1h-1zM4 3h1v1h-1zM0 6h7v1h-7z" />
          </svg>
          Download CV
        </a>
      </div>
    </div>
  );
}
