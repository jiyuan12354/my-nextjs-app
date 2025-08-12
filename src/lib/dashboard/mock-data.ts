// Mock dashboard data for Shopping Monitor

import { DashboardData, RecentActivityItem } from '../../types/dashboard';

// Mock recent activity for demonstration
const mockRecentActivity: RecentActivityItem[] = [
  {
    id: '1',
    type: 'price_drop',
    title: 'iPhone 15 Pro Price Drop',
    description: 'Price dropped by $50 on Amazon',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    icon: '📱',
    actionUrl: '/products/iphone-15-pro',
  },
  {
    id: '2',
    type: 'new_deal',
    title: 'MacBook Air Sale',
    description: 'New deal found on Best Buy - 15% off',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    icon: '💻',
    actionUrl: '/products/macbook-air',
  },
  {
    id: '3',
    type: 'alert_triggered',
    title: 'AirPods Pro Alert',
    description: 'Target price of $200 reached',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    icon: '🎧',
    actionUrl: '/products/airpods-pro',
  },
];

// Mock dashboard data with default empty state for new users
export const mockDashboardData: DashboardData = {
  stats: {
    monitoredProducts: 0,
    activeAlerts: 0,
    moneySaved: 0.00,
    lastUpdated: new Date(),
  },
  recentActivity: [], // Empty for new users
  quickActions: [
    {
      id: 'add-product',
      title: 'Add Product',
      description: 'Start monitoring a new product',
      icon: '📊',
      href: '/monitor/add',
      isEnabled: true,
    },
    {
      id: 'view-products',
      title: 'My Products',
      description: 'View all monitored products',
      icon: '📱',
      href: '/products',
      isEnabled: false, // Future feature
    },
    {
      id: 'price-alerts',
      title: 'Price Alerts',
      description: 'Manage your price alerts',
      icon: '🔔',
      href: '/alerts',
      isEnabled: false, // Future feature
    },
    {
      id: 'shopping-lists',
      title: 'Shopping Lists',
      description: 'Organize your shopping',
      icon: '📝',
      href: '/lists',
      isEnabled: false, // Future feature
    },
  ],
  isFirstTimeUser: true,
};

// Mock data for existing users with activity
export const mockDashboardDataWithActivity: DashboardData = {
  stats: {
    monitoredProducts: 5,
    activeAlerts: 3,
    moneySaved: 127.50,
    lastUpdated: new Date(),
  },
  recentActivity: mockRecentActivity,
  quickActions: mockDashboardData.quickActions,
  isFirstTimeUser: false,
};

// Helper function to get time-based greeting
export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return 'Good morning';
  } else if (hour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Helper function to format relative time
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInMinutes < 24 * 60) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInMinutes / (24 * 60));
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};
