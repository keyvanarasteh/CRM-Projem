/** Primary navigation items. `labelKey` resolves through i18n `t()`. */
export interface NavItem {
  href: string;
  labelKey: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", labelKey: "nav.dashboard", icon: "grid" },
  { href: "/customers", labelKey: "nav.customers", icon: "users" },
  { href: "/deals", labelKey: "nav.deals", icon: "trending" },
  { href: "/tasks", labelKey: "nav.tasks", icon: "check" },
  { href: "/reports", labelKey: "nav.reports", icon: "chart" },
  { href: "/settings", labelKey: "nav.settings", icon: "gear" },
];
