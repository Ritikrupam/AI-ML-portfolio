import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { achievements, profile, stats } from '../data/content';
import Reveal from '../components/Reveal';
import SplitHeading from '../components/SplitHeading';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * About: the real bio, live count-up stats, and a certification timeline.
 * No filler paragraphs, no invented numbers — every figure traces back to the
 * content file.
 */
export default function About() {
  return (
    <section id="about" className="relative border-t border-white/10 bg-panel/30">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-28 sm:py-36 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="font-pixel text-[9px] uppercase tracking-[0.3em] text-blood">
            About
          </span>
          <SplitHeading
            text="Engineer of models and the interfaces around them."
            className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-blood-fade sm:text-4xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-white/75">
              {profile.bio}
            </p>
          </Reveal>

          {/* Stat counters */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <Counter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>

        {/* Certification timeline */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="border border-white/10 bg-ink/60 p-8">
              <span className="font-pixel text-[9px] uppercase tracking-[0.3em] text-muted">
                Credentials
              </span>
              <ul className="mt-6 flex flex-col">
                {achievements.map((a, i) => (
                  <li key={a} className="relative flex gap-4 pb-8 last:pb-0">
                    {/* Timeline rail */}
                    <div className="flex flex-col items-center">
                      <span className="mt-1 h-3 w-3 flex-none border border-blood bg-blood/20" />
                      {i < achievements.length - 1 && (
                        <span className="my-1 w-px flex-1 bg-white/15" />
                      )}
                    </div>
                    <p className="font-body text-sm leading-relaxed text-white/80">{a}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Counter({
  value,
  suffix = '',
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setN(Math.round((1 - Math.pow(1 - t, 3)) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduced]);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-display text-4xl font-bold tabular-nums text-white sm:text-5xl">
        {n}
        <span className="text-blood">{suffix}</span>
      </span>
      <span className="mt-2 font-mono text-[10px] uppercase leading-snug tracking-widest text-muted">
        {label}
      </span>
    </div>
  );
}
