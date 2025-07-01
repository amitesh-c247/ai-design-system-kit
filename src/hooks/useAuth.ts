import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService, LoginCredentials } from '@/services/auth';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Login mutation
  const login = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      console.log('Login success:', data);
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

  // Get current user query
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: authService.getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: authService.isAuthenticated(), // Only fetch if authenticated
  });

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
  };
}; 