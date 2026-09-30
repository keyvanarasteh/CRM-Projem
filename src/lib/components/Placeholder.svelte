<script lang="ts">
  import { i18n } from "$lib/i18n";
  import Icon from "./Icon.svelte";

  interface Props {
    titleKey: string;
    icon: string;
  }
  let { titleKey, icon }: Props = $props();
</script>

<section class="placeholder">
  <span class="icon"><Icon name={icon} size={28} /></span>
  <h1>{i18n.t(titleKey)}</h1>
  <p class="muted">{i18n.t("dashboard.empty")}</p>
</section>

<style>
  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    text-align: center;
    min-height: 60vh;
  }
  .icon {
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    border-radius: var(--radius-lg);
    background: var(--color-primary-soft);
    color: var(--color-primary);
  }
  h1 {
    margin: 0;
    font-size: var(--font-size-xl);
  }
  .muted {
    color: var(--color-text-muted);
    margin: 0;
    max-width: 40ch;
  }
</style>
