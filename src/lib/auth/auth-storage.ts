// Local storage utilities for session management

import { StoredSession, SESSION_KEY, SESSION_DURATION, User } from './auth-types';

/**
 * Save user session to localStorage
 */
export function saveSession(
  user: User,
  rememberMe: boolean = false
): void {
  try {
    const now = new Date();
    const duration = rememberMe ? SESSION_DURATION.remember : SESSION_DURATION.regular;
    const expiresAt = new Date(now.getTime() + duration);

    const session: StoredSession = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      expiresAt: expiresAt.toISOString(),
      rememberMe,
      createdAt: now.toISOString(),
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    
    console.log('💾 Session saved:', {
      email: user.email,
      expiresAt: expiresAt.toLocaleString(),
      rememberMe,
    });
  } catch (error) {
    console.error('❌ Failed to save session:', error);
  }
}

/**
 * Get session from localStorage
 */
export function getSession(): StoredSession | null {
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (!sessionData) {
      return null;
    }

    const session: StoredSession = JSON.parse(sessionData);
    
    // Check if session has expired
    const now = new Date();
    const expiresAt = new Date(session.expiresAt);
    
    if (now > expiresAt) {
      console.log('⏰ Session expired, clearing storage');
      clearSession();
      return null;
    }

    console.log('✅ Valid session found:', {
      email: session.email,
      expiresAt: expiresAt.toLocaleString(),
    });

    return session;
  } catch (error) {
    console.error('❌ Failed to get session:', error);
    clearSession(); // Clear corrupted session
    return null;
  }
}

/**
 * Check if session is valid (not expired)
 */
export function isSessionValid(): boolean {
  const session = getSession();
  return session !== null;
}

/**
 * Clear session from localStorage
 */
export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
    console.log('🗑️ Session cleared');
  } catch (error) {
    console.error('❌ Failed to clear session:', error);
  }
}

/**
 * Update session expiry (for activity tracking)
 */
export function refreshSession(): void {
  const session = getSession();
  if (!session) {
    return;
  }

  try {
    const now = new Date();
    const duration = session.rememberMe ? SESSION_DURATION.remember : SESSION_DURATION.regular;
    const newExpiresAt = new Date(now.getTime() + duration);

    const updatedSession: StoredSession = {
      ...session,
      expiresAt: newExpiresAt.toISOString(),
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));
    
    console.log('🔄 Session refreshed, expires at:', newExpiresAt.toLocaleString());
  } catch (error) {
    console.error('❌ Failed to refresh session:', error);
  }
}

/**
 * Get session expiry date
 */
export function getSessionExpiry(): Date | null {
  const session = getSession();
  return session ? new Date(session.expiresAt) : null;
}

/**
 * Get time until session expires (in milliseconds)
 */
export function getTimeUntilExpiry(): number | null {
  const session = getSession();
  if (!session) {
    return null;
  }

  const now = new Date();
  const expiresAt = new Date(session.expiresAt);
  
  return Math.max(0, expiresAt.getTime() - now.getTime());
}

/**
 * Convert stored session to User object
 */
export function sessionToUser(session: StoredSession): User {
  return {
    id: session.userId,
    email: session.email,
    name: session.name,
    role: session.role as 'user' | 'admin',
    avatar: session.avatar,
    createdAt: new Date(session.createdAt),
    preferences: {
      notifications: true,
      theme: 'system',
      language: 'en',
    },
  };
}
