import { useEffect, useState } from "react";
import DuskToggle from "./DuskToggle";

const LINKS = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["education", "Education"],
  ["contact", "Contact"],
];

function LotusLogo({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 8 6"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path
        fill="#e58a94"
        d="M3 0h2v1h-2zM2 1h1v1h-1zM5 1h1v1h-1zM1 2h2v1h-2zM5 2h2v1h-2zM0 3h2v1h-2zM6 3h2v1h-2zM1 4h6v1h-6z"
      />
      <path fill="#f3c2c8" d="M3 1h2v1h-2zM3 2h2v1h-2zM2 3h4v1h-4z" />
      <path fill="#5e6236" d="M2 5h4v1h-4z" />
    </svg>
  );
}

export default function Nav() {
  const [active, setActive] = useState("about");
  const [menu, setMenu] = useState(false);
  const [stuck, setStuck] = useState(false);

  // draw a pixel edge under the bar once the page has scrolled
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // underline the section that is in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    LINKS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  const link = (id, label, mobile) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={() => setMenu(false)}
      aria-current={active === id ? "location" : undefined}
      className={
        mobile
          ? `flex min-h-11 items-center px-4 font-label text-[15px] ${active === id ? "font-bold text-ink" : "text-muted"}`
          : `pb-0.5 ${active === id ? "border-b-[3px] border-gold font-bold text-ink" : "border-b-[3px] border-transparent text-muted"}`
      }
    >
      {label}
    </a>
  );

  return (
    <div
      className="sticky top-0 z-30 bg-page"
      style={{
        boxShadow: stuck
          ? "0 4px 0 0 var(--sage-line)"
          : "0 4px 0 0 transparent",
      }}
    >
      <header className="relative mx-auto flex max-w-[1160px] items-center justify-between gap-4 px-4 py-3.5 md:px-10 md:py-4">
        <a
          href="#hero"
          className="inline-flex items-center gap-2 font-pixel text-[26px] font-bold leading-none text-ink md:gap-2.5 md:text-3xl"
        >
          <LotusLogo className="h-[21px] w-7 md:h-6 md:w-8" />
          Mary
        </a>

        <nav
          aria-label="Main"
          className="hidden items-center gap-7 font-label text-sm md:flex"
        >
          {LINKS.map(([id, label]) => link(id, label))}
          <DuskToggle />
        </nav>

        <div className="flex gap-3.5 pr-[3px] md:hidden">
          <DuskToggle />
          <button
            type="button"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu((m) => !m)}
            className="flex size-11 cursor-pointer items-center justify-center border-0 bg-btn text-on-band pixel-border-3"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 10 10"
              shapeRendering="crispEdges"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M1 2h8v1h-8zM1 5h8v1h-8zM1 8h8v1h-8z" />
            </svg>
          </button>
        </div>

        {menu && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="absolute top-full right-4 left-4 z-30 flex flex-col bg-card py-2 md:hidden"
            style={{
              boxShadow:
                "0 -4px 0 0 var(--line), 0 4px 0 0 var(--line), -4px 0 0 0 var(--line), 4px 0 0 0 var(--line), 8px 10px 0 0 var(--sage-line)",
            }}
          >
            {LINKS.map(([id, label]) => link(id, label, true))}
          </nav>
        )}
      </header>
    </div>
  );
}
