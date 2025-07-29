import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authService } from "@/services/auth";
import { LoginCredentials } from "@/types/auth";
import {
  setUnauthorizedHandler,
  clearUnauthorizedHandler,
} from "@/types/utils/api";

// ============================================================================
// AUTH QUERY KEYS
// ============================================================================
const AUTH_QUERY_KEYS = {
  USER: "user",
} as const;

// ============================================================================
// AUTH CONFIGURATION
// ============================================================================
const AUTH_CONFIG = {
  STALE_TIME: 1000 * 60 * 5, // 5 minutes
  RETRY: {
    retries: 1, // Lower retries for auth to fail fast
    retryDelay: 1000,
  },
} as const;

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Set up the global 401 handler
  useEffect(() => {
    const handleUnauthorized = () => {
      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: [AUTH_QUERY_KEYS.USER] });
      queryClient.clear();

      // Redirect to login
      router.replace("/login");
    };

    setUnauthorizedHandler(handleUnauthorized);

    // Cleanup on unmount
    return () => {
      clearUnauthorizedHandler();
    };
  }, [router, queryClient]);

  // Login mutation
  const login = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEYS.USER] });
      router.replace("/dashboard");
    },
  });

  // Logout mutation
  const logout = useMutation({
    mutationFn: async () => {
      // Clear cache first to ensure immediate state update
      queryClient.clear();
      // Then make the API call
      await authService.logout();
    },
    onSuccess: () => {
      // Remove the user query from cache to prevent refetch
      queryClient.removeQueries({ queryKey: [AUTH_QUERY_KEYS.USER] });
      router.replace("/login");
    },
  });

  // Get current user query with 401 handling
  const {
    data: user,
    isLoading: isLoadingUser,
    error,
  } = useQuery({
    queryKey: [AUTH_QUERY_KEYS.USER],
    queryFn: authService.getCurrentUser,
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors
      if (error?.status === 401) {
        return false;
      }
      // Retry up to 1 time for other errors
      return failureCount < AUTH_CONFIG.RETRY.retries;
    },
    staleTime: AUTH_CONFIG.STALE_TIME,
    enabled: authService.isAuthenticated(), // Only fetch if authenticated
  });

  // Handle 401 errors from the user query
  useEffect(() => {
    if (error && (error as any)?.status === 401) {
      // Clear user queries when we get a 401
      queryClient.removeQueries({ queryKey: [AUTH_QUERY_KEYS.USER] });
    }
  }, [error, queryClient]);

  // Check if user is authenticated
  const isAuthenticated = authService.isAuthenticated();

  return {
    user,
    isLoadingUser,
    isAuthenticated,
    login: login.mutate,
    logout: logout.mutate,
    isLoggingIn: login.isPending,
    isLoggingOut: logout.isPending,
    loginError: login.error,
    userError: error,
  };
};
