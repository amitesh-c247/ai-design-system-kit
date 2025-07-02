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

// Tag colors
export const TAG_COLORS = [
  '#ff4d4f',
  '#ff7a45', 
  '#ffa940',
  '#ffec3d',
  '#bae637',
  '#52c41a',
  '#13c2c2',
  '#1890ff',
  '#2f54eb',
  '#722ed1',
  '#eb2f96',
];

// Filter constants
export const DEFAULT_PAGE_SIZE_FOR_FILTER_OPTIONS = 50;

export default {
  API_ENDPOINTS,
  STATUS,
  TAG_COLORS,
  DEFAULT_PAGE_SIZE_FOR_FILTER_OPTIONS,
}; 