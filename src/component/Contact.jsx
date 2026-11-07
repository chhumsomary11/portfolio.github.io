import { useRef, useState } from "react";
import Reveal from "./Reveal";

const EMAIL = "dananloeung@gmail.com";
const field =
  "min-h-12 border-[3px] border-solid border-line rounded-none bg-field px-[14px] text-ink font-body text-base";

const LIVE = {
  sending: "Sending your message.",
  sent: "Message sent. Arkun, thank you!",
  error: "Couldn't send. Try again or email me directly.",
};

function Lotus() {
  return (
    <svg className="ap-spin" width="32" height="24" viewBox="0 0 8 6" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#9c3b4a" d="M3 0h2v1h-2zM2 1h1v1h-1zM5 1h1v1h-1zM1 2h2v1h-2zM5 2h2v1h-2zM0 3h2v1h-2zM6 3h2v1h-2zM1 4h6v1h-6z" />
      <path fill="#fbf4e6" d="M3 1h2v1h-2zM3 2h2v1h-2zM2 3h4v1h-4z" />
      <path fill="#004643" d="M2 5h4v1h-4z" />
    </svg>
  );
}

export default function Contact() {
  const form = useRef(null);
  // idle | sending | sent | error
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    const data = new FormData(form.current);
    try {
      const res = await fetch("/api/emailJsAPI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: data.get("user_name"),
          user_email: data.get("user_email"),
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Send failed");
      form.current.reset();
      setStatus("sent");
    } catch {
      // keep what the visitor typed
      setStatus("error");
    }
  };

  const sent = status === "sent";

  return (
    <Reveal id="contact" className="bg-band py-24 text-on-band">
      <div className="mx-auto box-border flex max-w-[1160px] flex-wrap gap-14 px-5 md:px-10">
        <div className="ap-rv flex min-w-0 flex-[1_1_380px] flex-col gap-5">
          <p className="m-0 font-label text-[13px] tracking-[0.08em] uppercase text-gold">05 · Contact</p>
          <h2 className="m-0 font-pixel text-[36px] md:text-5xl font-semibold leading-[1.1]">
            Let&apos;s work together
          </h2>
          <p className="m-0 max-w-[420px] text-on-band-muted">
            Open to internships and graduate programs. Send a message and I&apos;ll
            reply as soon as I can, or ask Mini Mary, the AI version of me in the corner.
          </p>
          <a href={`mailto:${EMAIL}`} className="font-label text-base text-gold">
            {EMAIL}
          </a>

          <div className="mt-2 flex min-h-[180px] items-start gap-[14px]">
            {!sent ? (
              <div
                role="img"
                aria-label="Mary's character standing, waiting for your message"
                className="relative h-[180px] w-[101px] flex-none overflow-hidden"
              >
                <img className="ap-strip ap-stand ap-hd w-[1200%]" src="/lotus/sprites/mary-stand.webp" alt="" />
              </div>
            ) : (
              <>
                <div
                  role="img"
                  aria-label="Mary's character thanking you with a sampeah"
                  className="relative h-[180px] w-[109px] flex-none overflow-hidden"
                >
                  <img className="ap-strip ap-sampeah ap-hd w-[1200%]" src="/lotus/sprites/mary-sampeah.webp" alt="" />
                </div>
                <div className="mt-3 flex flex-col items-start gap-3">
                  <div className="ap-pop relative bg-card px-[18px] pt-3 pb-2.5 text-ink pixel-border-4">
                    <span lang="km" className="block font-khmer text-[30px] font-bold leading-[1.35]">
                      អរគុណ!
                    </span>
                    <span className="block font-label text-xs text-muted">
                      Arkun! Thank you, I&apos;ll reply soon.
                    </span>
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 5 4"
                      shapeRendering="crispEdges"
                      aria-hidden="true"
                      className="absolute -left-[22px] top-[26px]"
                    >
                      <path style={{ fill: "var(--line)" }} d="M4 0h1v1h-1zM2 1h3v1h-3zM0 2h5v1h-5zM2 3h3v1h-3z" />
                      <path style={{ fill: "var(--card)" }} d="M4 1h1v1h-1zM2 2h3v1h-3z" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="min-h-11 cursor-pointer border-0 bg-transparent p-0 font-label text-sm text-gold underline"
                  >
                    Send another message
                  </button>
                </div>
              </>
            )}
          </div>
          <p aria-live="polite" className="sr-only">
            {LIVE[status] ?? ""}
          </p>
        </div>

        <form
          ref={form}
          onSubmit={submit}
          className="ap-hop m-1.5 flex min-w-0 flex-[1_1_440px] flex-col gap-[18px] bg-card p-6 text-ink md:p-8"
          style={{
            boxShadow:
              "0 -5px 0 0 var(--sage-line), 0 5px 0 0 var(--sage-line), -5px 0 0 0 var(--sage-line), 5px 0 0 0 var(--sage-line)",
          }}
        >
          <label className="flex flex-col gap-1.5 text-sm font-semibold">
            Name
            <input className={field} type="text" name="user_name" placeholder="Your name" autoComplete="name" required maxLength={100} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold">
            Email
            <input className={field} type="email" name="user_email" placeholder="you@example.com" autoComplete="email" required />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold">
            Message
            <textarea className={`${field} min-h-[120px] resize-y py-3`} name="message" placeholder="Say hello" required maxLength={3000} />
          </label>
          <button
            type="submit"
            disabled={status === "sending" || sent}
            aria-disabled={status === "sending" || sent}
            className="mt-1 flex min-h-12 cursor-pointer items-center justify-center gap-3 border-0 bg-gold font-pixel text-[19px] font-semibold text-[#004643] disabled:cursor-default"
            style={{
              boxShadow:
                "0 -4px 0 0 #f9bc60, 0 4px 0 0 #c98a2e, -4px 0 0 0 #f9bc60, 4px 0 0 0 #f9bc60",
            }}
          >
            {status === "sending" && (
              <>
                <Lotus />
                <span>Sending…</span>
              </>
            )}
            {sent && (
              <>
                <svg width="20" height="16" viewBox="0 0 5 4" shapeRendering="crispEdges" aria-hidden="true">
                  <path fill="#004643" d="M4 0h1v1h-1zM3 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM1 3h1v1h-1z" />
                </svg>
                <span>Message sent</span>
              </>
            )}
            {(status === "idle" || status === "error") && <span>Send message</span>}
          </button>
          {status === "error" && (
            <p role="alert" className="m-0 text-sm font-semibold text-rose">
              Couldn&apos;t send. Try again or email me directly at{" "}
              <a className="underline" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </Reveal>
  );
}
