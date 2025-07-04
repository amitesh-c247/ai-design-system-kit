import { mockApiClient } from "@/utils/mockapi";
import type { Page } from "@/types/cms";

// ============================================================================
// ENDPOINTS
// ============================================================================
const ENDPOINTS = {
  PAGE: "/page",
  PAGE_BY_ID: (id: string) => `/page/${id}`,
  PAGE_BY_SLUG: (slug: string) => `/page?slug=${encodeURIComponent(slug)}`,
  PAGE_BY_STATUS: (status: string) => `/page?status=${status}`,
  PAGE_SEARCH: (query: string) => `/page?search=${encodeURIComponent(query)}`,
};

export const cmsService = {
  // Get all pages
  async getPages(): Promise<Page[]> {
    const res = await mockApiClient.get<Page[]>(ENDPOINTS.PAGE);
    return res.data;
  },

  // Get single page by ID
  async getPage(id: string): Promise<Page | undefined> {
    const res = await mockApiClient.get<Page>(ENDPOINTS.PAGE_BY_ID(id));
    return res.data;
  },

  // Get page by slug (useful for frontend)
  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const res = await mockApiClient.get<Page[]>(ENDPOINTS.PAGE_BY_SLUG(slug));
    return res.data[0]; // MockAPI returns array for filtered results
  },

  // Create new page
  async createPage(data: Omit<Page, "id">): Promise<Page> {
    const res = await mockApiClient.post<Page>(ENDPOINTS.PAGE, data);
    return res.data;
  },

  // Update existing page
  async updatePage(
    id: string,
    data: Partial<Omit<Page, "id">>
  ): Promise<Page | undefined> {
    const res = await mockApiClient.put<Page>(ENDPOINTS.PAGE_BY_ID(id), data);
    return res.data;
  },

  // Delete page
  async deletePage(id: string): Promise<boolean> {
    await mockApiClient.delete<null>(ENDPOINTS.PAGE_BY_ID(id));
    return true;
  },

  // Get pages by status (published, draft, archived)
  async getPagesByStatus(status: Page["status"]): Promise<Page[]> {
    const res = await mockApiClient.get<Page[]>(
      ENDPOINTS.PAGE_BY_STATUS(status)
    );
    return res.data;
  },

  // Search pages by title or content
  async searchPages(query: string): Promise<Page[]> {
    const res = await mockApiClient.get<Page[]>(ENDPOINTS.PAGE_SEARCH(query));
    return res.data;
  },
};
