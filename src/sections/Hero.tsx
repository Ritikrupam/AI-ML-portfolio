import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import PixelButton from '../components/PixelButton';
import { profile } from '../data/content';
import type { DeviceTier } from '../hooks/useDeviceTier';

// Code-split the WebGL layer so the initial bundle stays lean.
const HeroCanvas = lazy(() => import('../components/HeroCanvas'));

type Phase = 'forming' | 'idle' | 'burst';

/**
 * Hero: the particle monogram (high tier) or a static mark (low tier / no
 * WebGL), with the positioning statement and primary CTAs below it. Text only
 * fades in once the intro has handed off, so the reveal feels choreographed.
 */
export default function Hero({
  phase,
  tier,
  textReady,
}: {
  phase: Phase;
  tier: DeviceTier;
  textReady: boolean;
}) {
  const particleCount = tier === 'high' ? 5200 : 2200;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated backdrop: radial glow + faint grid, pure CSS (cheap, always on) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 38%, rgba(255,45,45,0.10) 0%, rgba(5,5,5,0) 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(70% 60% at 50% 40%, #000 0%, transparent 75%)',
        }}
      />

      {/* WebGL monogram (high tier only) */}
      {tier === 'high' ? (
        <Suspense fallback={null}>
          <HeroCanvas phase={phase} particleCount={particleCount} />
        </Suspense>
      ) : (
        <div className="pointer-events-none absolute inset-x-0 top-[22%] flex justify-center">
          <span className="font-display text-[24vw] font-bold leading-none text-blood-fade opacity-90">
            {profile.monogram}
          </span>
        </div>
      )}

      {/* Foreground copy */}
      <motion.div
        className="relative z-10 mt-[26vh] flex max-w-4xl flex-col items-center px-6 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={textReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="mb-5 font-pixel text-[9px] uppercase tracking-[0.3em] text-muted">
          {profile.role} · {profile.location.split(',')[0]}
        </span>

        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          <span className="text-blood-fade">Machine learning</span>
          <br />
          you can see <span className="text-blood">inside.</span>
        </h1>

        <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-white/70">
          {profile.tagline} I build models that explain themselves — and the
          interfaces that put those explanations to work.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <PixelButton href="#work">View work</PixelButton>
          <PixelButton href="#contact" variant="ghost">
            Get in touch
          </PixelButton>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={textReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-pixel text-[8px] uppercase tracking-[0.3em] text-muted">
            Scroll
          </span>
          <div className="h-10 w-px overflow-hidden bg-white/20">
            <div className="h-4 w-px animate-[scrolldrop_1.8s_ease-in-out_infinite] bg-blood" />
          </div>
        </div>
        <style>{`@keyframes scrolldrop{0%{transform:translateY(-100%)}100%{transform:translateY(250%)}}`}</style>
      </motion.div>
    </section>
  );
}
