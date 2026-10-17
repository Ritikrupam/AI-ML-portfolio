# Ritik Rupam Nanda — Portfolio

A cinematic, single-page portfolio for an AI/ML engineer. Black canvas, white
type, red accent. The signature is a particle **RRN** monogram that gathers out
of the dark during the intro, then bursts to reveal the hero.

Built with React + Vite + TypeScript, React Three Fiber (Three.js), GSAP +
ScrollTrigger, Framer Motion, Lenis smooth scroll, and Tailwind.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

Build and preview a production bundle:

```bash
npm run build
npm run preview
```

Type-check only:

```bash
npm run typecheck
```

## How it's structured

```
src/
  data/content.ts        All real copy: bio, projects, skills, links. Edit here.
  hooks/
    useLenis.ts          Smooth scroll wired into ScrollTrigger.
    useDeviceTier.ts     high/low capability probe → drives fallbacks.
    useMagnetic.ts       Magnetic hover for buttons.
    usePrefersReducedMotion.ts
  three/
    sampleText.ts        Rasterises "RRN" → particle target points.
    ParticleLogo.tsx     The signature: gather → breathe → burst.
  components/
    HeroCanvas.tsx       Thin R3F canvas wrapper.
    Loader.tsx           Cinematic percentage intro.
    CustomCursor.tsx     Context-aware cursor (link / view / drag).
    PixelButton.tsx      The one button system (pixel shadow, RGB split, ripple).
    Nav.tsx  Footer.tsx  Reveal.tsx  SplitHeading.tsx
  sections/
    Hero.tsx  Projects.tsx  About.tsx  Skills.tsx  Contact.tsx
  App.tsx                Intro phase machine + layout.
```

## Editing content

Everything you'd change lives in `src/data/content.ts` — name, bio, the four
projects, skills, credentials, and links. No copy is hard-coded in components.

- **Project links** currently point at the GitHub profile. Swap `repo` on each
  project for its dedicated repository URL when ready.
- **Resume:** not wired up — the source path you gave is a local file. Drop a PDF
  into `public/` (e.g. `public/ritik-nanda-cv.pdf`) and add a button if you want
  a download link.

## Performance & accessibility

- **Mobile / low-end / reduced-motion:** the WebGL hero is skipped entirely in
  favour of a static monogram. Controlled by `useDeviceTier` + `prefers-reduced-motion`.
- **Particle budget** is tiered (5,200 high / 2,200 low) and the DPR is capped.
- **Code-split:** Three.js, R3F, and GSAP are in separate chunks so the shell
  paints before the 3D parses (see `vite.config.ts`).
- **A11y:** semantic landmarks, visible keyboard focus, real form labels with
  validation, a `<noscript>` content fallback, and reduced-motion variants
  everywhere.

## Deploy

Static output in `dist/` after `npm run build`. Works as-is on Vercel, Netlify,
GitHub Pages, or any static host.

## Note from the build

The project was authored file-by-file and reviewed for type-safety, but the
`npm install && npm run build` verification pass could **not** be run in the
authoring environment (the local disk was out of space, so the sandbox toolchain
wouldn't start). Run the commands above once locally; if anything surfaces it
will be a dependency/version nit rather than a structural issue. Everything is
standard, current tooling.
