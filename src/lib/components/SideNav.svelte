<script lang="ts">
  import { page } from "$app/stores";
  import { i18n } from "$lib/i18n";
  import { NAV_ITEMS } from "./nav";
  import Icon from "./Icon.svelte";

  interface Props {
    /** Called when a link is chosen — used to close the mobile drawer. */
    onnavigate?: () => void;
  }
  let { onnavigate }: Props = $props();

  const isActive = (href: string, current: string) =>
    href === "/" ? current === "/" : current.startsWith(href);
</script>

<nav class="sidenav" aria-label={i18n.t("nav.dashboard")}>
  <div class="brand">
    <span class="mark">Q</span>
    <span class="name">{i18n.t("app.name")}</span>
  </div>
  <ul>
    {#each NAV_ITEMS as item (item.href)}
      <li>
        <a
          href={item.href}
          class="link"
          class:active={isActive(item.href, $page.url.pathname)}
          aria-current={isActive(item.href, $page.url.pathname) ? "page" : undefined}
          onclick={onnavigate}
        >
          <Icon name={item.icon} />
          <span>{i18n.t(item.labelKey)}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .sidenav {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    height: 100%;
    padding: var(--space-4);
    background: var(--color-surface);
    border-inline-end: 1px solid var(--color-border);
  }
  .brand {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2);
    font-weight: 700;
    font-size: var(--font-size-lg);
  }
  .mark {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: var(--radius-md);
    background: var(--brand-gradient);
    color: var(--color-primary-contrast);
    font-weight: 800;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }
  .link {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    border-radius: var(--radius-md);
    color: var(--color-text-muted);
    font-weight: 500;
    transition: background var(--duration-fast) var(--ease-standard),
      color var(--duration-fast) var(--ease-standard);
  }
  .link:hover {
    background: var(--color-surface-2);
    color: var(--color-text);
  }
  .link.active {
    background: var(--color-primary-soft);
    color: var(--color-primary);
  }
</style>
