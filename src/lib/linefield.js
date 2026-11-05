// Quantized Line Field — Canvas 2D, four line weights, seeded drift.
// Sampling happens once per resize; animation only re-quantizes.

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function hexToRgb(hex) {
  const h = String(hex).trim().replace('#', '');
  if (h.length === 3) {
    return [0, 1, 2].map((i) => parseInt(h[i] + h[i], 16));
  }
  if (h.length !== 6) return [33, 82, 231];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function makePRNG(seed) {
  let s = seed | 0 || 7319;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}

function makeNoise(seed) {
  const R = 128;
  const rnd = makePRNG(seed);
  const grid = new Float32Array(R * R);
  for (let i = 0; i < grid.length; i++) grid[i] = rnd();
  const smooth = (t) => t * t * (3 - 2 * t);
  const at = (x, y) => grid[(y & 127) * R + (x & 127)];
  return (x, y) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const u = smooth(xf);
    const v = smooth(yf);
    const a = at(xi, yi);
    const b = at(xi + 1, yi);
    const c = at(xi, yi + 1);
    const d = at(xi + 1, yi + 1);
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
  };
}

const imageCache = new Map();
function loadImage(src) {
  if (imageCache.has(src)) return imageCache.get(src);
  const p = new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
  imageCache.set(src, p);
  return p;
}

function sampleImage(img, cols, rows, mode, focusX = 0.5, focusY = 0.5, skyMask = false) {
  const S = 5;
  const scratch = document.createElement('canvas');
  scratch.width = cols * S;
  scratch.height = rows * S;
  const ctx = scratch.getContext('2d', { willReadFrequently: true });
  const cw = scratch.width;
  const ch = scratch.height;
  const scale = Math.max(cw / img.width, ch / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, (cw - dw) * focusX, (ch - dh) * focusY, dw, dh);
  const data = ctx.getImageData(0, 0, cw, ch).data;
  const values = new Float32Array(cols * rows);
  const mask = new Float32Array(cols * rows);
  const skyline = new Int16Array(cols).fill(-1);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let lum = 0;
      let a = 0;
      let lum2 = 0;
      for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
          const px = c * S + x;
          const py = r * S + y;
          const i = (py * cw + px) * 4;
          const alpha = data[i + 3] / 255;
          const l =
            (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          lum += l * alpha;
          lum2 += l * l * alpha;
          a += alpha;
        }
      }
      const area = S * S;
      const alpha = a / area;
      const l = a > 0 ? lum / a : 0;
      const variance = a > 0 ? Math.max(0, lum2 / a - l * l) : 0;
      const detail = Math.sqrt(variance);
      const idx = r * cols + c;

      if (mode === 'badge') {
        mask[idx] = alpha;
        // the object keeps a minimum weight so the silhouette reads
        values[idx] = clamp(0.34 + l * 0.78, 0, 1);
      } else {
        mask[idx] = 1;
        // ink mapping: shadow earns the heavy lines, snow stays airy
        const v = clamp((0.8 - l) / 0.8, 0, 1);
        let value = Math.pow(v, 0.92);
        if (skyMask) {
          // The flat sky carries no texture; gating on local detail removes it
          // while keeping the rock faces and the summit silhouette.
          const t = clamp((detail - 0.006) / 0.03, 0, 1);
          const texture = t * t * (3 - 2 * t);
          if (skyline[c] < 0 && detail > 0.016) skyline[c] = r;
          value *= 0.06 + 0.94 * texture;
        }
        values[idx] = value;
      }
    }
  }
  return { values, mask, skyline };
}

function ridgeGrid(cols, rows, seed) {
  const rnd = makePRNG(seed || 17);
  const noise = makeNoise(seed || 17);
  const values = new Float32Array(cols * rows);
  const mask = new Float32Array(cols * rows);
  const ph = [rnd() * 6.28, rnd() * 6.28, rnd() * 6.28];
  const amp = 0.1 + rnd() * 0.08;
  for (let c = 0; c < cols; c++) {
    const t = c / cols;
    const ridge =
      0.52 +
      Math.sin(t * 3.1 + ph[0]) * amp +
      Math.sin(t * 6.7 + ph[1]) * amp * 0.45 +
      Math.sin(t * 13.3 + ph[2]) * amp * 0.18;
    const r0 = Math.floor(ridge * rows);
    for (let r = 0; r < rows; r++) {
      const idx = r * cols + c;
      if (r < r0) {
        // sky: a very light field, thinning upward
        values[idx] = 0.04 + noise(c * 0.21, r * 0.2) * 0.1;
        mask[idx] = 1;
      } else {
        const depth = (r - r0) / Math.max(1, rows - r0);
        const band = Math.sin(r * 0.9 + c * 0.06) * 0.07;
        values[idx] = clamp(
          0.62 + depth * 0.24 + band + noise(c * 0.18, r * 0.14) * 0.22,
          0,
          1
        );
        mask[idx] = 1;
      }
    }
  }
  return { values, mask };
}

function ringsGrid(cols, rows, seed) {
  const noise = makeNoise(seed || 23);
  const values = new Float32Array(cols * rows);
  const mask = new Float32Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c / cols - 0.5) * 1.6;
      const y = (r / rows - 0.52) * 1.9;
      const wob = (noise(c * 0.07 + 5.2, r * 0.07 + 1.3) - 0.5) * 0.26;
      const d = Math.sqrt(x * x + y * y * 1.12) + wob;
      const n = noise(c * 0.12, r * 0.12) * 0.16;
      const band = Math.sin(d * 14 + n * 9) * 0.5 + 0.5;
      values[r * cols + c] = clamp(0.05 + Math.pow(band, 3.6) * 0.7, 0, 0.745);
      mask[r * cols + c] = 1;
    }
  }
  return { values, mask };
}

function matrixGrid(cols, rows, seed) {
  const rnd = makePRNG(seed || 41);
  const noise = makeNoise(seed || 41);
  const values = new Float32Array(cols * rows);
  const mask = new Float32Array(cols * rows);
  const cols2 = Math.max(8, Math.round(cols * 0.55));
  const rows2 = Math.max(6, Math.round(rows * 0.55));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      mask[i] = 1;
      const cellC = Math.floor((c / cols) * cols2);
      const cellR = Math.floor((r / rows) * rows2);
      const h = rnd();
      const n = noise(cellC * 0.5, cellR * 0.5);
      values[i] = clamp(0.1 + n * 0.5 + (h > 0.72 ? 0.4 : 0), 0, 1);
    }
  }
  return { values, mask };
}

const WIDTHS = [0.36, 1.05, 2.2, 3.6];
const ALPHAS = [0.16, 0.45, 0.72, 0.95];
const THRESH = [0.16, 0.44, 0.78];

export class LineField {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.opts = opts;
    this.src = opts.src || null;
    this.mode = opts.mode || 'photo';
    this.seed = opts.seed || 7319;
    this.animate = !!opts.animate;
    this.cell = opts.cell || 7;
    this.columns = opts.columns || 0;
    this.cellAspect = opts.cellAspect || 1.72;
    this.focusX = opts.focusX ?? 0.5;
    this.focusY = opts.focusY ?? 0.5;
    this.lens = !!opts.lens;
    this.finePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    this.noise = makeNoise(this.seed);
    this.cols = 40;
    this.rows = 20;
    this.values = null;
    this.mask = null;
    this.skyline = null;
    this.cssW = 0;
    this.cssH = 0;
    this.t = 0;
    this.born = 0;
    this.raf = null;
    this.img = null;
    this.pointer = {
      x: -9999,
      y: -9999,
      clientX: -9999,
      clientY: -9999,
      impulseX: -9999,
      impulseY: -9999,
      dirty: false,
      active: false,
      pulse: 0,
    };
    this.dx = new Float32Array(0);
    this.dy = new Float32Array(0);
    this.vx = new Float32Array(0);
    this.vy = new Float32Array(0);
    this.active = true;
    this.reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this._onTheme = () => {
      this.readColors();
      if (this.values) this.draw(this.t || 0);
    };
    this._onEnter = (e) => this.onPointer(e, true);
    this._onDown = (e) => this.onPointer(e, true);
    this._onMove = (e) => this.onPointer(e, false);
    this._onLeave = () => this.onLeave();

    this.readColors();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);
    if (this.animate && !this.reduced) {
      this.io = new IntersectionObserver(
        (entries) => {
          this.active = entries[0].isIntersecting;
        },
        { rootMargin: '120px' }
      );
      this.io.observe(canvas.parentElement || canvas);
      if (this.finePointer && this.lens) {
        canvas.parentElement?.addEventListener('pointerenter', this._onEnter, { passive: true });
        canvas.parentElement?.addEventListener('pointerdown', this._onDown, { passive: true });
        canvas.parentElement?.addEventListener('pointermove', this._onMove, { passive: true });
        canvas.parentElement?.addEventListener('pointerleave', this._onLeave, { passive: true });
      }
    }
    window.addEventListener('ar:theme', this._onTheme);
    this.resize();
  }

  readColors() {
    const cs = getComputedStyle(this.canvas);
    this.ink = (cs.getPropertyValue('--field-ink') || '#1a1c1a').trim();
    this.accent = (cs.getPropertyValue('--field-accent') || '#2152e7').trim();
    this.accentRGB = hexToRgb(this.accent);
    const boost = parseFloat(cs.getPropertyValue('--field-boost'));
    this.boost = Number.isFinite(boost) && boost > 0 ? Math.min(boost, 3) : 1;
  }

  onPointer(e, impulse = false) {
    const p = this.pointer;
    const moved = Math.hypot(e.clientX - p.impulseX, e.clientY - p.impulseY) > 1.5;
    if (impulse || moved) {
      p.pulse = 1;
      p.impulseX = e.clientX;
      p.impulseY = e.clientY;
    }
    p.clientX = e.clientX;
    p.clientY = e.clientY;
    p.active = true;
    p.dirty = true;
  }

  onLeave() {
    const p = this.pointer;
    p.active = false;
    p.pulse = 0;
    p.impulseX = -9999;
    p.impulseY = -9999;
    p.dirty = true;
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (!w || !h) return;
    if (w === this.cssW && h === this.cssH) return;
    this.cssW = w;
    this.cssH = h;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.cols = this.columns
      ? clamp(Math.round(this.columns), 20, 240)
      : clamp(Math.round(w / this.cell), 20, 200);
    this.rows = Math.max(8, Math.round(h / (w / this.cols) / this.cellAspect));
    const n = this.cols * this.rows;
    this.dx = new Float32Array(n);
    this.dy = new Float32Array(n);
    this.vx = new Float32Array(n);
    this.vy = new Float32Array(n);
    this.pointer.dirty = true;
    this.buildGrid();
  }

  buildGrid() {
    if (this.mode === 'ridge') {
      const g = ridgeGrid(this.cols, this.rows, this.seed);
      this.values = g.values;
      this.mask = g.mask;
      this.draw(0);
    } else if (this.mode === 'rings') {
      const g = ringsGrid(this.cols, this.rows, this.seed);
      this.values = g.values;
      this.mask = g.mask;
      this.draw(0);
    } else if (this.mode === 'matrix') {
      const g = matrixGrid(this.cols, this.rows, this.seed);
      this.values = g.values;
      this.mask = g.mask;
      this.draw(0);
    } else if (this.src) {
      loadImage(this.src)
        .then((img) => {
          this.img = img;
          const g = sampleImage(
            img,
            this.cols,
            this.rows,
            this.mode,
            this.focusX,
            this.focusY,
            Boolean(this.opts.skyMask)
          );
          this.values = g.values;
          this.mask = g.mask;
          this.skyline = g.skyline;
          this.born = this.t;
          this.draw(this.t);
        })
        .catch(() => {});
    }
  }

  start() {
    if (!this.animate || this.reduced || this.raf) return;
    const step = (t) => {
      this.raf = requestAnimationFrame(step);
      const now = t / 1000;
      if (!this.last) this.last = now;
      const dt = Math.min(0.05, now - this.last);
      this.last = now;
      if (!this.active) return;
      this.t += dt;
      if (this.pointer.active) this.pointer.pulse *= Math.exp(-dt * 3.2);
      else this.pointer.pulse = 0;
      this.draw(this.t, dt);
    };
    this.raf = requestAnimationFrame(step);
  }

  draw(t, dt = 0) {
    if (!this.values || !this.cssW) return;
    const { ctx, cols, rows, values, mask, cssW: w, cssH: h } = this;
    const n = cols * rows;
    if (this.dx.length !== n) {
      this.dx = new Float32Array(n);
      this.dy = new Float32Array(n);
      this.vx = new Float32Array(n);
      this.vy = new Float32Array(n);
    }
    ctx.clearRect(0, 0, w, h);
    const cell = w / cols;
    const segH = h / rows;
    const base = cell / 5.25;
    const widths = WIDTHS.map((v) => Math.max(0.55, v * base));
    const paths = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
    const gap = Math.min(0.8, segH * 0.08);
    const fade = this.born ? clamp((t - this.born) / 1.1, 0, 1) : 1;
    const p = this.pointer;
    if (p.dirty) {
      const rect = this.canvas.getBoundingClientRect();
      p.x = p.clientX - rect.left;
      p.y = p.clientY - rect.top;
      p.dirty = false;
    }
    const lens = this.lens;
    const hasPointer = lens && p.active && p.x > -1000;
    const strength = hasPointer ? p.pulse : 0;
    // Half the earlier reach; the impulse strength is unchanged.
    const radius = Math.max(45, Math.min(w, h) * 0.125);
    const maxForce = Math.min(72, Math.max(28, cell * 4.2));
    const steps = dt > 0 ? Math.max(1, Math.ceil(dt / 0.033)) : 0;
    const stepH = steps ? dt / steps : 0;
    const scan = ((t * 0.055) % 1.5 - 0.25) * rows;
    const drift = t * 0.22;

    for (let r = 0; r < rows; r++) {
      const y0 = r * segH + gap * 0.5;
      const y1 = (r + 1) * segH - gap * 0.5;
      const yc = (y0 + y1) * 0.5;
      const scanBoost = 0.2 * Math.exp(-Math.pow((r - scan) / 2.4, 2));
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const m = mask[idx];
        if (m < 0.22) continue;
        const x = (c + 0.5) * cell;

        // StyleKit pulse-spring: the pointer injects a radial impulse,
        // the grid pushes away, then springs back to its measured position.
        if (lens && steps) {
          let tx = 0;
          let ty = 0;
          if (strength > 0.002) {
            const ddx = x - p.x;
            const ddy = yc - p.y;
            const dist = Math.hypot(ddx, ddy);
            if (dist > 0.001) {
              const influence = Math.max(0, 1 - dist / radius);
              const force = influence * influence * strength * maxForce;
              tx = (ddx / dist) * force;
              ty = (ddy / dist) * force * 0.58;
            }
          }
          let jx = this.dx[idx];
          let jy = this.dy[idx];
          let vx = this.vx[idx];
          let vy = this.vy[idx];
          for (let s = 0; s < steps; s++) {
            vx += ((tx - jx) * 120 - vx * 14) * stepH;
            jx += vx * stepH;
            vy += ((ty - jy) * 120 - vy * 14) * stepH;
            jy += vy * stepH;
          }
          this.dx[idx] = jx;
          this.dy[idx] = jy;
          this.vx[idx] = vx;
          this.vy[idx] = vy;
        }

        const jx = this.dx[idx];
        const jy = this.dy[idx];
        const nv = this.noise(c * 0.15 + 3.1, r * 0.16 - drift);
        let v = values[idx] * 0.94 + nv * 0.12 * (0.25 + values[idx] * 0.75);
        v += scanBoost;
        v = clamp(v, 0, 1);
        const q = v < THRESH[0] ? 0 : v < THRESH[1] ? 1 : v < THRESH[2] ? 2 : 3;
        const sway = Math.sin(t * 0.4 + c * 0.18 + r * 0.02) * 0.35;
        const x0 = x + jx + sway;
        paths[q].moveTo(x0, y0 + jy);
        paths[q].lineTo(x0, y1 + jy);
      }
    }

    ctx.lineCap = 'butt';
    for (let q = 0; q < 4; q++) {
      ctx.globalAlpha = Math.min(1, ALPHAS[q] * this.boost) * fade;
      ctx.strokeStyle = this.ink;
      ctx.lineWidth = widths[q];
      ctx.stroke(paths[q]);
    }

    // a single surveyed contour over the texture, so the mass reads as a ridge
    if (this.skyline && this.mode === 'photo' && this.opts.skyMask) {
      ctx.globalAlpha = 0.56 * fade;
      ctx.strokeStyle = this.ink;
      ctx.lineWidth = 1.15;
      ctx.beginPath();
      let prev = null;
      for (let c = 0; c < cols; c++) {
        const near = [];
        for (let k = -1; k <= 1; k++) {
          const v = this.skyline[c + k];
          if (v >= 2) near.push(v);
        }
        if (!near.length) {
          prev = null;
          continue;
        }
        near.sort((a, b) => a - b);
        const rr = near[Math.floor(near.length / 2)];
        const x = (c + 0.5) * cell;
        const y = rr * segH;
        if (prev === null || Math.abs(rr - prev) > 7) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        prev = rr;
      }
      ctx.stroke();
    }

    // a small survey cursor; the interference itself is in the line field
    if (lens && hasPointer) {
      const R = Math.max(10, Math.min(18, cell * 0.9));
      const a = (0.22 + p.pulse * 0.5) * fade;
      ctx.strokeStyle = this.accent;
      ctx.globalAlpha = a;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      for (let k = 0; k < 4; k++) {
        const angle = (Math.PI / 2) * k;
        const r0 = R * 0.55;
        ctx.moveTo(p.x + Math.cos(angle) * r0, p.y + Math.sin(angle) * r0);
        ctx.lineTo(p.x + Math.cos(angle) * R, p.y + Math.sin(angle) * R);
      }
      ctx.stroke();

      ctx.globalAlpha = Math.min(1, a * 1.25);
      ctx.fillStyle = this.accent;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // the scan rule: one thin accent line sweeping the field
    if (this.animate && !this.reduced && scan > 0 && scan < rows) {
      ctx.globalAlpha = 0.16 * fade;
      ctx.strokeStyle = this.accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, Math.round(scan * segH) + 0.5);
      ctx.lineTo(w, Math.round(scan * segH) + 0.5);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  destroy() {
    this.ro?.disconnect();
    this.io?.disconnect();
    if (this.raf) cancelAnimationFrame(this.raf);
    this.canvas.parentElement?.removeEventListener('pointerenter', this._onEnter);
    this.canvas.parentElement?.removeEventListener('pointerdown', this._onDown);
    this.canvas.parentElement?.removeEventListener('pointermove', this._onMove);
    this.canvas.parentElement?.removeEventListener('pointerleave', this._onLeave);
    window.removeEventListener('ar:theme', this._onTheme);
  }
}
