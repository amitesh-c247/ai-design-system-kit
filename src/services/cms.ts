import { mockApiClient } from "@/types/utils/mockapi";
import type { CMSPage } from "@/types/cms";

// ============================================================================
// ENDPOINTS
// ============================================================================
const BASE_PATH = "page";
const ENDPOINTS = {
  PAGE: BASE_PATH,
  PAGE_BY_ID: (id: string) => `${BASE_PATH}/${id}`,
  PAGE_BY_SLUG: (slug: string) =>
    `${BASE_PATH}?slug=${encodeURIComponent(slug)}`,
  PAGE_BY_STATUS: (status: string) => `${BASE_PATH}?status=${status}`,
  PAGE_SEARCH: (query: string) =>
    `${BASE_PATH}?search=${encodeURIComponent(query)}`,
};

export type { CMSPage };

export const cmsService = {
  // Get all pages
  async getPages(): Promise<CMSPage[]> {
    const res = await mockApiClient.get<CMSPage[]>(ENDPOINTS.PAGE);
    return res.data;
  },

  // Get single page by ID
  async getPage(id: string): Promise<CMSPage | undefined> {
    const res = await mockApiClient.get<CMSPage>(ENDPOINTS.PAGE_BY_ID(id));
    return res.data;
  },

  // Get page by slug (useful for frontend)
  async getPageBySlug(slug: string): Promise<CMSPage | undefined> {
    const res = await mockApiClient.get<CMSPage[]>(
      ENDPOINTS.PAGE_BY_SLUG(slug)
    );
    return res.data[0]; // MockAPI returns array for filtered results
  },

  // Create new page
  async createPage(data: Omit<CMSPage, "id">): Promise<CMSPage> {
    const res = await mockApiClient.post<CMSPage>(ENDPOINTS.PAGE, data);
    return res.data;
  },

  // Update existing page
  async updatePage(
    id: string,
    data: Partial<Omit<CMSPage, "id">>
  ): Promise<CMSPage | undefined> {
    const res = await mockApiClient.put<CMSPage>(
      ENDPOINTS.PAGE_BY_ID(id),
      data
    );
    return res.data;
  },

  // Delete page
  async deletePage(id: string): Promise<boolean> {
    await mockApiClient.delete<null>(ENDPOINTS.PAGE_BY_ID(id));
    return true;
  },

  // Get pages by status (published, draft, archived)
  async getPagesByStatus(status: CMSPage["status"]): Promise<CMSPage[]> {
    const res = await mockApiClient.get<CMSPage[]>(
      ENDPOINTS.PAGE_BY_STATUS(status)
    );
    return res.data;
  },

  // Search pages by title or content
  async searchPages(query: string): Promise<CMSPage[]> {
    const res = await mockApiClient.get<CMSPage[]>(
      ENDPOINTS.PAGE_SEARCH(query)
    );
    return res.data;
  },
};
