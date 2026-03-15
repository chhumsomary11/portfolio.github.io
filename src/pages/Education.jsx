import { useState } from "react";

const Education = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const items = [
    {
      period: "2023 – Present",
      degree: "Bachelor of Science in Information Communication Technology",
      school: "American University of Phnom Penh (AUPP)",
      gpa: null,
      type: "Degree",
      icon: "💻",
      tags: ["Programming", "Networking", "AI", "Web Dev"],
    },
    {
      period: "2022 – Present",
      degree: "Bachelor of Arts in English Education",
      school: "Institute of Foreign Language (IFL)",
      gpa: null,
      type: "Degree",
      icon: "📖",
      tags: ["Linguistics", "Pedagogy", "Research", "Literature"],
    },
    {
      period: "2025",
      degree: "Web Development & UX/UI",
      school: "IT Step Academy",
      gpa: null,
      type: "Certificate",
      icon: "🎨",
      tags: ["React", "UI Design", "Figma", "CSS"],
    },
    {
      period: "2022",
      degree: "Diploma of Academic Writing and Research",
      school: "Australian Centre for Education",
      gpa: null,
      type: "Diploma",
      icon: "✍️",
      tags: ["Academic Writing", "Research Methods", "Citation"],
    },
    {
      period: "2022",
      degree: "High School Diploma",
      school: "BELTEI International School",
      gpa: null,
      type: "High School",
      icon: "🎓",
      tags: ["Sciences", "Mathematics", "English"],
    },
  ];

  const typeColor = {
    Degree: {
      bg: "rgba(0,70,67,0.07)",
      text: "#004643",
      dark: "rgba(171,209,198,0.12)",
      darkText: "#abd1c6",
    },
    Certificate: {
      bg: "rgba(249,188,96,0.12)",
      text: "#92620a",
      dark: "rgba(249,188,96,0.12)",
      darkText: "#f9bc60",
    },
    Diploma: {
      bg: "rgba(225,97,98,0.08)",
      text: "#e16162",
      dark: "rgba(225,97,98,0.1)",
      darkText: "#e16162",
    },
    "High School": {
      bg: "rgba(171,209,198,0.15)",
      text: "#004643",
      dark: "rgba(171,209,198,0.1)",
      darkText: "#abd1c6",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500&display=swap');

        :root {
          --mint:   #abd1c6;
          --forest: #004643;
          --milky:  #f8f5f2;
          --gold:   #f9bc60;
          --coral:  #e16162;
        }

        .edu-section {
          font-family: 'Outfit', sans-serif;
          background: var(--milky);
          color: var(--forest);
          padding: 90px 24px 100px;
          position: relative;
          overflow: hidden;
          transition: background 0.35s, color 0.35s;
        }

        .edu-section::before {
          content: '';
          position: absolute;
          top: -120px; right: -120px;
          width: 500px; height: 500px;
          background: radial-gradient(ellipse, rgba(171,209,198,0.22) 0%, transparent 65%);
          pointer-events: none; border-radius: 50%;
        }
        .dark .edu-section::before {
          background: radial-gradient(ellipse, rgba(0,70,67,0.38) 0%, transparent 65%);
        }
        .edu-section::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -80px;
          width: 400px; height: 400px;
          background: radial-gradient(ellipse, rgba(249,188,96,0.1) 0%, transparent 65%);
          pointer-events: none; border-radius: 50%;
        }

        .edu-inner {
          max-width: 760px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* header */
        .edu-eyebrow {
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
        .edu-eyebrow span {
          width: 28px; height: 2px;
          background: var(--coral); border-radius: 2px; display: block;
        }

        .edu-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--forest);
          margin-bottom: 10px;
          transition: color 0.3s;
        }
        .dark .edu-title { color: var(--milky); }
        .edu-title em { font-style: italic; color: var(--coral); }

        .edu-subtitle {
          font-size: 0.9rem;
          color: rgba(0,70,67,0.48);
          line-height: 1.65;
          margin-bottom: 52px;
          transition: color 0.3s;
        }
        .dark .edu-subtitle { color: rgba(248,245,242,0.4); }

        /* timeline */
        .tl-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .tl-list::before {
          content: '';
          position: absolute;
          left: 18px; top: 0; bottom: 0;
          width: 1.5px;
          background: rgba(0,70,67,0.09);
          transition: background 0.3s;
        }
        .dark .tl-list::before { background: rgba(171,209,198,0.09); }

        /* card */
        .edu-card {
          display: flex;
          gap: 18px;
          align-items: flex-start;
          padding: 20px 16px 20px 0;
          cursor: pointer;
          position: relative;
          border-radius: 18px;
          transition: background 0.22s;
        }
        .edu-card:hover { background: rgba(0,70,67,0.03); }
        .dark .edu-card:hover { background: rgba(171,209,198,0.04); }

        /* dot */
        .edu-dot {
          width: 36px; height: 36px;
          border-radius: 11px;
          border: 2px solid rgba(0,70,67,0.1);
          background: var(--milky);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          transition: all 0.25s cubic-bezier(0.23,1,0.32,1);
        }
        .dark .edu-dot {
          background: #071412;
          border-color: rgba(171,209,198,0.12);
        }
        .edu-card:hover .edu-dot,
        .edu-card.open .edu-dot {
          background: var(--forest);
          border-color: var(--forest);
          transform: scale(1.1);
        }
        .dark .edu-card:hover .edu-dot,
        .dark .edu-card.open .edu-dot {
          background: var(--mint);
          border-color: var(--mint);
        }

        .edu-body { flex: 1; }

        .edu-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }

        .edu-period {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(0,70,67,0.38);
          margin-bottom: 4px;
          transition: color 0.25s;
        }
        .dark .edu-period { color: rgba(171,209,198,0.38); }
        .edu-card.open .edu-period { color: var(--coral); }

        .edu-degree {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--forest);
          line-height: 1.3;
          margin-bottom: 3px;
          transition: color 0.3s;
        }
        .dark .edu-degree { color: var(--milky); }

        .edu-school {
          font-size: 0.8rem;
          color: rgba(0,70,67,0.45);
          transition: color 0.3s;
        }
        .dark .edu-school { color: rgba(248,245,242,0.4); }

        /* type badge */
        .edu-type-badge {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* chevron */
        .edu-chevron {
          margin-left: auto;
          color: rgba(0,70,67,0.3);
          transition: transform 0.25s, color 0.25s;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .dark .edu-chevron { color: rgba(171,209,198,0.3); }
        .edu-card.open .edu-chevron {
          transform: rotate(180deg);
          color: var(--forest);
        }
        .dark .edu-card.open .edu-chevron { color: var(--mint); }

        /* expandable panel */
        .edu-panel {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.28s;
          opacity: 0;
        }
        .edu-panel.open {
          max-height: 200px;
          opacity: 1;
        }

        .edu-panel-inner {
          padding: 12px 0 8px;
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }
        .tag {
          font-size: 0.73rem;
          font-weight: 500;
          padding: 4px 12px;
          border-radius: 100px;
          border: 1.5px solid rgba(0,70,67,0.1);
          color: rgba(0,70,67,0.55);
          transition: all 0.18s;
        }
        .dark .tag {
          border-color: rgba(171,209,198,0.12);
          color: rgba(171,209,198,0.55);
        }
        .tag:hover {
          background: rgba(0,70,67,0.05);
          border-color: var(--forest);
          color: var(--forest);
          transform: translateY(-1px);
        }
        .dark .tag:hover {
          background: rgba(171,209,198,0.07);
          border-color: var(--mint);
          color: var(--mint);
        }

        /* divider between items */
        .edu-divider {
          height: 1px;
          background: rgba(0,70,67,0.06);
          margin-left: 54px;
          transition: background 0.3s;
        }
        .dark .edu-divider { background: rgba(171,209,198,0.06); }
      `}</style>

      <section className="edu-section " id="education">
        <div className="edu-inner">
          <p className="edu-eyebrow">
            <span />
            Background
          </p>
          <h2 className="edu-title">Education</h2>
          <p className="edu-subtitle">
            Academic credentials and professional training shaping my skill set.
          </p>

          <div className="tl-list ">
            {items.map((item, i) => {
              const isOpen = activeIndex === i;
              const badge = typeColor[item.type] || typeColor["Degree"];
              return (
                <div key={i}>
                  <div
                    className={`edu-card${isOpen ? " open" : ""}`}
                    onClick={() => setActiveIndex(isOpen ? null : i)}
                  >
                    <div className="edu-dot">{item.icon}</div>
                    <div className="edu-body">
                      <div className="edu-top-row">
                        <div style={{ flex: 1 }}>
                          <p className="edu-period">{item.period}</p>
                          <p className="edu-degree">{item.degree}</p>
                          <p className="edu-school">{item.school}</p>
                        </div>
                        <span
                          className="edu-type-badge"
                          style={{ background: badge.bg, color: badge.text }}
                        >
                          {item.type}
                        </span>
                        <svg
                          className="edu-chevron"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>

                      {/* Expandable tags */}
                      <div className={`edu-panel${isOpen ? " open" : ""}`}>
                        <div className="edu-panel-inner">
                          <div className="tags-row">
                            {item.tags.map((t) => (
                              <span key={t} className="tag">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {i < items.length - 1 && <div className="edu-divider" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;
