<script lang="ts">
  import { theme, type ThemeMode } from "$lib/theme/theme.svelte";
  import { i18n } from "$lib/i18n";
  import Icon from "./Icon.svelte";

  const options: { mode: ThemeMode; icon: string; labelKey: string }[] = [
    { mode: "system", icon: "monitor", labelKey: "settings.appearance.system" },
    { mode: "light", icon: "sun", labelKey: "settings.appearance.light" },
    { mode: "dark", icon: "moon", labelKey: "settings.appearance.dark" },
  ];
</script>

<div class="toggle" role="radiogroup" aria-label={i18n.t("settings.appearance.title")}>
  {#each options as opt (opt.mode)}
    <button
      type="button"
      class="opt"
      class:active={theme.mode === opt.mode}
      role="radio"
      aria-checked={theme.mode === opt.mode}
      onclick={() => theme.setMode(opt.mode)}
    >
      <Icon name={opt.icon} size={18} />
      <span>{i18n.t(opt.labelKey)}</span>
    </button>
  {/each}
</div>

<style>
  .toggle {
    display: inline-flex;
    gap: var(--space-1);
    padding: var(--space-1);
    border-radius: var(--radius-md);
    background: var(--color-surface-2);
  }
  .opt {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border: none;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text-muted);
    font: inherit;
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: background var(--duration-fast) var(--ease-standard),
      color var(--duration-fast) var(--ease-standard);
  }
  .opt:hover {
    color: var(--color-text);
  }
  .opt.active {
    background: var(--color-surface);
    color: var(--color-primary);
    box-shadow: var(--shadow-sm);
  }
</style>
