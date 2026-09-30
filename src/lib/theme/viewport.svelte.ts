/**
 * Reactive viewport helper. `viewport.compact` is true below the lg breakpoint
 * (1024px), driving the sidebar ↔ drawer/bottom-nav switch in the app shell.
 */

const isBrowser = typeof window !== "undefined";
const LG = 1024;

class Viewport {
  compact = $state<boolean>(false);

  constructor() {
    if (isBrowser) this.compact = window.innerWidth < LG;
  }

  /** Attach the media listener; returns cleanup. Call in onMount. */
  listen(): () => void {
    if (!isBrowser) return () => {};
    const mq = window.matchMedia(`(max-width: ${LG - 1}px)`);
    const onChange = (e: MediaQueryListEvent) => (this.compact = e.matches);
    this.compact = mq.matches;
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }
}

export const viewport = new Viewport();
