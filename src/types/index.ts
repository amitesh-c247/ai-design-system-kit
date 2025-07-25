import {
  AVAILABLE_DATA_TYPES,
  FILTER_OPERATORS,
  TEMPLATE_TYPES,
} from "../constants";

// =============================================================================
// UTILITY TYPES
// =============================================================================

/** Constructs a type by picking all properties from `Type` and then removing `Keys` */
export type OmitStrict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/** Constructs a type by extracting only the specified keys `K` from `T` */
export type ExtractStrict<T, K extends T> = K;

/** Make certain properties optional */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Make certain properties required */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Deep partial type */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Create a type with all properties nullable */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

/** Extract array element type */
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

// =============================================================================
// SORTING & ORDERING
// =============================================================================

export type SortDirection = "asc" | "desc" | "ASC" | "DESC";

export type SorterString<Fields extends string> =
  | `${Fields}`
  | `${Fields},${SortDirection}`;

export interface SortConfig<T extends string = string> {
  field: T;
  direction: SortDirection;
}

// =============================================================================
// PAGINATION & QUERIES
// =============================================================================

export interface Queryable {
  query?: string;
  searchValue?: string;
  search?: string;
}

export interface Pageable<SortableFields extends string = string> {
  page?: number;
  size?: number;
  sort?: SorterString<SortableFields> | SorterString<SortableFields>[];
}

export interface Page<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  pageable?: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
    };
  };
}

export interface Cursor {
  size?: number;
  sort?: string;
  nextToken?: string;
}

export interface CursorPage<T> {
  content: T[];
  nextToken?: string;
  hasNext?: boolean;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
  success?: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export interface ApiListResponse<T> extends ApiResponse<Page<T>> {}

// =============================================================================
// CHANGE TRACKING
// =============================================================================

export interface ChangeLog {
  createdAt?: string;
  createdBy?: string;
  lastModifiedAt?: string;
  lastModifiedBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export type ChangeLogFields = keyof ChangeLog;

export interface Timestamped {
  createdAt: string;
  updatedAt: string;
}

export interface UserTracked {
  createdBy: string;
  updatedBy: string;
}

// =============================================================================
// ENTITY TYPES
// =============================================================================

export interface BaseEntity extends ChangeLog {
  id: string | number;
  name?: string;
  description?: string;
}

export interface NamedEntity extends BaseEntity {
  name: string;
  slug?: string;
}

export interface Tag {
  key: string;
  value?: string;
  color?: string;
}

export interface State extends ChangeLog {
  id: string;
  name: string;
  readOnly: boolean;
  color?: string;
}

// =============================================================================
// FILTERING & SEARCH
// =============================================================================

export type FilterOperator =
  (typeof FILTER_OPERATORS)[keyof typeof FILTER_OPERATORS];

export interface QueryFilter {
  member: string;
  operator: FilterOperator;
  values?: (string | number | boolean)[];
}

export interface FilterOption {
  label: string;
  value: string | number;
  count?: number;
}

export interface SearchFilter {
  field: string;
  value: string | number | boolean | (string | number | boolean)[];
  operator: FilterOperator;
}

interface CommonQueryParams {
  order?: Record<string, "ASC" | "DESC">;
  filters?: QueryFilter[];
  limit?: number;
  offset?: number;
}

export interface DimensionsQuery extends CommonQueryParams {
  dimensions: string[];
  nextToken?: string;
}

export interface MeasuresQuery extends CommonQueryParams {
  measures: string[];
  nextToken?: string;
  timeDimension?: TimeDimension;
}

export interface TimeDimension {
  dimension: string;
  groupBy?: string;
  dateRange: [string, string];
}

// =============================================================================
// DATA TYPES
// =============================================================================

export type AvailableDataTypes = keyof typeof AVAILABLE_DATA_TYPES;
export type TemplateTypes = (typeof TEMPLATE_TYPES)[number];

export interface DataField<T = any> extends ChangeLog {
  name: string;
  value?: T;
  defaultValue?: T;
  type: AvailableDataTypes;
  required?: boolean;
  readonly?: boolean;
  placeholder?: string;
  description?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string | RegExp;
    custom?: (value: T) => boolean | string;
  };
}

export interface NumericField extends DataField<number> {
  type: typeof AVAILABLE_DATA_TYPES.NUMERIC;
  min?: number;
  max?: number;
  precision?: number;
  scale?: number;
}

export interface StringField extends DataField<string> {
  type: typeof AVAILABLE_DATA_TYPES.STRING;
  minLength?: number;
  maxLength?: number;
  multiline?: boolean;
}

export interface BooleanField extends DataField<boolean> {
  type: typeof AVAILABLE_DATA_TYPES.BOOLEAN;
}

export interface DateField extends DataField<string> {
  type: typeof AVAILABLE_DATA_TYPES.DATE | typeof AVAILABLE_DATA_TYPES.DATETIME;
  minDate?: string;
  maxDate?: string;
}

export interface EnumField extends DataField<string> {
  type: typeof AVAILABLE_DATA_TYPES.ENUM;
  options: Array<{ label: string; value: string }>;
  multiple?: boolean;
}

// =============================================================================
// FORM TYPES
// =============================================================================

export interface FormField<T = any> {
  name: string;
  label: string;
  type: string;
  value?: T;
  defaultValue?: T;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: string;
  helpText?: string;
  validation?: {
    required?: boolean;
    pattern?: RegExp;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    custom?: (value: T) => boolean | string;
  };
}

export interface FormConfig {
  fields: FormField[];
  layout?: "vertical" | "horizontal" | "inline";
  submitLabel?: string;
  resetLabel?: string;
  showReset?: boolean;
}

export interface FormState<T = Record<string, any>> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  "data-testid"?: string;
}

export interface LoadingProps {
  loading?: boolean;
  loadingText?: string;
}

export interface DisabledProps {
  disabled?: boolean;
}

export interface SizeProps {
  size?: "small" | "medium" | "large";
}

export interface VariantProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
}

export interface ClickableProps {
  onClick?: (event: React.MouseEvent) => void;
  onDoubleClick?: (event: React.MouseEvent) => void;
}

// =============================================================================
// TABLE & LIST TYPES
// =============================================================================

export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: string;
  width?: number | string;
  fixed?: "left" | "right";
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  pagination?:
    | false
    | {
        current: number;
        pageSize: number;
        total: number;
        onChange: (page: number, pageSize: number) => void;
      };
  rowKey?: string | ((record: T) => string);
  onRow?: (
    record: T,
    index: number
  ) => React.HTMLAttributes<HTMLTableRowElement>;
  expandable?: {
    expandedRowRender: (record: T) => React.ReactNode;
    expandRowByClick?: boolean;
  };
}

// =============================================================================
// GEOGRAPHIC TYPES
// =============================================================================

export interface GeoComponent extends ChangeLog {
  name?: string;
  value?: number;
  defaultValue?: number;
  max?: number;
  min?: number;
  precision?: number;
  required?: boolean;
  scale?: number;
  type?: typeof AVAILABLE_DATA_TYPES.NUMERIC;
}

export type Latitude = GeoComponent;
export type Longitude = GeoComponent;
export type Elevation = GeoComponent;

export interface GeoFields {
  latitude: Latitude;
  longitude: Longitude;
  elevation: Elevation;
}

export interface Location {
  lat: number;
  lng: number;
  elevation?: number;
  address?: string;
}

// =============================================================================
// MEDIA & FILE TYPES
// =============================================================================

export interface FileInfo {
  id?: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  uploadedAt?: string;
  uploadedBy?: string;
}

export interface ImageInfo extends FileInfo {
  width?: number;
  height?: number;
  alt?: string;
}

// =============================================================================
// NOTIFICATION & ALERT TYPES
// =============================================================================

export interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: VariantProps["variant"];
  }>;
}

export interface NotificationConfig {
  id?: string;
  type: AlertProps["type"];
  title?: string;
  message: string;
  duration?: number;
  persist?: boolean;
  actions?: AlertProps["actions"];
}

// =============================================================================
// MENU & NAVIGATION TYPES
// =============================================================================

export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
  disabled?: boolean;
  hidden?: boolean;
  permissions?: string[];
}

export interface BreadcrumbItem {
  title: string;
  path?: string;
  onClick?: () => void;
}

// =============================================================================
// THEME & STYLING TYPES
// =============================================================================

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    light: string;
    dark: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// =============================================================================
// MISCELLANEOUS TYPES
// =============================================================================

export type EnumOptions = Record<number | string, string>;

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
}

export interface KeyValuePair<T = string> {
  key: string;
  value: T;
}

// Re-export for convenience
export {
  AVAILABLE_DATA_TYPES,
  FILTER_OPERATORS,
  TEMPLATE_TYPES,
} from "../constants";

// Document types
export * from "./documents";
