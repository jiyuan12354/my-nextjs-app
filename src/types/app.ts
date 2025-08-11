// PWA Types
export interface PWAInstallEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface NotificationOptions {
  body?: string;
  icon?: string;
  badge?: string;
  tag?: string;
  renotify?: boolean;
  requireInteraction?: boolean;
  actions?: NotificationAction[];
}

export interface AppPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: 'en' | 'zh-CN';
  pwaInstalled: boolean;
}

export interface AppState {
  // UI States
  isMobileMenuOpen: boolean;
  isDarkMode: boolean;
  isLoading: boolean;
  isOnline: boolean;
  
  // PWA States
  isPWAInstallable: boolean;
  isInstalled: boolean;
  deferredPrompt: PWAInstallEvent | null;
  
  // Notification States
  notificationsEnabled: boolean;
  notificationPermission: NotificationPermission;
  
  // User Preferences
  preferences: AppPreferences;
}

// State Actions
export interface AppActions {
  toggleMobileMenu: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setPWAInstallable: (installable: boolean) => void;
  setDeferredPrompt: (prompt: PWAInstallEvent | null) => void;
  setInstalled: (installed: boolean) => void;
  enableNotifications: () => Promise<boolean>;
  updatePreferences: (prefs: Partial<AppPreferences>) => void;
  setOnlineStatus: (online: boolean) => void;
  setLoading: (loading: boolean) => void;
}

// Component Props
export interface HeaderProps {
  className?: string;
}

export interface FooterProps {
  className?: string;
}

export interface NavigationProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export interface ThemeToggleProps {
  className?: string;
}

export interface NotificationBannerProps {
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export interface PWAInstallPromptProps {
  onInstall?: () => void;
  onDismiss?: () => void;
}

// API Response Types
export interface APIResponse<T = any> {
  status: 'SUCCESS' | 'ERROR';
  data?: T;
  message?: string;
  error?: string;
}

export interface PreferencesResponse {
  preferences: AppPreferences;
  capabilities: {
    notificationSupport: boolean;
    pwaSupport: boolean;
    offlineSupport: boolean;
  };
}

// Utility Types
export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'zh-CN';
export type NotificationPermissionState = 'default' | 'granted' | 'denied';

// Navigation Types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Service Worker Types
export interface SyncData {
  type: 'price-sync' | 'user-sync' | 'offline-sync';
  data: any;
  timestamp: number;
}

declare global {
  interface Window {
    workbox?: any;
    __WB_MANIFEST?: any;
  }

  interface WindowEventMap {
    beforeinstallprompt: PWAInstallEvent;
    appinstalled: Event;
  }
}
