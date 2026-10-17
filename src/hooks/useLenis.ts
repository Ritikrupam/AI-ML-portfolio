import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Boots Lenis smooth scrolling and wires it into GSAP's ScrollTrigger so
 * scroll-driven animations stay in sync with the eased scroll position.
 * Disabled entirely when the user prefers reduced motion — native scroll only.
 */
export function useLenis(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add('lenis');

    return () => {
      gsap.ticker.remove(onRaf);
      document.documentElement.classList.remove('lenis');
      lenis.destroy();
    };
  }, [enabled]);
}
