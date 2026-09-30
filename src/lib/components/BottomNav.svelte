<script lang="ts">
  import { page } from "$app/stores";
  import { i18n } from "$lib/i18n";
  import { NAV_ITEMS } from "./nav";
  import Icon from "./Icon.svelte";

  // Bottom bar shows the five primary destinations (Settings lives in the top bar).
  const items = NAV_ITEMS.filter((i) => i.href !== "/settings");
  const isActive = (href: string, current: string) =>
    href === "/" ? current === "/" : current.startsWith(href);
</script>

<nav class="bottomnav" aria-label={i18n.t("nav.dashboard")}>
  {#each items as item (item.href)}
    <a
      href={item.href}
      class="tab"
      class:active={isActive(item.href, $page.url.pathname)}
      aria-current={isActive(item.href, $page.url.pathname) ? "page" : undefined}
    >
      <Icon name={item.icon} />
      <span>{i18n.t(item.labelKey)}</span>
    </a>
  {/each}
</nav>

<style>
  .bottomnav {
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    height: calc(var(--bottomnav-height) + var(--safe-bottom));
    padding-bottom: var(--safe-bottom);
    background: var(--color-surface);
    border-top: 1px solid var(--color-border);
  }
  .tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    flex: 1;
    color: var(--color-text-muted);
    font-size: var(--font-size-xs);
    font-weight: 500;
  }
  .tab.active {
    color: var(--color-primary);
  }
</style>
