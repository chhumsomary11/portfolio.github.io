import { useEffect, useRef, useState } from "react";

/**
 * Section wrapper that plays its entrance once, when 12% of it is on screen.
 * Children opt in with `ap-rv` (pixel dissolve) or `ap-hop` (hop in, stagger
 * with `hopDelay(i)`). Content is only hidden after JS adds `ap-js` to <html>.
 */
export default function Reveal({ className = "", children, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    // Without IntersectionObserver, never add ap-js: content simply stays visible.
    if (!el || typeof IntersectionObserver === "undefined") return;
    document.documentElement.classList.add("ap-js");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`${className}${seen ? " is-in" : ""}`} {...rest}>
      {children}
    </section>
  );
}

