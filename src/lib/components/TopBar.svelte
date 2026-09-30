<script lang="ts">
  import { i18n } from "$lib/i18n";
  import Icon from "./Icon.svelte";

  interface Props {
    /** Show the hamburger (mobile/tablet) and wire it to the drawer. */
    showMenu?: boolean;
    onmenu?: () => void;
  }
  let { showMenu = false, onmenu }: Props = $props();
</script>

<header class="topbar">
  {#if showMenu}
    <button type="button" class="icon-btn" aria-label={i18n.t("common.menu")} onclick={onmenu}>
      <Icon name="menu" />
    </button>
  {/if}

  <div class="search">
    <Icon name="grid" size={16} />
    <input type="search" placeholder={i18n.t("common.search")} aria-label={i18n.t("common.search")} />
  </div>

  <a href="/settings" class="icon-btn" aria-label={i18n.t("nav.settings")}>
    <Icon name="gear" />
  </a>
</header>

<style>
  .topbar {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    height: var(--topbar-height);
    padding-inline: var(--space-4);
    padding-top: var(--safe-top);
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 20;
  }
  .icon-btn {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text-muted);
    cursor: pointer;
    flex: none;
  }
  .icon-btn:hover {
    background: var(--color-surface-2);
    color: var(--color-text);
  }
  .search {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    flex: 1;
    max-width: 420px;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    background: var(--color-surface-2);
    color: var(--color-text-muted);
  }
  .search input {
    flex: 1;
    border: none;
    background: transparent;
    color: var(--color-text);
    font: inherit;
    font-size: var(--font-size-sm);
    outline: none;
    min-width: 0;
  }
</style>
