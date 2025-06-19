import { api, ApiResponse } from '@/utils/api';

export interface User {
  id: number;
  make: string;
  short_code: string;
  status: 'ACTIVE' | 'DISABLED';
}

export const userService = {
  async getUsers(page = 1, limit = 10, search = ''): Promise<{ data: User[]; total: number }> {
    const offset = (page - 1) * limit;
    const res = await api.get<{ data: User[]; total: number }>(`vehicle/makes?limit=${limit}&offset=${offset}&search=${encodeURIComponent(search)}`);
    return res.data;
  },
  async getUser(id: number): Promise<User | undefined> {
    const res = await api.get<User>(`vehicle/makes/${id}`);
    return res.data;
  },
  async createUser(data: Omit<User, 'id'>): Promise<User> {
    const res = await api.post<User>('vehicle/make', data);
    return res.data;
  },
  async updateUser(id: number, data: Partial<Omit<User, 'id'>>): Promise<User | undefined> {
    const res = await api.put<User>(`vehicle/make/${id}`, data);
    return res.data;
  },
  async deleteUser(id: number): Promise<boolean> {
    await api.delete<null>(`vehicle/make/${id}`);
    return true;
  },
}; 