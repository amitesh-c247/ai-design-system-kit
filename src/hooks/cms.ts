import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsService, type Page } from '@/services/cms';

export function usePagesQuery() {
  return useQuery({
    queryKey: ['pages'],
    queryFn: () => cmsService.getPages(),
  });
}

export function usePageQuery(id: string) {
  return useQuery({
    queryKey: ['pages', id],
    queryFn: () => cmsService.getPage(id),
    enabled: !!id,
  });
}

export function useCreatePageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cmsService.createPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
}

export function useUpdatePageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Page, 'id'>> }) => cmsService.updatePage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
}

export function useDeletePageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cmsService.deletePage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
} 