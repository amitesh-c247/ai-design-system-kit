import { BaseEntity, ChangeLog } from "./index";

// =============================================================================
// AUTH TYPES
// =============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  agreeToTerms: boolean;
}

export interface ResetPasswordCredentials {
  email: string;
}

export interface ChangePasswordCredentials {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface User extends BaseEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  // snake_case versions for API compatibility
  display_name?: string;
  first_name?: string;
  last_name?: string;
  dialCode?: string;
  countryCode?: string;
  mobileNumber?: string;
  avatar?: string;
  role: UserRole;
  permissions?: string[];
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: string;
}

export interface UserRole extends BaseEntity {
  name: string;
  description?: string;
  permissions: Permission[];
  isDefault?: boolean;
}

export interface Permission extends BaseEntity {
  name: string;
  resource: string;
  action: string;
  description?: string;
}

export interface AuthResponse {
  user: {
    success: boolean;
    data: User;
  };
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  resetPassword: (credentials: ResetPasswordCredentials) => Promise<void>;
  changePassword: (credentials: ChangePasswordCredentials) => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

// JWT Token payload interface
export interface JWTPayload {
  sub: string;
  email: string;
  role: string;
  permissions: string[];
  iat: number;
  exp: number;
}

// Session information
export interface SessionInfo {
  userId: number;
  email: string;
  role: string;
  permissions: string[];
  loginAt: string;
  expiresAt: string;
  ipAddress?: string;
  userAgent?: string;
}
