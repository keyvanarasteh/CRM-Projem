/**
 * Brand presets — user-selectable color sets configured from Settings.
 *
 * Each preset carries a full 50…900 brand ramp plus a contrast color, an accent
 * and an optional gradient. The theme store injects these onto <html> as CSS
 * custom properties (--brand-*), which the semantic tokens in tokens.css then
 * reference. Adding a new preset = add one entry here; ramps can be authored by
 * hand or generated with `rampFromSeed()` from ./palette.
 */

import { rampFromSeed, contrastOn, type Ramp } from "./palette";

export type BrandPresetId =
  | "qcrm"
  | "hepsiburada"
  | "getir"
  | "uber"
  | "facebook"
  | "whatsapp"
  | "instagram";

export interface BrandPreset {
  id: BrandPresetId;
  /** Display name (not translated — these are proper brand names). */
  name: string;
  /** Full tonal ramp used for --brand-50 … --brand-900. */
  ramp: Ramp;
  /** Readable foreground on the primary color. */
  contrast: string;
  /** Secondary highlight color. */
  accent: string;
  /** Optional brand gradient exposed as --brand-gradient. */
  gradient?: string;
  /** Swatch shown in the picker (usually the 600 stop). */
  swatch: string;
}

function preset(
  id: BrandPresetId,
  name: string,
  ramp: Ramp,
  accent: string,
  gradient?: string,
): BrandPreset {
  const swatch = ramp[600];
  return { id, name, ramp, accent, gradient, swatch, contrast: contrastOn(swatch) };
}

export const PRESETS: Record<BrandPresetId, BrandPreset> = {
  qcrm: preset(
    "qcrm",
    "Q CRM",
    {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
    },
    "#06b6d4",
  ),

  hepsiburada: preset(
    "hepsiburada",
    "Hepsiburada",
    {
      50: "#fff4ec",
      100: "#ffe6d5",
      200: "#ffc8a8",
      300: "#ffa270",
      400: "#ff7d3f",
      500: "#ff6000",
      600: "#e85400",
      700: "#c04400",
      800: "#983600",
      900: "#7a2c00",
    },
    "#ffffff",
  ),

  getir: preset(
    "getir",
    "Getir",
    {
      50: "#f3f0fc",
      100: "#e7e0f9",
      200: "#cabdf0",
      300: "#a894e6",
      400: "#8367d6",
      500: "#6a4bc9",
      600: "#5d3ebc",
      700: "#4c33a0",
      800: "#3c2880",
      900: "#2f1f66",
    },
    "#ffd300",
  ),

  uber: preset(
    "uber",
    "Uber",
    {
      50: "#f2f2f2",
      100: "#e0e0e0",
      200: "#c2c2c2",
      300: "#9e9e9e",
      400: "#6b6b6b",
      500: "#3d3d3d",
      600: "#1f1f1f",
      700: "#141414",
      800: "#0a0a0a",
      900: "#000000",
    },
    "#06c167",
  ),

  facebook: preset(
    "facebook",
    "Facebook",
    {
      50: "#e8f1fe",
      100: "#d3e4fd",
      200: "#a8c9fb",
      300: "#7aacf8",
      400: "#4a8ef5",
      500: "#2b7cf3",
      600: "#1877f2",
      700: "#1461cc",
      800: "#104da3",
      900: "#0d3c80",
    },
    "#ffffff",
  ),

  whatsapp: preset(
    "whatsapp",
    "WhatsApp",
    {
      50: "#e7faf0",
      100: "#c8f5db",
      200: "#93ebb8",
      300: "#5cdf92",
      400: "#33d474",
      500: "#25d366",
      600: "#1eb958",
      700: "#189748",
      800: "#137539",
      900: "#0e5c2d",
    },
    "#128c7e",
  ),

  instagram: preset(
    "instagram",
    "Instagram",
    {
      50: "#fdecf3",
      100: "#fbd9e7",
      200: "#f6b2cf",
      300: "#f085b1",
      400: "#e95d95",
      500: "#e1306c",
      600: "#d02461",
      700: "#a81d4f",
      800: "#84173e",
      900: "#661231",
    },
    "#f58529",
    "linear-gradient(135deg, #f9ce34, #ee2a7b 55%, #6228d7)",
  ),
};

export const PRESET_LIST: BrandPreset[] = Object.values(PRESETS);
export const DEFAULT_PRESET: BrandPresetId = "qcrm";

/** Build a runtime preset from an arbitrary seed (future custom-brand flow). */
export function customPreset(name: string, seed: string, accent?: string): BrandPreset {
  const ramp = rampFromSeed(seed);
  return {
    id: "qcrm",
    name,
    ramp,
    accent: accent ?? ramp[400],
    swatch: ramp[600],
    contrast: contrastOn(ramp[600]),
  };
}
