import { contacts } from "../assets/data/contact_icon";
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
              {contacts.map((contact, index) => {
                return (
                  <a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-amber-600/30 hover:bg-amber-600/60 text-amber-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    {contact.svg}
                  </a>
                );
              })}
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
