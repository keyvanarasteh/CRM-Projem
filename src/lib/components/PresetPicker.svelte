<script lang="ts">
  import { theme } from "$lib/theme/theme.svelte";
  import { PRESET_LIST } from "$lib/theme/presets";
  import { i18n } from "$lib/i18n";
</script>

<div class="grid" role="radiogroup" aria-label={i18n.t("settings.brand.title")}>
  {#each PRESET_LIST as preset (preset.id)}
    <button
      type="button"
      class="card"
      class:active={theme.preset === preset.id}
      role="radio"
      aria-checked={theme.preset === preset.id}
      onclick={() => theme.setPreset(preset.id)}
    >
      <span
        class="swatch"
        style:background={preset.gradient ?? preset.swatch}
        aria-hidden="true"
      ></span>
      <span class="label">{preset.name}</span>
    </button>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: var(--space-3);
  }
  .card {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
    font: inherit;
    font-size: var(--font-size-sm);
    cursor: pointer;
    text-align: start;
    transition: border-color var(--duration-fast) var(--ease-standard),
      transform var(--duration-fast) var(--ease-standard);
  }
  .card:hover {
    transform: translateY(-1px);
  }
  .card.active {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-sm);
  }
  .swatch {
    width: 28px;
    height: 28px;
    border-radius: var(--radius-full);
    flex: none;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
  .label {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
