// Dashboard utility functions

import { DashboardData } from '../../types/dashboard';

/**
 * Simulates user having existing data for demonstration
 */
export const simulateExistingUserData = (): void => {
  localStorage.setItem('user-has-data', 'true');
  console.log('✅ Simulating user with existing data');
};

/**
 * Resets user to new user state
 */
export const resetToNewUser = (): void => {
  localStorage.removeItem('user-has-data');
  localStorage.removeItem('dashboard-visited');
  localStorage.removeItem('getting-started-dismissed');
  console.log('🔄 Reset to new user state');
};

/**
 * Gets current user simulation state
 */
export const getUserSimulationState = (): {
  hasData: boolean;
  hasVisited: boolean;
  hasCompletedOnboarding: boolean;
} => {
  return {
    hasData: localStorage.getItem('user-has-data') === 'true',
    hasVisited: localStorage.getItem('dashboard-visited') === 'true',
    hasCompletedOnboarding: localStorage.getItem('getting-started-dismissed') === 'true',
  };
};

/**
 * Console helper for developers to test different user states
 */
export const dashboardTestUtils = {
  simulateExistingUser: simulateExistingUserData,
  resetToNewUser: resetToNewUser,
  getState: getUserSimulationState,
  help: () => {
    console.log(`
🛠️ Dashboard Test Utils:

• dashboardTestUtils.simulateExistingUser() - Show dashboard with data
• dashboardTestUtils.resetToNewUser() - Reset to first-time user
• dashboardTestUtils.getState() - Check current simulation state

Use these in browser console to test different user scenarios!
    `);
  },
};

// Make available globally for development
if (typeof window !== 'undefined') {
  (window as any).dashboardTestUtils = dashboardTestUtils;
}
