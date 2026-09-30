<script lang="ts">
  import { i18n } from "$lib/i18n";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  import PresetPicker from "$lib/components/PresetPicker.svelte";
  import LanguagePicker from "$lib/components/LanguagePicker.svelte";
</script>

<section class="page">
  <header class="head">
    <h1>{i18n.t("settings.title")}</h1>
    <p class="muted">{i18n.t("settings.subtitle")}</p>
  </header>

  <article class="card">
    <div class="card-head">
      <h2>{i18n.t("settings.appearance.title")}</h2>
      <p class="muted">{i18n.t("settings.appearance.description")}</p>
    </div>
    <ThemeToggle />
  </article>

  <article class="card">
    <div class="card-head">
      <h2>{i18n.t("settings.brand.title")}</h2>
      <p class="muted">{i18n.t("settings.brand.description")}</p>
    </div>
    <PresetPicker />
  </article>

  <article class="card">
    <div class="card-head">
      <h2>{i18n.t("settings.language.title")}</h2>
      <p class="muted">{i18n.t("settings.language.description")}</p>
    </div>
    <LanguagePicker />
  </article>
</section>

<style>
  .page {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    max-width: 820px;
  }
  .head h1 {
    margin: 0 0 var(--space-1);
    font-size: var(--font-size-2xl);
    line-height: var(--line-height-tight);
  }
  .muted {
    color: var(--color-text-muted);
    margin: 0;
  }
  .card {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    box-shadow: var(--shadow-sm);
  }
  .card-head h2 {
    margin: 0 0 var(--space-1);
    font-size: var(--font-size-lg);
  }
</style>
