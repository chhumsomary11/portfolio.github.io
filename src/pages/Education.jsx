import { useState } from "react";

const Education = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const items = [
    {
      period: "2023 – Present",
      degree: "Bachelor of Science in Information Communication Technology",
      school: "American University of Phnom Penh (AUPP)",
      type: "Degree",
      icon: "💻",
      tags: ["Programming", "Networking", "AI", "Web Dev"],
    },
    {
      period: "2022 – Present",
      degree: "Bachelor of Arts in English Education",
      school: "Institute of Foreign Language (IFL)",
      type: "Degree",
      icon: "📖",
      tags: ["Linguistics", "Pedagogy", "Research", "Literature"],
    },
    {
      period: "2025",
      degree: "Web Development & UX/UI",
      school: "IT Step Academy",
      type: "Certificate",
      icon: "🎨",
      tags: ["React", "UI Design", "Figma", "CSS"],
    },
    {
      period: "2022",
      degree: "Diploma of Academic Writing and Research",
      school: "Australian Centre for Education",
      type: "Diploma",
      icon: "✍️",
      tags: ["Academic Writing", "Research Methods", "Citation"],
    },
    {
      period: "2022",
      degree: "High School Diploma",
      school: "BELTEI International School",
      type: "High School",
      icon: "🎓",
      tags: ["Sciences", "Mathematics", "English"],
    },
  ];

  const typeBadge = {
    Degree:
      "bg-forest-500/10 text-forest-500 dark:bg-mint-500/10 dark:text-mint-500",
    Certificate:
      "bg-gold-500/15  text-gold-600   dark:bg-gold-500/15  dark:text-gold-400",
    Diploma:
      "bg-coral-500/10 text-coral-500  dark:bg-coral-500/10 dark:text-coral-400",
    "High School":
      "bg-mint-500/15  text-forest-500 dark:bg-mint-500/10  dark:text-mint-500",
  };

  return (
    <section
      id="education"
      className="bg-milky-500 dark:bg-forest-500 text-forest-500 dark:text-milky-500 px-6 py-24 transition-colors duration-300"
    >
      <div className="max-w-2xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-3">
          <span className="w-7 h-px bg-coral-500 block" />
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-coral-500">
            Background
          </p>
        </div>

        {/* Heading */}
        <h2 className="font-syne text-4xl md:text-5xl font-extrabold tracking-tight text-brown-100 mb-2 hover:scale-105 transition-transform duration-300">
          <em>Education</em>
        </h2>
        <p className="text-sm text-forest-500/50 dark:text-milky-500/40 leading-relaxed mb-14">
          Academic credentials and professional training shaping my skill set.
        </p>

        {/* Timeline list */}
        <div className="relative flex flex-col">
          {/* Vertical line */}
          <div className="absolute left-[17px] top-0 bottom-0 w-px bg-forest-500/10 dark:bg-mint-500/10" />

          {items.map((item, i) => {
            const isOpen = activeIndex === i;
            const badge = typeBadge[item.type] ?? typeBadge["Degree"];

            return (
              <div key={i}>
                {/* Card */}
                <div
                  onClick={() => setActiveIndex(isOpen ? null : i)}
                  className={`
                    flex gap-4 items-start py-5 pr-2 pl-0 cursor-pointer rounded-2xl
                    transition-colors duration-200
                    hover:bg-forest-500/[0.03] dark:hover:bg-milky-500/[0.04]
                  `}
                >
                  {/* Dot / Icon */}
                  <div
                    className={`
                      w-9 h-9 rounded-xl border flex items-center justify-center
                      text-base shrink-0 relative z-10
                      transition-all duration-300
                      ${
                        isOpen
                          ? "bg-forest-500 border-forest-500 dark:bg-mint-500 dark:border-mint-500 scale-110"
                          : "bg-milky-500 dark:bg-forest-500 border-forest-500/10 dark:border-mint-500/10"
                      }
                    `}
                  >
                    {item.icon}
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <p
                          className={`
                            text-[11px] font-medium tracking-widest uppercase mb-1
                            transition-colors duration-200
                            ${
                              isOpen
                                ? "text-coral-500"
                                : "text-forest-500/40 dark:text-mint-500/40"
                            }
                          `}
                        >
                          {item.period}
                        </p>
                        <p className="font-syne text-base font-bold leading-snug text-brown-500 dark:text-brown-100 mb-0.5">
                          {item.degree}
                        </p>
                        <p className="text-[13px] text-forest-500/45 dark:text-milky-500/40">
                          {item.school}
                        </p>
                      </div>

                      {/* Badge */}
                      <span
                        className={`
                          text-[10px] font-semibold tracking-wide uppercase
                          px-3 py-1 rounded-full shrink-0
                          ${badge}
                        `}
                      >
                        {item.type}
                      </span>

                      {/* Chevron */}
                      <svg
                        className={`
                          shrink-0 mt-0.5 transition-all duration-300
                          ${
                            isOpen
                              ? "rotate-180 text-forest-500 dark:text-mint-500"
                              : "text-forest-500/30 dark:text-mint-500/30"
                          }
                        `}
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
                    <div
                      className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${isOpen ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"}
                      `}
                    >
                      <div className="flex flex-wrap gap-2 pb-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="
                              text-xs font-medium px-3 py-1 rounded-full
                              border border-forest-500/10 dark:border-mint-500/10
                              text-forest-500/55 dark:text-mint-500/55
                              hover:border-forest-500 dark:hover:border-mint-500
                              hover:text-forest-500 dark:hover:text-mint-500
                              hover:-translate-y-px
                              transition-all duration-150
                            "
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {i < items.length - 1 && (
                  <div className="ml-[52px] h-px bg-forest-500/[0.06] dark:bg-mint-500/[0.06]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
