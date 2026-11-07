import Reveal from "./Reveal";

const badge =
  "px-4 py-2 font-pixel font-semibold text-[17px] pixel-border-3";

export default function AboutStrip() {
  return (
    <Reveal id="about" className="bg-page pt-9 pb-[88px]">
      <div className="mx-auto box-border flex max-w-[1160px] flex-wrap items-center gap-x-14 gap-y-8 px-5 md:px-10">
        <p className="ap-rv m-0 min-w-0 flex-[1_1_520px] text-[17px] md:text-[19px] text-muted">
          Senior ICT student at AUPP working in JavaScript, React, Node.js,
          Python and AWS. Co-founder of SastraAI and PoseUp, and a recent
          intern building an internal employee portal. Looking for an
          internship or graduate program.
        </p>
        <ul className="ap-rv m-0 flex list-none flex-wrap gap-5 p-1">
          <li className={`${badge} bg-gold text-[#004643]`}>
            1st Place · National AI Competition
          </li>
          <li className={`${badge} bg-card text-ink`}>
            AWS Certified Cloud Practitioner
          </li>
        </ul>
      </div>
    </Reveal>
  );
}
