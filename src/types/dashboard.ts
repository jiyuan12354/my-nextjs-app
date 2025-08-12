// Dashboard type definitions for Shopping Monitor

export interface DashboardStats {
  monitoredProducts: number;
  activeAlerts: number;
  moneySaved: number;
  lastUpdated: Date;
}

export interface RecentActivityItem {
  id: string;
  type: 'price_drop' | 'new_deal' | 'alert_triggered' | 'product_added';
  title: string;
  description: string;
  timestamp: Date;
  icon: string;
  actionUrl?: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  isEnabled: boolean;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: RecentActivityItem[];
  quickActions: QuickAction[];
  isFirstTimeUser: boolean;
}

export interface DashboardState {
  // UI States
  isLoading: boolean;
  isFirstTime: boolean;
  activeSection: string;
  
  // Data States
  stats: DashboardStats;
  recentActivity: RecentActivityItem[];
  notifications: RecentActivityItem[];
  
  // Error States
  error: string | null;
}

export interface UseDashboardDataReturn {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  dismissGettingStarted: () => void;
}
