import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/api';

export function useCmsQuery(page = 1, pageSize = 10) {
  const offset = (page - 1);
  return useQuery({
    queryKey: ['cms', page, pageSize],
    queryFn: async () => {
      const { data } = await api.get(`pages?limit=${pageSize}&search=&offset=${offset}`);
      return data;
    },
  });
}

export function useCmsPageQuery(slug: string) {
  return useQuery({
    queryKey: ['cmsPage', slug],
    queryFn: async () => {
      const { data } = await api.get(`page/${slug}`);
      return data;
    },
    enabled: !!slug,
  });
}

export function useCreateCmsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => api.post('/page', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms'] });
    },
  });
}

export function useUpdateCmsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) => api.post(`page/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms'] });
    },
  });
}

export function useDeleteCmsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`page/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms'] });
    },
  });
} 