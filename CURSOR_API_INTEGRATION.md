# API Integration Guide

## 🌐 API Architecture

This project uses a **centralized API layer** with TanStack Query for state management, providing a robust foundation for server communication with caching, error handling, and optimistic updates.

### Core API Structure

```
src/
├── services/           # API service layer
│   ├── auth.ts        # Authentication services
│   └── user.ts        # User management services
├── utils/
│   ├── api.ts         # Base API client
│   └── cookieService.ts # Cookie management
└── hooks/
    ├── useAuth.ts     # Authentication hooks
    └── useUserCrud.ts # User CRUD operations
```

## 🔧 Base API Client

### API Configuration (`src/utils/api.ts`)

```typescript
// API response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT || 'http://localhost:3000/api';

// Base API handler with authentication
export const api = {
  // GET request
  get: async <T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    const data = await response.json();
    return { data, status: response.status };
  },

  // POST request
  post: async <T>(endpoint: string, body: unknown, options: RequestInit = {}): Promise<ApiResponse<T>> => {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    const data = await response.json();
    return { data, status: response.status };
  },

  // PUT request
  put: async <T>(endpoint: string, body: unknown, options: RequestInit = {}): Promise<ApiResponse<T>> => {
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    const data = await response.json();
    return { data, status: response.status };
  },

  // DELETE request
  delete: async <T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    const data = await response.json();
    return { data, status: response.status };
  },
};
```

### Error Handling

```typescript
// Helper to handle API errors
const handleApiError = async (response: Response): Promise<never> => {
  const error = await response.json().catch(() => ({}));
  throw {
    message: error.message || 'An error occurred',
    code: error.code,
    status: response.status,
  } as ApiError;
};
```

## 🔐 Authentication Service

### Auth Service (`src/services/auth.ts`)

```typescript
import { api, ApiError } from '@/utils/api';
import { cookieService } from '@/utils/cookieService';

// Define types for auth data
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    success: boolean;
    data: {
      id: number;
      first_name: string;
      last_name: string;
      display_name: string;
      email: string;
      dial_code: string;
      country_code: string;
      mobile_number: string;
    }
  };
  token: string;
}

// Auth service functions
export const authService = {
  // Login function
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('login', credentials);
      const { user, token } = response.data;

      // Store token in cookies
      cookieService.set('auth_token', {token}, {
        expires: 7, // 7 days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      // Store user data in cookies
      cookieService.set('user_data', {user}, {
        expires: 7, // 7 days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error as ApiError;
    }
  },

  // Logout function
  logout: async (): Promise<void> => {
    try {
      await api.post('logout', {});
    } finally {
      // Clear auth cookies
      cookieService.remove('auth_token');
      cookieService.remove('user_data');
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<AuthResponse['user']> => {
    try {
      const token = cookieService.get<string>('auth_token');
      
      if (!token) {
        throw new Error('No token found');
      }

      const response = await api.get<AuthResponse['user']>('me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      // Fallback to cookie data
      const userData = cookieService.get<AuthResponse['user']>('user_data');
      if (userData) {
        return userData;
      }
      throw error as ApiError;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = cookieService.get<string>('auth_token');
    return !!token;
  },

  // Get auth token
  getToken: (): string | null => {
    return cookieService.get<string>('auth_token');
  },
};
```

## 🎣 React Query Integration

### Authentication Hook (`src/hooks/useAuth.ts`)

```typescript
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
```

### User CRUD Hook (`src/hooks/useUserCrud.ts`)

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/user';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  display_name: string;
  // ... other user fields
}

export interface CreateUserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  email?: string;
}

export const useUserCrud = () => {
  const queryClient = useQueryClient();

  // Get users query
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Get single user query
  const getUser = (id: number) => useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUser(id),
    enabled: !!id,
  });

  // Create user mutation
  const createUser = useMutation({
    mutationFn: (userData: CreateUserData) => userService.createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Update user mutation
  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserData }) =>
      userService.updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });

  // Delete user mutation
  const deleteUser = useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    users,
    isLoadingUsers,
    getUser,
    createUser: createUser.mutate,
    updateUser: updateUser.mutate,
    deleteUser: deleteUser.mutate,
    isCreatingUser: createUser.isPending,
    isUpdatingUser: updateUser.isPending,
    isDeletingUser: deleteUser.isPending,
    createUserError: createUser.error,
    updateUserError: updateUser.error,
    deleteUserError: deleteUser.error,
  };
};
```

## 🍪 Cookie Management

### Cookie Service (`src/utils/cookieService.ts`)

```typescript
import Cookies from 'js-cookie';

interface CookieOptions {
  expires?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const cookieService = {
  // Set cookie
  set: <T>(name: string, value: T, options: CookieOptions = {}): void => {
    const cookieOptions: Cookies.CookieAttributes = {
      expires: options.expires || 7, // Default 7 days
      path: options.path || '/',
      secure: options.secure || process.env.NODE_ENV === 'production',
      sameSite: options.sameSite || 'strict',
    };

    if (options.domain) {
      cookieOptions.domain = options.domain;
    }

    Cookies.set(name, JSON.stringify(value), cookieOptions);
  },

  // Get cookie
  get: <T>(name: string): T | null => {
    const value = Cookies.get(name);
    if (!value) return null;
    
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  },

  // Remove cookie
  remove: (name: string, options: CookieOptions = {}): void => {
    const cookieOptions: Cookies.CookieAttributes = {
      path: options.path || '/',
    };

    if (options.domain) {
      cookieOptions.domain = options.domain;
    }

    Cookies.remove(name, cookieOptions);
  },

  // Check if cookie exists
  exists: (name: string): boolean => {
    return Cookies.get(name) !== undefined;
  },
};
```

## 📊 Data Fetching Patterns

### 1. Basic Query Pattern

```typescript
// In a component
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['resource'],
  queryFn: () => apiService.getResource(),
  staleTime: 1000 * 60 * 5, // 5 minutes
  retry: 3,
});

// Usage
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
return <DataDisplay data={data} />;
```

### 2. Mutation Pattern

```typescript
// In a component
const mutation = useMutation({
  mutationFn: (data: CreateData) => apiService.createResource(data),
  onSuccess: (data) => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['resources'] });
    // Show success message
    toast.success('Resource created successfully');
  },
  onError: (error) => {
    // Show error message
    toast.error('Failed to create resource');
  },
});

// Usage
const handleSubmit = (formData: CreateData) => {
  mutation.mutate(formData);
};
```

### 3. Optimistic Updates

```typescript
const updateMutation = useMutation({
  mutationFn: ({ id, data }) => apiService.updateResource(id, data),
  onMutate: async ({ id, data }) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['resource', id] });
    
    // Snapshot previous value
    const previousData = queryClient.getQueryData(['resource', id]);
    
    // Optimistically update
    queryClient.setQueryData(['resource', id], (old) => ({
      ...old,
      ...data,
    }));
    
    return { previousData };
  },
  onError: (err, variables, context) => {
    // Rollback on error
    if (context?.previousData) {
      queryClient.setQueryData(['resource', id], context.previousData);
    }
  },
  onSettled: (data, error, variables) => {
    // Always refetch after error or success
    queryClient.invalidateQueries({ queryKey: ['resource', variables.id] });
  },
});
```

## 🔄 Error Handling Strategies

### 1. Global Error Handler

```typescript
// utils/errorHandler.ts
export const handleApiError = (error: ApiError) => {
  switch (error.status) {
    case 401:
      // Unauthorized - redirect to login
      router.push('/login');
      break;
    case 403:
      // Forbidden - show access denied
      toast.error('Access denied');
      break;
    case 404:
      // Not found
      toast.error('Resource not found');
      break;
    case 500:
      // Server error
      toast.error('Server error. Please try again later.');
      break;
    default:
      // Generic error
      toast.error(error.message || 'An error occurred');
  }
};
```

### 2. Retry Logic

```typescript
const { data, error } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  retry: (failureCount, error) => {
    // Don't retry on 4xx errors
    if (error.status >= 400 && error.status < 500) {
      return false;
    }
    // Retry up to 3 times for other errors
    return failureCount < 3;
  },
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
});
```

## 🚀 Performance Optimization

### 1. Query Caching

```typescript
// Configure global query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### 2. Background Refetching

```typescript
const { data } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  refetchIntervalInBackground: true, // Continue refetching in background
});
```

### 3. Prefetching

```typescript
// Prefetch data for better UX
const prefetchData = () => {
  queryClient.prefetchQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });
};

// Use in useEffect or event handlers
useEffect(() => {
  prefetchData();
}, []);
```

## 🔒 Security Considerations

### 1. Token Management

```typescript
// Automatic token refresh
const api = {
  get: async <T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
    const token = getAuthToken();
    
    if (token && isTokenExpired(token)) {
      await refreshToken();
    }
    
    // ... rest of the implementation
  },
};
```

### 2. CSRF Protection

```typescript
// Include CSRF token in requests
const getCsrfToken = () => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
};

const headers = {
  'Content-Type': 'application/json',
  'X-CSRF-Token': getCsrfToken(),
  ...(token && { Authorization: token }),
};
```

This comprehensive API integration guide provides the foundation for building robust, secure, and performant data fetching in the admin theme project. 