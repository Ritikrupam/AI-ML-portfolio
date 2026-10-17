import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sampleTextPoints } from './sampleText';

type Phase = 'forming' | 'idle' | 'burst';

/**
 * The signature motif. Particles begin scattered in a sphere, stream inward to
 * spell the "RRN" monogram, breathe gently while idle, and — when `phase`
 * flips to "burst" — blow outward into an ambient field behind the hero copy.
 * The whole cloud parallaxes with the pointer for depth.
 */
export default function ParticleLogo({
  count,
  phase,
}: {
  count: number;
  phase: Phase;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  // Target monogram positions (memoised — text rasterisation is one-shot).
  const targets = useMemo(() => {
    const pts = sampleTextPoints('RRN', count);
    // If font sampling yielded fewer points than asked, pad by repeating.
    if (pts.length / 3 < count) {
      const padded = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const src = (i % (pts.length / 3)) * 3;
        padded[i * 3] = pts[src] ?? 0;
        padded[i * 3 + 1] = pts[src + 1] ?? 0;
        padded[i * 3 + 2] = pts[src + 2] ?? 0;
      }
      return padded;
    }
    return pts;
  }, [count]);

  // Live buffers: current positions, scatter origins, burst velocities, colors.
  const { positions, scatter, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scat = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const white = new THREE.Color('#ffffff');
    const blood = new THREE.Color('#ff2d2d');

    for (let i = 0; i < count; i++) {
      // Random point on a large sphere = the "gathering from nothing" origin.
      const r = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      scat[i * 3] = pos[i * 3] = x;
      scat[i * 3 + 1] = pos[i * 3 + 1] = y;
      scat[i * 3 + 2] = pos[i * 3 + 2] = z;

      // Outward burst direction, seeded from the sphere position.
      const len = Math.hypot(x, y, z) || 1;
      const speed = 2 + Math.random() * 3;
      vel[i * 3] = (x / len) * speed;
      vel[i * 3 + 1] = (y / len) * speed;
      vel[i * 3 + 2] = (z / len) * speed;

      // ~14% of particles carry the red accent.
      const c = Math.random() < 0.14 ? blood : white;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, scatter: scat, velocities: vel, colors: col };
  }, [count]);

  const pointer = useRef({ x: 0, y: 0 });
  const clock = useRef(0);

  useFrame((state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const attr = pts.geometry.getAttribute('position') as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    clock.current += delta;

    // Ease pointer parallax toward the real pointer.
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.05;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.05;

    const dt = Math.min(delta, 0.05);

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      if (phase === 'burst') {
        // Integrate outward, with a touch of drag.
        velocities[ix] *= 0.98;
        velocities[iy] *= 0.98;
        velocities[iz] *= 0.98;
        arr[ix] += velocities[ix] * dt;
        arr[iy] += velocities[iy] * dt;
        arr[iz] += velocities[iz] * dt;
      } else {
        // Forming + idle: spring toward the monogram target with breathing.
        const breathe = phase === 'idle' ? Math.sin(clock.current * 1.4 + i * 0.05) * 0.03 : 0;
        const tx = targets[ix];
        const ty = targets[iy] + breathe;
        const tz = targets[iz];
        const k = phase === 'forming' ? 0.06 : 0.08;
        arr[ix] += (tx - arr[ix]) * k;
        arr[iy] += (ty - arr[iy]) * k;
        arr[iz] += (tz - arr[iz]) * k;
      }
    }

    attr.needsUpdate = true;

    // Whole-cloud parallax + slow drift.
    pts.rotation.y = pointer.current.x * 0.25 + clock.current * 0.02;
    pts.rotation.x = -pointer.current.y * 0.18;
    const targetScale = phase === 'burst' ? 1.1 : 1;
    pts.scale.x += (targetScale - pts.scale.x) * 0.02;
    pts.scale.y = pts.scale.z = pts.scale.x;

    // Nudge based on viewport so the monogram fits small screens.
    const fit = Math.min(1, viewport.width / 9);
    pts.position.z = -2 + (1 - fit) * -2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
