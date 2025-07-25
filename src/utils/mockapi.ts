import axios, { AxiosInstance, AxiosError } from "axios";
import { cookieService } from "./cookieService";
import type { ApiResponse, ApiError } from "@/types";

// Shared MockAPI configuration
const MOCKAPI_BASE_URL =
  process.env.NEXT_PUBLIC_MOCKAPI_BASE_URL ||
  "https://6853a9cea2a37a1d6f495380.mockapi.io/api/v1";

// Create axios instance for MockAPI
const mockApiAxios: AxiosInstance = axios.create({
  baseURL: MOCKAPI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

// Helper to get auth token
const getAuthToken = (): string | null => {
  const authData = cookieService.get<{
    token: { token: string; expire: string };
  }>("auth_token");
  return authData?.token?.token || null;
};

// Request interceptor to add auth token
mockApiAxios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
mockApiAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Transform axios error to ApiError
    const apiError: ApiError = {
      message:
        (error.response?.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
          ? String(error.response.data.message)
          : null) ||
        error.message ||
        "An error occurred",
      code:
        (error.response?.data &&
        typeof error.response.data === "object" &&
        "code" in error.response.data
          ? String(error.response.data.code)
          : null) || error.code,
      status: error.response?.status || 500,
    };

    return Promise.reject(apiError);
  }
);

// Shared MockAPI client
export const mockApiClient = {
  get: async <T>(
    endpoint: string,
    options: any = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await mockApiAxios.get(endpoint, options);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },

  post: async <T>(
    endpoint: string,
    body: unknown,
    options: any = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await mockApiAxios.post(endpoint, body, options);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },

  put: async <T>(
    endpoint: string,
    body: unknown,
    options: any = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await mockApiAxios.put(endpoint, body, options);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },

  delete: async <T>(
    endpoint: string,
    options: any = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await mockApiAxios.delete(endpoint, options);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },
};
