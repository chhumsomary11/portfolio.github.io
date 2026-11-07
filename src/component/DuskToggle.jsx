import useDusk from "../hooks/useDusk";

const STORAGE_KEY = "theme";

// Moon in day mode, sun in dusk mode. Same storage key and data-theme switch as before.
export default function DuskToggle() {
  const dusk = useDusk();

  const toggle = () => {
    const next = dusk ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage blocked: the choice just won't persist */
    }
  };

  return (
    <button
      type="button"
      aria-label="Toggle night mode"
      aria-pressed={dusk}
      onClick={toggle}
      className="flex size-11 flex-none cursor-pointer items-center justify-center border-0 bg-sage text-ink pixel-border-3"
    >
      <svg width="20" height="20" viewBox="0 0 10 10" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
        {dusk ? (
          <path d="M4 0h2v1h-2zM4 9h2v1h-2zM0 4h1v2h-1zM9 4h1v2h-1zM1 1h1v1h-1zM8 1h1v1h-1zM1 8h1v1h-1zM8 8h1v1h-1zM3 2h4v1h-4zM2 3h6v4h-6zM3 7h4v1h-4z" />
        ) : (
          <path d="M4 1h3v1h-3zM3 2h2v1h-2zM2 3h2v4h-2zM3 7h2v1h-2zM4 8h4v1h-4zM7 7h2v1h-2z" />
        )}
      </svg>
    </button>
  );
}
