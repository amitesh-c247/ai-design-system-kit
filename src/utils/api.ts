import axios, { AxiosInstance, AxiosError } from "axios";
import { cookieService } from "./cookieService";
import type { ApiResponse, ApiError } from "@/types";

// Global 401 handler - will be set by auth context
let onUnauthorized: (() => void) | null = null;

/**
 * Set the global handler for 401 Unauthorized responses
 * This handler will be called whenever any API request receives a 401 status
 * Typically used to redirect to login page and clear auth state
 */
export const setUnauthorizedHandler = (handler: () => void) => {
  onUnauthorized = handler;
};

/**
 * Clear the unauthorized handler (useful for cleanup)
 */
export const clearUnauthorizedHandler = () => {
  onUnauthorized = null;
};

// API configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_REST_API_ENDPOINT || "https://localhost:3000/api";

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
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
  console.log("authData  ", authData);
  return authData?.token?.token || null;
};

// Helper to set auth token
const setAuthToken = (token: string): void => {
  cookieService.set("auth_token", { token });
};

// Helper to remove auth token
const removeAuthToken = (): void => {
  cookieService.remove("auth_token");
  cookieService.remove("refresh_token");
  cookieService.remove("user_data");
};

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    console.log("loek  ", token);
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Handle 401 Unauthorized - clear auth and trigger redirect
    if (error.response?.status === 401) {
      console.warn(
        "401 Unauthorized response received, clearing auth tokens and redirecting to login"
      );

      // Clear auth tokens immediately
      removeAuthToken();

      // Call the unauthorized handler if set (for redirect to login)
      if (onUnauthorized) {
        try {
          onUnauthorized();
        } catch (handlerError) {
          console.error("Error in unauthorized handler:", handlerError);
        }
      } else {
        console.warn(
          "No unauthorized handler set, unable to redirect to login"
        );
      }
    }

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

// Base API handler
export const api = {
  // GET request
  get: async <T>(
    endpoint: string,
    options: any = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.get(endpoint, options);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },

  // POST request
  post: async <T>(
    endpoint: string,
    body: unknown,
    options: any = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.post(endpoint, body, options);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },

  // PUT request
  put: async <T>(
    endpoint: string,
    body: unknown,
    options: any = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.put(endpoint, body, options);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },

  // DELETE request
  delete: async <T>(
    endpoint: string,
    options: any = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.delete(endpoint, options);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },
};

// Export axios instance for direct use if needed
export { axiosInstance };
