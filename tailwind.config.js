/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        panel: '#111111',
        muted: '#666666',
        blood: '#FF2D2D',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        pixel: '4px 4px 0 0 #050505',
        'pixel-red': '4px 4px 0 0 #FF2D2D',
        'glow-red': '0 0 40px -8px rgba(255,45,45,0.55)',
        'glow-white': '0 0 40px -10px rgba(255,255,255,0.35)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        breathe: {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        breathe: 'breathe 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
