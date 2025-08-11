import { NotificationOptions } from '../types/app';

/**
 * Notification manager for handling browser notifications
 */
export class NotificationManager {
  private static instance: NotificationManager;
  
  private constructor() {
    this.setupNotificationHandlers();
  }

  public static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  /**
   * Check if notifications are supported
   */
  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  /**
   * Get current permission status
   */
  public getPermission(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  }

  /**
   * Request permission for notifications
   */
  public async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) {
      console.warn('Notifications not supported');
      return 'denied';
    }

    if (this.getPermission() === 'granted') {
      return 'granted';
    }

    try {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);
      
      // Track permission change
      this.trackPermissionChange(permission);
      
      return permission;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return 'denied';
    }
  }

  /**
   * Show a notification
   */
  public show(title: string, options?: NotificationOptions): Notification | null {
    if (!this.canShowNotifications()) {
      console.log('Cannot show notification: permission denied or not supported');
      return null;
    }

    try {
      const notification = new Notification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        tag: 'default',
        requireInteraction: false,
        ...options,
      } as globalThis.NotificationOptions);

      // Setup click handler
      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        notification.close();
        
        // Handle click action
        if ((options as any)?.data?.url) {
          window.open((options as any).data.url, '_blank');
        }
      };

      // Auto-close after delay if specified
      if ((options as any)?.data?.autoClose !== false) {
        setTimeout(() => {
          notification.close();
        }, (options as any)?.data?.duration || 5000);
      }

      return notification;
    } catch (error) {
      console.error('Failed to show notification:', error);
      return null;
    }
  }

  /**
   * Show price alert notification
   */
  public showPriceAlert(product: string, oldPrice: number, newPrice: number, url?: string): Notification | null {
    const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    
    return this.show(`Price Drop Alert! 🔥`, {
      body: `${product} is now $${newPrice.toFixed(2)} (${discount}% off from $${oldPrice.toFixed(2)})`,
      icon: '/icons/price-alert.png',
      tag: 'price-alert',
      requireInteraction: true,
      data: {
        type: 'price-alert',
        product,
        oldPrice,
        newPrice,
        url,
        autoClose: false,
      },
      actions: [
        {
          action: 'view',
          title: 'View Deal',
        },
        {
          action: 'dismiss',
          title: 'Dismiss',
        },
      ],
    } as any);
  }

  /**
   * Show shopping list notification
   */
  public showShoppingListUpdate(listName: string, itemCount: number): Notification | null {
    return this.show(`Shopping List Updated`, {
      body: `${listName} now has ${itemCount} items with price changes`,
      icon: '/icons/shopping-list.png',
      tag: 'list-update',
      data: {
        type: 'list-update',
        listName,
        itemCount,
      },
    } as any);
  }

  /**
   * Show general notification
   */
  public showGeneral(title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): Notification | null {
    const icons = {
      info: '/icons/info.png',
      success: '/icons/success.png',
      warning: '/icons/warning.png',
      error: '/icons/error.png',
    };

    return this.show(title, {
      body: message,
      icon: icons[type],
      tag: `general-${type}`,
      data: {
        type: 'general',
        category: type,
      },
    } as any);
  }

  /**
   * Clear all notifications with specific tag
   */
  public clearByTag(tag: string): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.getNotifications({ tag }).then((notifications) => {
          notifications.forEach((notification) => notification.close());
        });
      });
    }
  }

  /**
   * Clear all notifications
   */
  public clearAll(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.getNotifications().then((notifications) => {
          notifications.forEach((notification) => notification.close());
        });
      });
    }
  }

  /**
   * Check if we can show notifications
   */
  private canShowNotifications(): boolean {
    return this.isSupported() && this.getPermission() === 'granted';
  }

  /**
   * Setup notification event handlers
   */
  private setupNotificationHandlers(): void {
    if (typeof window === 'undefined') return;

    // Handle visibility change to clear notifications when app is focused
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        // App became visible, clear notifications
        this.clearByTag('general-info');
      }
    });

    // Handle service worker message for notifications
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
          const { title, options } = event.data;
          this.show(title, options);
        }
      });
    }
  }

  /**
   * Track permission changes
   */
  private trackPermissionChange(permission: NotificationPermission): void {
    // You can implement analytics tracking here
    console.log('Notification permission changed to:', permission);
    
    // Store in local storage for app state
    if (typeof window !== 'undefined') {
      localStorage.setItem('notificationPermission', permission);
    }
  }
}

// Export singleton instance
export const notificationManager = NotificationManager.getInstance();

// Utility functions for easier access
export const showNotification = (title: string, options?: NotificationOptions) => 
  notificationManager.show(title, options);

export const showPriceAlert = (product: string, oldPrice: number, newPrice: number, url?: string) =>
  notificationManager.showPriceAlert(product, oldPrice, newPrice, url);

export const showShoppingListUpdate = (listName: string, itemCount: number) =>
  notificationManager.showShoppingListUpdate(listName, itemCount);

export const requestNotificationPermission = () =>
  notificationManager.requestPermission();

export const getNotificationPermission = () =>
  notificationManager.getPermission();

export const isNotificationSupported = () =>
  notificationManager.isSupported();

// Default export
export default notificationManager;
