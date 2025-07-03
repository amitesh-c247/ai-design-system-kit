import { mockApiClient } from '@/utils/mockapi';
import type { 
  Page, 
  PageCreateRequest, 
  PageUpdateRequest, 
  PageSearchParams,
  PageStatus,
  ContentType 
} from '@/types/cms';

export const cmsService = {
  // Get all pages
  async getPages(): Promise<Page[]> {
    const res = await mockApiClient.get<Page[]>('/page');
    return res.data;
  },

  // Get single page by ID
  async getPage(id: string): Promise<Page | undefined> {
    const res = await mockApiClient.get<Page>(`/page/${id}`);
    return res.data;
  },

  // Get page by slug (useful for frontend)
  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const res = await mockApiClient.get<Page[]>(`/page?slug=${encodeURIComponent(slug)}`);
    return res.data[0]; // MockAPI returns array for filtered results
  },

  // Create new page
  async createPage(data: Omit<Page, 'id'>): Promise<Page> {
    const res = await mockApiClient.post<Page>('/page', data);
    return res.data;
  },

  // Update existing page
  async updatePage(id: string, data: Partial<Omit<Page, 'id'>>): Promise<Page | undefined> {
    const res = await mockApiClient.put<Page>(`/page/${id}`, data);
    return res.data;
  },

  // Delete page
  async deletePage(id: string): Promise<boolean> {
    await mockApiClient.delete<null>(`/page/${id}`);
    return true;
  },

  // Get pages by status (published, draft, archived)
  async getPagesByStatus(status: Page['status']): Promise<Page[]> {
    const res = await mockApiClient.get<Page[]>(`/page?status=${status}`);
    return res.data;
  },

  // Search pages by title or content
  async searchPages(query: string): Promise<Page[]> {
    const res = await mockApiClient.get<Page[]>(`/page?search=${encodeURIComponent(query)}`);
    return res.data;
  },
}; 