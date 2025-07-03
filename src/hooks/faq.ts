import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { faqService, type Faq } from '@/services/faq';

export function useFaqsQuery() {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: () => faqService.getFaqs(),
  });
}

export function useFaqQuery(id: string) {
  return useQuery({
    queryKey: ['faqs', id],
    queryFn: () => faqService.getFaq(id),
    enabled: !!id,
  });
}

export function useCreateFaqMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: faqService.createFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });
}

export function useUpdateFaqMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Faq, 'id'>> }) => faqService.updateFaq(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });
}

export function useDeleteFaqMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => faqService.deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });
} 