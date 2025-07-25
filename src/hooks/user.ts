import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user";
import type { UserCreateRequest } from "@/services/user";
import type { User } from "@/types/auth";

// ============================================================================
// USER QUERY KEYS
// ============================================================================
const USER_QUERY_KEYS = {
  USERS: "users",
  USER: "user",
} as const;

// ============================================================================
// USER CONFIGURATION
// ============================================================================
const USER_CONFIG = {
  STALE_TIME: 1000 * 60 * 5, // 5 minutes
  RETRY: {
    retries: 2,
    retryDelay: 1000,
  },
} as const;

export function useUsersQuery(
  page: number,
  limit: number,
  search: string = ""
) {
  return useQuery({
    queryKey: [USER_QUERY_KEYS.USERS, page, limit, search],
    queryFn: () => userService.getUsers(page, limit, search),
    staleTime: USER_CONFIG.STALE_TIME,
    retry: USER_CONFIG.RETRY.retries,
    // keepPreviousData: true, // Uncomment if your React Query version supports it
  });
}

export function useUserQuery(id: number) {
  return useQuery({
    queryKey: [USER_QUERY_KEYS.USERS, id],
    queryFn: () => userService.getUser(id),
    enabled: !!id,
    staleTime: USER_CONFIG.STALE_TIME,
    retry: USER_CONFIG.RETRY.retries,
  });
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserCreateRequest) => userService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.USERS] });
    },
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<UserCreateRequest>;
    }) => userService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.USERS] });
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.USERS] });
    },
  });
}
