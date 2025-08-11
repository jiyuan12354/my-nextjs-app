import { PWAInstallEvent } from '../types/app';

/**
 * Check if the current environment supports PWA installation
 */
export const isPWASupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return (
    'serviceWorker' in navigator &&
    'BeforeInstallPromptEvent' in window
  );
};

/**
 * Check if the app is already installed as PWA
 */
export const isPWAInstalled = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check if running in standalone mode
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );
};

/**
 * Register service worker
 */
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Workers not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('Service Worker registered successfully:', registration);

    // Handle service worker updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New service worker installed, prompting for update');
            // Notify user about update
            window.dispatchEvent(new CustomEvent('sw-update-available'));
          }
        });
      }
    });

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

/**
 * Unregister service worker
 */
export const unregisterServiceWorker = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      return await registration.unregister();
    }
    return false;
  } catch (error) {
    console.error('Service Worker unregistration failed:', error);
    return false;
  }
};

/**
 * Install PWA programmatically
 */
export const installPWA = async (deferredPrompt: PWAInstallEvent): Promise<boolean> => {
  if (!deferredPrompt) {
    console.log('No deferred prompt available');
    return false;
  }

  try {
    // Show the install prompt
    await deferredPrompt.prompt();
    
    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log('PWA install prompt outcome:', outcome);
    
    return outcome === 'accepted';
  } catch (error) {
    console.error('PWA installation failed:', error);
    return false;
  }
};

/**
 * Check if browser supports notifications
 */
export const isNotificationSupported = (): boolean => {
  return typeof window !== 'undefined' && 'Notification' in window;
};

/**
 * Get current notification permission status
 */
export const getNotificationPermission = (): NotificationPermission => {
  if (!isNotificationSupported()) {
    return 'denied';
  }
  return Notification.permission;
};

/**
 * Request notification permission
 */
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!isNotificationSupported()) {
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    console.log('Notification permission:', permission);
    return permission;
  } catch (error) {
    console.error('Notification permission request failed:', error);
    return 'denied';
  }
};

/**
 * Show notification
 */
export const showNotification = (
  title: string,
  options?: NotificationOptions
): Notification | null => {
  if (!isNotificationSupported() || getNotificationPermission() !== 'granted') {
    console.log('Notifications not available or permission denied');
    return null;
  }

  try {
    return new Notification(title, {
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      ...options,
    } as NotificationOptions);
  } catch (error) {
    console.error('Failed to show notification:', error);
    return null;
  }
};

/**
 * Check if device is online
 */
export const isOnline = (): boolean => {
  return typeof window !== 'undefined' ? navigator.onLine : true;
};

/**
 * Setup online/offline event listeners
 */
export const setupOnlineStatusListeners = (
  onOnline: () => void,
  onOffline: () => void
): (() => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleOnline = () => {
    console.log('App is online');
    onOnline();
  };

  const handleOffline = () => {
    console.log('App is offline');
    onOffline();
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

/**
 * Get device information for PWA features
 */
export const getDeviceInfo = () => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      isChrome: false,
      isSafari: false,
    };
  }

  const userAgent = navigator.userAgent;
  
  return {
    isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(userAgent),
    isAndroid: /Android/i.test(userAgent),
    isChrome: /Chrome/i.test(userAgent) && !/Edg/i.test(userAgent),
    isSafari: /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent),
  };
};

/**
 * Cache management utilities
 */
export const cacheUtils = {
  /**
   * Clear all caches
   */
  clearAll: async (): Promise<void> => {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      console.log('All caches cleared');
    }
  },

  /**
   * Get cache size
   */
  getSize: async (): Promise<number> => {
    if (!('caches' in window) || !('storage' in navigator) || !('estimate' in navigator.storage)) {
      return 0;
    }

    try {
      const estimate = await navigator.storage.estimate();
      return estimate.usage || 0;
    } catch (error) {
      console.error('Failed to get cache size:', error);
      return 0;
    }
  },
};

/**
 * Background sync utilities
 */
export const backgroundSync = {
  /**
   * Register background sync
   */
  register: async (tag: string): Promise<void> => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        const registration = await navigator.serviceWorker.ready;
        // Type assertion for background sync
        await (registration as any).sync.register(tag);
        console.log('Background sync registered:', tag);
      } catch (error) {
        console.error('Background sync registration failed:', error);
      }
    }
  },
};
