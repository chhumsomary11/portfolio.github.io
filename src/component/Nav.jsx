// import { Link } from "react-router-dom";
// import DarkBtn from "./DarkBtn";
// const Nav = () => {
//   return (
//     <div className=" justify-between items-center flex-row  fixed flex z-10  w-full p-4 bg-milky-500 dark:bg-forest-500 ">
//       <Link
//         className=" brandName hoverEffect  text-forest-500 text-min text-3xl flex flex-row items-center gap-2 dark:text-milky-500"
//         to="/"
//       >
//         <svg
//           class="w-8 h-8 text-brown-500"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           width="50"
//           height="50"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <path
//             stroke="currentColor"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             d="m4 12 6.4267-4.65924c.6372.89667 1.8922 1.10897 2.7888.4718.8967-.63718 1.3493-1.69135.4681-2.80084C13.6373 4.95345 14.9106 4 15 4c.0894 0 5 1 5 8M4 12h16M4 12v8h16v-8M8 15h.01M12 17h.01M16 15h.01"
//           />
//         </svg>
//         M
//       </Link>
//       <div className="flex gap-6 items-center">
//         <Link to="/aboutMe" className="hoverEffect">
//           About Me
//         </Link>

//         <Link to="/projects" className="hoverEffect">
//           Projects
//         </Link>
//         <Link
//           className="bg-brown-500 border-2 border-brown-100 text-milky-500 p-2 rounded-2xl  hover:scale-105 hover:shadow-2xl transition-all duration-300"
//           to="/contact"
//         >
//           Contact
//         </Link>
//         <DarkBtn />
//       </div>
//     </div>
//   );
// };

// export default Nav;

import { useState, useEffect } from "react";
import DarkBtn from "./DarkBtn";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "education", label: "Education" },

    { id: "projects", label: "Projects" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@400;500&display=swap');

        .nav-root {
          position: fixed;
         
          top: 0; left: 0; right: 0;
          z-index: 50;
          font-family: 'Outfit', sans-serif;
          transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
        }

        /* pill wrapper that shrinks on scroll */
        .nav-inner {
         background: transparent;
          background: rgba(248,245,242,0.82);
          backdrop-filter: blur(18px);
          max-width: 900px;
          margin: 0 auto;
          transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
          padding: 10px 20px;
                    border-radius: 100px;
          border: 1px solid rgba(0,70,67,0.1);
          box-shadow: 0 8px 32px rgba(0,70,67,0.1);

        }
        .nav-inner.scrolled {
          padding: 10px 20px;
          margin-top: 10px;
          background: rgba(248,245,242,0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 100px;
          border: 1px solid rgba(0,70,67,0.1);
          box-shadow: 0 8px 32px rgba(0,70,67,0.1);
        }
    

        .nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* brand */
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .nav-brand:hover { opacity: 0.75; }

        .brand-icon {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: #004643;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.23,1,0.32,1);
        }

        .brand-letter {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: #004643;
          letter-spacing: -0.04em;
          transition: color 0.3s;
        }
        .dark .brand-letter { color: #f8f5f2; }

        /* desktop links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        @media (max-width: 600px) { .nav-links { display: none; } }

        .nav-link {
          font-size: 0.88rem;
          font-weight: 500;
          padding: 7px 16px;
          border-radius: 100px;
          border: none; background: none;
          color: rgba(0,70,67,0.6);
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          letter-spacing: 0.01em;
        }
        .dark .nav-link { color: rgba(248,245,242,0.55); }
        .nav-link:hover {
          background: rgba(0,70,67,0.07);
          color: #004643;
        }
        .dark .nav-link:hover {
          background: rgba(171,209,198,0.1);
          color: #abd1c6;
        }
        .nav-link.active {
          background: rgba(0,70,67,0.1);
          color: #004643;
          font-weight: 600;
        }
        .dark .nav-link.active {
          background: rgba(171,209,198,0.12);
          color: #abd1c6;
        }

        /* contact CTA */
        .nav-cta {
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 8px 20px;
          border-radius: 100px;
          border: none;
          background: #004643;
          color: #f8f5f2;
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: transform 0.22s, box-shadow 0.22s, background 0.22s;
          white-space: nowrap;
        }
        .dark .nav-cta { background: #abd1c6; color: #004643; }
        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,70,67,0.3);
        }
        .dark .nav-cta:hover {
          box-shadow: 0 6px 20px rgba(171,209,198,0.25);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 10px;
          transition: background 0.2s;
        }
        .hamburger:hover { background: rgba(0,70,67,0.07); }
        .dark .hamburger:hover { background: rgba(171,209,198,0.1); }
        @media (max-width: 600px) { .hamburger { display: flex; } }

        .hb-line {
          width: 22px; height: 2px;
          background: #004643;
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s, width 0.3s;
        }
        .dark .hb-line { background: #f8f5f2; }
        .hamburger.open .hb-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open .hb-line:nth-child(2) { opacity: 0; width: 0; }
        .hamburger.open .hb-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* mobile menu */
        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 4px;
          padding: 12px 4px 4px;
          animation: dropIn 0.25s ease;
        }
        @media (max-width: 600px) {
          .mobile-menu.open { display: flex; }
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-link {
          font-size: 0.9rem;
          font-weight: 500;
          padding: 11px 18px;
          border-radius: 14px;
          border: none; background: none;
          color: rgba(0,70,67,0.65);
          cursor: pointer;
          text-align: left;
          transition: background 0.18s, color 0.18s;
        }
        .dark .mobile-link { color: rgba(248,245,242,0.6); }
        .mobile-link:hover, .mobile-link.active {
          background: rgba(0,70,67,0.07);
          color: #004643;
        }
        .dark .mobile-link:hover, .dark .mobile-link.active {
          background: rgba(171,209,198,0.1);
          color: #abd1c6;
        }
        .mobile-cta {
          margin-top: 4px;
          font-size: 0.88rem;
          font-weight: 500;
          padding: 11px 18px;
          border-radius: 14px;
          border: none;
          background: #004643;
          color: #f8f5f2;
          cursor: pointer;
          text-align: center;
          transition: background 0.2s;
        }
        .dark .mobile-cta { background: #abd1c6; color: #004643; }
      `}</style>

      <nav className="nav-root">
        <div className={`nav-inner${scrolled ? " scrolled" : ""}`}>
          <div className="nav-bar">
            {/* Brand */}
            <button className="nav-brand" onClick={() => scrollTo("home")}>
              <span className="brand-icon">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke={
                      typeof document !== "undefined" &&
                      document.documentElement.classList.contains("dark")
                        ? "#004643"
                        : "#f8f5f2"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m4 12 6.4267-4.65924c.6372.89667 1.8922 1.10897 2.7888.4718.8967-.63718 1.3493-1.69135.4681-2.80084C13.6373 4.95345 14.9106 4 15 4c.0894 0 5 1 5 8M4 12h16M4 12v8h16v-8M8 15h.01M12 17h.01M16 15h.01"
                  />
                </svg>
              </span>
              <span className="brand-letter">Mary</span>
            </button>

            {/* Desktop links */}
            <div className="nav-links">
              {links.map((l) => (
                <button
                  key={l.id}
                  className={`nav-link${active === l.id ? " active" : ""}`}
                  onClick={() => scrollTo(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="nav-right">
              <button className="nav-cta" onClick={() => scrollTo("contact")}>
                Contact
              </button>
              <DarkBtn />
              {/* Hamburger */}
              <button
                className={`hamburger${menuOpen ? " open" : ""}`}
                onClick={() => setMenuOpen((p) => !p)}
                aria-label="Toggle menu"
              >
                <span className="hb-line" />
                <span className="hb-line" />
                <span className="hb-line" />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
            {links.map((l) => (
              <button
                key={l.id}
                className={`mobile-link${active === l.id ? " active" : ""}`}
                onClick={() => scrollTo(l.id)}
              >
                {l.label}
              </button>
            ))}
            <button className="mobile-cta" onClick={() => scrollTo("contact")}>
              Contact
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
