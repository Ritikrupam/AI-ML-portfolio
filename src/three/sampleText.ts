/**
 * Rasterises a short string to an offscreen canvas and returns evenly-sampled
 * 3D points that lie on the glyphs. These become the target positions the hero
 * particles fly into to spell the monogram. Sampling density scales with the
 * requested particle budget so lower device tiers get fewer points.
 */
export function sampleTextPoints(
  text: string,
  targetCount: number,
): Float32Array {
  const canvas = document.createElement('canvas');
  const w = 1000;
  const h = 360;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new Float32Array(0);

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#fff';
  ctx.font = '700 240px "Space Grotesk", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, w / 2, h / 2 + 10);

  const { data } = ctx.getImageData(0, 0, w, h);

  // Collect every lit pixel, then thin down to the target budget.
  const lit: Array<[number, number]> = [];
  const step = 3; // sampling stride keeps this cheap
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const alpha = data[(y * w + x) * 4];
      if (alpha > 128) lit.push([x, y]);
    }
  }

  if (lit.length === 0) return new Float32Array(0);

  const count = Math.min(targetCount, lit.length);
  const out = new Float32Array(count * 3);
  const scale = 0.012;

  for (let i = 0; i < count; i++) {
    // Even pick across the lit set with a little jitter for organic edges.
    const [px, py] = lit[Math.floor((i / count) * lit.length)];
    const jx = (Math.random() - 0.5) * step;
    const jy = (Math.random() - 0.5) * step;
    out[i * 3] = (px - w / 2 + jx) * scale;
    out[i * 3 + 1] = -(py - h / 2 + jy) * scale;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
  }

  return out;
}
