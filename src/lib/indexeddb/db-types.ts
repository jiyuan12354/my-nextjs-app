// IndexedDB type definitions for Shopping Monitor

export interface StoredMonitoredProduct {
  id: string;
  data: MonitoredProductData;
  timestamp: string;
  status: 'pending' | 'synced' | 'error';
  version: number;
}

export interface MonitoredProductData {
  name: string;
  price: number;
  image: string;
  retailer: string;
  category?: string;
  originalUrl?: string;
  alertSettings: AlertConfiguration;
  dateAdded: string;
  lastUpdated: string;
}

export interface AlertConfiguration {
  targetPrice?: number;
  percentageThreshold?: number;
  enablePriceDrop: boolean;
  enableBackInStock: boolean;
  notificationMethods: ('email' | 'browser' | 'sms')[];
}

export interface SyncQueueItem {
  id: string;
  operation: 'create' | 'update' | 'delete';
  productId: string;
  data: any;
  timestamp: string;
  retryCount: number;
}

export interface DatabaseSchema {
  monitored_products: StoredMonitoredProduct;
  sync_queue: SyncQueueItem;
}
