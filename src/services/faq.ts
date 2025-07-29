import { mockApiClient } from "@/types/utils/mockapi";

export interface Faq {
  id: string;
  title: string;
  description: string;
}

export interface FaqCreateRequest {
  title: string;
  description: string;
}

// ============================================================================
// ENDPOINTS
// ============================================================================
const BASE_PATH = "/faq";
const ENDPOINTS = {
  FAQS: BASE_PATH,
  FAQ_BY_ID: (id: string) => `${BASE_PATH}/${id}`,
};

export const faqService = {
  async getFaqs(): Promise<Faq[]> {
    const res = await mockApiClient.get<Faq[]>(ENDPOINTS.FAQS);
    return res.data;
  },
  async getFaq(id: string): Promise<Faq | undefined> {
    const res = await mockApiClient.get<Faq>(ENDPOINTS.FAQ_BY_ID(id));
    return res.data;
  },
  async createFaq(data: FaqCreateRequest): Promise<Faq> {
    const res = await mockApiClient.post<Faq>(ENDPOINTS.FAQS, data);
    return res.data;
  },
  async updateFaq(
    id: string,
    data: Partial<FaqCreateRequest>
  ): Promise<Faq | undefined> {
    const res = await mockApiClient.put<Faq>(ENDPOINTS.FAQ_BY_ID(id), data);
    return res.data;
  },
  async deleteFaq(id: string): Promise<boolean> {
    await mockApiClient.delete<null>(ENDPOINTS.FAQ_BY_ID(id));
    return true;
  },
};
