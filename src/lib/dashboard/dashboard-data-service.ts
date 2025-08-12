// Dashboard data service with IndexedDB integration

import { productDB } from '../indexeddb/product-db';
import { DashboardData, DashboardStats, RecentActivityItem } from '../../types/dashboard';
import { mockDashboardData } from './mock-data';

export class DashboardDataService {
  
  async getDashboardData(): Promise<DashboardData> {
    try {
      // Get real data from IndexedDB
      const products = await productDB.getProducts();
      const productCount = products.length;
      
      // Calculate stats from real data
      const stats: DashboardStats = {
        monitoredProducts: productCount,
        activeAlerts: this.calculateActiveAlerts(products),
        moneySaved: this.calculateMoneySaved(products),
        lastUpdated: new Date(),
      };

      // Generate recent activity from products
      const recentActivity = this.generateRecentActivity(products);

      // Check if user is first time
      const hasVisited = localStorage.getItem('dashboard-visited');
      const hasCompletedOnboarding = localStorage.getItem('getting-started-dismissed') === 'true';
      const isFirstTimeUser = !hasVisited && !hasCompletedOnboarding && productCount === 0;

      const dashboardData: DashboardData = {
        ...mockDashboardData,
        stats,
        recentActivity,
        isFirstTimeUser,
      };

      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'INFO',
        service: 'my-nextjs-app',
        correlationId: `dashboard-load-${Date.now()}`,
        message: 'Dashboard data loaded from IndexedDB',
        context: {
          productCount,
          activeAlerts: stats.activeAlerts,
          isFirstTimeUser,
        }
      }));

      return dashboardData;
    } catch (error) {
      console.error('Error loading dashboard data from IndexedDB:', error);
      
      // Fallback to mock data
      return {
        ...mockDashboardData,
        isFirstTimeUser: !localStorage.getItem('dashboard-visited'),
      };
    }
  }

  private calculateActiveAlerts(products: any[]): number {
    // For now, simulate some alerts based on product count
    return Math.floor(products.length * 0.3);
  }

  private calculateMoneySaved(products: any[]): number {
    // Simulate money saved calculation
    if (products.length === 0) return 0;
    
    // Mock calculation: $10-50 per product
    return products.reduce((total) => {
      return total + Math.floor(Math.random() * 40) + 10;
    }, 0);
  }

  private generateRecentActivity(products: any[]): RecentActivityItem[] {
    const activities: RecentActivityItem[] = [];
    
    // Add product addition activities
    products
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5) // Last 5 products
      .forEach((product) => {
        activities.push({
          id: `activity-${product.id}`,
          type: 'product_added',
          title: `Added ${product.data.name}`,
          description: `Started monitoring ${product.data.name} from ${product.data.retailer}`,
          timestamp: new Date(product.timestamp),
          icon: '📊',
          actionUrl: `/products/${product.id}`,
        });
      });

    // Add some mock price drop activities for products with synced status
    const syncedProducts = products.filter(p => p.status === 'synced');
    syncedProducts.slice(0, 2).forEach((product, index) => {
      activities.push({
        id: `price-drop-${product.id}`,
        type: 'price_drop',
        title: `Price Drop Alert`,
        description: `${product.data.name} price dropped by ${5 + index * 3}%`,
        timestamp: new Date(Date.now() - (index + 1) * 3600000), // Hours ago
        icon: '💰',
        actionUrl: `/products/${product.id}`,
      });
    });

    // Sort by timestamp (newest first)
    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10); // Limit to 10 items
  }

  // Listen for product changes
  onDataChanged(callback: () => void): () => void {
    const handleProductsChanged = () => {
      callback();
    };

    // Listen for custom events
    window.addEventListener('products-changed', handleProductsChanged);
    
    // Also listen for storage events (cross-tab updates)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'products-changed') {
        callback();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Return cleanup function
    return () => {
      window.removeEventListener('products-changed', handleProductsChanged);
      window.removeEventListener('storage', handleStorageChange);
    };
  }
}

export const dashboardDataService = new DashboardDataService();
