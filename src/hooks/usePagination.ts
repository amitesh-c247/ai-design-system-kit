import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Pageable, Queryable } from '@/types';

interface PaginationParams extends Queryable {
  page?: number;
  pageSize?: number;
  [key: string]: any; // Allow additional filter parameters
}

interface PaginationDefaults {
  page: number;
  pageSize: number;
  search: string;
  [key: string]: any;
}

interface UsePaginationOptions {
  defaults?: Partial<PaginationDefaults>;
  excludeFromUrl?: string[]; // Parameters to exclude from URL
  resetPageOnChange?: string[]; // Parameters that reset page to 1 when changed
}

interface UsePaginationReturn<T extends PaginationParams> {
  params: T;
  updateParams: (newParams: Partial<T>) => void;
  resetParams: () => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearch: (search: string) => void;
}

const DEFAULT_PAGINATION: PaginationDefaults = {
  page: 1,
  pageSize: 10,
  search: '',
};

export function usePagination<T extends PaginationParams = PaginationParams>(
  options: UsePaginationOptions = {}
): UsePaginationReturn<T> {
  const {
    defaults = {},
    excludeFromUrl = [],
    resetPageOnChange = ['search'],
  } = options;

  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Track if we're syncing from URL to prevent circular updates
  const isSyncingFromUrl = useRef(false);

  // Memoize merged defaults to prevent infinite loops
  const finalDefaults = useMemo(() => ({ 
    ...DEFAULT_PAGINATION, 
    ...defaults 
  }), [JSON.stringify(defaults)]);

  // Memoize arrays to prevent infinite loops
  const memoizedExcludeFromUrl = useMemo(() => excludeFromUrl, [JSON.stringify(excludeFromUrl)]);
  const memoizedResetPageOnChange = useMemo(() => resetPageOnChange, [JSON.stringify(resetPageOnChange)]);

  // Initialize state from URL (only run once)
  const [params, setParams] = useState<T>(() => {
    const params: any = {};
    
    // Get all search params
    for (const [key, value] of searchParams.entries()) {
      if (key === 'page' || key === 'pageSize') {
        params[key] = Number(value) || finalDefaults[key];
      } else {
        params[key] = value || finalDefaults[key] || '';
      }
    }

    // Apply defaults for missing params
    for (const [key, defaultValue] of Object.entries(finalDefaults)) {
      if (!(key in params)) {
        params[key] = defaultValue;
      }
    }

    return params as T;
  });

  // Sync with URL changes (back/forward navigation) - only when searchParams actually change
  useEffect(() => {
    isSyncingFromUrl.current = true;
    
    const params: any = {};
    
    // Get all search params
    for (const [key, value] of searchParams.entries()) {
      if (key === 'page' || key === 'pageSize') {
        params[key] = Number(value) || finalDefaults[key];
      } else {
        params[key] = value || finalDefaults[key] || '';
      }
    }

    // Apply defaults for missing params
    for (const [key, defaultValue] of Object.entries(finalDefaults)) {
      if (!(key in params)) {
        params[key] = defaultValue;
      }
    }

    const urlParams = params as T;
    
    setParams(prev => {
      // Only update if params actually changed to prevent unnecessary re-renders
      const hasChanged = JSON.stringify(prev) !== JSON.stringify(urlParams);
      if (hasChanged) {
        setTimeout(() => {
          isSyncingFromUrl.current = false;
        }, 0);
        return urlParams;
      } else {
        isSyncingFromUrl.current = false;
        return prev;
      }
    });
  }, [searchParams, finalDefaults]);

  // Update URL when parameters change
  const updateUrlParams = useCallback((newParams: Partial<T>) => {
    setParams(currentParams => {
      const updatedParams = { ...currentParams, ...newParams };
      
      // Reset page to 1 if specified parameters changed
      if (memoizedResetPageOnChange.some(key => key in newParams && newParams[key] !== currentParams[key])) {
        updatedParams.page = 1;
      }
      
      return updatedParams;
    });
  }, [memoizedResetPageOnChange]);

  // Separate effect to update URL when params change (avoiding setState during render)
  useEffect(() => {
    // Don't update URL if we're syncing from URL changes
    if (isSyncingFromUrl.current) {
      return;
    }

    const urlParams = new URLSearchParams();

    // Add non-default values to URL (excluding specified parameters)
    for (const [key, value] of Object.entries(params)) {
      if (memoizedExcludeFromUrl.includes(key)) continue;
      
      const defaultValue = finalDefaults[key];
      const shouldInclude = 
        value !== defaultValue && 
        value !== '' && 
        value !== null && 
        value !== undefined;

      if (shouldInclude) {
        urlParams.set(key, String(value));
      }
    }

    const queryString = urlParams.toString();
    const newUrl = queryString ? `?${queryString}` : '';
    
    // Only update URL if it's different from current URL
    const currentQuery = window.location.search;
    if (currentQuery !== newUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [params, router, finalDefaults, memoizedExcludeFromUrl]);

  // Convenience methods
  const updateParams = useCallback((newParams: Partial<T>) => {
    updateUrlParams(newParams);
  }, [updateUrlParams]);

  const resetParams = useCallback(() => {
    updateUrlParams(finalDefaults as Partial<T>);
  }, [updateUrlParams, finalDefaults]);

  const setPage = useCallback((page: number) => {
    updateParams({ page } as Partial<T>);
  }, [updateParams]);

  const setPageSize = useCallback((pageSize: number) => {
    updateParams({ page: 1, pageSize } as Partial<T>);
  }, [updateParams]);

  const setSearch = useCallback((search: string) => {
    updateParams({ page: 1, search } as Partial<T>);
  }, [updateParams]);

  return {
    params,
    updateParams,
    resetParams,
    setPage,
    setPageSize,
    setSearch,
  };
}

// Specific hook for common pagination use cases
export interface StandardPaginationParams {
  page: number;
  pageSize: number;
  search: string;
}

export function useStandardPagination(
  options: Omit<UsePaginationOptions, 'defaults'> & {
    defaultPageSize?: number;
  } = {}
) {
  const { defaultPageSize = 10, ...restOptions } = options;
  
  return usePagination<StandardPaginationParams>({
    ...restOptions,
    defaults: {
      page: 1,
      pageSize: defaultPageSize,
      search: '',
    },
  });
}

// Hook for table-specific pagination
export interface TablePaginationParams extends StandardPaginationParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export function useTablePagination(
  options: Omit<UsePaginationOptions, 'defaults'> & {
    defaultPageSize?: number;
    defaultSortBy?: string;
    defaultSortOrder?: 'asc' | 'desc';
  } = {}
) {
  const { 
    defaultPageSize = 10, 
    defaultSortBy = '', 
    defaultSortOrder = 'asc',
    ...restOptions 
  } = options;
  
  return usePagination<TablePaginationParams>({
    ...restOptions,
    defaults: {
      page: 1,
      pageSize: defaultPageSize,
      search: '',
      sortBy: defaultSortBy,
      sortOrder: defaultSortOrder,
    },
    resetPageOnChange: ['search', 'sortBy', 'sortOrder', ...(restOptions.resetPageOnChange || [])],
  });
} 