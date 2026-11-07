const label =
  "font-label text-xs font-bold tracking-[0.06em] uppercase text-rose";
const divider = "border-t-[3px] border-dashed border-sage-line pt-[14px]";

// The Quest / My Move / The Reward rows. `stacked` puts label above text (mobile story).
export function QuestRows({ q, stacked }) {
  const rows = [
    ["The Quest", q.quest],
    ["My Move", q.move],
    ["The Reward", q.reward],
  ];
  return rows.map(([name, text]) => (
    <div
      key={name}
      className={
        stacked
          ? `flex flex-col gap-1 ${divider}`
          : `grid grid-cols-[120px_minmax(0,1fr)] items-baseline gap-4 ${divider}`
      }
    >
      <span className={label}>{name}</span>
      <p className={`m-0 text-[15px] text-muted ${stacked ? "leading-[1.55]" : ""}`}>
        {text}
      </p>
    </div>
  ));
}

export function QuestTech({ tech }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-[10px] px-0.5 py-1">
      {tech.map((t) => (
        <li
          key={t}
          className="px-2 py-0.5 font-label text-[11px] bg-sage text-ink"
          style={{
            boxShadow:
              "0 -2px 0 0 var(--sage-line), 0 2px 0 0 var(--sage-line), -2px 0 0 0 var(--sage-line), 2px 0 0 0 var(--sage-line)",
          }}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

export function QuestTitleMeta({ q }) {
  return (
    <div className="flex flex-wrap items-center gap-[10px]">
      <span className="font-label text-xs text-muted">{q.category}</span>
      {q.status && (
        <span className="px-2 py-px font-label text-[11px] font-bold bg-gold text-[#004643]">
          {q.status}
        </span>
      )}
    </div>
  );
}

export function QuestLinks({ links, className, linkClass }) {
  return (
    <div className={className}>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          className={`inline-flex items-center justify-center bg-btn text-on-band font-pixel font-semibold pixel-border-3 ${linkClass}`}
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

// Project screenshot in a pixel frame. Fixed 16:9 box so nothing jumps while it loads.
export function QuestShot({ q }) {
  if (!q.shot) return null;
  return (
    <div className="p-1">
      <img
        src={q.shot}
        alt={q.shotAlt}
        width="1400"
        height="788"
        loading="lazy"
        decoding="async"
        className="block aspect-[16/9] w-full bg-sage object-cover object-top pixel-border-4"
      />
    </div>
  );
}
