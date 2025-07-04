import { api } from "@/utils/api";
import type { User } from "@/types/auth";

// ============================================================================
// ENDPOINTS
// ============================================================================
const BASE_PATH = "/users";
const ENDPOINTS = {
  USERS: BASE_PATH,
  USER_BY_ID: (id: number) => `${BASE_PATH}/${id}`,
};

export const userService = {
  async getUsers(
    page: number,
    limit: number,
    search: string = ""
  ): Promise<User[]> {
    // Example: /users?page=1&limit=10&search=foo
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(search ? { search } : {}),
    });
    const res = await api.get<User[]>(
      `${ENDPOINTS.USERS}?${params.toString()}`
    );
    return res.data;
  },
  async getUser(id: number): Promise<User | undefined> {
    const res = await api.get<User>(ENDPOINTS.USER_BY_ID(id));
    return res.data;
  },
  async createUser(data: Omit<User, "id">): Promise<User> {
    const res = await api.post<User>(ENDPOINTS.USERS, data);
    return res.data;
  },
  async updateUser(
    id: number,
    data: Partial<Omit<User, "id">>
  ): Promise<User | undefined> {
    const res = await api.put<User>(ENDPOINTS.USER_BY_ID(id), data);
    return res.data;
  },
  async deleteUser(id: number): Promise<boolean> {
    await api.delete<null>(ENDPOINTS.USER_BY_ID(id));
    return true;
  },
};
