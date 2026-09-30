/**
 * Theme store (Svelte 5 runes).
 *
 * Owns two independent choices:
 *   - mode:   'system' | 'light' | 'dark'   (default 'system' → follows OS)
 *   - preset: which brand color set is active (default 'qcrm')
 *
 * `resolved` is the concrete light/dark actually rendered. Both choices persist
 * to localStorage and are applied to <html> via data-theme + --brand-* vars.
 * The inline boot script in app.html applies the same values before first paint
 * to avoid a flash; this store keeps them in sync at runtime.
 */

import { PRESETS, DEFAULT_PRESET, type BrandPresetId } from "./presets";

export type ThemeMode = "system" | "light" | "dark";

const STORAGE_KEY = "qcrm.theme";
const isBrowser = typeof window !== "undefined";

type Persisted = { mode: ThemeMode; preset: BrandPresetId };

function readPersisted(): Persisted {
  if (!isBrowser) return { mode: "system", preset: DEFAULT_PRESET };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Persisted>;
      return {
        mode: parsed.mode ?? "system",
        preset: parsed.preset && parsed.preset in PRESETS ? parsed.preset : DEFAULT_PRESET,
      };
    }
  } catch {
    /* ignore corrupt storage */
  }
  return { mode: "system", preset: DEFAULT_PRESET };
}

function systemPrefersDark(): boolean {
  return isBrowser && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

class ThemeStore {
  mode = $state<ThemeMode>("system");
  preset = $state<BrandPresetId>(DEFAULT_PRESET);
  /** Live snapshot of the OS preference, updated by the media listener. */
  #systemDark = $state<boolean>(false);

  constructor() {
    const persisted = readPersisted();
    this.mode = persisted.mode;
    this.preset = persisted.preset;
    this.#systemDark = systemPrefersDark();
  }

  /** The concrete scheme rendered right now. */
  get resolved(): "light" | "dark" {
    if (this.mode === "system") return this.#systemDark ? "dark" : "light";
    return this.mode;
  }

  /** Start listening to OS scheme changes; returns a cleanup fn. Call in onMount. */
  listen(): () => void {
    if (!isBrowser) return () => {};
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      this.#systemDark = e.matches;
      this.apply();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }

  setMode(mode: ThemeMode) {
    this.mode = mode;
    this.persist();
    this.apply();
  }

  setPreset(preset: BrandPresetId) {
    this.preset = preset;
    this.persist();
    this.apply();
  }

  /** Write data-theme + brand ramp onto <html>. */
  apply() {
    if (!isBrowser) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", this.resolved);

    const p = PRESETS[this.preset];
    root.style.setProperty("--brand-50", p.ramp[50]);
    root.style.setProperty("--brand-100", p.ramp[100]);
    root.style.setProperty("--brand-200", p.ramp[200]);
    root.style.setProperty("--brand-300", p.ramp[300]);
    root.style.setProperty("--brand-400", p.ramp[400]);
    root.style.setProperty("--brand-500", p.ramp[500]);
    root.style.setProperty("--brand-600", p.ramp[600]);
    root.style.setProperty("--brand-700", p.ramp[700]);
    root.style.setProperty("--brand-800", p.ramp[800]);
    root.style.setProperty("--brand-900", p.ramp[900]);
    root.style.setProperty("--brand-contrast", p.contrast);
    root.style.setProperty("--brand-accent", p.accent);
    root.style.setProperty(
      "--brand-gradient",
      p.gradient ?? `linear-gradient(135deg, ${p.ramp[500]}, ${p.ramp[700]})`,
    );

    // Keep the native UI (mobile status bar / titlebar hint) in sync.
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = this.resolved === "dark" ? "#020617" : p.ramp[600];
  }

  persist() {
    if (!isBrowser) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ mode: this.mode, preset: this.preset } satisfies Persisted),
      );
    } catch {
      /* storage unavailable (private mode) — non-fatal */
    }
  }
}

export const theme = new ThemeStore();
