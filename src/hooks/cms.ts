import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cmsService } from "@/services/cms";
import { CMSPage } from "@/types/cms";

// ============================================================================
// CMS QUERY KEYS
// ============================================================================
const CMS_QUERY_KEYS = {
  PAGES: "pages",
  PAGE: "page",
} as const;

// ============================================================================
// CMS CONFIGURATION
// ============================================================================
const CMS_CONFIG = {
  STALE_TIME: 1000 * 60 * 5, // 5 minutes
  RETRY: {
    retries: 2,
    retryDelay: 1000,
  },
} as const;

export function usePagesQuery() {
  return useQuery({
    queryKey: [CMS_QUERY_KEYS.PAGES],
    queryFn: () => cmsService.getPages(),
    staleTime: CMS_CONFIG.STALE_TIME,
    retry: CMS_CONFIG.RETRY.retries,
  });
}

export function usePageQuery(id: string) {
  return useQuery({
    queryKey: [CMS_QUERY_KEYS.PAGES, id],
    queryFn: () => cmsService.getPage(id),
    enabled: !!id,
    staleTime: CMS_CONFIG.STALE_TIME,
    retry: CMS_CONFIG.RETRY.retries,
  });
}

export function useCreatePageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cmsService.createPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CMS_QUERY_KEYS.PAGES] });
    },
  });
}

export function useUpdatePageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<CMSPage, "id">>;
    }) => cmsService.updatePage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CMS_QUERY_KEYS.PAGES] });
    },
  });
}

export function useDeletePageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cmsService.deletePage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CMS_QUERY_KEYS.PAGES] });
    },
  });
}
