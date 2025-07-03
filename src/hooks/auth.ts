import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authService, LoginCredentials } from '@/services/auth';
import { setUnauthorizedHandler, clearUnauthorizedHandler } from '@/utils/api';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Set up the global 401 handler
  useEffect(() => {
    const handleUnauthorized = () => {
      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: ['user'] });
      queryClient.clear();
      
      // Redirect to login
      router.replace('/login');
    };

    setUnauthorizedHandler(handleUnauthorized);
    
    // Cleanup on unmount
    return () => {
      clearUnauthorizedHandler();
    };
  }, [router, queryClient]);

  // Login mutation
  const login = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.replace('/dashboard');
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
      queryClient.removeQueries({ queryKey: ['user'] });
      router.replace('/login');
    },
  });

  // Get current user query with 401 handling
  const { data: user, isLoading: isLoadingUser, error } = useQuery({
    queryKey: ['user'],
    queryFn: authService.getCurrentUser,
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors
      if (error?.status === 401) {
        return false;
      }
      // Retry up to 1 time for other errors
      return failureCount < 1;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: authService.isAuthenticated(), // Only fetch if authenticated
  });

  // Handle 401 errors from the user query
  useEffect(() => {
    if (error && (error as any)?.status === 401) {
      // Clear user queries when we get a 401
      queryClient.removeQueries({ queryKey: ['user'] });
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