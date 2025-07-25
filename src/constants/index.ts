// Common constants
export const API_ENDPOINTS = {
  USERS: '/api/users',
  TAGS: '/api/tags',
  ASSETS: '/api/assets',
};

// Status constants
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  COMPLETED: 'completed',
};

// Tag colors for visual representation
export const TAG_COLORS = [
  '#FF6B6B',
  '#4ECDC4', 
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#98D8C8'
];

// Data types for dynamic forms and filters
export const AVAILABLE_DATA_TYPES = {
  STRING: 'STRING',
  NUMERIC: 'NUMERIC',
  BOOLEAN: 'BOOLEAN',
  DATE: 'DATE',
  DATETIME: 'DATETIME',
  ENUM: 'ENUM',
  ARRAY: 'ARRAY',
  OBJECT: 'OBJECT',
} as const;

// Filter operators for query building
export const FILTER_OPERATORS = {
  EQUALS: 'equals',
  NOT_EQUALS: 'notEquals',
  GREATER_THAN: 'gt',
  GREATER_THAN_OR_EQUALS: 'gte',
  LESS_THAN: 'lt',
  LESS_THAN_OR_EQUALS: 'lte',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'notContains',
  STARTS_WITH: 'startsWith',
  ENDS_WITH: 'endsWith',
  IN: 'in',
  NOT_IN: 'notIn',
  IS_NULL: 'isNull',
  IS_NOT_NULL: 'isNotNull',
  BETWEEN: 'between',
} as const;

// Template types for content management
export const TEMPLATE_TYPES = [
  'PAGE',
  'POST',
  'COMPONENT',
  'LAYOUT',
  'PARTIAL',
  'EMAIL',
  'SMS',
] as const;

// Default pagination settings
export const DEFAULT_PAGE_SIZE_FOR_FILTER_OPTIONS = 20;

export default {
  API_ENDPOINTS,
  STATUS,
  TAG_COLORS,
  AVAILABLE_DATA_TYPES,
  FILTER_OPERATORS,
  TEMPLATE_TYPES,
  DEFAULT_PAGE_SIZE_FOR_FILTER_OPTIONS,
}; 