import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import type { MouseEvent } from "react";
import type { Project } from "../data/content";
import Reveal from "./Reveal";
import PixelButton from "./PixelButton";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type ProjectCardProps = {
  project: Project;
  flip: boolean;
  onOpen: (project: Project) => void;
};

export default function ProjectCard({
  project,
  flip,
  onOpen,
}: ProjectCardProps) {
  const reduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const glowX = useMotionValue(-500);
const glowY = useMotionValue(-500);

const rotateX = useSpring(
  useTransform(mouseY, [-0.5, 0.5], [8, -8]),
  {
    stiffness: 260,
    damping: 20,
  }
);

const rotateY = useSpring(
  useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
  {
    stiffness: 260,
    damping: 20,
  }
);

const handleMove = (e: MouseEvent<HTMLDivElement>) => {
  if (!cardRef.current || reduced) return;

  const rect = cardRef.current.getBoundingClientRect();

  mouseX.set((e.clientX - rect.left) / rect.width - 0.5);

  mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  glowX.set(e.clientX - rect.left);
glowY.set(e.clientY - rect.top);
};

const handleLeave = () => {
  mouseX.set(0);
  mouseY.set(0);

  glowX.set(-500);
  glowY.set(-500);
};

  return (
    <article className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
      {/* Left Side */}

      <Reveal
        className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}
        y={reduced ? 0 : 40}
      >
        <motion.div
  ref={cardRef}
  layoutId={`project-${project.id}`}
  onClick={() => onOpen(project)}
  onMouseMove={handleMove}
  onMouseLeave={handleLeave}
  whileTap={{ scale: 0.98 }}
  whileHover={
  reduced
    ? undefined
    : {
        y: -10,
        scale: 1.015,
      }
}
  transition={{
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1],
  }}
  style={{
  rotateX,
  rotateY,
  transformPerspective: 1400,
  transformStyle: "preserve-3d",
  willChange: "transform",
}}
  className="group/card relative transform-gpu cursor-pointer overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0b0d] shadow-[0_20px_80px_rgba(0,0,0,0.2)] transition-colors duration-500 hover:border-red-500/40"
>
    <motion.div
  className="pointer-events-none absolute inset-0 z-[1]"
  style={{
    background: useTransform(
      [glowX, glowY],
      ([x, y]) =>
        `radial-gradient(
          240px circle at ${x}px ${y}px,
          rgba(255,45,45,0.22),
          transparent 70%
        )`,
    ),
  }}
/>
          {/* Background Image */}

          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.img
              src={project.images[0].src}
              alt={project.name}
              className="h-full w-full object-cover will-change-transform transition-[filter] duration-700 group-hover/card:brightness-110"
              animate={
                reduced
                  ? undefined
                  : {
                      scale: [1, 1.03, 1],
                    }
              }
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

            {/* Glow */}

            <motion.div
              className="pointer-events-none absolute inset-0"
              animate={
                reduced
                  ? undefined
                  : {
                      opacity: [0.15, 0.3, 0.15],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,40,40,.18), transparent 65%)",
              }}
            />

            {/* Tech Stack */}

            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/15 bg-black/60 px-3 py-1.5 font-mono text-[10px] tracking-wide text-white/75 backdrop-blur-md transition-colors duration-300 hover:border-red-500/50 hover:text-white"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Bottom Content */}

            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/45">
                    Featured Project
                  </p>

                  <h3 className="font-display text-3xl font-bold text-white">
                    {project.name}
                  </h3>
                </div>

                <motion.div
                  whileHover={
  reduced
    ? undefined
    : {
        x: 4,
      }
}
                  className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-white md:flex"
                >
                  →
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
                    <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10">
            <div className="px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                Type
              </p>

              <p className="mt-1 text-sm text-white/80">
                AI / ML
              </p>
            </div>

            <div className="px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                Status
              </p>

              <p className="mt-1 text-sm text-blood">
                Completed
              </p>
            </div>

            <div className="px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                Source
              </p>

              <p className="mt-1 text-sm text-white/80">
                GitHub
              </p>
            </div>
          </div>
        </motion.div>
      </Reveal>

      {/* Right Side */}

      <Reveal
        className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}
        delay={0.05}
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-2xl font-bold text-blood">
              {project.index}
            </span>

            <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {project.name}
            </h3>
          </div>

          <p className="font-body text-sm uppercase tracking-wide text-muted">
            {project.problem}
          </p>

          <p className="font-body text-base leading-relaxed text-white/80">
            {project.outcome}
          </p>

          <ul className="flex flex-col gap-2 border-l border-white/10 pl-5">
            {project.bullets.map((b) => (
              <li
                key={b}
                className="font-body text-sm leading-relaxed text-white/60"
              >
                {b}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-4">
            <div
  onClick={(e) => {
    e.stopPropagation();
  }}
>
  <PixelButton
    href={project.repo}
    external
    variant="ghost"
    ariaLabel={`View ${project.name}`}
  >
    View on GitHub →
  </PixelButton>
</div>

                       {project.demo && (
  <div
  onClick={(e) => {
    e.stopPropagation();
  }}
>
    <PixelButton
      href={project.demo}
      external
      ariaLabel={`Live demo of ${project.name}`}
    >
      Live Demo
    </PixelButton>
  </div>
)}
          </div>
        </div>
            </Reveal>

    </article>
  );
}