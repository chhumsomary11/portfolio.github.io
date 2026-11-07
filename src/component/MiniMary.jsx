import { useCallback, useEffect, useRef, useState } from "react";
import chat from "../data/mini-mary-chat.json";
import { OPEN_QUEST_EVENT } from "./events";

const NUDGE_KEY = "miniMaryNudgeSeen";
const NUDGE_DELAY = 10000;
const MAX_HISTORY = 10;
const CV_URL = "/files/generalCV.pdf";

const store = {
  get: () => {
    try {
      return localStorage.getItem(NUDGE_KEY);
    } catch {
      return null;
    }
  },
  set: () => {
    try {
      localStorage.setItem(NUDGE_KEY, "1");
    } catch {
      /* private mode: the nudge may show again, which is fine */
    }
  },
};

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function guessKind(t) {
  if (/thank|arkun|អរគុណ/i.test(t)) return "thanks";
  if (/[ក-៿]/.test(t)) return "khmer";
  if (/sastra/i.test(t)) return "sastra";
  if (/stack|tech|skill|language|react|python/i.test(t)) return "stack";
  if (/intern|hire|job|open|available|graduate/i.test(t)) return "open";
  if (/\bcv\b|resume|résumé/i.test(t)) return "cv";
  return "fallback";
}

const scrollToId = (id) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });

function Close({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <path d="M0 0h2v1h-2zM6 0h2v1h-2zM1 1h2v1h-2zM5 1h2v1h-2zM2 2h4v1h-4zM3 3h2v2h-2zM2 5h4v1h-4zM1 6h2v1h-2zM5 6h2v1h-2zM0 7h2v1h-2zM6 7h2v1h-2z" />
    </svg>
  );
}

function Avatar({ size }) {
  return (
    <div
      className="flex-none overflow-hidden pixel-border-2"
      style={{ width: size, height: size, background: "#f6e7b8" }}
    >
      <img className="block" src="/lotus/sprites/mary-avatar.webp" alt="" width={size} height={size} />
    </div>
  );
}

const bubble =
  "max-w-[250px] px-3 py-2.5 font-body text-sm leading-normal pixel-border-3";

function BotBubble({ children }) {
  return (
    <div className="flex items-end gap-2">
      <Avatar size={32} />
      <div className={`${bubble} bg-card text-ink`}>{children}</div>
    </div>
  );
}

export default function MiniMary() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [messages, setMessages] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const log = useRef(null);
  const inputRef = useRef(null);
  const launcher = useRef(null);
  const mounted = useRef(true);

  // First visit only: nudge after ~10s
  useEffect(() => {
    if (store.get()) return;
    const t = setTimeout(() => setNudge(true), NUDGE_DELAY);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const dismissNudge = () => {
    setNudge(false);
    store.set();
  };

  const close = useCallback(() => {
    setOpen(false);
    launcher.current?.focus();
  }, []);

  const toggle = () => {
    dismissNudge();
    if (open) close();
    else setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, thinking]);

  const ask = async (text, kind) => {
    const prompt = text.trim();
    if (thinking || !prompt) return;

    // last turns (the greeting is not in `messages`) so Mini Mary can follow along
    const history = messages.slice(-MAX_HISTORY).map((m) => ({
      role: m.from === "me" ? "user" : "assistant",
      content: m.text,
    }));

    setMessages((m) => [...m, { from: "me", text: prompt }]);
    setInput("");
    setThinking(true);

    const thanks = kind === "thanks";
    let answer;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, history }),
      });
      if (res.status === 429) {
        answer = chat.scriptedAnswers.rateLimited;
      } else {
        const data = await res.json();
        if (!res.ok || !data?.response) throw new Error("no answer");
        answer = { text: data.response, actions: data.actions ?? [] };
      }
    } catch {
      // endpoint down or not running (e.g. plain `vite dev`): use the scripted answer
      answer =
        kind === "fallback"
          ? chat.scriptedAnswers.unavailable
          : (chat.scriptedAnswers[kind] ?? chat.scriptedAnswers.unavailable);
    }
    if (!mounted.current) return;
    setMessages((m) => [...m, { from: "bot", thanks, ...answer }]);
    setThinking(false);
  };

  const run = (act) => {
    const mobile = !window.matchMedia("(min-width: 768px)").matches;
    if (mobile) setOpen(false); // the panel covers the page on mobile
    if (act === "cv") {
      const a = document.createElement("a");
      a.href = CV_URL;
      a.download = "";
      a.click();
    } else if (act.startsWith("quest:")) {
      window.dispatchEvent(new CustomEvent(OPEN_QUEST_EVENT, { detail: act.slice(6) }));
      setTimeout(() => scrollToId("projects"), 60);
    } else if (act.startsWith("goto:")) {
      setTimeout(() => scrollToId(act.slice(5)), 60);
    }
  };

  return (
    <>
      {/* launcher */}
      <div className="fixed bottom-4 right-3.5 z-20 flex flex-col items-end gap-2.5 md:bottom-8 md:right-8 md:gap-3">
        {nudge && !open && (
          <div className="ap-pop relative flex items-center gap-0.5 whitespace-nowrap bg-card py-1 pl-3.5 font-pixel text-base font-semibold text-ink pixel-border-3">
            Psst… ask me anything!
            <button
              type="button"
              onClick={dismissNudge}
              aria-label="Dismiss"
              className="flex size-11 cursor-pointer items-center justify-center border-0 bg-transparent text-muted"
            >
              <Close size={12} />
            </button>
            <svg width="16" height="12" viewBox="0 0 4 3" shapeRendering="crispEdges" aria-hidden="true" className="absolute -bottom-[15px] right-[30px]">
              <path style={{ fill: "var(--line)" }} d="M0 0h4v1h-4zM0 1h1v1h-1zM3 1h1v1h-1zM1 2h2v1h-2z" />
              <path style={{ fill: "var(--card)" }} d="M0 0h4v1h-4zM1 1h2v1h-2z" />
            </svg>
          </div>
        )}
        <button
          ref={launcher}
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-label="Chat with Mini Mary, an AI version of Mary"
          className="relative flex h-20 w-16 cursor-pointer items-end justify-center overflow-hidden border-0 bg-card p-0 md:h-[100px] md:w-[84px]"
          style={{
            boxShadow:
              "0 -4px 0 0 var(--line), 0 4px 0 0 var(--line), -4px 0 0 0 var(--line), 4px 0 0 0 var(--line), 8px 10px 0 0 rgba(0,59,57,0.3)",
          }}
        >
          <span aria-hidden="true" className="relative block h-[70px] w-[49px] flex-none overflow-hidden md:h-[90px] md:w-[62px]">
            <img className="ap-strip ap-wave ap-hd w-[1600%]" src="/lotus/sprites/mary-wave.webp" alt="" />
          </span>
        </button>
        <span className="bg-btn px-2.5 py-[3px] font-pixel text-sm font-semibold text-on-band">
          Mini Mary · AI
        </span>
      </div>

      {open && (
        <section
          role="dialog"
          aria-label="Chat with Mini Mary"
          className="ap-card-in fixed inset-0 z-30 flex flex-col bg-card text-ink md:inset-auto md:bottom-[184px] md:right-8 md:h-[560px] md:max-h-[calc(100dvh-200px)] md:w-[380px]"
          style={{
            boxShadow:
              "0 -5px 0 0 var(--line), 0 5px 0 0 var(--line), -5px 0 0 0 var(--line), 5px 0 0 0 var(--line), 10px 14px 0 0 rgba(0,59,57,0.3)",
          }}
        >
          <div className="flex items-center gap-3 bg-btn py-2.5 pr-1.5 pl-3.5 text-on-band">
            <Avatar size={42} />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="font-pixel text-[19px] font-semibold leading-[1.2]">Mini Mary</span>
              <span className="font-label text-[11px] text-on-band-muted">AI · knows Mary&apos;s CV and projects</span>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close chat"
              className="flex size-11 cursor-pointer items-center justify-center border-0 bg-transparent text-on-band"
            >
              <Close />
            </button>
          </div>

          <div
            ref={log}
            role="log"
            aria-live="polite"
            className="flex flex-1 flex-col gap-3.5 overflow-y-auto bg-page px-4 pt-[18px] pb-4"
          >
            <div className="flex items-end gap-2.5">
              <span aria-hidden="true" className="relative block h-[66px] w-[46px] flex-none overflow-hidden">
                <img className="ap-strip ap-wave ap-hd w-[1600%]" src="/lotus/sprites/mary-wave.webp" alt="" />
              </span>
              <div className={`${bubble} bg-card text-ink`}>
                Hi! I&apos;m <b>Mini Mary</b>, an AI version of Mary that knows her CV and projects. Ask me anything, or send the real Mary a message.
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-0.5 pr-0.5 pb-1 pl-14">
              {chat.starterQuestions.map((s) => (
                <button
                  key={s.answer}
                  type="button"
                  lang={/[ក-៿]/.test(s.label) ? "km" : undefined}
                  disabled={thinking}
                  onClick={() => ask(s.label, s.answer)}
                  className="min-h-10 cursor-pointer border-0 bg-card px-3 py-1.5 text-left font-body text-[13px] font-medium text-ink disabled:cursor-default disabled:opacity-60"
                  style={{
                    boxShadow:
                      "0 -2px 0 0 var(--sage-line), 0 2px 0 0 var(--sage-line), -2px 0 0 0 var(--sage-line), 2px 0 0 0 var(--sage-line)",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {messages.map((m, i) =>
              m.from === "me" ? (
                <div key={i} className="flex justify-end">
                  <div className={`${bubble} bg-btn text-on-band`}>{m.text}</div>
                </div>
              ) : (
                <BotBubble key={i}>
                  <span className="whitespace-pre-line">{m.text}</span>
                  {m.thanks && (
                    <span aria-hidden="true" className="relative mt-1.5 block h-[72px] w-11 overflow-hidden">
                      <img className="ap-strip ap-sampeah ap-hd w-[1200%]" src="/lotus/sprites/mary-sampeah.webp" alt="" />
                    </span>
                  )}
                  {m.actions?.length > 0 && (
                    <span className="mt-2 flex flex-wrap gap-2.5">
                      {m.actions.map((a) => (
                        <button
                          key={a.act}
                          type="button"
                          onClick={() => run(a.act)}
                          className="min-h-9 cursor-pointer border-0 bg-btn px-3 font-pixel text-sm font-semibold text-on-band pixel-border-2"
                        >
                          {a.label}
                        </button>
                      ))}
                    </span>
                  )}
                </BotBubble>
              ),
            )}

            {thinking && (
              <BotBubble>
                <span aria-hidden="true" className="relative block h-[53px] w-11 overflow-hidden">
                  <img className="ap-strip ap-sit3" src="/lotus/sprites/mary-sit.webp" alt="" style={{ width: "400%" }} />
                </span>
                <span className="sr-only">Mini Mary is typing</span>
              </BotBubble>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input, guessKind(input));
            }}
            className="flex gap-3 border-t-[3px] border-sage-line bg-card px-3.5 py-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Message Mini Mary
            </label>
            <input
              ref={inputRef}
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills…"
              autoComplete="off"
              className="min-h-11 min-w-0 flex-1 rounded-none border-[3px] border-solid border-line bg-field px-3 font-body text-[15px] text-ink"
            />
            <button
              type="submit"
              aria-label="Send message to Mini Mary"
              disabled={thinking}
              className="flex min-h-11 w-12 flex-none cursor-pointer items-center justify-center border-0 bg-gold text-[#004643] disabled:opacity-60"
              style={{
                boxShadow:
                  "0 -3px 0 0 #f9bc60, 0 3px 0 0 #f9bc60, -3px 0 0 0 #f9bc60, 3px 0 0 0 #f9bc60",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 9 9" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
                <path d="M0 0h2v1h-2zM0 1h4v1h-4zM0 2h6v1h-6zM0 3h8v1h-8zM0 4h9v1h-9zM0 5h8v1h-8zM0 6h6v1h-6zM0 7h4v1h-4zM0 8h2v1h-2z" />
              </svg>
            </button>
          </form>
          <p className="m-0 bg-card px-3.5 pb-2.5 text-[11px] text-muted">
            AI can make mistakes. For anything important, email Mary.
          </p>
        </section>
      )}
    </>
  );
}
