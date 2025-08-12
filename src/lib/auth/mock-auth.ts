// Mock authentication service for Shopping Monitor demo

import { User, AuthResult, MockUserDatabase } from './auth-types';

/**
 * Mock user database for demonstration
 */
const MOCK_USERS: MockUserDatabase = {
  'demo@shopmonitor.com': {
    id: 'demo-user-001',
    email: 'demo@shopmonitor.com',
    password: 'demo123', // In real app, this would be hashed
    name: 'Demo User',
    role: 'user',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    lastLoginAt: new Date('2024-12-15T10:30:00Z'),
  },
  'admin@shopmonitor.com': {
    id: 'admin-user-001',
    email: 'admin@shopmonitor.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
    createdAt: new Date('2023-12-01T00:00:00Z'),
    lastLoginAt: new Date('2024-12-15T09:00:00Z'),
  },
  'test@shopmonitor.com': {
    id: 'test-user-001',
    email: 'test@shopmonitor.com',
    password: 'test123',
    name: 'Test User',
    role: 'user',
    createdAt: new Date('2024-06-15T00:00:00Z'),
  },
};

/**
 * Simulate network delay for realistic authentication experience
 */
const simulateNetworkDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Mock login function - validates credentials against mock database
 */
export async function mockLogin(email: string, password: string): Promise<AuthResult> {
  console.log('🔐 Attempting login for:', email);
  
  // Simulate network delay
  await simulateNetworkDelay(800);

  // Normalize email for comparison
  const normalizedEmail = email.toLowerCase().trim();

  // Check if user exists in mock database
  const mockUser = MOCK_USERS[normalizedEmail];
  if (!mockUser) {
    console.log('❌ User not found:', normalizedEmail);
    return {
      success: false,
      error: 'Invalid email or password',
    };
  }

  // Validate password
  if (mockUser.password !== password) {
    console.log('❌ Invalid password for:', normalizedEmail);
    return {
      success: false,
      error: 'Invalid email or password',
    };
  }

  // Update last login time
  mockUser.lastLoginAt = new Date();

  // Create user object without password
  const user: User = {
    id: mockUser.id,
    email: mockUser.email,
    name: mockUser.name,
    role: mockUser.role,
    avatar: mockUser.avatar,
    createdAt: mockUser.createdAt,
    lastLoginAt: mockUser.lastLoginAt,
    preferences: {
      notifications: true,
      theme: 'system',
      language: 'en',
    },
  };

  console.log('✅ Login successful for:', user.email);
  return {
    success: true,
    user,
  };
}

/**
 * Mock logout function - simulates server-side logout
 */
export async function mockLogout(): Promise<void> {
  console.log('🚪 Logging out user');
  await simulateNetworkDelay(300);
  console.log('✅ Logout successful');
}

/**
 * Mock function to validate session token (for future use)
 */
export async function mockValidateSession(sessionToken: string): Promise<User | null> {
  await simulateNetworkDelay(200);
  
  // In a real app, this would validate the token with the server
  // For mock purposes, always return null (session validation handled by storage)
  return null;
}

/**
 * Get available demo users for testing
 */
export function getDemoUsers(): Array<{email: string; password: string; name: string; role: string}> {
  return Object.values(MOCK_USERS).map(user => ({
    email: user.email,
    password: user.password,
    name: user.name,
    role: user.role,
  }));
}

/**
 * Mock function to check if email exists (for registration forms)
 */
export async function mockCheckEmailExists(email: string): Promise<boolean> {
  await simulateNetworkDelay(300);
  
  const normalizedEmail = email.toLowerCase().trim();
  return normalizedEmail in MOCK_USERS;
}

/**
 * Mock function to register new user (for future registration feature)
 */
export async function mockRegister(
  email: string, 
  password: string, 
  name: string
): Promise<AuthResult> {
  console.log('📝 Attempting registration for:', email);
  
  await simulateNetworkDelay(1000);
  
  const normalizedEmail = email.toLowerCase().trim();
  
  // Check if user already exists
  if (normalizedEmail in MOCK_USERS) {
    return {
      success: false,
      error: 'An account with this email already exists',
    };
  }
  
  // Create new user
  const newUser: User = {
    id: `user-${Date.now()}`,
    email: normalizedEmail,
    name,
    role: 'user',
    createdAt: new Date(),
    preferences: {
      notifications: true,
      theme: 'system',
      language: 'en',
    },
  };
  
  // In a real app, this would save to the database
  console.log('✅ Registration successful for:', newUser.email);
  
  return {
    success: true,
    user: newUser,
  };
}
