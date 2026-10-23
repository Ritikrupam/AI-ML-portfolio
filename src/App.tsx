import { useCallback, useEffect, useState } from "react";
import LampIntro from "./components/LampIntro";
import Nav from './components/Nav';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import About from './sections/About';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import { useLenis } from './hooks/useLenis';
import { useDeviceTier } from './hooks/useDeviceTier';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import GreetingIntro from "./components/GreetingIntro";

type Phase = 'forming' | 'idle' | 'burst';

/**
 * Orchestrator. Owns the intro phase machine and hands the right tier/motion
 * settings to the hero. Flow: particles gather (`forming`) behind the loader →
 * loader completes → brief crisp hold (`idle`) → monogram bursts (`burst`) and
 * the hero copy reveals. Reduced-motion and low-tier devices skip the WebGL
 * drama entirely and land straight on a calm, readable hero.
 */
export default function App() {
  const rawTier = useDeviceTier();
  const reduced = usePrefersReducedMotion();

  // Effective tier: no heavy WebGL under reduced motion or on weak devices.
  const tier = reduced ? 'low' : rawTier;

  const [phase, setPhase] = useState<Phase>('forming');
  const [loading, setLoading] = useState(true);
  const [textReady, setTextReady] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
const [showIntro, setShowIntro] = useState(false);

  useLenis(!reduced);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
    if (tier === 'low') {
      // No particle choreography to run — just reveal.
      setPhase('idle');
      setTextReady(true);
      return;
    }
    // Crisp hold on the formed monogram, then explode and reveal.
    setPhase('idle');
    const t1 = setTimeout(() => {
      setPhase('burst');
      setTextReady(true);
    }, 550);
    return () => clearTimeout(t1);
  }, [tier]);

  // Lock scroll while the intro plays so the reveal lands at the top.
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <div className="grain relative min-h-screen bg-ink text-white">
      {!reduced && <CustomCursor />}
      {loading && <Loader onComplete={handleLoaderComplete} reduced={reduced} />}

      <Nav />

      <main>
        {showGreeting && (
  <GreetingIntro
    onComplete={() => {
      setShowGreeting(false);
      setShowIntro(true);
    }}
  />
)}

{showIntro && (
  <LampIntro onComplete={() => setShowIntro(false)} />
)}

<Hero
  phase={phase}
  tier={tier}
  textReady={textReady}
/>
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
