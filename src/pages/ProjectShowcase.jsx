import { useEffect, useRef } from "react";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

import { Link, useLocation } from "react-router-dom";

import { projects } from "../assets/data/projects";

/* ======================================================
   PROJECT SHOWCASE PAGE
====================================================== */

export default function ProjectShowcase() {
  const location = useLocation();

  // IMPORTANT:
  // This <main> is the real scrolling container.
  const containerRef = useRef(null);

  /* ====================================================
     SCROLL TO PROJECT FROM URL HASH

     Example:
     /projects#project-pose-up
  ==================================================== */

  useEffect(() => {
    if (!location.hash) return;

    const target = document.querySelector(location.hash);

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [location.hash]);

  return (
    <main
      ref={containerRef}
      className="
        relative

        h-[100svh]
        overflow-y-auto

        snap-y
        snap-mandatory

        bg-milky-500
        text-forest-500

        dark:bg-[#071412]
        dark:text-milky-500
      "
    >
      {/* =================================================
          BACK BUTTON
      ================================================= */}

      <Link
        to="/"
        className="
          fixed

          top-6
          left-6

          z-50

          px-4
          py-2

          rounded-full

          bg-milky-500/80
          text-forest-500

          dark:bg-[#071412]/80
          dark:text-milky-500

          backdrop-blur-md

          text-sm
          font-medium

          border
          border-forest-500/10

          dark:border-milky-500/10

          transition-all
          duration-200

          hover:-translate-y-0.5
        "
      >
        ← Back
      </Link>

      {/* =================================================
          SIDE PROJECT NAVIGATION
      ================================================= */}

      <ProjectNavigation />

      {/* =================================================
          ALL PROJECTS
      ================================================= */}

      {projects.map((project, index) => (
        <ProjectMotionScene
          key={project.number}
          project={project}
          index={index}
          total={projects.length}
          containerRef={containerRef}
        />
      ))}
    </main>
  );
}

/* ======================================================
   ONE PROJECT SCENE
====================================================== */

function ProjectMotionScene({ project, index, total, containerRef }) {
  const sectionRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  /* ====================================================
     TRACK THIS PROJECT RELATIVE TO THE REAL
     SCROLLABLE <main> CONTAINER
  ==================================================== */

  const { scrollYProgress } = useScroll({
    container: containerRef,

    target: sectionRef,

    offset: ["start end", "end start"],
  });

  /* ====================================================
     LEFT CONTENT MOTION
  ==================================================== */

  const textY = useTransform(
    scrollYProgress,

    [0, 0.25, 0.5, 0.75, 1],

    shouldReduceMotion ? [0, 0, 0, 0, 0] : [120, 30, 0, -30, -120],
  );

  const textOpacity = useTransform(
    scrollYProgress,

    [0, 0.2, 0.5, 0.8, 1],

    [0, 0.7, 1, 0.7, 0],
  );

  const textScale = useTransform(
    scrollYProgress,

    [0, 0.5, 1],

    shouldReduceMotion ? [1, 1, 1] : [0.96, 1, 0.96],
  );

  /* ====================================================
     RIGHT IMAGE MOTION
  ==================================================== */

  const imageY = useTransform(
    scrollYProgress,

    [0, 0.5, 1],

    shouldReduceMotion ? [0, 0, 0] : [180, 0, -180],
  );

  const imageScale = useTransform(
    scrollYProgress,

    [0, 0.5, 1],

    shouldReduceMotion ? [1, 1, 1] : [0.78, 1, 0.84],
  );

  const imageRotate = useTransform(
    scrollYProgress,

    [0, 0.5, 1],

    shouldReduceMotion ? [0, 0, 0] : [8, 0, -7],
  );

  const imageOpacity = useTransform(
    scrollYProgress,

    [0, 0.18, 0.5, 0.82, 1],

    [0, 0.75, 1, 0.75, 0],
  );

  /* ====================================================
     BACKGROUND ORB MOTION
  ==================================================== */

  const orbScale = useTransform(
    scrollYProgress,

    [0, 0.5, 1],

    [0.65, 1.15, 0.75],
  );

  const orbY = useTransform(
    scrollYProgress,

    [0, 1],

    shouldReduceMotion ? [0, 0] : [100, -100],
  );

  const orbOpacity = useTransform(
    scrollYProgress,

    [0, 0.5, 1],

    [0.2, 1, 0.2],
  );

  /* ====================================================
     DECORATIVE RING
  ==================================================== */

  const ringRotate = useTransform(
    scrollYProgress,

    [0, 1],

    shouldReduceMotion ? [0, 0] : [-15, 15],
  );

  return (
    <section
      ref={sectionRef}
      id={`project-${project.slug}`}
      className="
        relative

        h-[100svh]

        snap-start

        overflow-hidden

        border-b
        border-forest-500/10

        dark:border-milky-500/10
      "
    >
      <div
        className="
          relative
          z-10

          h-full

          grid
          grid-cols-1
          lg:grid-cols-2

          items-center

          gap-10
          lg:gap-20

          max-w-[1500px]
          mx-auto

          px-6
          md:px-12
          lg:px-24

          py-20
        "
      >
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <motion.div
          style={{
            y: textY,
            opacity: textOpacity,
            scale: textScale,
          }}
          className="
            relative
            z-20

            max-w-xl
          "
        >
          {/* Counter */}
          <div
            className="
              flex
              items-baseline

              gap-2

              mb-8
            "
          >
            <span
              className="
                text-3xl
                md:text-4xl

                font-bold

                text-coral-500
              "
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <span
              className="
                text-sm
                opacity-40
              "
            >
              / {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Category */}
          <p
            className="
              mb-4

              text-xs
              font-semibold

              uppercase

              tracking-[0.2em]

              text-forest-500/60

              dark:text-mint-500/70
            "
          >
            {project.category}
          </p>

          {/* Title */}
          <h1
            className="
              font-display

              text-5xl
              md:text-6xl
              xl:text-7xl

              font-bold

              leading-[0.95]

              tracking-[-0.05em]

              text-forest-500

              dark:text-milky-500
            "
          >
            {project.title}
          </h1>

          {/* Subtitle */}
          {project.subtitle && (
            <p
              className="
                mt-5

                text-lg

                text-coral-500
              "
            >
              {project.subtitle}
            </p>
          )}

          {/* Description */}
          <p
            className="
              mt-7

              max-w-lg

              text-base
              md:text-lg

              leading-8

              text-forest-500/60

              dark:text-milky-500/55
            "
          >
            {project.longDescription || project.description}
          </p>

          {/* =================================================
              TECHNOLOGIES
          ================================================= */}

          <div
            className="
              flex
              flex-wrap

              gap-2

              mt-8
            "
          >
            {project.tech?.length > 0 ? (
              project.tech.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -3,
                        }
                  }
                  className="
                    px-3
                    py-1.5

                    rounded-full

                    border
                    border-forest-500/20

                    dark:border-milky-500/20

                    text-xs
                  "
                >
                  {tech}
                </motion.span>
              ))
            ) : (
              <span
                className="
                  px-4
                  py-2

                  rounded-full

                  border
                  border-forest-500/20

                  dark:border-milky-500/20

                  text-sm
                "
              >
                {project.tag}
              </span>
            )}
          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div
            className="
              flex
              flex-wrap

              gap-3

              mt-10
            "
          >
            {/* Live project */}
            {project.link && project.link !== "#" && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.02,
                      }
                }
                whileTap={{
                  scale: 0.96,
                }}
                className="
                    px-6
                    py-3

                    rounded-full

                    bg-forest-500
                    text-milky-500

                    dark:bg-mint-500
                    dark:text-forest-500

                    text-sm
                    font-medium
                  "
              >
                View Live
              </motion.a>
            )}

            {/* GitHub */}
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.02,
                      }
                }
                whileTap={{
                  scale: 0.96,
                }}
                className="
                  px-6
                  py-3
                   inline-flex
                  items-center
                  justify-center

                  gap-2
                  rounded-full

                  border
                  border-forest-500/25

                  dark:border-milky-500/25

                  text-sm
                  font-medium
                "
              >
                {" "}
                <svg
                  width="25"
                  height="25"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span> Source Code</span>
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div
          className="
            relative

            h-[420px]
            md:h-[520px]
            lg:h-[650px]

            flex
            items-center
            justify-center
          "
        >
          {/* Animated background orb */}
          <motion.div
            style={{
              scale: orbScale,
              y: orbY,
              opacity: orbOpacity,
            }}
            className="
              absolute

              w-[80%]
              aspect-square

              rounded-full

              bg-mint-500/30

              dark:bg-mint-500/10

              blur-3xl
            "
          />

          {/* Decorative outer ring */}
          <motion.div
            style={{
              rotate: ringRotate,
              scale: orbScale,
              opacity: orbOpacity,
            }}
            className="
              absolute

              w-[68%]
              aspect-square

              rounded-full

              border
              border-mint-500/30

              dark:border-mint-500/15
            "
          />

          {/* Decorative inner ring */}
          <motion.div
            style={{
              rotate: imageRotate,
              scale: imageScale,
            }}
            className="
              absolute

              w-[52%]
              aspect-square

              rounded-full

              border
              border-coral-500/20
            "
          />

          {/* Main project image */}
          <motion.div
            style={{
              y: imageY,
              scale: imageScale,
              rotate: imageRotate,
              opacity: imageOpacity,
            }}
            className="
              relative
              z-10

              w-full
              max-w-3xl
            "
          >
            <img
              src={project.img}
              alt={project.title}
              className="
                w-full

                max-h-[70vh]

                object-contain

                rounded-3xl

                shadow-2xl
              "
            />
          </motion.div>
        </div>
      </div>

      {/* =================================================
          SCROLL INDICATOR
      ================================================= */}

      {index < total - 1 && (
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, 8, 0],
                }
          }
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute

            bottom-6
            left-1/2

            -translate-x-1/2

            text-xs

            uppercase

            tracking-[0.2em]

            opacity-40
          "
        >
          Scroll ↓
        </motion.div>
      )}
    </section>
  );
}

/* ======================================================
   SIDE PROJECT NAVIGATION
====================================================== */

function ProjectNavigation() {
  return (
    <nav
      className="
        fixed

        right-5
        lg:right-8

        top-1/2

        -translate-y-1/2

        z-50

        hidden
        md:flex

        flex-col

        gap-3
      "
      aria-label="Project navigation"
    >
      {projects.map((project, index) => (
        <a
          key={project.number}
          href={`#project-${project.slug}`}
          aria-label={`Go to ${project.title}`}
          className="
            w-9
            h-9

            flex
            items-center
            justify-center

            rounded-full

            border
            border-forest-500/15

            dark:border-milky-500/15

            bg-milky-500/60

            dark:bg-[#071412]/60

            backdrop-blur-md

            text-xs

            hover:bg-forest-500
            hover:text-milky-500

            dark:hover:bg-mint-500
            dark:hover:text-forest-500

            transition-all
            duration-200
          "
        >
          {String(index + 1).padStart(2, "0")}
        </a>
      ))}
    </nav>
  );
}
