const Footer = () => {
  // const scrollToTop = () => {
  //   window.scrollTo({ top: 10, behavior: "smooth" });
  // };

  return (
    <footer className="relative bg-amber-500 overflow-hidden">
      {/* Subtle texture layer */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #78350f 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #451a03 0%, transparent 40%)`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-16">
        {/* Top row: Brand + Nav + Social */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <a className="flex items-center gap-2 group" href="/">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-600/40 group-hover:bg-amber-600/60 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-amber-100"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m4 12 6.4267-4.65924c.6372.89667 1.8922 1.10897 2.7888.4718.8967-.63718 1.3493-1.69135.4681-2.80084C13.6373 4.95345 14.9106 4 15 4c.0894 0 5 1 5 8M4 12h16M4 12v8h16v-8M8 15h.01M12 17h.01M16 15h.01"
                  />
                </svg>
              </span>
              <span
                className="text-2xl font-bold tracking-tight text-amber-50"
                style={{
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Chhumsomary
              </span>
            </a>
            <p className="text-amber-100/70 text-sm max-w-[200px] leading-relaxed">
              Crafting thoughtful digital experiences.
            </p>
          </div>

          {/* Quick links */}
          {/* <div className="flex flex-col gap-2">
            <p className="text-amber-200 text-xs font-semibold uppercase tracking-widest mb-1">
              Navigate
            </p>
            {["Home", "About", "Projects", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="text-amber-100/80 hover:text-amber-50 text-sm transition-colors duration-200 hover:translate-x-1 inline-flex items-center gap-1 group"
              >
                <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-amber-300">
                  →
                </span>
                {item}
              </Link>
            ))}
          </div> */}

          {/* Social icons */}
          <div className="flex flex-col gap-3">
            <p className="text-amber-200 text-xs font-semibold uppercase tracking-widest mb-1">
              Connect
            </p>
            <div className="flex gap-3">
              {/* Facebook */}
              <a
                href=""
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-amber-600/30 hover:bg-amber-600/60 text-amber-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href=""
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-amber-600/30 hover:bg-amber-600/60 text-amber-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/chhumso-mary-loeung-980574268/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-amber-600/30 hover:bg-amber-600/60 text-amber-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg
                  className="w-4 h-4"
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

              {/* GitHub */}
              <a
                href=""
                aria-label="GitHub"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-amber-600/30 hover:bg-amber-600/60 text-amber-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg
                  className="w-4 h-4"
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
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 mb-5 border-t border-amber-400/30" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-amber-100/60 text-xs">
            © 2026 Chhumsomary Loeung. All rights reserved.
          </p>
          <p className="text-amber-100/40 text-xs">
            Designed & built with care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
