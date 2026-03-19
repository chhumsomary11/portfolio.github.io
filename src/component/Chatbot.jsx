// // const Chatbot = () => {
// //   const handleClick = () => {
// //     // Logic to open chatbot interface
// //     console.log("Chatbot button clicked!");

// //   }
// //   return (
// //     <div className="fixed bottom-6 animate-bounce right-6 z-50 ">
// //       <button  className="bg-blue-500 text-white rounded-full p-4 shadow-lg">
// //         <h1>Chatbot</h1>
// //       </button>
// //     </div>
// //   );
// // };

// // export default Chatbot;

// import { useState, useRef, useEffect } from "react";

// const BOT_AVATAR = <span className="text-lg">🌿</span>;

// const USER_AVATAR = <span className="text-lg">✦</span>;

// const INITIAL_MESSAGES = [
//   {
//     id: 1,
//     from: "bot",
//     text: "Hey! I'm Mary's portfolio assistant. Ask me about her skills, projects, or how to get in touch.",
//     time: "just now",
//   },
// ];

// const QUICK_REPLIES = ["Projects", "Skills", "Contact", "Education"];

// function TypingDots() {
//   return (
//     <div className="flex gap-1 items-center py-1 px-1">
//       {[0, 1, 2].map((i) => (
//         <span
//           key={i}
//           className="w-2 h-2 rounded-full bg-forest-500 dark:bg-brown-100 inline-block animate-bounce"
//           style={{ animationDelay: `${i * 0.15}s` }}
//         />
//       ))}
//     </div>
//   );
// }

// function Message({ msg }) {
//   const isBot = msg.from === "bot";
//   return (
//     <div
//       className={`flex gap-2 items-end mb-3 ${isBot ? "flex-row" : "flex-row-reverse"}`}
//     >
//       {/* Avatar */}
//       <div
//         className={`
//           w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border
//           ${
//             isBot
//               ? "bg-forest-500 border-forest-500 text-milky-500"
//               : "bg-brown-100 border-brown-100 text-forest-500 dark:bg-brown-100"
//           }
//         `}
//       >
//         {isBot ? BOT_AVATAR : USER_AVATAR}
//       </div>

//       {/* Bubble */}
//       <div
//         className={`
//           max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
//           ${
//             isBot
//               ? "bg-milky-500 dark:bg-forest-500/30 text-forest-500 dark:text-milky-500 rounded-bl-sm border border-forest-500/20 dark:border-forest-500/40"
//               : "bg-forest-500 dark:bg-brown-100 text-milky-500 dark:text-forest-500 rounded-br-sm"
//           }
//         `}
//         style={{ fontFamily: "'Syne', sans-serif" }}
//       >
//         {msg.text}
//         <p
//           className={`text-[10px] mt-1 opacity-50 ${isBot ? "text-left" : "text-right"}`}
//         >
//           {msg.time}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function Chatbot() {
//   const [open, setOpen] = useState(false);
//   const [dark, setDark] = useState(false);
//   const [messages, setMessages] = useState(INITIAL_MESSAGES);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const [unread, setUnread] = useState(1);
//   const bottomRef = useRef(null);

//   // Sync dark mode with document
//   useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [dark]);

//   useEffect(() => {
//     if (open) {
//       setUnread(0);
//       bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [open, messages]);

//   const getReply = (text) => {
//     const t = text.toLowerCase();
//     if (t.includes("project"))
//       return "Som has built web apps using React, Vite & Tailwind CSS. Check out the Projects section for demos and source links!";
//     if (t.includes("skill"))
//       return "She's skilled in React, JavaScript, HTML/CSS, Tailwind, and also studies English for Teaching. A rare combo! 🌱";
//     if (t.includes("contact") || t.includes("reach"))
//       return "You can reach Som via LinkedIn (link in the header), or scroll down to the Contact section on this page.";
//     if (t.includes("education") || t.includes("study"))
//       return "Som is an ICT student and also studies English for Teaching — bridging tech and communication beautifully.";
//     if (t.includes("hello") || t.includes("hi") || t.includes("hey"))
//       return "Hey there! 👋 Great to meet you. What would you like to know about Som's work?";
//     return "I'm not sure about that one! Try asking about her Projects, Skills, Education, or how to Contact her.";
//   };

//   const sendMessage = (text) => {
//     if (!text.trim()) return;
//     const now = new Date().toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const userMsg = {
//       id: Date.now(),
//       from: "user",
//       text: text.trim(),
//       time: now,
//     };
//     setMessages((m) => [...m, userMsg]);
//     setInput("");
//     setTyping(true);

//     setTimeout(() => {
//       setTyping(false);
//       const botMsg = {
//         id: Date.now() + 1,
//         from: "bot",
//         text: getReply(text),
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };
//       setMessages((m) => [...m, botMsg]);
//       if (!open) setUnread((u) => u + 1);
//     }, 1200);
//   };

//   return (
//     <>
//       {/* Google Fonts */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
//       `}</style>

//       {/* Floating Button */}
//       <button
//         onClick={() => setOpen((o) => !o)}
//         aria-label="Open chatbot"
//         className={`
//           fixed bottom-6 right-6 z-50
//           w-14 h-14 rounded-full shadow-xl
//           flex items-center justify-center
//           transition-all duration-300
//           bg-forest-500 hover:bg-forest-500/90
//           dark:bg-brown-100 dark:hover:bg-brown-100/90
//           border-2 border-brown-100 dark:border-forest-500
//           ${open ? "rotate-45 scale-90" : "scale-100 hover:scale-110"}
//         `}
//       >
//         {open ? (
//           <svg
//             className="w-6 h-6 text-milky-500 dark:text-forest-500"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         ) : (
//           <>
//             <svg
//               className="w-6 h-6 text-milky-500 dark:text-forest-500"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//               />
//             </svg>
//             {unread > 0 && (
//               <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brown-500 text-white text-[10px] font-bold flex items-center justify-center">
//                 {unread}
//               </span>
//             )}
//           </>
//         )}
//       </button>

//       {/* Chat Window */}
//       <div
//         className={`
//           fixed bottom-24 right-6 z-50 w-80 sm:w-96
//           rounded-2xl shadow-2xl overflow-hidden
//           border border-forest-500/20 dark:border-milky-500/10
//           transition-all duration-300 origin-bottom-right
//           ${open ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"}
//           bg-milky-500 dark:bg-[#0d1f1c]
//         `}
//         style={{ fontFamily: "'Syne', sans-serif" }}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-4 py-3 bg-forest-500 dark:bg-[#0a1713]">
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-full bg-brown-100 flex items-center justify-center text-forest-500 font-bold text-sm border-2 border-milky-500/30">
//               C
//             </div>
//             <div>
//               <p className="text-milky-500 font-bold text-sm tracking-wide leading-tight">
//                 Som's Assistant
//               </p>
//               <div className="flex items-center gap-1">
//                 <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
//                 <span
//                   className="text-milky-500/60 text-[10px]"
//                   style={{ fontFamily: "'Space Mono', monospace" }}
//                 >
//                   ONLINE
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Dark mode toggle */}
//           <button
//             onClick={() => setDark((d) => !d)}
//             className="w-8 h-8 rounded-full flex items-center justify-center text-milky-500/70 hover:text-milky-500 hover:bg-milky-500/10 transition-colors"
//             aria-label="Toggle dark mode"
//           >
//             {dark ? (
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
//                 />
//               </svg>
//             ) : (
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>

//         {/* Decorative stripe */}
//         <div className="h-0.5 bg-gradient-to-r from-brown-100 via-brown-500 to-forest-500" />

//         {/* Messages */}
//         <div className="h-72 overflow-y-auto px-4 py-4 scroll-smooth">
//           {messages.map((msg) => (
//             <Message key={msg.id} msg={msg} />
//           ))}
//           {typing && (
//             <div className="flex gap-2 items-end mb-3">
//               <div className="w-8 h-8 rounded-full bg-forest-500 border border-forest-500 flex items-center justify-center text-milky-500 flex-shrink-0">
//                 🌿
//               </div>
//               <div className="bg-milky-500 dark:bg-forest-500/30 border border-forest-500/20 rounded-2xl rounded-bl-sm px-4 py-2">
//                 <TypingDots />
//               </div>
//             </div>
//           )}
//           <div ref={bottomRef} />
//         </div>

//         {/* Quick replies */}
//         <div className="flex gap-2 px-4 pb-2 flex-wrap">
//           {QUICK_REPLIES.map((q) => (
//             <button
//               key={q}
//               onClick={() => sendMessage(q)}
//               className="text-xs px-3 py-1 rounded-full border border-forest-500/40 dark:border-milky-500/20 text-forest-500 dark:text-milky-500 hover:bg-forest-500 hover:text-milky-500 dark:hover:bg-milky-500/10 transition-all duration-200"
//               style={{ fontFamily: "'Space Mono', monospace" }}
//             >
//               {q}
//             </button>
//           ))}
//         </div>

//         {/* Divider */}
//         <div className="mx-4 h-px bg-forest-500/10 dark:bg-milky-500/10" />

//         {/* Input */}
//         <div className="flex items-center gap-2 px-4 py-3">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
//             placeholder="Ask me anything..."
//             className="flex-1 bg-transparent text-sm text-forest-500 dark:text-milky-500 placeholder-forest-500/40 dark:placeholder-milky-500/30 outline-none"
//             style={{ fontFamily: "'Syne', sans-serif" }}
//           />
//           <button
//             onClick={() => sendMessage(input)}
//             disabled={!input.trim()}
//             className="w-8 h-8 rounded-full bg-forest-500 dark:bg-brown-100 flex items-center justify-center disabled:opacity-30 hover:scale-110 transition-transform"
//           >
//             <svg
//               className="w-4 h-4 text-milky-500 dark:text-forest-500"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Footer */}
//         <div className="text-center pb-2">
//           <span
//             className="text-[9px] text-forest-500/30 dark:text-milky-500/20 tracking-widest uppercase"
//             style={{ fontFamily: "'Space Mono', monospace" }}
//           >
//             Portfolio · Chhumsomary
//           </span>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { postPrompt } from "../script/script.js"; // adjust path to match your project structure

const QUICK_REPLIES = ["Projects", "Skills", "Contact", "Education"];

function TypingDots() {
  return (
    <div className="flex gap-1 items-center px-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-forest-500 dark:bg-brown-100 inline-block animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function Message({ msg }) {
  const isBot = msg.from === "bot";
  return (
    <div
      className={`flex gap-2 items-end mb-3 ${isBot ? "flex-row" : "flex-row-reverse"}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm border
          ${
            isBot
              ? "bg-forest-500 border-forest-500 text-milky-500"
              : "bg-brown-100 border-brown-100 text-forest-500"
          }`}
      >
        {isBot ? "🌿" : "✦"}
      </div>

      <div
        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
          ${
            isBot
              ? "bg-milky-500 dark:bg-forest-500/30 text-forest-500 dark:text-milky-500 rounded-bl-sm border border-forest-500/20 dark:border-forest-500/40"
              : "bg-forest-500 dark:bg-brown-100 text-milky-500 dark:text-forest-500 rounded-br-sm"
          }`}
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {msg.text}
        <p
          className={`text-[10px] mt-1 opacity-40 ${isBot ? "text-left" : "text-right"}`}
        >
          {msg.time}
        </p>
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: "Hey! I'm Som's assistant powered by Gemini ✨ Ask me anything about her projects, skills, or how to get in touch!",
      time: "just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    if (open) setUnread(0);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open, messages]);

  const now = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const sendMessage = async (text) => {
    if (!text.trim() || typing) return;

    // Add user message
    setMessages((m) => [
      ...m,
      { id: Date.now(), from: "user", text: text.trim(), time: now() },
    ]);
    setInput("");
    setTyping(true);

    try {
      const data = await postPrompt(text.trim());
      // Handle common Gemini response shapes
      const reply =
        data?.response ||
        data?.text ||
        data?.message ||
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Got it! ✅";

      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, from: "bot", text: reply, time: now() },
      ]);
      if (!open) setUnread((u) => u + 1);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: "bot",
          text: "⚠️ Something went wrong. Please try again.",
          time: now(),
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap');`}</style>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle chatbot"
        className={`fixed animate-bounce bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl
          flex items-center justify-center border-2
          bg-forest-500 hover:bg-forest-500/90 dark:bg-brown-100 dark:hover:bg-brown-100/90
          border-brown-100 dark:border-forest-500
          transition-all duration-300 ${open ? "rotate-45 scale-90" : "scale-100 hover:scale-110"}`}
      >
        {open ? (
          <svg
            className="w-6 h-6 text-milky-500 dark:text-forest-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <>
            <svg
              className="w-6 h-6 text-milky-500 dark:text-forest-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brown-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
          </>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden
          border border-forest-500/20 dark:border-milky-500/10
          bg-milky-500 dark:bg-[#0d1f1c]
          transition-all duration-300 origin-bottom-right
          ${open ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"}`}
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-forest-500 dark:bg-[#0a1713]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brown-100 flex items-center justify-center text-forest-500 font-bold text-sm border-2 border-milky-500/30">
              C
            </div>
            <div>
              <p className="text-milky-500 font-bold text-sm tracking-wide">
                Som's Assistant
              </p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span
                  className="text-milky-500/60 text-[10px]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  GEMINI · ONLINE
                </span>
              </div>
            </div>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark((d) => !d)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-milky-500/70 hover:text-milky-500 hover:bg-milky-500/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Accent stripe */}
        <div className="h-0.5 bg-gradient-to-r from-brown-100 via-brown-500 to-forest-500" />

        {/* Messages */}
        <div className="h-72 overflow-y-auto px-4 py-4">
          {messages.map((msg) => (
            <Message key={msg.id} msg={msg} />
          ))}

          {typing && (
            <div className="flex gap-2 items-end mb-3">
              <div className="w-8 h-8 rounded-full bg-forest-500 flex items-center justify-center flex-shrink-0">
                🌿
              </div>
              <div className="bg-milky-500 dark:bg-forest-500/30 border border-forest-500/20 rounded-2xl rounded-bl-sm px-4 py-2">
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick Replies */}
        <div className="flex gap-2 px-4 pb-2 flex-wrap">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={typing}
              className="text-xs px-3 py-1 rounded-full border border-forest-500/40 dark:border-milky-500/20
                text-forest-500 dark:text-milky-500 hover:bg-forest-500 hover:text-milky-500
                dark:hover:bg-milky-500/10 transition-all duration-200 disabled:opacity-40"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {q}
            </button>
          ))}
        </div>

        <div className="mx-4 h-px bg-forest-500/10 dark:bg-milky-500/10" />

        {/* Input Row */}
        <div className="flex items-center gap-2 px-4 py-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder={
              typing ? "Waiting for Gemini..." : "Ask me anything..."
            }
            disabled={typing}
            className="flex-1 bg-transparent text-sm text-forest-500 dark:text-milky-500
              placeholder-forest-500/40 dark:placeholder-milky-500/30 outline-none disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || typing}
            className="w-8 h-8 rounded-full bg-forest-500 dark:bg-brown-100 flex items-center justify-center
              disabled:opacity-30 hover:scale-110 active:scale-95 transition-transform"
          >
            <svg
              className="w-4 h-4 text-milky-500 dark:text-forest-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center pb-2">
          <span
            className="text-[9px] text-forest-500/30 dark:text-milky-500/20 tracking-widest uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Powered by Gemini · Chhumsomary
          </span>
        </div>
      </div>
    </>
  );
}
