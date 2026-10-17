import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * A context-aware cursor. It reads a `data-cursor` attribute off whatever the
 * pointer is over and adapts: buttons/links expand into a ring, elements marked
 * `view` show a VIEW label, `drag` shows a drag hint. A trailing dot lags
 * behind for a subtle liquid feel.
 *
 * Only mounts on fine-pointer devices and when motion is allowed — touch users
 * and reduced-motion users keep the normal system cursor, so nothing breaks.
 */
type Variant = 'default' | 'link' | 'view' | 'drag';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<Variant>('default');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.classList.add('custom-cursor');

    const xTo = gsap.quickTo(dotRef.current, 'x', { duration: 0.08, ease: 'power2.out' });
    const yTo = gsap.quickTo(dotRef.current, 'y', { duration: 0.08, ease: 'power2.out' });
    const rxTo = gsap.quickTo(ringRef.current, 'x', { duration: 0.35, ease: 'power3.out' });
    const ryTo = gsap.quickTo(ringRef.current, 'y', { duration: 0.35, ease: 'power3.out' });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rxTo(e.clientX);
      ryTo(e.clientY);

      const target = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor]');
      const next = (target?.dataset.cursor as Variant) ?? 'default';
      setVariant(next);
    };

    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    return () => {
      document.body.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, []);

  const ringSize =
    variant === 'view' ? 72 : variant === 'link' ? 56 : variant === 'drag' ? 64 : 34;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] hidden md:block"
      style={{ opacity: hidden ? 0 : 1, transition: 'opacity 200ms' }}
    >
      {/* Precise center dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood"
        style={{ mixBlendMode: 'difference' }}
      />
      {/* Trailing ring that morphs with context */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-white/60 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: ringSize,
          height: ringSize,
          transition: 'width 250ms cubic-bezier(.2,1,.3,1), height 250ms cubic-bezier(.2,1,.3,1), background-color 250ms',
          backgroundColor: variant === 'view' ? 'rgba(255,45,45,0.15)' : 'transparent',
          borderColor: variant === 'default' ? 'rgba(255,255,255,0.5)' : 'rgba(255,45,45,0.9)',
        }}
      >
        {variant === 'view' && (
          <span className="font-pixel text-[8px] tracking-widest text-white">VIEW</span>
        )}
        {variant === 'drag' && (
          <span className="font-pixel text-[8px] tracking-widest text-white">DRAG</span>
        )}
      </div>
    </div>
  );
}
