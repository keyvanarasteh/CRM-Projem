/**
 * Internationalization (Svelte 5 runes).
 *
 * - Locales are bundled JSON files with nested keys.
 * - `t('a.b.c', params?)` resolves a key, falling back to English when a key is
 *   missing in the active locale, then to the raw key.
 * - On first run the locale is detected from the device (navigator.language),
 *   falling back to English. The choice persists to localStorage thereafter.
 * - Arabic ('ar') is right-to-left; `dir` reflects that and is applied to <html>.
 *
 * Adding a language: drop a new JSON in ./locales, then add one LOCALES entry.
 */

import en from "./locales/en.json";
import tr from "./locales/tr.json";
import de from "./locales/de.json";
import ar from "./locales/ar.json";

export type Locale = "en" | "tr" | "de" | "ar";
type Dict = Record<string, unknown>;

interface LocaleMeta {
  code: Locale;
  /** Endonym shown in the picker. */
  label: string;
  dir: "ltr" | "rtl";
  dict: Dict;
}

export const LOCALES: Record<Locale, LocaleMeta> = {
  en: { code: "en", label: "English", dir: "ltr", dict: en },
  tr: { code: "tr", label: "Türkçe", dir: "ltr", dict: tr },
  de: { code: "de", label: "Deutsch", dir: "ltr", dict: de },
  ar: { code: "ar", label: "العربية", dir: "rtl", dict: ar },
};

export const LOCALE_LIST = Object.values(LOCALES);
export const DEFAULT_LOCALE: Locale = "en";
const STORAGE_KEY = "qcrm.locale";
const isBrowser = typeof window !== "undefined";

function isLocale(v: string): v is Locale {
  return v in LOCALES;
}

/** Detect the best-fit bundled locale from the device, else English. */
export function detectDeviceLocale(): Locale {
  if (!isBrowser) return DEFAULT_LOCALE;
  const candidates = [navigator.language, ...(navigator.languages ?? [])];
  for (const c of candidates) {
    const base = c.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

function readInitialLocale(): Locale {
  if (!isBrowser) return DEFAULT_LOCALE;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && isLocale(saved)) return saved;
  } catch {
    /* ignore */
  }
  return detectDeviceLocale();
}

/** Walk a dotted path through a nested dictionary. */
function lookup(dict: Dict, path: string): string | undefined {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Dict)) {
      return (acc as Dict)[key];
    }
    return undefined;
  }, dict);
  return typeof value === "string" ? value : undefined;
}

function interpolate(str: string, params?: Record<string, string | number>): string {
  if (!params) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? `{${k}}`));
}

class I18nStore {
  locale = $state<Locale>(DEFAULT_LOCALE);

  constructor() {
    this.locale = readInitialLocale();
  }

  get dir(): "ltr" | "rtl" {
    return LOCALES[this.locale].dir;
  }

  /** Translate a key, with English fallback and {param} interpolation. */
  t = (key: string, params?: Record<string, string | number>): string => {
    const active = lookup(LOCALES[this.locale].dict, key);
    const resolved = active ?? lookup(LOCALES[DEFAULT_LOCALE].dict, key) ?? key;
    return interpolate(resolved, params);
  };

  setLocale(locale: Locale) {
    this.locale = locale;
    if (isBrowser) {
      try {
        localStorage.setItem(STORAGE_KEY, locale);
      } catch {
        /* ignore */
      }
    }
    this.apply();
  }

  /** Reflect language + direction onto <html>. Call on boot and on change. */
  apply() {
    if (!isBrowser) return;
    const root = document.documentElement;
    root.setAttribute("lang", this.locale);
    root.setAttribute("dir", this.dir);
  }
}

export const i18n = new I18nStore();

/** Convenience re-export so components can `import { t } from '$lib/i18n'`. */
export const t = i18n.t;
