# AGENTS.md

Conventions for AI coding agents and contributors working in this repository.
This file is the source of truth; `CLAUDE.md` points here.

## Project

Q CRM — a cross-platform CRM. **Tauri 2 (Rust)** shell + **SvelteKit 2 / Svelte 5
(runes)** frontend in **TypeScript**, bundled with **Vite 8**, managed with
**Bun**. Rendered as an SPA (`adapter-static`, `ssr = false`) because Tauri has
no Node server. Targets desktop (Windows/Linux/macOS) and mobile (Android/iOS).

## Commands

```bash
bun install            # install deps
bun run dev            # frontend only, http://localhost:1420
bun run tauri dev      # full desktop app with hot reload
bun run check          # svelte-check + tsc — MUST pass before done
bun run build          # production frontend build → build/
bun run tauri build    # native desktop bundle
```

Always run `bun run check` after changes; keep it at 0 errors / 0 warnings.

## Structure

```
src/routes/            # SvelteKit routes (+layout.svelte is the app shell)
src/lib/theme/         # tokens.css, presets.ts, palette.ts, theme.svelte.ts, viewport.svelte.ts
src/lib/i18n/          # store.svelte.ts (runes) + index.ts barrel + locales/*.json
src/lib/components/    # UI components
src/app.html           # pre-paint boot guard for theme + language
src-tauri/             # Rust backend + tauri.conf.json
```

## Rules

1. **Colors → semantic tokens only.** Style with `var(--color-primary)`,
   `var(--color-surface)`, etc. from `src/lib/theme/tokens.css`. Never hardcode
   hex in components. New brand palettes go in `presets.ts` as a full 50…900 ramp.
2. **User-facing strings → `i18n.t()`.** No literal display text in components.
   Add keys to **all four** locale files (`en`, `tr`, `de`, `ar`) and keep their
   key structure identical; `en.json` is the fallback.
3. **RTL-safe layout.** Use CSS logical properties (`margin-inline`,
   `padding-inline`, `inset-inline-start`, `border-inline-end`) — never
   `left`/`right` for flow-relative spacing. Arabic renders right-to-left.
4. **Svelte 5 runes.** Use `$state`, `$derived`, `$effect`, `$props`. Reactive
   stores that use runes must live in a `.svelte.ts` file. A directory barrel
   (`index.ts`) can re-export from a sibling `*.svelte.ts` when a clean import
   path is wanted (see `src/lib/i18n`).
5. **Theme/i18n persistence.** Preferences persist to `localStorage`
   (`qcrm.theme`, `qcrm.locale`) and are pre-applied in `src/app.html` to avoid
   FOUC. Keep the boot script in sync with the store keys/logic.
6. **Responsive.** The shell switches between sidebar and drawer/bottom-nav at
   the `lg` (1024px) breakpoint via `viewport.svelte.ts`. Support ~360px → desktop
   and respect `--safe-*` insets on mobile.

## Conventions

- TypeScript strict mode is on. No `any` unless justified.
- Keep components token-driven and presentational; put logic in `$lib`.
- Match the existing file style (indentation, naming, comment density).
