const LINKS = [
  ["GitHub", "https://github.com/chhumsomary11"],
  ["LinkedIn", "https://www.linkedin.com/in/chhumso-mary-loeung-980574268/"],
  ["Email", "mailto:dananloeung@gmail.com"],
];

export default function Footer() {
  return (
    <footer className="bg-deep py-[22px] md:py-7">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-1.5 px-4 font-label text-xs text-foot-text md:flex-row md:flex-wrap md:justify-between md:gap-3 md:px-10 md:text-[13px]">
        <span>© 2026 Loeung Chhumso Mary</span>
        <span>
          {LINKS.map(([label, href], i) => (
            <span key={label}>
              {i > 0 && " · "}
              [ <a href={href} className="underline-offset-4 hover:underline">{label}</a> ]
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}
