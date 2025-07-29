import { api } from "@/types/utils/api";
import type { User } from "@/types/auth";

// ============================================================================
// TYPES
// ============================================================================
export interface PaginatedResponse<T> {
  total: number;
  users: T[];
}

export interface UserCreateRequest {
  name: string;
  email: string;
  status: number; // 0 = Active, 1 = Inactive
}

// ============================================================================
// ENDPOINTS
// ============================================================================
const BASE_PATH = "user";
const ENDPOINTS = {
  ADD_UPDATE: BASE_PATH,
  USER_BY_ID: (id: number | string) => `${BASE_PATH}/${id}`,
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
    const res = await api.get<{
      success: boolean;
      message: string;
      data: PaginatedResponse<User>;
    }>(`${BASE_PATH}?${params.toString()}`);
    return res.data.data;
  },
  async getUser(id: number): Promise<User | undefined> {
    const res = await api.get<User>(ENDPOINTS.USER_BY_ID(id));
    return res.data;
  },
  async createUser(data: UserCreateRequest): Promise<User> {
    console.log("ENDPOINTS.ADD_UPDATE  => ", ENDPOINTS.ADD_UPDATE);
    const res = await api.post<User>(ENDPOINTS.ADD_UPDATE, data);
    return res.data;
  },
  async updateUser(
    id: number,
    data: Partial<UserCreateRequest>
  ): Promise<User | undefined> {
    const res = await api.put<User>(ENDPOINTS.USER_BY_ID(id), data);
    return res.data;
  },
  async deleteUser(id: string | number): Promise<boolean> {
    await api.delete<null>(ENDPOINTS.USER_BY_ID(id));
    return true;
  },
};
