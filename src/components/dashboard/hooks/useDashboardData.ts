// Custom hook for dashboard data management with IndexedDB integration

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { DashboardData, UseDashboardDataReturn } from '../../../types/dashboard';
import { dashboardDataService } from '../../../lib/dashboard/dashboard-data-service';

export const useDashboardData = (): UseDashboardDataReturn => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const loadDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('🔄 Loading dashboard data from IndexedDB...');
      
      // Load real data from IndexedDB
      const dashboardData = await dashboardDataService.getDashboardData();
      
      console.log('✅ Dashboard data loaded:', {
        productCount: dashboardData.stats.monitoredProducts,
        activeAlerts: dashboardData.stats.activeAlerts,
        moneySaved: dashboardData.stats.moneySaved,
        isFirstTimeUser: dashboardData.isFirstTimeUser,
        recentActivityCount: dashboardData.recentActivity.length,
      });
      
      setData(dashboardData);
      
      // Mark dashboard as visited
      const hasVisited = localStorage.getItem('dashboard-visited');
      if (!hasVisited) {
        localStorage.setItem('dashboard-visited', 'true');
      }
      
    } catch (err) {
      console.error('❌ Dashboard data load error:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Set up real-time data updates
  useEffect(() => {
    if (!user) return;

    // Initial load
    loadDashboardData();

    // Listen for product changes
    const unsubscribe = dashboardDataService.onDataChanged(() => {
      console.log('🔄 Products changed, refreshing dashboard...');
      loadDashboardData();
    });

    return unsubscribe;
  }, [user, loadDashboardData]);

  const refreshData = useCallback(() => {
    console.log('🔄 Manually refreshing dashboard data...');
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
