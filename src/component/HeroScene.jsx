import { useRef, useState } from "react";
import useDusk from "../hooks/useDusk";

const SCENE = "/lotus/scene";
const DIM = "brightness(0.8) saturate(0.85) hue-rotate(-6deg)";

const BIRDS = [
  { top: "29%", left: "70%", delay: "0s", dur: "26s", w: 21, h: 9 },
  { top: "34%", left: "85%", delay: "-9s", dur: "31s", w: 14, h: 6 },
  { top: "25%", left: "60%", delay: "-18s", dur: "34s", w: 12, h: 5 },
];
const SPARKS = [
  ["74%", "70%", "0s"],
  ["81%", "66%", "-0.9s"],
  ["88%", "72%", "-1.7s"],
  ["93%", "67%", "-0.4s"],
  ["68%", "66%", "-2.1s"],
  ["14%", "96%", "-1.2s"],
];
const LEAVES = [
  { left: "30%", top: "12%", delay: "0s" },
  { left: "46%", top: "8%", delay: "-3s" },
  { left: "58%", top: "15%", delay: "-6s", dur: "11s" },
  { left: "22%", top: "20%", delay: "-4.5s", dur: "10s" },
  { left: "66%", top: "9%", delay: "-7.5s" },
];
const STARS = [
  ["52%", "6%", "0s"],
  ["61%", "18%", "-1.1s"],
  ["72%", "4%", "-2.2s"],
  ["79%", "22%", "-0.6s"],
  ["94%", "28%", "-1.8s"],
  ["84%", "14%", "-2.9s"],
];
const FIREFLIES = [
  ["62%", "74%", "0s"],
  ["71%", "62%", "-1.3s"],
  ["84%", "78%", "-2.6s"],
  ["55%", "86%", "-3.4s"],
  ["18%", "70%", "-0.7s"],
  ["91%", "60%", "-4.1s"],
  ["38%", "88%", "-2s"],
];

const EDGE_PATH =
  "M0 4V2H5V3H9V1H14V2H22V3H27V2H33V1H37V2H44V3H50V2H55V1H61V2H68V3H72V2H79V1H84V2H90V3H97V2H102V1H108V2H114V3H120V4Z";

function Edge({ position }) {
  const top = position === "top";
  return (
    <svg
      viewBox="0 0 120 4"
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="absolute left-0 w-full"
      style={
        top
          ? { top: 0, height: 20, transform: "scaleY(-1)" }
          : { bottom: 0, height: 26 }
      }
    >
      <path style={{ fill: "var(--page)" }} d={EDGE_PATH} />
    </svg>
  );
}

// A layer pair that crossfades between its day and dusk image.
function Pair({ day, dusk, night, className = "" }) {
  const shared = (src, box, opacity) => (
    <img
      className={`ap-fade absolute h-auto ${className}`}
      src={`${SCENE}/${src}`}
      alt=""
      aria-hidden="true"
      style={{ ...box, opacity }}
    />
  );
  return (
    <>
      {shared(day.src, day.box, night ? 0 : 1)}
      {shared(dusk.src, dusk.box, night ? 1 : 0)}
    </>
  );
}

const box = (left, top, width) => ({
  left: `${left}%`,
  top: `${top}%`,
  width: `${width}%`,
});

/**
 * Animated pixel-art hero. Every layer is positioned in % of the stage, so the
 * stage keeps the scene's 2576 x 1438 ratio on desktop and is cropped to
 * 555 x 310 (shifted to show Mary, the cat and Angkor Wat) on mobile.
 * `children` render in an overlay on the outer box (the speech box goes there).
 */
export default function HeroScene({ children }) {
  const night = useDusk();
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const frame = useRef(0);

  const onMove = (e) => {
    // Parallax is desktop-only and skipped for reduced motion.
    if (
      !window.matchMedia("(min-width: 768px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setShift({ x: mx, y: my }));
  };

  const parallax = {
    transform: `translate(${(-shift.x * 16).toFixed(1)}px, ${(-shift.y * 6).toFixed(1)}px)`,
  };
  const dim = {
    transition: "filter 1.2s ease",
    filter: night ? DIM : "none",
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      onMouseMove={onMove}
      className="relative w-full overflow-hidden h-[310px] md:h-auto md:aspect-[2576/1438]"
      style={{ background: "#e9c98f" }}
    >
      <div
        role="img"
        aria-label="Pixel scene: Mary sits typing on a laptop under a big tree beside a lotus pond, with Angkor Wat in the distance and a cat asleep nearby"
        className="absolute top-0 left-[calc(50%-344px)] w-[555px] h-[310px] md:left-0 md:w-full md:h-full"
      >
        <img
          src={`${SCENE}/scene-day.webp`}
          alt=""
          className="absolute inset-0 w-full h-full block"
        />
        <img
          className="ap-fade absolute inset-0 w-full h-full block"
          src={`${SCENE}/scene-dusk.webp`}
          alt=""
          style={{ opacity: night ? 1 : 0 }}
        />

        {/* light rays pulse (day only) */}
        <div
          className="ap-fade absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ opacity: night ? 0 : 1 }}
        >
          <div
            className="ap-rays absolute inset-0"
            style={{
              mixBlendMode: "screen",
              background:
                "radial-gradient(ellipse 20% 42% at 56% 24%, rgba(255,236,170,0.8) 0%, rgba(255,236,170,0.25) 45%, rgba(255,236,170,0) 75%)",
            }}
          />
        </div>

        {BIRDS.map((b) => (
          <div
            key={b.delay}
            className="ap-bird"
            aria-hidden="true"
            style={{
              top: b.top,
              left: b.left,
              animationDelay: b.delay,
              animationDuration: b.dur,
            }}
          >
            <svg
              className="ap-flap"
              width={b.w}
              height={b.h}
              viewBox="0 0 7 3"
              shapeRendering="crispEdges"
            >
              <path
                fill="#5a4636"
                d="M0 0h1v1h-1zM6 0h1v1h-1zM1 1h1v1h-1zM5 1h1v1h-1zM2 2h3v1h-3z"
              />
            </svg>
          </div>
        ))}

        {/* far pond lotus + water sparkles */}
        <Pair
          className="ap-bob"
          night={night}
          day={{ src: "lotus-far-day.webp", box: box(55.16, 64.33, 44.84) }}
          dusk={{ src: "lotus-far-dusk.webp", box: box(55.36, 64.26, 44.64) }}
        />
        {SPARKS.map(([left, top, delay]) => (
          <span
            key={left + top}
            className="ap-spark"
            aria-hidden="true"
            style={{ left, top, animationDelay: delay }}
          />
        ))}

        <img
          className="ap-breathe absolute h-auto"
          src={`${SCENE}/cat.png`}
          alt=""
          aria-hidden="true"
          style={{
            left: "49%",
            top: "80.5%",
            width: "7.6%",
            imageRendering: "pixelated",
            ...dim,
          }}
        />

        {/* Mary sitting: 4-frame strip */}
        <div
          aria-hidden="true"
          className="absolute overflow-hidden"
          style={{
            left: "26.5%",
            top: "41%",
            width: "23.57%",
            aspectRatio: "596 / 720",
            ...dim,
          }}
        >
          <img
            className="ap-strip ap-sit3"
            src="/lotus/sprites/mary-sit.webp"
            alt=""
            style={{ width: "400%" }}
          />
        </div>

        {LEAVES.map((l) => (
          <span
            key={l.left}
            className="ap-leaf"
            aria-hidden="true"
            style={{
              left: l.left,
              top: l.top,
              animationDelay: l.delay,
              animationDuration: l.dur,
            }}
          />
        ))}

        {/* front lotus, slight mouse parallax */}
        <div
          className="ap-par absolute pointer-events-none"
          aria-hidden="true"
          style={{ left: "55%", top: 0, width: "45%", height: "100%", ...parallax }}
        >
          <Pair
            className="ap-sway-r"
            night={night}
            day={{ src: "lotus-right-day.webp", box: box(6.67, 79.49, 93.33) }}
            dusk={{ src: "lotus-right-dusk.webp", box: box(6.58, 79.49, 93.42) }}
          />
        </div>
        <div
          className="ap-par absolute pointer-events-none"
          aria-hidden="true"
          style={{ left: 0, top: 0, width: "33%", height: "100%", ...parallax }}
        >
          <Pair
            className="ap-sway-l"
            night={night}
            day={{ src: "lotus-left-day.webp", box: box(0, 38.8, 95.76) }}
            dusk={{ src: "lotus-left-dusk.webp", box: box(0, 38.87, 98.82) }}
          />
        </div>

        {/* dusk extras: laptop glow, stars, fireflies */}
        <div
          className="ap-fade absolute pointer-events-none rounded-full"
          aria-hidden="true"
          style={{
            left: "36%",
            top: "58%",
            width: "16%",
            aspectRatio: "1 / 1",
            background:
              "radial-gradient(circle, rgba(170,215,255,0.6) 0%, rgba(170,215,255,0) 65%)",
            mixBlendMode: "screen",
            opacity: night ? 1 : 0,
          }}
        />
        <div
          className="ap-fade absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ opacity: night ? 1 : 0 }}
        >
          {STARS.map(([left, top, delay]) => (
            <span key={left + top} className="ap-star" style={{ left, top, animationDelay: delay }} />
          ))}
          {FIREFLIES.map(([left, top, delay]) => (
            <span key={left + top} className="ap-firefly" style={{ left, top, animationDelay: delay }} />
          ))}
        </div>
      </div>

      <Edge position="top" />
      <Edge position="bottom" />

      {children}
    </section>
  );
}
