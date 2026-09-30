<div align="center">

# Q CRM

**Customer relationships, everywhere.**

A modern, cross-platform CRM built with Tauri 2, SvelteKit and TypeScript — one
codebase for desktop and mobile, with a full theming system, brand color presets
and multi-language support out of the box.

</div>

---

## Features

- **Cross-platform** — one codebase ships to Windows, Linux, macOS, Android and
  iOS (phones and tablets), via [Tauri 2](https://v2.tauri.app/).
- **Responsive & adaptive UI** — a sidebar layout on desktop that collapses to a
  drawer + bottom navigation on phones and tablets, with safe-area (notch)
  support. Usable from ~360 px up to large desktops.
- **Light / dark / system theming** — follows the operating system by default;
  users can force light or dark. No flash of the wrong theme on load.
- **Design-token color system** — every color, radius, spacing and typography
  value is a semantic CSS custom property. Components never hardcode colors.
- **Brand color presets** — pick a color set from Settings; changes apply
  instantly and persist. Ships with **Q CRM** (default), **Hepsiburada**,
  **Getir**, **Uber**, **Facebook**, **WhatsApp** and **Instagram**.
- **Internationalization** — **English, Turkish, German, Arabic** included, with
  **right-to-left** layout for Arabic. The app opens in the device language and
  falls back to English. Adding a language is a one-file change.

### Platform support

| Platform | Status | Build command |
| --- | --- | --- |
| Windows | ✅ | `bun run tauri build` |
| Linux | ✅ | `bun run tauri build` |
| macOS | ✅ | `bun run tauri build` |
| Android (phone/tablet) | ✅ | `bun run tauri android build` |
| iOS / iPadOS | ✅ | `bun run tauri ios build` |

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Shell / native | Tauri 2 (Rust) |
| Frontend | SvelteKit 2 + Svelte 5 (runes) |
| Language | TypeScript, Rust |
| Bundler | Vite 8 |
| Package manager | Bun |
| Rendering | `adapter-static`, SPA mode (`ssr = false`) |

---

## Getting started

### Prerequisites

- [Bun](https://bun.sh/)
- [Rust](https://www.rust-lang.org/tools/install) (stable) + Cargo
- Tauri 2 system dependencies — see the
  [Tauri prerequisites guide](https://v2.tauri.app/start/prerequisites/) for your OS
- For mobile: Android Studio / SDK (Android) or Xcode (iOS)

### Install & run

```bash
bun install

# Desktop dev (hot reload)
bun run tauri dev

# Frontend only, in the browser at http://localhost:1420
bun run dev

# Type-check
bun run check
```

### Build

```bash
# Desktop bundle for the current OS
bun run tauri build

# Mobile (first time, run the init once)
bun run tauri android init
bun run tauri android build

bun run tauri ios init
bun run tauri ios build
```

---

## Project structure

```
src/
  app.html                     # Boot guard: applies theme + language before first paint
  routes/
    +layout.svelte             # Responsive app shell (sidebar ↔ drawer + bottom nav)
    +page.svelte               # Dashboard
    settings/+page.svelte      # Appearance, color set, language
    customers|deals|tasks|reports/  # Placeholder screens
  lib/
    theme/
      tokens.css               # Semantic design tokens (light + dark)
      presets.ts               # Brand color-set presets
      palette.ts               # Seed → 50…900 ramp generator
      theme.svelte.ts          # Theme store (mode + preset), persistence
      viewport.svelte.ts       # Reactive breakpoint helper
    i18n/
      index.ts                 # Barrel
      store.svelte.ts          # i18n store: t(), detection, RTL
      locales/{en,tr,de,ar}.json
    components/                # SideNav, TopBar, BottomNav, pickers, Icon, …
src-tauri/                     # Rust backend + Tauri config
```

---

## Theming guide

Colors are expressed as a two-layer token system in
[`src/lib/theme/tokens.css`](src/lib/theme/tokens.css):

1. A **brand ramp** (`--brand-50` … `--brand-900`) injected at runtime from the
   active preset.
2. **Semantic tokens** (`--color-primary`, `--color-surface`, `--color-text`, …)
   that reference the ramp and the neutral scale, and are remapped for dark mode
   under `:root[data-theme="dark"]`.

**Always** style components with semantic tokens (`var(--color-primary)`), never
raw hex.

### Add a color-set preset

Add one entry to `PRESETS` in
[`src/lib/theme/presets.ts`](src/lib/theme/presets.ts) with a 50…900 ramp and an
accent. Hand-author the ramp, or generate one from a single seed color with
`rampFromSeed()` in [`src/lib/theme/palette.ts`](src/lib/theme/palette.ts). It
appears automatically in the Settings picker.

---

## Internationalization guide

Translations live in `src/lib/i18n/locales/*.json` as nested keys. Components
read them through `i18n.t('some.key')`.

### Add a language

1. Copy `locales/en.json` to `locales/<code>.json` and translate the values.
2. Register it in `LOCALES` in
   [`src/lib/i18n/store.svelte.ts`](src/lib/i18n/store.svelte.ts) with its
   endonym and `dir` (`"rtl"` for right-to-left scripts).

Missing keys fall back to English. Layout uses CSS logical properties, so RTL
works without duplicated styles.

---

## Contributing

See [AGENTS.md](AGENTS.md) for repository conventions (commands, structure, and
the token / i18n rules that keep the codebase consistent).

## License

MIT
