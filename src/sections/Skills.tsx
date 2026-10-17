import { useMemo, useState } from 'react';
import { skillGroups } from '../data/content';
import SplitHeading from '../components/SplitHeading';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  isHub: boolean;
};

const HUBS = [
  { x: 180, y: 170 },
  { x: 500, y: 170 },
  { x: 340, y: 410 },
];

const WIDTH = 680;
const HEIGHT = 560;
const RADIUS = 94;

export default function Skills() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  const { nodes, links } = useMemo(() => {
    const ns: Node[] = [];
    const ls: Array<[string, string]> = [];

    skillGroups.slice(0, HUBS.length).forEach((group, gi) => {
      const hubId = `hub-${gi}`;
      const hub = HUBS[gi];

      ns.push({
        id: hubId,
        label: group.label,
        x: hub.x,
        y: hub.y,
        isHub: true,
      });

      group.items.forEach((item, ii) => {
        const angle =
          (ii / Math.max(group.items.length, 1)) * Math.PI * 2 -
          Math.PI / 2;

        const id = `${gi}-${ii}`;

        ns.push({
          id,
          label: item,
          x: hub.x + Math.cos(angle) * RADIUS,
          y: hub.y + Math.sin(angle) * RADIUS,
          isHub: false,
        });

        ls.push([hubId, id]);
      });
    });

    if (skillGroups.length >= 3) {
      ls.push(
        ['hub-0', 'hub-1'],
        ['hub-1', 'hub-2'],
        ['hub-2', 'hub-0'],
      );
    }

    return { nodes: ns, links: ls };
  }, []);

  const linkOn = (a: string, b: string) =>
    active !== null && (a === active || b === active);

  return (
    <section
      id="skills"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32"
    >
      <div className="mb-12 flex flex-col gap-4 sm:mb-16">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-blood" />
          <span className="font-pixel text-[9px] uppercase tracking-[0.3em] text-blood">
            Toolkit / 04
          </span>
        </div>

        <SplitHeading
          text="One connected stack, model to interface."
          className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-blood-fade sm:text-5xl"
        />

        <p className="max-w-xl font-body text-sm leading-7 text-white/50 sm:text-base">
          The technologies behind the things I build — connected across
          development, data, and machine learning.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0b0d] shadow-[0_20px_100px_rgba(0,0,0,0.25)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-7">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blood shadow-[0_0_12px_rgba(255,45,45,0.8)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
              Skill Network
            </span>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
            Interactive Map
          </span>
        </div>

        <div className="relative">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="relative z-10 h-auto w-full"
            role="img"
            aria-label="Interactive network of skills grouped by category"
          >
            <defs>
              <radialGradient id="hubGlow">
                <stop offset="0%" stopColor="#ff2d2d" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ff2d2d" stopOpacity="0" />
              </radialGradient>
            </defs>

            {links.map(([a, b], i) => {
              const na = nodes.find((n) => n.id === a);
              const nb = nodes.find((n) => n.id === b);

              if (!na || !nb) return null;

              const on = linkOn(a, b);

              return (
                <line
                  key={i}
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke={on ? '#ff2d2d' : '#ffffff'}
                  strokeOpacity={on ? 0.8 : 0.13}
                  strokeWidth={on ? 1.5 : 0.8}
                  className="transition-all duration-300"
                />
              );
            })}

            {nodes.map((n) => {
              const on = active === n.id;
              const connected = active
                ? links.some(
                    ([a, b]) =>
                      (a === active && b === n.id) ||
                      (b === active && a === n.id),
                  )
                : false;

              return (
                <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                  {!reduced && (
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values={`${n.x} ${n.y}; ${n.x} ${n.y - 3}; ${n.x} ${n.y}`}
                      dur={`${4 + (n.x % 3)}s`}
                      repeatCount="indefinite"
                    />
                  )}

                  <g
                    onMouseEnter={() => setActive(n.id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(n.id)}
                    onBlur={() => setActive(null)}
                    onClick={() =>
                      setActive((current) => (current === n.id ? null : n.id))
                    }
                    tabIndex={0}
                    role="button"
                    aria-label={`${n.label}${n.isHub ? ' category' : ' skill'}`}
                    className="cursor-pointer outline-none"
                  >
                    {n.isHub ? (
                      <>
                        <circle r="48" fill="url(#hubGlow)" />

                        <circle
                          r={on ? 25 : 22}
                          fill="#101012"
                          stroke="#ff2d2d"
                          strokeOpacity={on ? 0.95 : 0.5}
                          strokeWidth={on ? 1.5 : 1}
                          className="transition-all duration-300"
                        />

                        <circle
                          r="4"
                          fill="#ff2d2d"
                          className={reduced ? '' : 'hub-pulse'}
                        />

                        <text
                          y="39"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          fontFamily="monospace"
                          letterSpacing="1"
                          className="select-none"
                        >
                          {n.label.toUpperCase()}
                        </text>
                      </>
                    ) : (
                      <>
                        <circle
                          r={on || connected ? 5 : 3}
                          fill={on || connected ? '#ff2d2d' : '#77777d'}
                          className="transition-all duration-200"
                        />

                        <text
                          y="-11"
                          textAnchor="middle"
                          fill={on ? '#ffffff' : connected ? '#ff7777' : '#a1a1aa'}
                          fontSize="10"
                          fontFamily="monospace"
                          className="select-none transition-colors duration-200"
                        >
                          {n.label}
                        </text>
                      </>
                    )}
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] px-5 py-4 sm:px-7">
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/35">
            {active
              ? `Selected: ${nodes.find((n) => n.id === active)?.label}`
              : 'Hover or select a node to explore'}
          </p>

          <button
            type="button"
            onClick={() => setActive(null)}
            className="font-mono text-[9px] uppercase tracking-widest text-blood transition-colors hover:text-white"
          >
            Reset network ↗
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {skillGroups.slice(0, HUBS.length).map((group, i) => (
          <button
            type="button"
            key={group.label}
            onMouseEnter={() => setActive(`hub-${i}`)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(`hub-${i}`)}
            onBlur={() => setActive(null)}
            onClick={() =>
              setActive((current) =>
                current === `hub-${i}` ? null : `hub-${i}`,
              )
            }
            className={`group rounded-xl border p-5 text-left transition-all duration-300 ${
              active === `hub-${i}`
                ? 'border-blood/50 bg-blood/[0.06]'
                : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/75">
                {group.label}
              </span>
              <span className="font-mono text-[10px] text-blood">
                0{i + 1}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/[0.08] bg-black/20 px-2.5 py-1.5 font-mono text-[10px] text-white/50 transition-colors group-hover:border-blood/20 group-hover:text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes hubPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }

        .hub-pulse {
          animation: hubPulse 2.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hub-pulse {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}