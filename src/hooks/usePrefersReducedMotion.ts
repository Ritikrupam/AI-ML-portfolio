import { useEffect, useState } from 'react';

/**
 * Tracks the user's OS-level "reduce motion" preference and keeps it live —
 * if they toggle it, every consumer re-renders. Used to swap heavy animations
 * for calm, static variants across the site.
 */
export function usePrefersReducedMotion(): boolean {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
