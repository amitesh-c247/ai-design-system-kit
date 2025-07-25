import { BaseEntity, TemplateTypes, Tag } from "./index";

// =============================================================================
// CMS TYPES
// =============================================================================

export interface CMSPage extends BaseEntity {
  title: string;
  content: string;
  slug: string;
  status: PageStatus;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  isAgreement?: boolean;
  openInNewTab?: boolean;
  contentType: ContentType;
  template?: TemplateTypes;
  featuredImage?: string;
  excerpt?: string;
  tags?: Tag[];
  author?: {
    id: number;
    name: string;
    email: string;
  };
  publishedAt?: string;
  scheduledAt?: string;
  parentId?: string;
  children?: CMSPage[];
  order?: number;
  isHomepage?: boolean;
  customFields?: Record<string, any>;
}

export type PageStatus =
  | "published"
  | "draft"
  | "archived"
  | "scheduled"
  | "pending";
export type ContentType = "TEXT" | "LINK" | "HTML" | "MARKDOWN" | "RICH_TEXT";

export interface PageRevision extends BaseEntity {
  pageId: string;
  title: string;
  content: string;
  status: PageStatus;
  revisionNumber: number;
  changeLog?: string;
  restoredAt?: string;
}

export interface PageTemplate extends BaseEntity {
  name: string;
  description?: string;
  type: TemplateTypes;
  layout: string;
  fields: TemplateField[];
  preview?: string;
  isDefault?: boolean;
}

export interface TemplateField {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "rich_text"
    | "image"
    | "select"
    | "checkbox"
    | "date"
    | "number";
  required?: boolean;
  defaultValue?: any;
  placeholder?: string;
  helpText?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
  options?: Array<{ label: string; value: string }>;
}

export interface Media extends BaseEntity {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  folder?: string;
  tags?: Tag[];
}

export interface MenuGroup extends BaseEntity {
  name: string;
  location: MenuLocation;
  items: CMSMenuItem[];
  isActive: boolean;
}

export type MenuLocation = "header" | "footer" | "sidebar" | "mobile";

export interface CMSMenuItem extends BaseEntity {
  label: string;
  url?: string;
  pageId?: string;
  target: LinkTarget;
  order: number;
  parentId?: string;
  children?: CMSMenuItem[];
  isActive: boolean;
  cssClass?: string;
  icon?: string;
}

export type LinkTarget = "_self" | "_blank" | "_parent" | "_top";

export interface Widget extends BaseEntity {
  name: string;
  type: WidgetType;
  title?: string;
  content?: string;
  config?: Record<string, any>;
  position: WidgetPosition;
  order: number;
  isActive: boolean;
  pages?: string[]; // Page IDs where widget should appear
  excludePages?: string[]; // Page IDs where widget should NOT appear
}

export type WidgetType =
  | "text"
  | "html"
  | "image"
  | "form"
  | "recent_posts"
  | "menu"
  | "custom";
export type WidgetPosition =
  | "header"
  | "footer"
  | "sidebar_left"
  | "sidebar_right"
  | "before_content"
  | "after_content";

export interface Form extends BaseEntity {
  title: string;
  description?: string;
  fields: CMSFormField[];
  settings: FormSettings;
  submissions?: FormSubmission[];
  isActive: boolean;
}

export interface CMSFormField {
  id: string;
  name: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  defaultValue?: any;
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    customMessage?: string;
  };
  options?: Array<{ label: string; value: string }>;
  order: number;
  width?: "full" | "half" | "third" | "quarter";
}

export type FormFieldType = 
  | "text"
  | "textarea"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "date"
  | "time"
  | "datetime"
  | "select"
  | "radio"
  | "checkbox"
  | "file"
  | "hidden";

export interface FormSettings {
  submitButtonText: string;
  successMessage: string;
  errorMessage: string;
  redirectUrl?: string;
  emailNotifications: {
    enabled: boolean;
    recipients: string[];
    subject: string;
    template?: string;
  };
  saveSubmissions: boolean;
  allowAnonymous: boolean;
  captcha: {
    enabled: boolean;
    type?: "recaptcha" | "hcaptcha";
  };
}

export interface FormSubmission extends BaseEntity {
  formId: string;
  data: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  submittedBy?: number; // User ID
  status: "pending" | "processed" | "spam";
}

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  children?: Category[];
  color?: string;
  icon?: string;
  order: number;
  postCount?: number;
}

export interface Comment extends BaseEntity {
  pageId: string;
  content: string;
  author: {
    name: string;
    email: string;
    website?: string;
    avatar?: string;
  };
  parentId?: string;
  children?: Comment[];
  status: CommentStatus;
  ipAddress?: string;
  userAgent?: string;
  userId?: number;
}

export type CommentStatus = "pending" | "approved" | "spam" | "trash";

// CMS-specific API request/response types
export interface PageCreateRequest {
  title: string;
  content: string;
  status: PageStatus;
  contentType: ContentType;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  template?: TemplateTypes;
  tags?: string[];
  scheduledAt?: string;
  customFields?: Record<string, any>;
}

export interface PageUpdateRequest extends Partial<PageCreateRequest> {
  id: string;
}

export interface PageSearchParams {
  query?: string;
  status?: PageStatus;
  contentType?: ContentType;
  template?: TemplateTypes;
  authorId?: number;
  tags?: string[];
  createdAfter?: string;
  createdBefore?: string;
  publishedAfter?: string;
  publishedBefore?: string;
} 
