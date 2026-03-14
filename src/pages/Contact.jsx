// import React, { useRef, useState } from "react";
// import emailjs from "@emailjs/browser";
// // import { send } from "vite";

// const Contact = () => {
//   const form = useRef();
//   const [status, setStatus] = useState(""); // To hold success/error status
//   const [sending, setSending] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     //Avoid double clicking
//     if (sending) return;

//     //when user press submit, the sending will be truth
//     setSending(true);

//     emailjs
//       .sendForm("service_0zunuqi", "template_q9c4q0s", form.current, {
//         publicKey: "7P8K9NxrQuhvLShb4",
//       })
//       .then(
//         () => {
//           setStatus("Message sent successfully!");
//           console.log("SUCCESS!");
//           form.current.reset();
//           setTimeout(() => {
//             setStatus(""); // Clear status after 3 seconds
//           }, 3000);
//         },
//         (error) => {
//           setStatus(`Failed to send message: ${error.text}`);
//           console.log("FAILED...", error.text);
//         },
//       )
//       .finally(() => {
//         setSending(false);
//       });
//   };

//   return (
//     <div className="min-h-screen px-6 pt-24">
//       <form
//         ref={form}
//         className="flex flex-col justify-center items-center"
//         onSubmit={handleSubmit}
//       >
//         <input
//           className="mb-4 p-2 border border-gray-300 rounded"
//           type="text"
//           placeholder="Name"
//           name="user_name"
//         />
//         <input
//           className="mb-4 p-2 border border-gray-300 rounded"
//           type="email"
//           placeholder="Email"
//           name="user_email"
//         />
//         <textarea
//           className="mb-4 p-2 border border-gray-300 rounded"
//           placeholder="Message"
//           name="message"
//         ></textarea>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           type="submit"
//           disabled={sending}
//         >
//           {sending ? "Sending...." : "Send"}
//         </button>
//       </form>
//       {status && (
//         <div
//           className={`mt-4 text-center ${status.includes("success") ? "text-green-500" : "text-red-500"}`}
//         >
//           {status}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Contact;

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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500&display=swap');

        :root {
          --mint:   #abd1c6;
          --forest: #004643;
          --milky:  #f8f5f2;
          --gold:   #f9bc60;
          --coral:  #e16162;
        }

        .contact-section {
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          background: var(--milky);
          color: var(--forest);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 24px 80px;
          position: relative;
          overflow: hidden;
          transition: background 0.35s, color 0.35s;
        }
        .dark .contact-section {
          background: #071412;
          color: var(--milky);
        }

        /* background blobs */
        .contact-section::before {
          content: '';
          position: absolute;
          top: -80px; right: -100px;
          width: 480px; height: 480px;
          background: radial-gradient(ellipse, rgba(171,209,198,0.28) 0%, transparent 65%);
          pointer-events: none; border-radius: 50%;
        }
        .dark .contact-section::before {
          background: radial-gradient(ellipse, rgba(0,70,67,0.45) 0%, transparent 65%);
        }
        .contact-section::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -80px;
          width: 380px; height: 380px;
          background: radial-gradient(ellipse, rgba(249,188,96,0.14) 0%, transparent 65%);
          pointer-events: none; border-radius: 50%;
        }

        .contact-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 560px;
          background: #fff;
          border: 1.5px solid rgba(0,70,67,0.08);
          border-radius: 28px;
          padding: 48px 44px;
          box-shadow: 0 20px 60px rgba(0,70,67,0.08);
          transition: background 0.35s, border-color 0.35s;
        }
        .dark .contact-card {
          background: #0d2220;
          border-color: rgba(171,209,198,0.08);
          box-shadow: 0 20px 60px rgba(0,0,0,0.35);
        }

        /* header */
        .contact-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--coral);
          margin-bottom: 12px;
        }
        .contact-eyebrow span {
          display: block;
          width: 28px; height: 2px;
          background: var(--coral);
          border-radius: 2px;
        }

        .contact-title {
          font-family: 'Syne', sans-serif;
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--forest);
          margin-bottom: 8px;
          transition: color 0.3s;
        }
        .dark .contact-title { color: var(--milky); }
        .contact-title em { font-style: italic; color: var(--coral); }

        .contact-subtitle {
          font-size: 0.88rem;
          color: rgba(0,70,67,0.5);
          line-height: 1.65;
          margin-bottom: 36px;
          transition: color 0.3s;
        }
        .dark .contact-subtitle { color: rgba(248,245,242,0.42); }

        /* divider */
        .contact-divider {
          height: 1px;
          background: rgba(0,70,67,0.08);
          margin-bottom: 32px;
          transition: background 0.3s;
        }
        .dark .contact-divider { background: rgba(171,209,198,0.08); }

        /* fields */
        .field-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 20px;
        }

        .field-wrap {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-label {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(0,70,67,0.5);
          transition: color 0.3s;
        }
        .dark .field-label { color: rgba(171,209,198,0.5); }

        .field-input, .field-textarea {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          width: 100%;
          padding: 12px 16px;
          border-radius: 14px;
          border: 1.5px solid rgba(0,70,67,0.12);
          background: rgba(0,70,67,0.03);
          color: var(--forest);
          outline: none;
          transition: border-color 0.22s, box-shadow 0.22s, background 0.22s;
          box-sizing: border-box;
        }
        .dark .field-input, .dark .field-textarea {
          background: rgba(255,255,255,0.04);
          border-color: rgba(171,209,198,0.12);
          color: var(--milky);
        }
        .field-input::placeholder, .field-textarea::placeholder {
          color: rgba(0,70,67,0.3);
        }
        .dark .field-input::placeholder, .dark .field-textarea::placeholder {
          color: rgba(248,245,242,0.25);
        }
        .field-input:focus, .field-textarea:focus {
          border-color: var(--forest);
          box-shadow: 0 0 0 3px rgba(0,70,67,0.08);
          background: #fff;
        }
        .dark .field-input:focus, .dark .field-textarea:focus {
          border-color: var(--mint);
          box-shadow: 0 0 0 3px rgba(171,209,198,0.1);
          background: rgba(255,255,255,0.05);
        }

        .field-textarea {
          resize: vertical;
          min-height: 130px;
        }

        /* submit row */
        .submit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 8px;
        }

        .submit-btn {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 13px 32px;
          border-radius: 100px;
          border: none;
          background: var(--forest);
          color: var(--milky);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: 0.03em;
          transition: transform 0.22s, box-shadow 0.22s, background 0.22s, opacity 0.22s;
          flex-shrink: 0;
        }
        .dark .submit-btn { background: var(--mint); color: var(--forest); }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,70,67,0.28);
        }
        .dark .submit-btn:hover:not(:disabled) {
          box-shadow: 0 8px 24px rgba(171,209,198,0.2);
        }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        /* spinner */
        .spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(248,245,242,0.3);
          border-top-color: var(--milky);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        .dark .spinner {
          border-color: rgba(0,70,67,0.3);
          border-top-color: var(--forest);
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* status toast */
        .status-toast {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 100px;
          animation: toastIn 0.3s ease;
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .status-toast.success {
          background: rgba(0,70,67,0.08);
          color: var(--forest);
          border: 1px solid rgba(0,70,67,0.15);
        }
        .dark .status-toast.success {
          background: rgba(171,209,198,0.1);
          color: var(--mint);
          border-color: rgba(171,209,198,0.2);
        }
        .status-toast.error {
          background: rgba(225,97,98,0.08);
          color: var(--coral);
          border: 1px solid rgba(225,97,98,0.2);
        }

        /* social row */
        .social-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(0,70,67,0.07);
          transition: border-color 0.3s;
        }
        .dark .social-row { border-color: rgba(171,209,198,0.07); }

        .social-label {
          font-size: 0.75rem;
          color: rgba(0,70,67,0.4);
          transition: color 0.3s;
          margin-right: 4px;
        }
        .dark .social-label { color: rgba(248,245,242,0.35); }

        .social-icon {
          width: 34px; height: 34px;
          border-radius: 10px;
          border: 1.5px solid rgba(0,70,67,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(0,70,67,0.55);
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .dark .social-icon {
          border-color: rgba(171,209,198,0.12);
          color: rgba(171,209,198,0.5);
        }
        .social-icon:hover {
          background: var(--forest);
          border-color: var(--forest);
          color: var(--milky);
          transform: translateY(-2px);
        }
        .dark .social-icon:hover {
          background: var(--mint);
          border-color: var(--mint);
          color: var(--forest);
        }

        @media (max-width: 560px) {
          .contact-card { padding: 32px 22px; }
          .contact-title { font-size: 1.8rem; }
          .submit-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section className="contact-section" id="contact">
        <div className="contact-card">
          {/* Header */}
          <p className="contact-eyebrow">
            <span />
            Get in Touch
          </p>
          <h2 className="contact-title">
            Let's <em>talk</em>
          </h2>
          <p className="contact-subtitle">
            Have a project in mind or just want to say hello? Send me a message
            and I'll get back to you soon.
          </p>
          <div className="contact-divider" />

          {/* Form */}
          <form ref={form} onSubmit={handleSubmit}>
            <div className="field-group">
              <div className="field-wrap">
                <label className="field-label">Your Name</label>
                <input
                  className="field-input"
                  type="text"
                  placeholder="Jane Doe"
                  name="user_name"
                  required
                />
              </div>
              <div className="field-wrap">
                <label className="field-label">Email Address</label>
                <input
                  className="field-input"
                  type="email"
                  placeholder="jane@example.com"
                  name="user_email"
                  required
                />
              </div>
              <div className="field-wrap">
                <label className="field-label">Message</label>
                <textarea
                  className="field-textarea"
                  placeholder="Tell me about your project or just say hi…"
                  name="message"
                  required
                />
              </div>
            </div>

            <div className="submit-row">
              <button className="submit-btn" type="submit" disabled={sending}>
                {sending ? (
                  <>
                    <span className="spinner" />
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

              {status === "success" && (
                <div className="status-toast success">
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
                <div className="status-toast error">
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

          {/* Social links */}
          <div className="social-row">
            <span className="social-label">Find me on</span>
            <a href="#" aria-label="LinkedIn" className="social-icon">
              <svg
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                  clipRule="evenodd"
                />
                <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
              </svg>
            </a>
            <a href="#" aria-label="GitHub" className="social-icon">
              <svg
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="social-icon">
              <svg
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
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
    </>
  );
};

export default Contact;
