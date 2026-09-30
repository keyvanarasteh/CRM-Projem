/**
 * Palette helpers — generate and verify a 50…900 tonal ramp from a single seed
 * hex. Shipped presets carry pre-computed ramps for fidelity; this helper backs
 * a future "custom brand" flow and keeps generated ramps consistent.
 */

export type Ramp = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export const RAMP_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type RampStop = (typeof RAMP_STOPS)[number];

/** Lightness targets (0..1) per stop — 500 sits near the seed's own tone. */
const LIGHTNESS_TARGETS: Record<RampStop, number> = {
  50: 0.96,
  100: 0.92,
  200: 0.84,
  300: 0.72,
  400: 0.6,
  500: 0.52,
  600: 0.44,
  700: 0.36,
  800: 0.28,
  900: 0.2,
};

function clamp(n: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, n));
}

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const int = parseInt(full, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const to = (n: number) => Math.round(clamp(n, 0, 255)).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) {
    const v = l * 255;
    return [v, v, v];
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    hue2rgb(p, q, h + 1 / 3) * 255,
    hue2rgb(p, q, h) * 255,
    hue2rgb(p, q, h - 1 / 3) * 255,
  ];
}

/** Relative luminance (WCAG) for contrast decisions. */
export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Pick white or a near-black that reads best on the given background. */
export function contrastOn(hex: string): string {
  return luminance(hex) > 0.45 ? "#0f172a" : "#ffffff";
}

/** Build a full 50…900 ramp from a seed color, preserving its hue. */
export function rampFromSeed(seed: string): Ramp {
  const [h, s] = rgbToHsl(...hexToRgb(seed));
  const ramp = {} as Ramp;
  for (const stop of RAMP_STOPS) {
    const l = LIGHTNESS_TARGETS[stop];
    // Soften saturation at the extremes so tints/shades stay natural.
    const satAdj = stop <= 100 ? s * 0.55 : stop >= 800 ? s * 0.9 : s;
    const [r, g, b] = hslToRgb(h, clamp(satAdj), l);
    ramp[stop] = rgbToHex(r, g, b);
  }
  return ramp;
}
