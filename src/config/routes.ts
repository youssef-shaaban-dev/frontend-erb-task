export const APP_ROUTES = {
  DASHBOARD: "/dashboard",
  INVOICES: "/invoices",
  INVENTORY: "/inventory",
  CUSTOMERS: "/customers",
  REPORTS: "/reports",
  HELP: "/help",
} as const;

export type AppRoute = typeof APP_ROUTES[keyof typeof APP_ROUTES];
