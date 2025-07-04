// COI Query Keys
export const COI_QUERY_KEYS = {
  // Carrier related
  CARRIER_LIST: "carrier-list",
  CARRIER_DETAILS: "carrier-details",

  // COI related
  COIS_LIST: "cois-list",
  COI_DETAILS: "coi-details",
  COI_HISTORY: "coi-history",
  COI_ARCHIVE: "coi-archive",

  // Limits and Deductibles
  LIMITS_DETECTABLE: "limit-deductibles",
  LIMIT_DEDUCTIBLE_DETAIL: "limit-deductible",

  // Templates
  CARRIER_COI_TEMPLATE: "carrier-coi-template",

  // Policy related
  POLICY_TRUCKS: "policy-trucks",
  CARRIER_POLICY_LIMITS: "carrier-policy-limits",

  // Agent related
  AGENT_SIGNATORY_DETAILS: "agent-signatory-details",
} as const;

// COI Query Key Groups for easier invalidation
export const COI_QUERY_GROUPS = {
  CARRIER: [COI_QUERY_KEYS.CARRIER_LIST, COI_QUERY_KEYS.CARRIER_DETAILS],
  COIS: [
    COI_QUERY_KEYS.COIS_LIST,
    COI_QUERY_KEYS.COI_DETAILS,
    COI_QUERY_KEYS.COI_HISTORY,
  ],
  LIMITS: [
    COI_QUERY_KEYS.LIMITS_DETECTABLE,
    COI_QUERY_KEYS.LIMIT_DEDUCTIBLE_DETAIL,
  ],
  TEMPLATES: [COI_QUERY_KEYS.CARRIER_COI_TEMPLATE],
  POLICY: [COI_QUERY_KEYS.POLICY_TRUCKS, COI_QUERY_KEYS.CARRIER_POLICY_LIMITS],
} as const;

// COI Stale Times
export const COI_STALE_TIMES = {
  LISTING: 1000 * 60 * 5, // 5 minutes
  DETAIL: 1000 * 60 * 10, // 10 minutes
  TEMPLATE: 1000 * 60 * 15, // 15 minutes
} as const;

// COI Retry Configuration
export const COI_RETRY_CONFIG = {
  DEFAULT: {
    retries: 2,
    retryDelay: 1000,
  },
  CRITICAL: {
    retries: 3,
    retryDelay: 2000,
  },
} as const;
