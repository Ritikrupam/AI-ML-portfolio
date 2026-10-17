import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/content';

/**
 * Cinematic intro overlay. A percentage counter climbs while the hero
 * particles gather behind it; at 100% the overlay lifts to hand off to the
 * live scene. Reduced-motion users skip straight to complete after a beat so
 * they aren't held on a loading screen.
 */
export default function Loader({
  onComplete,
  reduced,
}: {
  onComplete: () => void;
  reduced: boolean;
}) {
  const [pct, setPct] = useState(0);
  const [lifting, setLifting] = useState(false);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (reduced) {
      setPct(100);
      const t = setTimeout(onComplete, 400);
      return () => clearTimeout(t);
    }

    const start = performance.now();
    const duration = 2600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease-out so it decelerates into 100 like a camera settling.
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setLifting(true);
        setTimeout(onComplete, 700);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [onComplete, reduced]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-end bg-transparent"
      initial={{ opacity: 1 }}
      animate={{ opacity: lifting ? 0 : 1 }}
      transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
      aria-hidden="true"
    >
      {/* Vignette scrim that thins as we approach 100% */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 45%, rgba(5,5,5,0) 30%, rgba(5,5,5,0.85) 100%)',
          opacity: 1 - pct / 140,
        }}
      />

      <div className="relative mb-[8vh] flex w-[min(90vw,720px)] flex-col gap-4 px-6">
        <div className="flex items-end justify-between">
          <span className="font-pixel text-[9px] uppercase tracking-[0.3em] text-muted">
            {pct < 100 ? 'Initialising' : 'Ready'}
          </span>
          <span className="font-display text-4xl font-semibold tabular-nums text-white sm:text-6xl">
            {pct.toString().padStart(3, '0')}
            <span className="text-blood">%</span>
          </span>
        </div>

        {/* Progress rail */}
        <div className="h-px w-full bg-white/15">
          <div
            className="h-px bg-blood shadow-glow-red"
            style={{ width: `${pct}%`, transition: 'width 90ms linear' }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {profile.name}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {profile.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
