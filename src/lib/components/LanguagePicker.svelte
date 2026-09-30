<script lang="ts">
  import { i18n, LOCALE_LIST, type Locale } from "$lib/i18n";
</script>

<div class="grid" role="radiogroup" aria-label={i18n.t("settings.language.title")}>
  {#each LOCALE_LIST as loc (loc.code)}
    <button
      type="button"
      class="opt"
      class:active={i18n.locale === loc.code}
      role="radio"
      aria-checked={i18n.locale === loc.code}
      lang={loc.code}
      dir={loc.dir}
      onclick={() => i18n.setLocale(loc.code as Locale)}
    >
      <span class="code">{loc.code.toUpperCase()}</span>
      <span class="label">{loc.label}</span>
    </button>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: var(--space-3);
  }
  .opt {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
    font: inherit;
    cursor: pointer;
    text-align: start;
    transition: border-color var(--duration-fast) var(--ease-standard);
  }
  .opt.active {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-sm);
  }
  .code {
    display: grid;
    place-items: center;
    min-width: 34px;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    background: var(--color-surface-2);
    font-size: var(--font-size-xs);
    font-weight: 700;
    color: var(--color-text-muted);
  }
  .label {
    font-weight: 600;
  }
</style>
