// Enhanced dashboard page for authenticated users

import React from 'react';
import Head from 'next/head';
import { useAuth } from '../components/auth/AuthProvider';
import RouteGuard from '../components/auth/RouteGuard';
import { useDashboardData } from '../components/dashboard/hooks/useDashboardData';
import { SyncStatusIndicator } from '../components/monitor/SyncStatusIndicator';

// Dashboard Components
import WelcomeSection from '../components/dashboard/WelcomeSection';
import StatsGrid from '../components/dashboard/StatsGrid';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import GettingStarted from '../components/dashboard/GettingStarted';

function DashboardContent() {
  const { user, logout } = useAuth();
  const { data, isLoading, error, refreshData, dismissGettingStarted } = useDashboardData();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SM</span>
                </div>
                <h1 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div className="text-sm">
                  <p className="text-gray-900 dark:text-white font-medium">{user?.name}</p>
                  <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Loading State */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="animate-pulse space-y-8">
              {/* Welcome Section Skeleton */}
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32"></div>
              
              {/* Stats Grid Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-24"></div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-24"></div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-24"></div>
              </div>
              
              {/* Quick Actions Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-20"></div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-20"></div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-20"></div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-20"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-600 dark:text-red-400">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error}
          </p>
          <button
            onClick={refreshData}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main dashboard content
  return (
    <>
      <Head>
        <title>Dashboard - Shopping Monitor</title>
        <meta name="description" content="Your personalized shopping monitor dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SM</span>
                </div>
                <h1 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Sync Status Indicator */}
                <SyncStatusIndicator />
                
                {/* Refresh Button */}
                <button
                  onClick={refreshData}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title="Refresh dashboard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>

                {/* User Info */}
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div className="text-sm">
                  <p className="text-gray-900 dark:text-white font-medium">{user?.name}</p>
                  <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 space-y-8">
            
            {/* Welcome Section */}
            <WelcomeSection 
              monitoredProducts={data?.stats.monitoredProducts || 0}
            />

            {/* Getting Started Guide - Only for first-time users */}
            {data?.isFirstTimeUser && (
              <GettingStarted 
                onDismiss={dismissGettingStarted}
              />
            )}

            {/* Statistics Grid */}
            {data?.stats && (
              <StatsGrid stats={data.stats} />
            )}

            {/* Quick Actions */}
            {data?.quickActions && (
              <QuickActions actions={data.quickActions} />
            )}

            {/* Recent Activity */}
            {data?.recentActivity && (
              <RecentActivity activities={data.recentActivity} />
            )}

          </div>
        </main>
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <RouteGuard requireAuth={true}>
      <DashboardContent />
    </RouteGuard>
  );
}
