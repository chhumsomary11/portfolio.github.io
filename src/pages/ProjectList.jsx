import { useState } from "react";
import { projects, filters } from "../assets/data/projects";
import { Link } from "react-router-dom";
const Hero = ({ text = "My Projects" }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const normalizeCategory = (value) => value.trim().toLowerCase();

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (project) =>
            normalizeCategory(project.category) ===
            normalizeCategory(activeFilter),
        );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500&display=swap');

        :root {
          --mint:   #abd1c6;
          --forest: #004643;
          --milky:  #f8f5f2;
          --gold:   #f9bc60;
          --coral:  #e16162;
        }

        /* ── Section ── */
        .projects-section {
          font-family: 'Outfit', sans-serif;
          background: var(--milky);
          color: var(--forest);
          padding: 80px 28px 100px;
          position: relative;
          overflow: hidden;
          transition: background 0.35s, color 0.35s;
        }
        .dark .projects-section {
          background: #071412;
          color: var(--milky);
        }

        /* mesh blobs */
        .projects-section::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 520px; height: 520px;
          background: radial-gradient(ellipse, rgba(171,209,198,0.3) 0%, transparent 65%);
          pointer-events: none; border-radius: 50%;
        }
        .dark .projects-section::before {
          background: radial-gradient(ellipse, rgba(0,70,67,0.5) 0%, transparent 65%);
        }
        .projects-section::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -80px;
          width: 420px; height: 420px;
          background: radial-gradient(ellipse, rgba(249,188,96,0.15) 0%, transparent 65%);
          pointer-events: none; border-radius: 50%;
        }

        .section-inner {
          max-width: 1160px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Header ── */
        .section-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--coral);
          margin-bottom: 14px;
        }
        .section-eyebrow span {
          display: block;
          width: 30px; height: 2px;
          background: var(--coral);
          border-radius: 2px;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--forest);
          margin-bottom: 10px;
          transition: color 0.3s;
        }
        .dark .section-title { color: var(--milky); }
        .section-title em {
          font-style: italic;
          color: var(--coral);
        }

        .section-subtitle {
          font-size: 0.95rem;
          color: rgba(0,70,67,0.5);
          max-width: 380px;
          line-height: 1.7;
          margin-bottom: 36px;
          transition: color 0.3s;
        }
        .dark .section-subtitle { color: rgba(248,245,242,0.42); }

        /* ── Filter pills ── */
        .filter-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .filter-pill {
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          padding: 7px 20px;
          border-radius: 100px;
          border: 1.5px solid rgba(0,70,67,0.16);
          background: transparent;
          color: rgba(0,70,67,0.55);
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.23,1,0.32,1);
        }
        .dark .filter-pill {
          border-color: rgba(171,209,198,0.18);
          color: rgba(171,209,198,0.55);
        }
        .filter-pill:hover {
          border-color: var(--forest);
          color: var(--forest);
          transform: translateY(-2px);
        }
        .dark .filter-pill:hover {
          border-color: var(--mint);
          color: var(--mint);
        }
        .filter-pill.active {
          background: var(--forest);
          border-color: var(--forest);
          color: var(--milky);
          box-shadow: 0 4px 16px rgba(0,70,67,0.28);
          transform: translateY(-2px);
        }
        .dark .filter-pill.active {
          background: var(--mint);
          border-color: var(--mint);
          color: var(--forest);
          box-shadow: 0 4px 16px rgba(171,209,198,0.22);
        }

        /* count */
        .project-count {
          font-size: 0.8rem;
          color: rgba(0,70,67,0.38);
          margin-bottom: 30px;
          font-family: 'Syne', sans-serif;
          transition: color 0.3s;
        }
        .dark .project-count { color: rgba(171,209,198,0.38); }
        .project-count strong {
          color: var(--coral);
          font-size: 1rem;
          font-weight: 800;
        }

        /* ── Grid ── */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (min-width: 960px) {
          .projects-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* ── Card ── */
        .project-card {
          position: relative;
          background: #fff;
          border: 1.5px solid rgba(0,70,67,0.07);
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          transition:
            transform 0.38s cubic-bezier(0.23,1,0.32,1),
            box-shadow 0.38s cubic-bezier(0.23,1,0.32,1),
            border-color 0.3s;
          animation: riseIn 0.5s ease both;
        }
        .dark .project-card {
          background: #0d2220;
          border-color: rgba(171,209,198,0.07);
        }
        .project-card:nth-child(1) { animation-delay: 0.05s; }
        .project-card:nth-child(2) { animation-delay: 0.12s; }
        .project-card:nth-child(3) { animation-delay: 0.19s; }
        .project-card:nth-child(4) { animation-delay: 0.26s; }

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .project-card:hover {
          transform: translateY(-10px) scale(1.015);
          box-shadow: 0 28px 56px rgba(0,70,67,0.13), 0 0 0 1.5px rgba(0,70,67,0.18);
          border-color: rgba(0,70,67,0.22);
        }
        .dark .project-card:hover {
          box-shadow: 0 28px 56px rgba(0,0,0,0.45), 0 0 0 1.5px rgba(171,209,198,0.22);
          border-color: rgba(171,209,198,0.28);
        }

        /* image */
        .card-img-wrap {
          position: relative;
          height: 190px;
          overflow: hidden;
        }
        .card-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.55s cubic-bezier(0.23,1,0.32,1);
          display: block;
        }
        .project-card:hover .card-img-wrap img {
          transform: scale(1.1);
        }
        .img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(0,25,22,0.72) 100%);
        }

        /* hover action panel */
        .card-hover-panel {
          position: absolute; inset: 0;
          background: rgba(0,70,67,0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          opacity: 0;
          transition: opacity 0.28s ease;
          backdrop-filter: blur(2px);
        }
        .dark .card-hover-panel { background: rgba(4,42,40,0.93); }
        .project-card:hover .card-hover-panel { opacity: 1; }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 20px;
          border-radius: 100px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: transform 0.18s, opacity 0.18s;
          cursor: pointer;
          white-space: nowrap;
        }
        .action-btn:hover { transform: scale(1.06); }
        .action-btn.primary {
          background: var(--gold);
          color: var(--forest);
          border: none;
        }
        .action-btn.secondary {
          background: transparent;
          color: var(--milky);
          border: 1.5px solid rgba(248,245,242,0.28);
        }
        .action-btn.secondary:hover { border-color: rgba(248,245,242,0.65); }

        /* badges */
        .card-number {
          position: absolute;
          top: 12px; left: 13px;
          font-family: 'Syne', sans-serif;
          font-size: 11px; font-weight: 700;
          color: #fff;
          background: rgba(0,0,0,0.32);
          backdrop-filter: blur(6px);
          padding: 3px 9px;
          border-radius: 20px;
          letter-spacing: 0.06em;
        }
        .card-tag {
          position: absolute;
          top: 12px; right: 13px;
          font-size: 10px; font-weight: 500;
          color: var(--forest);
          background: var(--gold);
          padding: 3px 9px;
          border-radius: 20px;
          letter-spacing: 0.03em;
        }

        /* body */
        .card-body {
          padding: 18px 18px 20px;
        }
        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem; font-weight: 700;
          color: var(--forest);
          line-height: 1.3;
          margin-bottom: 3px;
          transition: color 0.3s;
        }
        .dark .card-title { color: var(--milky); }

        .card-subtitle {
          font-size: 0.7rem; font-weight: 500;
          color: var(--coral);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }

        .card-desc {
          font-size: 0.8rem;
          color: rgba(0,70,67,0.52);
          line-height: 1.65;
          margin-bottom: 14px;
          transition: color 0.3s;
        }
        .dark .card-desc { color: rgba(248,245,242,0.42); }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .category-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.73rem;
          color: rgba(0,70,67,0.42);
          transition: color 0.3s;
        }
        .dark .category-chip { color: rgba(171,209,198,0.45); }
        .category-chip::before {
          content: '';
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--mint);
          flex-shrink: 0;
        }

        .arrow-btn {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1.5px solid rgba(0,70,67,0.13);
          display: flex; align-items: center; justify-content: center;
          color: var(--forest);
          text-decoration: none;
          transition: background 0.22s, border-color 0.22s, transform 0.22s, color 0.22s;
        }
        .dark .arrow-btn {
          border-color: rgba(171,209,198,0.18);
          color: var(--mint);
        }
        .project-card:hover .arrow-btn {
          background: var(--forest);
          border-color: var(--forest);
          color: var(--milky);
          transform: rotate(-45deg);
        }
        .dark .project-card:hover .arrow-btn {
          background: var(--mint);
          border-color: var(--mint);
          color: var(--forest);
        }
      `}</style>

      <section id="projects" className="projects-section">
        <div className="section-inner">
          {/* Header */}
          <p className="section-eyebrow">
            <span />
            Selected Work
          </p>
          <h2 className="section-title">
            Things I've <em>built</em>
          </h2>
          <p className="section-subtitle">
            A collection of projects spanning web apps, AI tools, and
            productivity software.
          </p>

          {/* Filter */}
          <div className="filter-row">
            {filters.map((f) => (
              <button
                type="button"
                key={f}
                className={`filter-pill ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <p className="project-count">
            Showing <strong>{filtered.length}</strong> project
            {filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((card) => (
              <Link
                key={card.number}
                className="project-card"
                to={`/projects#project-${card.slug}`}
              >
                <div className="card-img-wrap">
                  <img src={card.img} alt={card.title} />
                  <div className="img-overlay" />
                  <span className="card-number">{card.number}</span>
                  <span className="card-tag">{card.tag}</span>

                  {/* Hover action panel */}
                  <div className="card-hover-panel">
                    <a href={card.link} className="action-btn primary">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      View{" "}
                    </a>
                  </div>
                </div>

                <div className="card-body">
                  <h3 className="card-title">{card.title}</h3>
                  {card.subtitle && (
                    <p className="card-subtitle">{card.subtitle}</p>
                  )}
                  <p className="card-desc">{card.description}</p>
                  <div className="card-footer">
                    <span className="category-chip">{card.category}</span>
                    <a
                      href={card.link}
                      className="arrow-btn"
                      aria-label={`Open ${card.title}`}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
