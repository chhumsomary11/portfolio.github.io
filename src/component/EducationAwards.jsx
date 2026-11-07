import cv from "../data/cv.json";
import Reveal from "./Reveal";
import { hopDelay } from "./hopDelay";

const Cap = () => (
  <svg viewBox="0 0 12 12" width="32" height="32" shapeRendering="crispEdges" aria-hidden="true" className="flex-none">
    <path style={{ fill: "var(--ink)" }} d="M5 2h2v1h-2zM3 3h2v1h-2zM7 3h2v1h-2zM1 4h2v1h-2zM9 4h2v1h-2zM0 5h2v1h-2zM10 5h2v1h-2zM1 6h3v1h-3zM8 6h3v1h-3zM2 7h8v1h-8zM11 7h1v1h-1zM2 8h1v1h-1zM9 8h1v1h-1zM11 8h1v1h-1zM2 9h8v1h-8zM11 9h1v1h-1zM10 10h2v1h-2z" />
    <path style={{ fill: "var(--sage-line)" }} d="M5 3h2v1h-2zM3 4h6v1h-6zM2 5h8v1h-8zM4 6h4v1h-4zM3 8h6v1h-6z" />
  </svg>
);

const Trophy = () => (
  <svg viewBox="0 0 12 12" width="32" height="32" shapeRendering="crispEdges" aria-hidden="true" className="flex-none">
    <path style={{ fill: "var(--ink)" }} d="M5 0h2v1h-2zM5 1h2v1h-2zM4 2h1v1h-1zM7 2h1v1h-1zM0 3h5v1h-5zM7 3h5v1h-5zM1 4h1v1h-1zM10 4h1v1h-1zM2 5h1v1h-1zM9 5h1v1h-1zM3 6h1v1h-1zM8 6h1v1h-1zM3 7h1v1h-1zM8 7h1v1h-1zM2 8h1v1h-1zM5 8h2v1h-2zM9 8h1v1h-1zM2 9h1v1h-1zM4 9h1v1h-1zM7 9h1v1h-1zM9 9h1v1h-1zM2 10h2v1h-2zM8 10h2v1h-2z" />
    <path fill="#f9bc60" d="M5 2h2v1h-2zM5 3h2v1h-2zM2 4h8v1h-8zM3 5h6v1h-6zM4 6h4v1h-4zM4 7h4v1h-4zM3 8h2v1h-2zM7 8h2v1h-2zM3 9h1v1h-1zM8 9h1v1h-1z" />
  </svg>
);

function Column({ title, rows, icon }) {
  return (
    <div className="flex min-w-0 flex-[1_1_460px] flex-col">
      <h3 className="m-0 mb-4 font-label text-sm font-bold tracking-[0.06em] uppercase text-muted">
        {title}
      </h3>
      <ul className="m-0 flex list-none flex-col p-0">
        {rows.map((r, i) => (
          <li
            key={r.title}
            className="ap-hop flex gap-[18px] border-t-[3px] border-dashed border-sage-line py-[18px]"
            style={hopDelay(i)}
          >
            {icon}
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="font-label text-[13px] text-rose">{r.when}</span>
              <span className="text-[17px] font-semibold">{r.title}</span>
              <span className="text-[15px] text-muted">{r.note}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EducationAwards() {
  const education = cv.education.map((e) => ({
    when: e.period,
    title: e.degree,
    note: e.school,
  }));
  const awards = cv.awards.map((a) => ({
    when: a.year,
    title: a.title,
    note: a.note,
  }));

  return (
    <Reveal id="education" className="bg-page py-24">
      <div className="mx-auto box-border max-w-[1160px] px-5 md:px-10">
        <p className="ap-rv m-0 mb-2 font-label text-[13px] tracking-[0.08em] uppercase text-rose">
          04 · Education &amp; recognition
        </p>
        <h2 className="ap-rv m-0 mb-12 font-pixel text-[36px] font-semibold leading-[1.1] md:text-5xl">
          Learning and milestones
        </h2>
        <div className="flex flex-wrap gap-14">
          <Column title="Education" rows={education} icon={<Cap />} />
          <Column title="Awards & certifications" rows={awards} icon={<Trophy />} />
        </div>
      </div>
    </Reveal>
  );
}
