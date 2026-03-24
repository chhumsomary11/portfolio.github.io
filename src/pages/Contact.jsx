import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import MarsBackground from "../component/MarsBackground";
import { contacts } from "../assets/data/contact_icon.jsx";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const key = import.meta.env.VITE_EMAIL_KEY;
  const template = import.meta.env.VITE_EMAIL_TEMPLATE;
  const service = import.meta.env.VITE_EMAIL_SERVICE;
  console.log(key, template, service);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    emailjs
      .sendForm(service, template, form.current, {
        publicKey: key,
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
      <MarsBackground />
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
          {contacts.map((contact, index) => {
            return (
              <a
                key={index}
                href={contact.link}
                className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center
              border border-forest-500/10 dark:border-mint-500/[0.12]
              text-forest-500/55 dark:text-mint-500/50
              hover:bg-forest-500 hover:border-forest-500 hover:text-milky-500
              dark:hover:bg-mint-500 dark:hover:border-mint-500 dark:hover:text-forest-500
              hover:-translate-y-0.5
              transition-all duration-200"
              >
                {contact.svg}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
