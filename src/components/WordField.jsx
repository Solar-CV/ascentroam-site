import { useEffect, useRef } from 'react';

const WORD = 'ASCENTROAM';
const FONT_STACK = '"Barlow Condensed", "Arial Narrow", Arial, sans-serif';
const WEIGHTS = [0.55, 1.15, 2.1, 3.35];
const ALPHAS = [0.18, 0.34, 0.55, 0.8];

// Turn the wordmark into a field of quantized vertical strokes. The mask is
// sampled once; the resulting canvas is then drawn as a seamless marquee.
function buildWordmark(height, color) {
  const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
  const pad = height * 0.12;
  const fontSize = height * 0.84;
  const tracking = height * 0.032;
  const gap = height * 0.92;

  const probe = document.createElement('canvas').getContext('2d');
  probe.font = `700 ${fontSize}px ${FONT_STACK}`;
  const widths = [...WORD].map((ch) => probe.measureText(ch).width);
  const textWidth = widths.reduce((sum, w) => sum + w, 0) + tracking * (WORD.length - 1);
  const cssW = Math.ceil(textWidth + pad * 2 + gap);
  const cssH = Math.ceil(height);

  const mask = document.createElement('canvas');
  mask.width = Math.ceil(cssW * dpr);
  mask.height = Math.ceil(cssH * dpr);
  const m = mask.getContext('2d');
  m.scale(dpr, dpr);
  m.font = `700 ${fontSize}px ${FONT_STACK}`;
  m.textBaseline = 'middle';
  m.fillStyle = '#fff';
  let x = pad;
  [...WORD].forEach((ch, i) => {
    m.fillText(ch, x, cssH * 0.54);
    x += widths[i] + tracking;
  });

  const data = m.getImageData(0, 0, mask.width, mask.height).data;
  const cols = Math.round(Math.min(420, Math.max(140, cssW / 3.4)));
  const rows = Math.round(Math.min(84, Math.max(26, cssH / 3)));
  const cellW = cssW / cols;
  const cellH = cssH / rows;

  const word = document.createElement('canvas');
  word.width = mask.width;
  word.height = mask.height;
  const ctx = word.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.fillStyle = color;

  for (let c = 0; c < cols; c += 1) {
    let runStart = -1;
    let alphaSum = 0;
    let runCount = 0;

    for (let r = 0; r <= rows; r += 1) {
      let alpha = 0;
      if (r < rows) {
        for (let sy = 0; sy < 3; sy += 1) {
          for (let sx = 0; sx < 3; sx += 1) {
            const px = Math.min(
              mask.width - 1,
              Math.floor((c + (sx + 0.5) / 3) * cellW * dpr)
            );
            const py = Math.min(
              mask.height - 1,
              Math.floor((r + (sy + 0.5) / 3) * cellH * dpr)
            );
            alpha += data[(py * mask.width + px) * 4 + 3];
          }
        }
        alpha /= 9;
      }

      if (alpha > 18) {
        if (runStart < 0) {
          runStart = r;
          alphaSum = 0;
          runCount = 0;
        }
        alphaSum += alpha;
        runCount += 1;
      } else if (runStart >= 0) {
        const avg = alphaSum / Math.max(1, runCount) / 255;
        const level = avg > 0.72 ? 3 : avg > 0.44 ? 2 : avg > 0.2 ? 1 : 0;
        const stroke = Math.max(0.5, WEIGHTS[level] * (cellW / 4.2));
        ctx.globalAlpha = ALPHAS[level];
        ctx.fillRect(
          c * cellW + cellW * 0.5 - stroke * 0.5,
          runStart * cellH,
          stroke,
          (r - runStart) * cellH
        );
        runStart = -1;
      }
    }
  }

  return { canvas: word, width: cssW, height: cssH };
}

export default function WordField({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let wordmark = null;
    let width = 0;
    let height = 0;
    let frame = 0;
    let start = performance.now();
    let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const readInk = () => {
      const styles = getComputedStyle(document.documentElement);
      return styles.getPropertyValue('--ink').trim() || '#1a1c1a';
    };

    const draw = (now) => {
      if (!wordmark) return;
      ctx.clearRect(0, 0, width, height);
      const period = wordmark.width;
      const offset = reduced ? 0 : ((now - start) * 0.028) % period;
      for (let x = -offset; x < width; x += period) {
        ctx.drawImage(wordmark.canvas, x, 0, wordmark.width, wordmark.height);
      }
    };

    const loop = (now) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      wordmark = buildWordmark(height, readInk());
      draw(performance.now());
    };

    const onTheme = () => {
      wordmark = buildWordmark(height, readInk());
      draw(performance.now());
    };

    const onMotion = (event) => {
      reduced = event.matches;
      start = performance.now();
      draw(performance.now());
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const resizeObserver = new ResizeObserver(build);
    build();
    resizeObserver.observe(canvas);
    window.addEventListener('ar:theme', onTheme);
    motionQuery.addEventListener?.('change', onMotion);

    if (document.fonts?.load) {
      document.fonts.load(`700 ${Math.max(80, height * 0.84)}px "Barlow Condensed"`)
        .catch(() => {})
        .finally(() => {
          if (!height) return;
          wordmark = buildWordmark(height, readInk());
          draw(performance.now());
        });
    }

    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('ar:theme', onTheme);
      motionQuery.removeEventListener?.('change', onMotion);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
