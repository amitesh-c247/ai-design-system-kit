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

// Helper to handle API errors
const handleApiError = async (response: Response): Promise<never> => {
  const error = await response.json().catch(() => ({}));

  // Handle 401 Unauthorized - clear auth and trigger redirect
  if (response.status === 401) {
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
      console.warn("No unauthorized handler set, unable to redirect to login");
    }
  }

  throw {
    message: error.message || "An error occurred",
    code: error.code,
    status: response.status,
  } as ApiError;
};

// Helper to get auth token
const getAuthToken = (): string | null => {
  const authData = cookieService.get<{
    token: { token: string; expire: string };
  }>("auth_token");
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

// Base API handler
export const api = {
  // GET request
  get: async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    const token = getAuthToken();

    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "GET",
      headers,
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  },

  // POST request
  post: async <T>(
    endpoint: string,
    body: unknown,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    const token = getAuthToken();

    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
      ...options.headers,
    };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  },

  // PUT request
  put: async <T>(
    endpoint: string,
    body: unknown,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    const token = getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  },

  // DELETE request
  delete: async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    const token = getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  },
};

// Auth token management
export const authToken = {
  get: getAuthToken,
  set: setAuthToken,
  remove: removeAuthToken,
};
