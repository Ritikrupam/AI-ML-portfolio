import { useRef, useState, type ReactNode } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type Ripple = { id: number; x: number; y: number };

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'solid' | 'ghost';
  className?: string;
  ariaLabel?: string;
  external?: boolean;
  type?: 'button' | 'submit';
};

/**
 * The site's one button system: sharp corners, a hard pixel shadow, and a
 * black/white/red palette. Hover lifts it and reveals a red RGB-split echo of
 * the label; click drops a ripple and a short physics-y press. Magnetic pull is
 * disabled under reduced-motion so it never fights the pointer.
 */
export default function PixelButton({
  children,
  href,
  onClick,
  variant = 'solid',
  className = '',
  ariaLabel,
  external,
  type = 'button',
}: Props) {
  const reduced = usePrefersReducedMotion();
  const magneticRef = useMagnetic<HTMLDivElement>(0.3, !reduced);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);

  const spawnRipple = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = idRef.current++;
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 650);
  };

  const isSolid = variant === 'solid';
  const base = isSolid
    ? 'bg-blood text-white shadow-pixel'
    : 'bg-white text-ink shadow-pixel-red';

  const inner = (
    <span className="relative z-10 flex items-center gap-2 font-pixel text-[10px] uppercase tracking-[0.15em]">
      {children}
    </span>
  );

  const rgbEcho = (
    <>
      {/* RGB-split echoes, revealed on hover via group utilities */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 font-pixel text-[10px] uppercase tracking-[0.15em] text-cyan-400 opacity-0 transition-all duration-150 group-hover:-translate-x-[2px] group-hover:opacity-40"
      >
        {typeof children === 'string' ? children : ''}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 font-pixel text-[10px] uppercase tracking-[0.15em] text-red-500 opacity-0 transition-all duration-150 group-hover:translate-x-[2px] group-hover:opacity-40"
      >
        {typeof children === 'string' ? children : ''}
      </span>
    </>
  );

  const rippleEls = ripples.map((r) => (
    <span
      key={r.id}
      className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60"
      style={{ left: r.x, top: r.y, animation: 'ripple 0.6s ease-out forwards' }}
    />
  ));

  const shared =
    `group relative inline-flex select-none items-center justify-center overflow-hidden px-6 py-3 ` +
    `transition-transform duration-150 will-change-transform active:translate-x-[3px] active:translate-y-[3px] ` +
    `active:shadow-none hover:-translate-y-0.5 ${base} ${className}`;

  const content = (
    <>
      {rgbEcho}
      {inner}
      {rippleEls}
      {/* Inline keyframes so the button is fully self-contained */}
      <style>{`@keyframes ripple{from{transform:translate(-50%,-50%) scale(1);opacity:.7}to{transform:translate(-50%,-50%) scale(22);opacity:0}}`}</style>
    </>
  );

  return (
    <div ref={magneticRef} className="inline-block" data-cursor="link">
      {href ? (
        <a
          href={href}
          onClick={spawnRipple}
          aria-label={ariaLabel}
          className={shared}
          {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        >
          {content}
        </a>
      ) : (
        <button
          type={type}
          aria-label={ariaLabel}
          onClick={(e) => {
            spawnRipple(e);
            onClick?.();
          }}
          className={shared}
        >
          {content}
        </button>
      )}
    </div>
  );
}
