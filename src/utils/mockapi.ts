import { cookieService } from './cookieService';
import type { ApiResponse, ApiError } from '@/types';

// Shared MockAPI configuration
const MOCKAPI_BASE_URL = process.env.NEXT_PUBLIC_MOCKAPI_BASE_URL || 'https://6853a9cea2a37a1d6f495380.mockapi.io/api/v1';

// Helper to handle API errors
const handleApiError = async (response: Response): Promise<never> => {
  const error = await response.json().catch(() => ({}));
  throw {
    message: error.message || 'An error occurred',
    code: error.code,
    status: response.status,
  } as ApiError;
};

// Helper to get auth token
const getAuthToken = (): string | null => {
  const authData = cookieService.get<{ token: { token: string, expire: string } }>('auth_token');
  return authData?.token?.token || null;
};

// Shared MockAPI client
export const mockApiClient = {
  get: async <T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
      ...options.headers,
    };

    const response = await fetch(`${MOCKAPI_BASE_URL}${endpoint}`, {
      ...options,
      method: 'GET',
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

  post: async <T>(endpoint: string, body: unknown, options: RequestInit = {}): Promise<ApiResponse<T>> => {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
      ...options.headers,
    };

    const response = await fetch(`${MOCKAPI_BASE_URL}${endpoint}`, {
      ...options,
      method: 'POST',
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

  put: async <T>(endpoint: string, body: unknown, options: RequestInit = {}): Promise<ApiResponse<T>> => {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
      ...options.headers,
    };

    const response = await fetch(`${MOCKAPI_BASE_URL}${endpoint}`, {
      ...options,
      method: 'PUT',
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

  delete: async <T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
      ...options.headers,
    };

    const response = await fetch(`${MOCKAPI_BASE_URL}${endpoint}`, {
      ...options,
      method: 'DELETE',
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