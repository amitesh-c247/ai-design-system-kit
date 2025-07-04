import { api } from "@/utils/api";
import { cookieService } from "@/utils/cookieService";
import type { LoginCredentials, AuthResponse } from "@/types/auth";
import { ApiError } from "@/types";

// ============================================================================
// ENDPOINTS
// ============================================================================
const ENDPOINTS = {
  LOGIN: "login",
  LOGOUT: "logout",
  ME: "me",
  USERS: "/users",
};

// Auth service functions
export const authService = {
  // Login function
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(
        ENDPOINTS.LOGIN,
        credentials
      );
      const { user, token } = response.data;

      // Store token in cookies
      cookieService.set(
        "auth_token",
        { token },
        {
          expires: 7, // 7 days
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        }
      );

      // Store user data in cookies
      cookieService.set(
        "user_data",
        { user },
        {
          expires: 7, // 7 days
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        }
      );

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error as ApiError;
    }
  },

  // Logout function
  logout: async (): Promise<void> => {
    try {
      await api.post(ENDPOINTS.LOGOUT, {});
    } finally {
      // Clear auth cookies
      cookieService.remove("auth_token");
      cookieService.remove("user_data");
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<AuthResponse["user"]> => {
    try {
      const token = cookieService.get<string>("auth_token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await api.get<AuthResponse["user"]>(ENDPOINTS.ME);
      return response.data;
    } catch (error) {
      console.error("Get current user error:", error);

      // If it's a 401 error, don't fall back to cached data - the user is truly unauthorized
      if ((error as ApiError)?.status === 401) {
        // Clear any cached user data since it's no longer valid
        cookieService.remove("user_data");
        throw error as ApiError;
      }

      // For other errors (network issues, etc.), try to get user data from cookie as fallback
      const userData = cookieService.get<AuthResponse["user"]>("user_data");
      if (userData) {
        return userData;
      }
      throw error as ApiError;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = cookieService.get<string>("auth_token");
    return !!token;
  },

  // Get auth token
  getToken: (): string | null => {
    return cookieService.get<string>("auth_token");
  },
};
