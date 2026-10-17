import { useState } from "react";
import ProjectModal from "../components/ProjectModal";
import type { Project } from "../data/content";
import { projects } from "../data/content";
import ProjectCard from "../components/ProjectCard";
import SplitHeading from "../components/SplitHeading";
/**
 * Work showcase. Each project is presented as a launch panel rather than a
 * card: a huge metric anchors the visual, the problem/outcome tells the story,
 * and the stack + repo sit at the foot. Panels alternate side to build rhythm.
 */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
      <div className="mb-12 flex flex-col gap-5 sm:mb-20">
  <div className="flex items-center gap-3">
    <span className="h-px w-8 bg-blood" />
    <span className="font-pixel text-[9px] uppercase tracking-[0.3em] text-blood">
      Selected Work / 03
    </span>
  </div>
        <SplitHeading
          text="Systems that show their reasoning."
          className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-blood-fade sm:text-5xl"
        />
      </div>

      <div className="flex flex-col gap-16 sm:gap-24">
  {projects.map((p, i) => (
    <ProjectCard
      key={p.id}
      project={p}
      flip={i % 2 === 1}
      onOpen={setSelectedProject}
    />
  ))}
</div>
      <ProjectModal
  project={selectedProject}
  open={selectedProject !== null}
  onClose={() => setSelectedProject(null)}
/>
    </section>
  );
}

