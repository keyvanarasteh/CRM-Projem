# CLAUDE.md

This file guides Claude Code (claude.com/claude-code) when working in this repo.

**All repository conventions live in [AGENTS.md](AGENTS.md) — read it first and
treat it as the source of truth.** It covers the stack, commands, directory
structure, and the token / i18n / RTL / runes rules.

## Quick reference

- Stack: Tauri 2 (Rust) + SvelteKit 2 / Svelte 5 runes + TypeScript, Bun, Vite.
- Run `bun run check` after every change; it must stay at 0 errors / 0 warnings.
- Dev: `bun run tauri dev` (desktop) or `bun run dev` (browser, :1420).

## Non-negotiables (see AGENTS.md for detail)

- Colors come from semantic tokens in `src/lib/theme/tokens.css` — never hardcode hex.
- All user-facing text goes through `i18n.t()`; update `en`, `tr`, `de`, `ar`
  together and keep their key trees identical.
- Use CSS logical properties so Arabic (RTL) keeps working.
- Runes-based stores must be `.svelte.ts` files.
