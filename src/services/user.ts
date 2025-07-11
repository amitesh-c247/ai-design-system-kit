import { api } from "@/utils/api";
import type { User } from "@/types/auth";

// ============================================================================
// TYPES
// ============================================================================
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserCreateRequest {
  make: string;
  short_code: string;
  status: "ACTIVE" | "DISABLED";
}

// ============================================================================
// ENDPOINTS
// ============================================================================
const BASE_PATH = "makes";
const ENDPOINTS = {
  USERS: BASE_PATH,
  USER_BY_ID: (id: number) => `${BASE_PATH}/${id}`,
};

export const userService = {
  async getUsers(
    page: number,
    limit: number,
    search: string = ""
  ): Promise<PaginatedResponse<User>> {
    // Example: /users?page=1&limit=10&search=foo
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(search ? { search } : {}),
    });
    const res = await api.get<PaginatedResponse<User>>(
      `${ENDPOINTS.USERS}?${params.toString()}`
    );
    return res.data;
  },
  async getUser(id: number): Promise<User | undefined> {
    const res = await api.get<User>(ENDPOINTS.USER_BY_ID(id));
    return res.data;
  },
  async createUser(data: UserCreateRequest): Promise<User> {
    const res = await api.post<User>(ENDPOINTS.USERS, data);
    return res.data;
  },
  async updateUser(
    id: number,
    data: Partial<UserCreateRequest>
  ): Promise<User | undefined> {
    const res = await api.put<User>(ENDPOINTS.USER_BY_ID(id), data);
    return res.data;
  },
  async deleteUser(id: number): Promise<boolean> {
    await api.delete<null>(ENDPOINTS.USER_BY_ID(id));
    return true;
  },
};
