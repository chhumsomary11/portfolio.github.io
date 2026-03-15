import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    emailjs
      .sendForm("service_0zunuqi", "template_q9c4q0s", form.current, {
        publicKey: "7P8K9NxrQuhvLShb4",
      })
      .then(
        () => {
          setStatus("success");
          form.current.reset();
          setTimeout(() => setStatus(""), 4000);
        },
        (error) => {
          setStatus("error");
          console.log("FAILED...", error.text);
          setTimeout(() => setStatus(""), 4000);
        },
      )
      .finally(() => setSending(false));
  };

  return (
    <section
      id="contact"
      className="
        min-h-screen flex items-center justify-center
        bg-milky-500 dark:bg-forest-500
        text-forest-500 dark:text-milky-500
        px-6 py-24 transition-colors duration-300
      "
    >
      {/* Card */}
      <div
        className="
          relative z-10 w-full max-w-lg
          bg-white dark:bg-forest-500/80
          border border-forest-500/[0.08] dark:border-mint-500/[0.08]
          rounded-[28px] p-10 md:p-12
          shadow-[0_20px_60px_rgba(0,70,67,0.08)]
          dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
          transition-colors duration-300
        "
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-3">
          <span className="w-7 h-px bg-coral-500 block" />
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-coral-500">
            Get in Touch
          </p>
        </div>

        {/* Title */}
        <h2 className="font-syne text-[2.2rem] font-extrabold tracking-tight leading-[1.1] text-forest-500 dark:text-milky-500 mb-2">
          Let's <em className="italic text-brown-500 not-italic">talk</em>
        </h2>
        <p className="text-sm text-forest-500/50 dark:text-milky-500/40 leading-relaxed mb-8">
          Have a project in mind or just want to say hello? Send me a message
          and I'll get back to you soon.
        </p>

        {/* Divider */}
        <div className="h-px bg-forest-500/[0.08] dark:bg-mint-500/[0.08] mb-8" />

        {/* Form */}
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-forest-500/50 dark:text-mint-500/50">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Jane Doe"
              name="user_name"
              required
              className="
                w-full px-4 py-3 rounded-[14px] text-sm font-outfit
                bg-forest-500/[0.03] dark:bg-white/[0.04]
                border border-forest-500/[0.12] dark:border-mint-500/[0.12]
                text-forest-500 dark:text-milky-500
                placeholder:text-forest-500/30 dark:placeholder:text-milky-500/25
                outline-none
                focus:border-forest-500 dark:focus:border-mint-500
                focus:ring-2 focus:ring-forest-500/[0.08] dark:focus:ring-mint-500/10
                focus:bg-white dark:focus:bg-white/[0.05]
                transition-all duration-200
              "
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-forest-500/50 dark:text-mint-500/50">
              Email Address
            </label>
            <input
              type="email"
              placeholder="jane@example.com"
              name="user_email"
              required
              className="
                w-full px-4 py-3 rounded-[14px] text-sm font-outfit
                bg-forest-500/[0.03] dark:bg-white/[0.04]
                border border-forest-500/[0.12] dark:border-mint-500/[0.12]
                text-forest-500 dark:text-milky-500
                placeholder:text-forest-500/30 dark:placeholder:text-milky-500/25
                outline-none
                focus:border-forest-500 dark:focus:border-mint-500
                focus:ring-2 focus:ring-forest-500/[0.08] dark:focus:ring-mint-500/10
                focus:bg-white dark:focus:bg-white/[0.05]
                transition-all duration-200
              "
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-forest-500/50 dark:text-mint-500/50">
              Message
            </label>
            <textarea
              placeholder="Tell me about your project or just say hi…"
              name="message"
              required
              rows={5}
              className="
                w-full px-4 py-3 rounded-[14px] text-sm font-outfit resize-y
                bg-forest-500/[0.03] dark:bg-white/[0.04]
                border border-forest-500/[0.12] dark:border-mint-500/[0.12]
                text-forest-500 dark:text-milky-500
                placeholder:text-forest-500/30 dark:placeholder:text-milky-500/25
                outline-none
                focus:border-forest-500 dark:focus:border-mint-500
                focus:ring-2 focus:ring-forest-500/[0.08] dark:focus:ring-mint-500/10
                focus:bg-white dark:focus:bg-white/[0.05]
                transition-all duration-200
              "
            />
          </div>

          {/* Submit row */}
          <div className="flex items-center gap-4 mt-1 flex-wrap">
            <button
              type="submit"
              disabled={sending}
              className="
                flex items-center gap-2 px-8 py-3.5 rounded-full
                text-sm font-medium tracking-wide
                bg-forest-500 text-milky-500
                dark:bg-mint-500 dark:text-forest-500
                hover:enabled:-translate-y-0.5
                hover:enabled:shadow-[0_8px_24px_rgba(0,70,67,0.28)]
                dark:hover:enabled:shadow-[0_8px_24px_rgba(171,209,198,0.2)]
                disabled:opacity-65 disabled:cursor-not-allowed
                transition-all duration-200
              "
            >
              {sending ? (
                <>
                  <span
                    className="
                      w-[15px] h-[15px] rounded-full shrink-0
                      border-2 border-milky-500/30 border-t-milky-500
                      dark:border-forest-500/30 dark:border-t-forest-500
                      animate-spin
                    "
                  />
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>

            {/* Status toast */}
            {status === "success" && (
              <div
                className="
                flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium
                bg-forest-500/[0.08] dark:bg-mint-500/10
                text-forest-500 dark:text-mint-500
                border border-forest-500/[0.15] dark:border-mint-500/20
                animate-[fadeUp_0.3s_ease]
              "
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Message sent!
              </div>
            )}
            {status === "error" && (
              <div
                className="
                flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium
                bg-coral-500/[0.08] text-coral-500
                border border-coral-500/20
                animate-[fadeUp_0.3s_ease]
              "
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Failed to send.
              </div>
            )}
          </div>
        </form>

        {/* Social row */}
        <div
          className="
          flex items-center gap-2.5 mt-7 pt-6
          border-t border-forest-500/[0.07] dark:border-mint-500/[0.07]
        "
        >
          <span className="text-xs text-forest-500/40 dark:text-milky-500/35 mr-1">
            Find me on
          </span>

          {/* LinkedIn */}
          <a
            href="#"
            aria-label="LinkedIn"
            className="
              w-[34px] h-[34px] rounded-[10px] flex items-center justify-center
              border border-forest-500/10 dark:border-mint-500/[0.12]
              text-forest-500/55 dark:text-mint-500/50
              hover:bg-forest-500 hover:border-forest-500 hover:text-milky-500
              dark:hover:bg-mint-500 dark:hover:border-mint-500 dark:hover:text-forest-500
              hover:-translate-y-0.5
              transition-all duration-200
            "
          >
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                clipRule="evenodd"
              />
              <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="#"
            aria-label="GitHub"
            className="
              w-[34px] h-[34px] rounded-[10px] flex items-center justify-center
              border border-forest-500/10 dark:border-mint-500/[0.12]
              text-forest-500/55 dark:text-mint-500/50
              hover:bg-forest-500 hover:border-forest-500 hover:text-milky-500
              dark:hover:bg-mint-500 dark:hover:border-mint-500 dark:hover:text-forest-500
              hover:-translate-y-0.5
              transition-all duration-200
            "
          >
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            className="
              w-[34px] h-[34px] rounded-[10px] flex items-center justify-center
              border border-forest-500/10 dark:border-mint-500/[0.12]
              text-forest-500/55 dark:text-mint-500/50
              hover:bg-forest-500 hover:border-forest-500 hover:text-milky-500
              dark:hover:bg-mint-500 dark:hover:border-mint-500 dark:hover:text-forest-500
              hover:-translate-y-0.5
              transition-all duration-200
            "
          >
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
