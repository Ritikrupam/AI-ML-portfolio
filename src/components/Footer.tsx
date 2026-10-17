import { profile } from '../data/content';

/**
 * Footer: a big sign-off wordmark, the essentials repeated for reachability,
 * and an honest build credit. Kept quiet so the work above stays the focus.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <a
          href={`mailto:${profile.email}`}
          data-cursor="link"
          className="block font-display text-[13vw] font-bold leading-none tracking-tight text-blood-fade transition-opacity hover:opacity-80 sm:text-[10vw]"
        >
          Say hello →
        </a>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            © {year} {profile.name}
          </span>
          <div className="flex gap-6 font-mono text-xs uppercase tracking-widest">
            <a href={profile.github} target="_blank" rel="noreferrer noopener" data-cursor="link" className="text-white/60 hover:text-blood">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" data-cursor="link" className="text-white/60 hover:text-blood">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} data-cursor="link" className="text-white/60 hover:text-blood">
              Email
            </a>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {profile.location}
          </span>
        </div>
      </div>
    </footer>
  );
}
