import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { faqService, type Faq } from "@/services/faq";

// ============================================================================
// FAQ QUERY KEYS
// ============================================================================
const FAQ_QUERY_KEYS = {
  FAQS: "faqs",
  FAQ: "faq",
} as const;

// ============================================================================
// FAQ CONFIGURATION
// ============================================================================
const FAQ_CONFIG = {
  STALE_TIME: 1000 * 60 * 5, // 5 minutes
  RETRY: {
    retries: 2,
    retryDelay: 1000,
  },
} as const;

export function useFaqsQuery() {
  return useQuery({
    queryKey: [FAQ_QUERY_KEYS.FAQS],
    queryFn: () => faqService.getFaqs(),
    staleTime: FAQ_CONFIG.STALE_TIME,
    retry: FAQ_CONFIG.RETRY.retries,
  });
}

export function useFaqQuery(id: string) {
  return useQuery({
    queryKey: [FAQ_QUERY_KEYS.FAQS, id],
    queryFn: () => faqService.getFaq(id),
    enabled: !!id,
    staleTime: FAQ_CONFIG.STALE_TIME,
    retry: FAQ_CONFIG.RETRY.retries,
  });
}

export function useCreateFaqMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: faqService.createFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FAQ_QUERY_KEYS.FAQS] });
    },
  });
}

export function useUpdateFaqMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Faq, "id">>;
    }) => faqService.updateFaq(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FAQ_QUERY_KEYS.FAQS] });
    },
  });
}

export function useDeleteFaqMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => faqService.deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FAQ_QUERY_KEYS.FAQS] });
    },
  });
}
