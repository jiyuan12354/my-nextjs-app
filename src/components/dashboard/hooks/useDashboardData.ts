// Custom hook for dashboard data management

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { DashboardData, UseDashboardDataReturn } from '../../../types/dashboard';
import { mockDashboardData, mockDashboardDataWithActivity } from '../../../lib/dashboard/mock-data';
import '../../../lib/dashboard/dashboard-utils'; // Load test utils

export const useDashboardData = (): UseDashboardDataReturn => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const loadDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('🔄 Loading dashboard data...');
      
      // Simulate API call with mock data (800ms delay for realistic loading)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user has visited dashboard before
      const hasVisited = localStorage.getItem('dashboard-visited');
      const hasExistingData = localStorage.getItem('user-has-data') === 'true';
      const hasCompletedOnboarding = localStorage.getItem('getting-started-dismissed') === 'true';
      
      // Determine which mock data to use
      const dashboardData: DashboardData = hasExistingData 
        ? mockDashboardDataWithActivity 
        : {
            ...mockDashboardData,
            isFirstTimeUser: !hasVisited && !hasCompletedOnboarding,
          };
      
      console.log('✅ Dashboard data loaded:', {
        hasExistingData,
        hasVisited,
        hasCompletedOnboarding,
        isFirstTimeUser: dashboardData.isFirstTimeUser,
      });
      
      setData(dashboardData);
      
      // Mark dashboard as visited
      if (!hasVisited) {
        localStorage.setItem('dashboard-visited', 'true');
      }
      
      // Dev console helper
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.log('💡 Tip: Use dashboardTestUtils.help() in console to test different user scenarios');
      }
      
    } catch (err) {
      console.error('❌ Dashboard data load error:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user, loadDashboardData]);

  const refreshData = useCallback(() => {
    console.log('🔄 Refreshing dashboard data...');
    loadDashboardData();
  }, [loadDashboardData]);

  const dismissGettingStarted = useCallback(() => {
    console.log('👋 Dismissing getting started guide');
    setData(prev => prev ? { ...prev, isFirstTimeUser: false } : null);
    localStorage.setItem('getting-started-dismissed', 'true');
  }, []);

  return {
    data,
    isLoading,
    error,
    refreshData,
    dismissGettingStarted,
  };
};
