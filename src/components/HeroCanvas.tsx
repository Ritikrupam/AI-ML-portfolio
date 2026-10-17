import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import ParticleLogo from '../three/ParticleLogo';

type Phase = 'forming' | 'idle' | 'burst';

/**
 * WebGL layer for the hero. Kept deliberately thin: one particle system, a
 * little fog for depth, and a capped DPR so it never over-renders on retina.
 * Rendered only on the high device tier — low-tier devices get a CSS fallback
 * from the parent, honouring the "no heavy WebGL on phones" contract.
 */
export default function HeroCanvas({
  phase,
  particleCount,
}: {
  phase: Phase;
  particleCount: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <fog attach="fog" args={['#050505', 8, 20]} />
      <Suspense fallback={null}>
        <ParticleLogo count={particleCount} phase={phase} />
      </Suspense>
    </Canvas>
  );
}
