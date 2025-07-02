import { mockApiClient } from '@/utils/mockapi';

export interface Faq {
  id: string;
  title: string;
  description: string;
}

export const faqService = {
  async getFaqs(): Promise<Faq[]> {
    const res = await mockApiClient.get<Faq[]>('/faq');
    return res.data;
  },
  async getFaq(id: string): Promise<Faq | undefined> {
    const res = await mockApiClient.get<Faq>(`/faq/${id}`);
    return res.data;
  },
  async createFaq(data: Omit<Faq, 'id'>): Promise<Faq> {
    const res = await mockApiClient.post<Faq>('/faq', data);
    return res.data;
  },
  async updateFaq(id: string, data: Partial<Omit<Faq, 'id'>>): Promise<Faq | undefined> {
    const res = await mockApiClient.put<Faq>(`/faq/${id}`, data);
    return res.data;
  },
  async deleteFaq(id: string): Promise<boolean> {
    await mockApiClient.delete<null>(`/faq/${id}`);
    return true;
  },
}; 