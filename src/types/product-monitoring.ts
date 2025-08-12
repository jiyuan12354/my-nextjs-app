// Product monitoring type definitions

export interface ProductFormState {
  // Input method
  inputMethod: 'url' | 'manual';
  
  // URL-based input
  productUrl: string;
  isValidatingUrl: boolean;
  urlValidationError: string | null;
  
  // Manual input
  productName: string;
  productImage: string;
  currentPrice: number;
  retailer: string;
  productCategory: string;
  
  // Extracted/validated product data
  extractedProduct: ExtractedProduct | null;
  
  // Alert configuration
  alertSettings: AlertConfiguration;
  
  // Form state
  isSubmitting: boolean;
  errors: Record<string, string>;
  touchedFields: Set<string>;
}

export interface ExtractedProduct {
  name: string;
  price: number;
  image: string;
  retailer: string;
  category?: string;
  originalUrl: string;
  isAvailable: boolean;
}

export interface AlertConfiguration {
  targetPrice: number | null;
  percentageThreshold: number | null;
  enablePriceDrop: boolean;
  enableBackInStock: boolean;
  notificationMethods: NotificationMethod[];
}

export type NotificationMethod = 'email' | 'browser' | 'sms';

export interface ProductMonitoringRequest {
  inputMethod: 'url' | 'manual';
  productUrl?: string;
  productData?: ManualProductData;
  alertSettings: AlertConfiguration;
}

export interface ManualProductData {
  name: string;
  price: number;
  image: string;
  retailer: string;
  category?: string;
  customUrl?: string;
}

export interface ProductExtractionResult {
  success: boolean;
  product?: ExtractedProduct;
  error?: string;
}

export interface SupportedPlatform {
  name: string;
  urlPattern: string;
  enabled: boolean;
  icon?: string;
}

export interface MonitoredProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  retailer: string;
  category?: string;
  originalUrl: string;
  isAvailable: boolean;
  alertSettings: AlertConfiguration;
  dateAdded: Date;
  lastUpdated: Date;
  priceHistory: PriceHistoryEntry[];
}

export interface PriceHistoryEntry {
  price: number;
  timestamp: Date;
  isAvailable: boolean;
}
