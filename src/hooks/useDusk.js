import { useEffect, useState } from "react";

const isDusk = () =>
  typeof document !== "undefined" &&
  (document.documentElement.dataset.theme === "dark" ||
    document.documentElement.classList.contains("dark"));

// Tracks dusk mode as set by the DarkBtn toggle (data-theme) or a .dark class.
export default function useDusk() {
  const [dusk, setDusk] = useState(isDusk);

  useEffect(() => {
    const observer = new MutationObserver(() => setDusk(isDusk()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    return () => observer.disconnect();
  }, []);

  return dusk;
}
