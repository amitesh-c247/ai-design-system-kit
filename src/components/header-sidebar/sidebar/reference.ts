/*
 ************************************************************************
 * Copyright (C) 2020-2024 Leanspace SAS. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 *************************************************************************
 */
import {
  AVAILABLE_DATA_TYPES,
  FILTER_OPERATORS,
  TEMPLATE_TYPES,
} from "@/constants";

type AscDesc = "asc" | "desc" | "ASC" | "DESC";
export type SorterString<Fields extends string> =
  | `${Fields}`
  | `${Fields},${AscDesc}`;

export interface Queryable {
  query?: string;
  searchValue?: string;
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
}

export interface Cursor {
  size?: number;
  sort?: string;
  nextToken?: string;
}

export interface CursorPage<T> {
  content: T[];
  nextToken: string;
}

export type EnumOptions = Record<number, string>;

export interface Tag {
  key: string;
  value?: string;
}

export interface ChangeLog {
  createdAt?: string;
  createdBy?: string;
  lastModifiedAt?: string;
  lastModifiedBy?: string;
}

export type ChangeLogFields = keyof ChangeLog;

export type AvailableDataTypes = keyof typeof AVAILABLE_DATA_TYPES;

interface GeoComponent extends ChangeLog {
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

export type FilterOperator =
  (typeof FILTER_OPERATORS)[keyof typeof FILTER_OPERATORS];

export interface QueryFilter {
  member: string;
  operator: FilterOperator;
  values?: (string | number | boolean)[];
}

interface CommonQueryParams {
  order: Record<string, "ASC" | "DESC">;
  filters?: QueryFilter[];
}

export interface DimensionsQuery extends CommonQueryParams {
  dimensions: string[];
  nextToken?: string;
  limit?: number;
}

export interface MeasuresQuery extends CommonQueryParams {
  measures: string[];
  limit?: number;
  nextToken?: string;
  timeDimension?: {
    dimension: string;
    groupBy: string;
    dateRange: [string, string];
  };
}

export interface TimeDimension {
  dimension: string;
  groupBy?: string;
  dateRange: [string, string];
}

export type TemplateTypes = (typeof TEMPLATE_TYPES)[number];

export interface State extends ChangeLog {
  id: string;
  name: string;
  readOnly: boolean;
}

/** Constructs a type by picking all properties from `Type` and then removing `Keys` (string literal or union of string literals). */
export type OmitStrict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/** Constructs a type by extracting only the specified keys `K` from `T` */
export type ExtractStrict<T, K extends T> = K;
