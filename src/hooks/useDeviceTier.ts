import { useMemo } from 'react';

export type DeviceTier = 'high' | 'low';

/**
 * Cheap, one-shot capability probe. Phones, small viewports, low core counts,
 * and coarse pointers get the "low" tier — which callers use to cut particle
 * counts and drop the WebGL hero for a static fallback. Keeps the mobile
 * experience fast and honours the performance contract.
 */
export function useDeviceTier(): DeviceTier {
  return useMemo<DeviceTier>(() => {
    if (typeof window === 'undefined') return 'high';

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const smallViewport = window.innerWidth < 768;
    const fewCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    const lowMemory =
      typeof (navigator as Navigator & { deviceMemory?: number }).deviceMemory ===
        'number' &&
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory! <= 4;

    // Any two weak signals → treat as low tier.
    const weak = [coarse, smallViewport, fewCores, lowMemory].filter(Boolean).length;
    return weak >= 2 ? 'low' : 'high';
  }, []);
}
