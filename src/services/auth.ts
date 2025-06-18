import { api, ApiError } from '@/utils/api';
import { cookieService } from '@/utils/cookieService';

// Define types for our auth data
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
      console.log('Login attempt with credentials:', { ...credentials, password: '***' });
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

      // Verify token was stored
      const storedToken = cookieService.get<string>('auth_token');
      console.log('Stored token:', storedToken);
      
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
      console.log('Token for me API:', token);
      
      if (!token) {
        throw new Error('No token found');
      }

      const response = await api.get<AuthResponse['user']>('me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      // If the API call fails, try to get user data from cookie
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
    console.log('Checking authentication, token:', token);
    return !!token;
  },

  // Get auth token
  getToken: (): string | null => {
    return cookieService.get<string>('auth_token');
  },
}; 