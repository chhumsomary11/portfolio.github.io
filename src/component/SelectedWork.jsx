import { useCallback, useEffect, useState } from "react";
import quests from "../data/quests.json";
import useMediaQuery from "../hooks/useMediaQuery";
import Reveal from "./Reveal";
import { hopDelay } from "./hopDelay";
import { OPEN_QUEST_EVENT } from "./events";
import QuestStory from "./QuestStory";
import {
  QuestLinks,
  QuestRows,
  QuestShot,
  QuestTech,
  QuestTitleMeta,
} from "./QuestFacts";

const DEFAULT_OPEN = "sastra";

function Tile({ q, i, on, onPick }) {
  return (
    <div className="ap-hop flex" style={hopDelay(i)}>
      <button
        type="button"
        className="ap-tile flex flex-1 cursor-pointer flex-col items-center gap-1.5 border-0 bg-card px-2 pt-[14px] pb-3 text-center text-ink md:px-2.5 md:pt-[18px] md:pb-4"
        aria-pressed={on}
        aria-controls="quest-card"
        aria-label={`${q.title}, ${q.item}${on ? ", open" : ""}`}
        onClick={() => onPick(q.key)}
        style={{
          boxShadow: `0 -4px 0 0 ${on ? "#f9bc60" : "var(--sage-line)"}, 0 4px 0 0 ${on ? "#f9bc60" : "var(--sage-line)"}, -4px 0 0 0 ${on ? "#f9bc60" : "var(--sage-line)"}, 4px 0 0 0 ${on ? "#f9bc60" : "var(--sage-line)"}, ${on ? "0 14px 0 -4px rgba(0,0,0,0.25)" : "0 0 0 0 rgba(0,0,0,0)"}`,
          transform: on ? "translateY(-6px)" : undefined,
        }}
      >
        <img className="block size-14 md:size-[72px] [image-rendering:pixelated]" src={q.img} alt="" />
        <span aria-hidden="true" className="-mt-1 h-[5px] w-8 bg-black/15 md:w-12" />
        <span className="font-label text-[10px] md:text-[11px] tracking-[0.05em] uppercase text-rose">
          {q.item}
        </span>
        <span className="font-pixel text-base md:text-[19px] font-semibold leading-[1.15]">
          {q.title}
        </span>
      </button>
    </div>
  );
}

function QuestCard({ q }) {
  return (
    <article
      key={q.key}
      className="ap-card-in relative flex flex-col gap-4 bg-card px-8 py-[30px] text-ink"
      style={{
        boxShadow:
          "0 -5px 0 0 var(--sage-line), 0 5px 0 0 var(--sage-line), -5px 0 0 0 var(--sage-line), 5px 0 0 0 var(--sage-line)",
      }}
    >
      <div className="flex items-center gap-[22px]">
        <div
          className="flex size-28 flex-none items-center justify-center pixel-border-4"
          style={{ background: q.tile }}
        >
          <img className="block size-[88px] [image-rendering:pixelated]" src={q.img} alt="" />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-label text-[11px] tracking-[0.06em] uppercase text-rose">{q.item}</span>
          <h3 className="m-0 font-pixel text-[34px] font-semibold leading-[1.1]">{q.title}</h3>
          <QuestTitleMeta q={q} />
        </div>
      </div>
      <QuestShot q={q} />
      <QuestRows q={q} />
      <QuestTech tech={q.tech} />
      <QuestLinks links={q.links} className="flex flex-wrap gap-4 p-1" linkClass="min-h-11 px-[18px] text-base" />
    </article>
  );
}

export default function SelectedWork() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // undefined = nothing picked yet, null = story closed (mobile)
  const [picked, setPicked] = useState(undefined);
  const close = useCallback(() => setPicked(null), []);

  // Mini Mary can open a quest ("quest:sastra")
  useEffect(() => {
    const open = (e) => setPicked(e.detail);
    window.addEventListener(OPEN_QUEST_EVENT, open);
    return () => window.removeEventListener(OPEN_QUEST_EVENT, open);
  }, []);

  const active = quests.find(
    (q) => q.key === (isDesktop ? (picked ?? DEFAULT_OPEN) : picked),
  );
  const band = isDesktop && active ? active.band : "var(--band)";

  return (
    <Reveal
      id="projects"
      className="px-4 py-12 text-on-band md:px-0 md:py-24"
      style={{ background: band }}
    >
      <div className="mx-auto box-border flex max-w-[1160px] flex-col gap-3 md:block md:px-10">
        <p className="ap-rv m-0 font-label text-xs md:mb-2 md:text-[13px] tracking-[0.08em] uppercase text-gold">
          03 · Projects
        </p>
        <div className="ap-rv flex items-end gap-3 md:mb-10 md:gap-[18px]">
          <div
            role="img"
            aria-label="Mary's character gesturing toward the projects"
            className="relative h-[105px] w-[70px] flex-none self-end overflow-hidden md:h-[150px] md:w-[100px]"
          >
            <img className="ap-strip ap-present ap-hd w-[800%]" src="/lotus/sprites/mary-present.webp" alt="" />
          </div>
          <div className="flex flex-col gap-1 pb-1 md:gap-1.5 md:pb-1.5">
            <h2 className="m-0 font-pixel text-[32px] font-semibold leading-[1.1] md:text-5xl">
              Selected work
            </h2>
            <span className="text-[13px] text-on-band-muted md:text-[15px]">
              {isDesktop ? "Pick an item to open its quest." : "Tap an item to open its story."}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-start gap-11">
          <div className="grid min-w-0 flex-[1_1_440px] grid-cols-2 gap-[22px] px-[5px] pt-2.5 pb-1 md:grid-cols-3 md:gap-7 md:px-1.5 md:py-2.5">
            {quests.map((q, i) => (
              <Tile key={q.key} q={q} i={i} on={active?.key === q.key} onPick={setPicked} />
            ))}
          </div>
          {isDesktop && active && (
            <div id="quest-card" aria-live="polite" className="min-w-0 flex-[1_1_520px] p-1.5">
              <QuestCard q={active} />
            </div>
          )}
        </div>
      </div>
      {!isDesktop && active && <QuestStory q={active} onClose={close} />}
    </Reveal>
  );
}
