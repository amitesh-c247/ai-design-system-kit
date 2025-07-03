import React from 'react';
import { BaseComponentProps, VariantProps, SizeProps } from './index';

// =============================================================================
// UI COMPONENT TYPES
// =============================================================================

export interface ButtonProps extends BaseComponentProps, VariantProps, SizeProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: string;
  helpText?: string;
  label?: string;
}

export interface TextAreaProps extends Omit<InputProps, 'type' | 'prefix' | 'suffix'> {
  rows?: number;
  cols?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export interface SelectProps extends BaseComponentProps {
  value?: string | string[];
  defaultValue?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  options: SelectOption[];
  onChange?: (value: string | string[]) => void;
  onSearch?: (searchTerm: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  helpText?: string;
  label?: string;
  noOptionsMessage?: string;
  loadingMessage?: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface CheckboxProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  value?: string | number;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  helpText?: string;
}

export interface RadioProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: string | number;
  name?: string;
  onChange?: (value: string | number, event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export interface RadioGroupProps extends BaseComponentProps {
  value?: string | number;
  defaultValue?: string | number;
  disabled?: boolean;
  name?: string;
  options: Array<{
    label: string;
    value: string | number;
    disabled?: boolean;
    description?: string;
  }>;
  onChange?: (value: string | number) => void;
  direction?: 'horizontal' | 'vertical';
  error?: string;
  helpText?: string;
  label?: string;
}

export interface SwitchProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  onChange?: (checked: boolean) => void;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  label?: string;
}

// =============================================================================
// MODAL & DIALOG TYPES
// =============================================================================

export interface ModalProps extends BaseComponentProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  closable?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  centered?: boolean;
  destroyOnClose?: boolean;
  zIndex?: number;
}

export interface DrawerProps extends BaseComponentProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  size?: number | string;
  closable?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  destroyOnClose?: boolean;
  zIndex?: number;
}

export interface PopoverProps extends BaseComponentProps {
  trigger?: 'hover' | 'click' | 'focus' | 'contextMenu';
  placement?: 
    | 'top' | 'topLeft' | 'topRight'
    | 'bottom' | 'bottomLeft' | 'bottomRight'
    | 'left' | 'leftTop' | 'leftBottom'
    | 'right' | 'rightTop' | 'rightBottom';
  content?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  getPopupContainer?: () => HTMLElement;
}

export interface TooltipProps extends Omit<PopoverProps, 'content'> {
  title?: React.ReactNode;
}

// =============================================================================
// TABLE TYPES
// =============================================================================

export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: string;
  width?: number | string;
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sorter?: boolean | ((a: T, b: T) => number);
  defaultSortOrder?: 'ascend' | 'descend';
  filters?: Array<{
    text: string;
    value: string | number | boolean;
  }>;
  onFilter?: (value: string | number | boolean, record: T) => boolean;
  ellipsis?: boolean;
  copyable?: boolean;
  editable?: boolean;
}

export interface TableProps<T = any> extends BaseComponentProps {
  columns: TableColumn<T>[];
  dataSource: T[];
  loading?: boolean;
  pagination?: false | {
    current?: number;
    pageSize?: number;
    total?: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
    onChange?: (page: number, pageSize?: number) => void;
    onShowSizeChange?: (current: number, size: number) => void;
  };
  rowKey?: string | ((record: T) => string);
  rowSelection?: {
    type?: 'checkbox' | 'radio';
    selectedRowKeys?: string[];
    onChange?: (selectedRowKeys: string[], selectedRows: T[]) => void;
    onSelect?: (record: T, selected: boolean, selectedRows: T[]) => void;
    onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
    getCheckboxProps?: (record: T) => { disabled?: boolean };
  };
  expandable?: {
    expandedRowRender?: (record: T, index: number) => React.ReactNode;
    expandRowByClick?: boolean;
    expandedRowKeys?: string[];
    onExpand?: (expanded: boolean, record: T) => void;
    onExpandedRowsChange?: (expandedKeys: string[]) => void;
  };
  scroll?: {
    x?: number | string | true;
    y?: number | string;
  };
  size?: 'small' | 'medium' | 'large';
  bordered?: boolean;
  showHeader?: boolean;
  title?: () => React.ReactNode;
  footer?: () => React.ReactNode;
  onRow?: (record: T, index?: number) => React.HTMLAttributes<HTMLTableRowElement>;
  onHeaderRow?: (columns: TableColumn<T>[], index?: number) => React.HTMLAttributes<HTMLTableRowElement>;
  onChange?: (pagination: any, filters: Record<string, any>, sorter: any) => void;
}

// =============================================================================
// MENU & NAVIGATION TYPES
// =============================================================================

export interface MenuItemType {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  title?: string;
  children?: MenuItemType[];
  type?: 'group' | 'divider';
  onClick?: () => void;
}

export interface MenuProps extends BaseComponentProps {
  items?: MenuItemType[];
  mode?: 'vertical' | 'horizontal' | 'inline';
  theme?: 'light' | 'dark';
  selectedKeys?: string[];
  openKeys?: string[];
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
  multiple?: boolean;
  selectable?: boolean;
  inlineCollapsed?: boolean;
  onSelect?: (info: { key: string; selectedKeys: string[] }) => void;
  onDeselect?: (info: { key: string; selectedKeys: string[] }) => void;
  onOpenChange?: (openKeys: string[]) => void;
  onClick?: (info: { key: string; keyPath: string[] }) => void;
}

// =============================================================================
// FORM TYPES
// =============================================================================

export interface FormItemProps extends BaseComponentProps {
  name?: string;
  label?: React.ReactNode;
  rules?: ValidationRule[];
  required?: boolean;
  help?: React.ReactNode;
  extra?: React.ReactNode;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  hasFeedback?: boolean;
  labelCol?: { span?: number; offset?: number };
  wrapperCol?: { span?: number; offset?: number };
  colon?: boolean;
  children?: React.ReactNode;
}

export interface ValidationRule {
  required?: boolean;
  message?: string;
  type?: 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email';
  pattern?: RegExp;
  min?: number;
  max?: number;
  len?: number;
  enum?: (string | number)[];
  whitespace?: boolean;
  validator?: (rule: any, value: any, callback: (error?: string) => void) => void;
  asyncValidator?: (rule: any, value: any) => Promise<void>;
  transform?: (value: any) => any;
}

export interface FormProps extends BaseComponentProps {
  layout?: 'horizontal' | 'vertical' | 'inline';
  size?: 'small' | 'medium' | 'large';
  labelCol?: { span?: number; offset?: number };
  wrapperCol?: { span?: number; offset?: number };
  colon?: boolean;
  requiredMark?: boolean | 'optional';
  scrollToFirstError?: boolean;
  preserve?: boolean;
  validateTrigger?: string | string[];
  onFinish?: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  onFieldsChange?: (changedFields: any[], allFields: any[]) => void;
  onValuesChange?: (changedValues: any, allValues: any) => void;
  children?: React.ReactNode;
}

// =============================================================================
// LOADING & FEEDBACK TYPES
// =============================================================================

export interface SpinnerProps extends BaseComponentProps {
  size?: 'small' | 'medium' | 'large';
  spinning?: boolean;
  tip?: string;
  delay?: number;
  children?: React.ReactNode;
}

export interface ProgressProps extends BaseComponentProps {
  percent?: number;
  type?: 'line' | 'circle' | 'dashboard';
  status?: 'normal' | 'exception' | 'active' | 'success';
  strokeColor?: string;
  strokeWidth?: number;
  trailColor?: string;
  showInfo?: boolean;
  format?: (percent?: number) => React.ReactNode;
  width?: number;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export interface SkeletonProps extends BaseComponentProps {
  active?: boolean;
  avatar?: boolean | {
    size?: 'small' | 'medium' | 'large' | number;
    shape?: 'circle' | 'square';
  };
  paragraph?: boolean | {
    rows?: number;
    width?: number | string | Array<number | string>;
  };
  title?: boolean | {
    width?: number | string;
  };
  loading?: boolean;
  children?: React.ReactNode;
}

// =============================================================================
// LAYOUT TYPES
// =============================================================================

export interface GridProps extends BaseComponentProps {
  container?: boolean;
  item?: boolean;
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  spacing?: number;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  alignContent?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  children?: React.ReactNode;
}

export interface SpaceProps extends BaseComponentProps {
  direction?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large' | number;
  align?: 'start' | 'end' | 'center' | 'baseline';
  wrap?: boolean;
  split?: React.ReactNode;
  children?: React.ReactNode;
}

export interface DividerProps extends BaseComponentProps {
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | 'center';
  orientationMargin?: string | number;
  dashed?: boolean;
  children?: React.ReactNode;
} 