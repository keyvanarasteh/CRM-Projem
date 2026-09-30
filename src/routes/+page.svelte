<script lang="ts">
  import { i18n } from "$lib/i18n";
  import Icon from "$lib/components/Icon.svelte";

  // Placeholder KPI data — wired to real data later.
  const kpis = [
    { key: "dashboard.kpi.customers", value: "1,248", icon: "users", tone: "primary" },
    { key: "dashboard.kpi.openDeals", value: "37", icon: "trending", tone: "info" },
    { key: "dashboard.kpi.revenue", value: "₺482K", icon: "chart", tone: "success" },
    { key: "dashboard.kpi.tasksDue", value: "9", icon: "check", tone: "warning" },
  ];
</script>

<section class="page">
  <header class="head">
    <h1>{i18n.t("dashboard.welcome")}</h1>
    <p class="muted">{i18n.t("dashboard.subtitle")}</p>
  </header>

  <div class="kpis">
    {#each kpis as kpi (kpi.key)}
      <article class="card kpi">
        <span class="kpi-icon tone-{kpi.tone}"><Icon name={kpi.icon} /></span>
        <div>
          <div class="kpi-value">{kpi.value}</div>
          <div class="muted kpi-label">{i18n.t(kpi.key)}</div>
        </div>
      </article>
    {/each}
  </div>

  <article class="card activity">
    <h2>{i18n.t("dashboard.recentActivity")}</h2>
    <p class="muted empty">{i18n.t("dashboard.empty")}</p>
  </article>
</section>

<style>
  .page {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    max-width: 1100px;
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
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    box-shadow: var(--shadow-sm);
  }
  .kpis {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-4);
  }
  .kpi {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }
  .kpi-icon {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    flex: none;
  }
  .tone-primary {
    background: var(--color-primary-soft);
    color: var(--color-primary);
  }
  .tone-info {
    background: var(--color-info-bg);
    color: var(--color-info);
  }
  .tone-success {
    background: var(--color-success-bg);
    color: var(--color-success);
  }
  .tone-warning {
    background: var(--color-warning-bg);
    color: var(--color-warning);
  }
  .kpi-value {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    line-height: 1.1;
  }
  .kpi-label {
    font-size: var(--font-size-sm);
  }
  .activity h2 {
    margin: 0 0 var(--space-3);
    font-size: var(--font-size-lg);
  }
  .empty {
    padding: var(--space-6) 0;
    text-align: center;
  }
</style>
