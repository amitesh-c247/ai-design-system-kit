import { cookieService } from './cookieService';

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
// const API_BASE_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT || 'http://localhost:3000/api';
const API_BASE_URL = 'https://6853a9cea2a37a1d6f495380.mockapi.io/api/v1';

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
  console.log('Getting auth token:', authData);
  return authData?.token?.token || null;
};

// Helper to set auth token
const setAuthToken = (token: string): void => {
  cookieService.set('auth_token', { token });
};

// Helper to remove auth token
const removeAuthToken = (): void => {
  cookieService.remove('auth_token');
  cookieService.remove('refresh_token');
};

// Base API handler
export const api = {
  // GET request
  get: async <T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
    const token = getAuthToken();
    console.log('Token for GET request:', token);

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
      ...options.headers,
    };
    console.log('Request headers:', headers);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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

  // POST request
  post: async <T>(endpoint: string, body: unknown, options: RequestInit = {}): Promise<ApiResponse<T>> => {
    const token = getAuthToken();

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
      ...options.headers,
    };
    console.log('Request headers:', headers);

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
    return {
      data,
      status: response.status,
    };
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
    return {
      data,
      status: response.status,
    };
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