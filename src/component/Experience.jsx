import cv from "../data/cv.json";
import Reveal from "./Reveal";
import { hopDelay } from "./hopDelay";

export default function Experience() {
  return (
    <Reveal id="experience" className="bg-sage py-24">
      <div className="mx-auto box-border max-w-[1160px] px-5 md:px-10">
        <p className="ap-rv m-0 mb-2 font-label text-[13px] tracking-[0.08em] uppercase text-rose">
          02 · Experience
        </p>
        <h2 className="ap-rv m-0 mb-12 font-pixel text-[36px] font-semibold leading-[1.1] md:text-5xl">
          Where I&apos;ve built things
        </h2>
        <div className="flex flex-col gap-8 px-1.5">
          {cv.experiences.map((x, i) => (
            <article
              key={x.org}
              className="ap-hop flex flex-wrap gap-x-10 gap-y-5 bg-card px-5 py-7 md:px-8 pixel-card"
              style={hopDelay(i)}
            >
              <div className="flex flex-[0_0_220px] flex-col gap-1.5">
                <span className="self-start bg-gold px-2.5 py-0.5 font-label text-[13px] font-bold text-[#004643]">
                  {x.period}
                </span>
                <span className="text-[15px] text-muted">{x.org}</span>
              </div>
              <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3">
                <h3 className="m-0 font-pixel text-[26px] font-semibold leading-[1.2]">{x.role}</h3>
                {x.points.length > 0 && (
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {x.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-muted">
                        <span aria-hidden="true" className="mt-[9px] size-2 flex-none bg-lotus" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {x.tech.length > 0 && (
                  <ul className="m-0 mt-1 flex list-none flex-wrap gap-3 p-0">
                    {x.tech.map((t) => (
                      <li
                        key={t}
                        className="bg-sage px-2.5 py-[3px] font-label text-xs text-ink"
                        style={{
                          boxShadow:
                            "0 -2px 0 0 var(--sage-line), 0 2px 0 0 var(--sage-line), -2px 0 0 0 var(--sage-line), 2px 0 0 0 var(--sage-line)",
                        }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
