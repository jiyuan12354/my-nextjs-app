// Authentication context provider for Shopping Monitor

'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { AuthContextType, AuthState, User, AuthResult } from '../../lib/auth/auth-types';
import { mockLogin, mockLogout } from '../../lib/auth/mock-auth';
import { 
  saveSession, 
  getSession, 
  clearSession, 
  refreshSession,
  sessionToUser,
  isSessionValid 
} from '../../lib/auth/auth-storage';

// Initial authentication state
const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true, // Start with loading true to check existing session
  user: null,
  sessionExpiry: null,
  lastActivity: null,
};

// Authentication action types
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; sessionExpiry: Date } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: { user: Partial<User> } }
  | { type: 'REFRESH_SESSION'; payload: { sessionExpiry: Date } }
  | { type: 'SET_LOADING'; payload: { isLoading: boolean } }
  | { type: 'RESTORE_SESSION'; payload: { user: User; sessionExpiry: Date } };

// Authentication reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        sessionExpiry: action.payload.sessionExpiry,
        lastActivity: new Date(),
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        sessionExpiry: null,
        lastActivity: null,
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        sessionExpiry: null,
        lastActivity: null,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload.user } : null,
      };

    case 'REFRESH_SESSION':
      return {
        ...state,
        sessionExpiry: action.payload.sessionExpiry,
        lastActivity: new Date(),
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case 'RESTORE_SESSION':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        sessionExpiry: action.payload.sessionExpiry,
        lastActivity: new Date(),
      };

    default:
      return state;
  }
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | null>(null);

// Authentication provider component
interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    let isMounted = true;
    
    const checkExistingSession = () => {
      try {
        const session = getSession();
        if (session && isMounted) {
          const user = sessionToUser(session);
          const sessionExpiry = new Date(session.expiresAt);
          
          dispatch({
            type: 'RESTORE_SESSION',
            payload: { user, sessionExpiry }
          });
          
          console.log('🔄 Session restored for:', user.email);
        } else if (isMounted) {
          dispatch({ type: 'SET_LOADING', payload: { isLoading: false } });
        }
      } catch (error) {
        console.error('❌ Error checking session:', error);
        if (isMounted) {
          dispatch({ type: 'SET_LOADING', payload: { isLoading: false } });
        }
      }
    };

    checkExistingSession();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Set up session refresh interval
  useEffect(() => {
    if (!state.isAuthenticated) {
      return;
    }

    // Refresh session every 5 minutes if user is active
    const interval = setInterval(() => {
      if (isSessionValid()) {
        refreshSession();
        const session = getSession();
        if (session) {
          dispatch({
            type: 'REFRESH_SESSION',
            payload: { sessionExpiry: new Date(session.expiresAt) }
          });
        }
      } else {
        // Session expired, logout user
        handleLogout();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [state.isAuthenticated]);

  // Login function
  const login = useCallback(async (
    email: string,
    password: string,
    rememberMe: boolean = false
  ): Promise<AuthResult> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const result = await mockLogin(email, password);

      if (result.success && result.user) {
        // Save session to localStorage
        saveSession(result.user, rememberMe);
        
        // Get session for expiry info
        const session = getSession();
        const sessionExpiry = session ? new Date(session.expiresAt) : new Date();

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: result.user,
            sessionExpiry,
          }
        });

        console.log('✅ Login successful for user:', result.user.email);
        return { success: true, user: result.user };
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
        return { success: false, error: result.error || 'Login failed' };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      dispatch({ type: 'LOGIN_FAILURE' });
      return { success: false, error: 'Network error. Please try again.' };
    }
  }, []);

  // Logout function
  const handleLogout = useCallback(async () => {
    try {
      await mockLogout();
      clearSession();
      dispatch({ type: 'LOGOUT' });
      
      // Redirect to login page
      router.push('/auth/login');
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Force logout even if server call fails
      clearSession();
      dispatch({ type: 'LOGOUT' });
      router.push('/auth/login');
    }
  }, [router]);

  // Check session validity
  const checkSession = useCallback((): boolean => {
    return isSessionValid();
  }, []);

  // Update user information
  const updateUser = useCallback((userUpdate: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: { user: userUpdate } });
  }, []);

  // Refresh session
  const handleRefreshSession = useCallback(() => {
    if (state.isAuthenticated) {
      refreshSession();
      const session = getSession();
      if (session) {
        dispatch({
          type: 'REFRESH_SESSION',
          payload: { sessionExpiry: new Date(session.expiresAt) }
        });
      }
    }
  }, [state.isAuthenticated]);

  // Context value
  const contextValue: AuthContextType = {
    // State
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    user: state.user,
    sessionExpiry: state.sessionExpiry,
    lastActivity: state.lastActivity,
    
    // Actions
    login,
    logout: handleLogout,
    checkSession,
    updateUser,
    refreshSession: handleRefreshSession,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use authentication context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
