export const ROUTES = {
  SIGN_IN: "/",
  SIGN_UP: "/signup",
  DASHBOARD: {
    COMPANY_DETAILS: "/dashboard/company-details?count=10",
    METRICS_HUB: "/dashboard/metrics-hub",
    METRICS_REDIRECTION: "/dashboard/metrics-hub/redirection",
  },
} as const;
