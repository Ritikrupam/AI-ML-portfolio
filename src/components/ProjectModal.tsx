import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Project } from "../data/content";

type ProjectModalProps = {
  project: Project | null;
  open: boolean;
  onClose: () => void;
};

export default function ProjectModal({
  project,
  open,
  onClose,
}: ProjectModalProps) {
 useEffect(() => {
  if (!open) return;

  document.body.style.overflow = "hidden";
  document.body.classList.add("modal-open");

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    document.body.style.overflow = "";
    document.body.classList.remove("modal-open");
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [open, onClose]);
  const [currentImage, setCurrentImage] = useState(0);

useEffect(() => {
  if (open) {
    setCurrentImage(0);
  }
}, [open, project]);

if (!project) return null;

return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
  className="fixed inset-0 z-[90] cursor-auto"
  initial={{
    opacity: 0,
    backdropFilter: "blur(0px)",
    backgroundColor: "rgba(0,0,0,0)",
  }}
  animate={{
    opacity: 1,
    backdropFilter: "blur(16px)",
    backgroundColor: "rgba(0,0,0,0.78)",
  }}
  exit={{
    opacity: 0,
    backdropFilter: "blur(0px)",
    backgroundColor: "rgba(0,0,0,0)",
  }}
  transition={{
    duration: 0.35,
    ease: [0.22, 1, 0.36, 1],
  }}
  onClick={onClose}
/>

          {/* Modal */}
          <div
  className="fixed inset-0 z-[100] overflow-y-auto"
  onWheel={(e) => e.stopPropagation()}
>
  <div className="flex min-h-full items-center justify-center p-6">

    <motion.div
    layoutId={`project-${project.id}`}
    onWheel={(e) => e.stopPropagation()}
    className="w-full max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-3xl border border-white/10 bg-[#0B0B0B]"

    initial={{
      opacity: 0,
      scale: 0.96,
    }}

    animate={{
      opacity: 1,
      scale: 1,
    }}

    exit={{
      opacity: 0,
      scale: 0.96,
    }}

    transition={{
      type: "spring",
      stiffness: 140,
      damping: 18,
    }}
  >
            <motion.button
  onClick={onClose}
  initial={{
    opacity: 0,
    scale: 0.8,
  }}
  animate={{
    opacity: 1,
    scale: 1,
  }}
  transition={{
    delay: 0.35,
    duration: 0.3,
  }}
  whileHover={{
    scale: 1.1,
    rotate: 90,
  }}
  whileTap={{
    scale: 0.9,
  }}
  className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-2xl text-white backdrop-blur transition hover:border-red-500"
>
  ×
</motion.button>
            {/* Header */}
            <motion.div
  className="border-b border-white/10 p-8"
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.1,
    duration: 0.5,
  }}
>
  <span className="font-mono text-xs uppercase tracking-[0.4em] text-red-500">
    {project.kicker}
  </span>

  <h2 className="mt-4 font-display text-5xl font-bold">
    {project.name}
  </h2>

  <p className="mt-4 max-w-2xl text-white/70">
    {project.outcome}
  </p>
</motion.div>

            {/* Hero */}

<motion.div
  className="relative h-[430px] overflow-hidden"
  initial={{
    opacity: 0,
  }}
  animate={{
    opacity: 1,
  }}
  transition={{
    delay: 0.15,
    duration: 0.4,
  }}
>

  <motion.img
  key={project.images[currentImage].src}
  src={project.images[currentImage].src}
  alt={project.images[currentImage].caption}
  className="h-full w-full object-cover will-change-transform"
  initial={{
    scale: 1.15,
    opacity: 0,
  }}
  animate={{
    scale: 1,
    opacity: 1,
  }}
  transition={{
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }}
/>

  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-black/30 to-transparent" />

  <motion.div
    initial={{
      opacity: 0,
      y: 30,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      delay: 0.2,
      duration: 0.6,
    }}
    className="absolute bottom-8 left-8"
  >
    <motion.div
  className="text-7xl font-bold text-red-500"
  initial={{
    scale: 0.6,
    opacity: 0,
  }}
  animate={{
    scale: 1,
    opacity: 1,
  }}
  transition={{
    delay: 0.35,
    type: "spring",
    stiffness: 180,
  }}
>
      {project.metric}
    </motion.div>

    <div className="mt-2 font-mono uppercase tracking-[0.3em] text-white/50">
      {project.metricLabel}
    </div>
  </motion.div>

</motion.div>

<div className="absolute inset-y-0 left-4 flex items-center">
  <button
    onClick={() =>
      setCurrentImage(
        (currentImage - 1 + project.images.length) %
          project.images.length,
      )
    }
    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-2xl text-white backdrop-blur transition hover:border-red-500"
  >
    ←
  </button>
</div>

<div className="absolute inset-y-0 right-4 flex items-center">
  <button
    onClick={() =>
      setCurrentImage(
        (currentImage + 1) % project.images.length,
      )
    }
    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-2xl text-white backdrop-blur transition hover:border-red-500"
  >
    →
  </button>
</div>

<motion.section
  className="px-8 py-8 border-t border-white/10"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.35 }}
>
  <p className="font-mono text-xs uppercase tracking-[0.3em] text-red-500">
    Overview
  </p>

  <p className="mt-5 max-w-4xl text-lg leading-8 text-white/75">
    {project.problem}
  </p>
</motion.section>

<motion.section
  className="border-t border-white/10 px-8 py-8"
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.45,
  }}
>
  <p className="font-mono text-xs uppercase tracking-[0.3em] text-red-500">
    Key Features
  </p>

  <div className="mt-6 grid gap-4 md:grid-cols-2">
    {project.bullets.map((feature, index) => (
      <motion.div
        key={feature}
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 0.55 + index * 0.12,
        }}
        className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
      >
        <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-500/15 text-red-500">
          ✓
        </div>

        <p className="leading-7 text-white/75">
          {feature}
        </p>
      </motion.div>
    ))}
  </div>
</motion.section>

<motion.section
  className="border-t border-white/10 px-8 py-10"
  initial={{
    opacity: 0,
    y: 30,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.6,
  }}
>
  <p className="font-mono text-xs uppercase tracking-[0.3em] text-red-500">
    Project Showcase
  </p>

  <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">

    <div className="relative h-[420px] w-full overflow-hidden bg-black">

  {/* Background Image */}
  <motion.img
    src={project.images[currentImage].src}
    alt={project.name}
    className="absolute inset-0 h-full w-full object-cover"
    initial={{ scale: 1.08 }}
    animate={{ scale: 1 }}
    transition={{
      duration: 8,
      ease: "easeOut",
    }}
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/35" />

  {/* Red Glow */}
  <motion.div
    className="absolute inset-0"
    animate={{
      opacity: [0.15, 0.35, 0.15],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
    }}
    style={{
      background:
        "radial-gradient(circle at center, rgba(255,40,40,.25), transparent 65%)",
    }}
  />

  <motion.div
  className="absolute inset-0 mix-blend-screen"
  animate={{
    opacity: [0.15, 0.45, 0.2, 0.4, 0.15],
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  style={{
    background: `
      radial-gradient(circle at 35% 35%, rgba(255,60,60,.45), transparent 18%),
      radial-gradient(circle at 68% 42%, rgba(255,30,30,.35), transparent 20%),
      radial-gradient(circle at 48% 72%, rgba(255,80,80,.28), transparent 18%)
    `,
  }}
/>

  {/* Animated Scan Line */}
  <motion.div
    className="absolute left-0 right-0 h-[3px] bg-red-500 shadow-[0_0_20px_#ff3030]"
    initial={{
      top: "-5%",
    }}
    animate={{
      top: "105%",
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    }}
  />

<motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.6 }}
  className="absolute right-6 top-6 rounded-2xl border border-red-500/30 bg-black/60 px-5 py-4 backdrop-blur-md"
>
  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-400">
    AI Analysis
  </p>

  <p className="mt-3 text-sm text-white/80">
    Status
  </p>

  <p className="text-lg font-semibold text-red-400">
  {project.details.analysis.status}
</p>

  <div className="mt-4 h-[2px] w-full overflow-hidden rounded bg-white/10">
    <motion.div
      className="h-full bg-red-500"
      initial={{ width: 0 }}
      animate={{
  width: `${project.details.analysis.confidence}%`,
}}
      transition={{
        delay: 0.8,
        duration: 1.2,
      }}
    />
  </div>
</motion.div>

<motion.div
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 1,
  }}
  className="absolute bottom-8 right-8 flex flex-col gap-3"
>

  <div className="rounded-xl border border-red-500/30 bg-black/60 px-4 py-2 backdrop-blur">
    <p className="text-[10px] uppercase tracking-[0.25em] text-red-400">
      Model
    </p>

    <p className="mt-1 font-semibold text-white">
  {project.details.analysis.model}
</p>
  </div>

  <div className="rounded-xl border border-red-500/30 bg-black/60 px-4 py-2 backdrop-blur">
    <p className="text-[10px] uppercase tracking-[0.25em] text-red-400">
      Explainability
    </p>

    <p className="mt-1 font-semibold text-white">
  {project.details.analysis.explainability}
</p>
  </div>

  <div className="rounded-xl border border-red-500/30 bg-black/60 px-4 py-2 backdrop-blur">
    <p className="text-[10px] uppercase tracking-[0.25em] text-red-400">
      Dataset
    </p>

    <p className="mt-1 font-semibold text-white">
  {project.details.analysis.datasetName}
</p>
  </div>

</motion.div>

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2 }}
  className="absolute left-8 top-8"
>

  <div className="rounded-xl border border-white/10 bg-black/60 px-5 py-4 backdrop-blur">

    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
      Detection
    </p>

    <div className="mt-3 flex items-center gap-3">

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
        className="h-3 w-3 rounded-full bg-red-500"
      />

      <span className="text-white font-semibold">
        LIVE ANALYSIS
      </span>

    </div>

  </div>

</motion.div>

<div className="pointer-events-none absolute inset-0">

  <div className="absolute left-5 top-5 h-8 w-8 border-l-2 border-t-2 border-red-500/70"></div>

  <div className="absolute right-5 top-5 h-8 w-8 border-r-2 border-t-2 border-red-500/70"></div>

  <div className="absolute left-5 bottom-5 h-8 w-8 border-l-2 border-b-2 border-red-500/70"></div>

  <div className="absolute right-5 bottom-5 h-8 w-8 border-r-2 border-b-2 border-red-500/70"></div>

</div>

</div>

  </div>
</motion.section>

<motion.section
  className="border-t border-white/10 px-8 py-10"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.7 }}
>
  <p className="font-mono text-xs uppercase tracking-[0.3em] text-red-500">
    Project Details
  </p>

  <div className="mt-8 grid gap-6 md:grid-cols-2">

    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="font-display text-xl font-semibold text-white">
        Objective
      </h3>

      <p className="mt-4 leading-7 text-white/70">
  {project.details.objective}
</p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="font-display text-xl font-semibold text-white">
        Dataset
      </h3>

      <p className="mt-4 leading-7 text-white/70">
  {project.details.dataset}
</p>
    </div>

<div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
  <h3 className="font-display text-xl font-semibold text-white">
    Architecture
  </h3>

  <p className="mt-4 leading-7 text-white/70">
    {project.details.architecture}
  </p>
</div>

<div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
  <h3 className="font-display text-xl font-semibold text-white">
    Key Results
  </h3>

  <ul className="mt-4 space-y-3">
    {project.details.results.map((result) => (
      <li
        key={result}
        className="flex items-start gap-3 text-white/70"
      >
        <span className="mt-1 h-2 w-2 rounded-full bg-red-500"></span>

        <span>{result}</span>
      </li>
    ))}
  </ul>
</div>

  </div>
</motion.section>

<motion.section
  className="border-t border-white/10 px-8 py-10"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.85 }}
>
  <p className="font-mono text-xs uppercase tracking-[0.3em] text-red-500">
    AI Inference Pipeline
  </p>

  <div className="mt-10 grid gap-6 md:grid-cols-4">

    {project.details.pipeline.map((step, index) => (
      <motion.div
        key={step}
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.9 + index * 0.15,
        }}
        className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center"
      >
        <div className="text-lg font-semibold text-white">
          {step}
        </div>

        {index !== project.details.pipeline.length - 1 && (
          <motion.div
            animate={{
              x: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            className="absolute right-[-22px] top-1/2 hidden -translate-y-1/2 text-red-500 md:block"
          >
            →
          </motion.div>
        )}
      </motion.div>
    ))}
  </div>
</motion.section>

            {/* Footer */}
           <motion.div
  className="flex items-center justify-between border-t border-white/10 p-6"
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.45,
    duration: 0.45,
  }}
>

  <div className="flex flex-wrap gap-2">

    {project.stack.map((tech, index) => (
      <motion.span
        key={tech}
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
  delay: 0.55 + index * 0.08,
  duration: 0.25,
}}
        className="border border-white/10 px-3 py-1 text-xs uppercase text-white/60"
      >
        {tech}
      </motion.span>
    ))}

  </div>

</motion.div>

          </motion.div>

</div>
</div>

        </>
      )}
    </AnimatePresence>
  );
}