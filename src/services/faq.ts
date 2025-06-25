import { api, ApiResponse } from '@/utils/api';

export interface Faq {
  id: string;
  title: string;
  description: string;
}

export const faqService = {
  async getFaqs(): Promise<Faq[]> {
    const res = await api.get<Faq[]>('/faq');
    return res.data;
  },
  async getFaq(id: string): Promise<Faq | undefined> {
    const res = await api.get<Faq>(`/faq/${id}`);
    return res.data;
  },
  async createFaq(data: Omit<Faq, 'id'>): Promise<Faq> {
    const res = await api.post<Faq>('/faq', data);
    return res.data;
  },
  async updateFaq(id: string, data: Partial<Omit<Faq, 'id'>>): Promise<Faq | undefined> {
    const res = await api.put<Faq>(`/faq/${id}`, data);
    return res.data;
  },
  async deleteFaq(id: string): Promise<boolean> {
    await api.delete<null>(`/faq/${id}`);
    return true;
  },
}; 