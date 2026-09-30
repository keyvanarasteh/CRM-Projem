<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import "$lib/theme/tokens.css";
  import { theme } from "$lib/theme/theme.svelte";
  import { viewport } from "$lib/theme/viewport.svelte";
  import { i18n } from "$lib/i18n";
  import SideNav from "$lib/components/SideNav.svelte";
  import BottomNav from "$lib/components/BottomNav.svelte";
  import TopBar from "$lib/components/TopBar.svelte";

  let { children } = $props();
  let drawerOpen = $state(false);

  // Close the mobile drawer whenever the route changes.
  $effect(() => {
    $page.url.pathname;
    drawerOpen = false;
  });

  onMount(() => {
    // Apply persisted/detected preferences and start OS listeners.
    theme.apply();
    i18n.apply();
    const stopTheme = theme.listen();
    const stopViewport = viewport.listen();
    return () => {
      stopTheme();
      stopViewport();
    };
  });
</script>

<div class="app" class:compact={viewport.compact}>
  {#if !viewport.compact}
    <aside class="rail">
      <SideNav />
    </aside>
  {/if}

  <div class="main">
    <TopBar showMenu={viewport.compact} onmenu={() => (drawerOpen = true)} />
    <main class="content">
      {@render children()}
    </main>
    {#if viewport.compact}
      <BottomNav />
    {/if}
  </div>

  {#if viewport.compact && drawerOpen}
    <button
      type="button"
      class="scrim"
      aria-label={i18n.t("common.close")}
      onclick={() => (drawerOpen = false)}
    ></button>
    <aside class="drawer">
      <SideNav onnavigate={() => (drawerOpen = false)} />
    </aside>
  {/if}
</div>

<style>
  .app {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
    min-height: 100vh;
    min-height: 100dvh;
  }
  .app.compact {
    grid-template-columns: 1fr;
  }
  .rail {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100dvh;
    overflow-y: auto;
  }
  .main {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .content {
    flex: 1;
    padding: var(--space-5);
    padding-inline: max(var(--space-5), var(--safe-left)) max(var(--space-5), var(--safe-right));
  }
  .app.compact .content {
    padding: var(--space-4);
  }

  .scrim {
    position: fixed;
    inset: 0;
    z-index: 40;
    border: none;
    background: var(--color-overlay);
    cursor: pointer;
    animation: fade var(--duration-fast) var(--ease-standard);
  }
  .drawer {
    position: fixed;
    inset-block: 0;
    inset-inline-start: 0;
    z-index: 50;
    width: min(80vw, var(--sidebar-width));
    box-shadow: var(--shadow-lg);
    animation: slide var(--duration-base) var(--ease-standard);
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
  }
  @keyframes slide {
    from {
      transform: translateX(-100%);
    }
  }
  /* RTL: drawer slides in from the right. */
  :global(html[dir="rtl"]) .drawer {
    animation-name: slide-rtl;
  }
  @keyframes slide-rtl {
    from {
      transform: translateX(100%);
    }
  }
</style>
