// Authentication type definitions for Shopping Monitor

/**
 * User data structure
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: Date;
  lastLoginAt?: Date;
  preferences?: UserPreferences;
}

/**
 * User preferences
 */
export interface UserPreferences {
  notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'zh-CN';
}

/**
 * Authentication result from login/registration
 */
export interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  expiresAt?: Date;
  error?: string;
}

/**
 * Authentication state for React context
 */
export interface AuthState {
  // Authentication States
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  
  // Session States
  sessionExpiry: Date | null;
  lastActivity: Date | null;
}

/**
 * Authentication actions for React context
 */
export interface AuthActions {
  login: (email: string, password: string, rememberMe: boolean) => Promise<AuthResult>;
  logout: () => void;
  checkSession: () => boolean;
  updateUser: (user: Partial<User>) => void;
  refreshSession: () => void;
}

/**
 * Combined auth context type
 */
export interface AuthContextType extends AuthState, AuthActions {}

/**
 * Mock user database structure
 */
export interface MockUserDatabase {
  [email: string]: MockUser;
}

/**
 * Mock user with password (for mock authentication)
 */
export interface MockUser extends Omit<User, 'preferences'> {
  password: string; // Only for mock auth - never expose in real app
}

/**
 * Stored session data in localStorage
 */
export interface StoredSession {
  userId: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  expiresAt: string;
  rememberMe: boolean;
  createdAt: string;
}

/**
 * Login form data structure
 */
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

/**
 * Login form validation errors
 */
export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

/**
 * Session duration constants
 */
export const SESSION_DURATION = {
  regular: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  remember: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
} as const;

/**
 * Session storage key
 */
export const SESSION_KEY = 'shopping_monitor_session' as const;
