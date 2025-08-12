// Product monitoring utilities

import { MonitoredProduct, AlertConfiguration, ProductMonitoringRequest } from '../../types/product-monitoring';
import { generateProductId } from '../product-extraction';

/**
 * Create a new monitored product from form data
 */
export const createMonitoredProduct = (request: ProductMonitoringRequest): MonitoredProduct => {
  const now = new Date();
  
  if (request.inputMethod === 'url' && request.productUrl) {
    // This would normally use extracted product data
    throw new Error('URL-based product creation requires extracted product data');
  }
  
  if (request.inputMethod === 'manual' && request.productData) {
    return {
      id: generateProductId(),
      name: request.productData.name,
      price: request.productData.price,
      image: request.productData.image,
      retailer: request.productData.retailer,
      category: request.productData.category,
      originalUrl: request.productData.customUrl || '',
      isAvailable: true,
      alertSettings: request.alertSettings,
      dateAdded: now,
      lastUpdated: now,
      priceHistory: [{
        price: request.productData.price,
        timestamp: now,
        isAvailable: true,
      }],
    };
  }
  
  throw new Error('Invalid product monitoring request');
};

/**
 * Validate alert configuration
 */
export const validateAlertSettings = (settings: AlertConfiguration): string[] => {
  const errors: string[] = [];
  
  if (settings.targetPrice !== null && settings.targetPrice <= 0) {
    errors.push('Target price must be greater than 0');
  }
  
  if (settings.percentageThreshold !== null && 
      (settings.percentageThreshold <= 0 || settings.percentageThreshold > 100)) {
    errors.push('Percentage threshold must be between 1 and 100');
  }
  
  if (!settings.enablePriceDrop && !settings.enableBackInStock) {
    errors.push('At least one alert type must be enabled');
  }
  
  if (settings.notificationMethods.length === 0) {
    errors.push('At least one notification method must be selected');
  }
  
  return errors;
};

/**
 * Get default alert configuration
 */
export const getDefaultAlertSettings = (): AlertConfiguration => {
  return {
    targetPrice: null,
    percentageThreshold: 10, // 10% default
    enablePriceDrop: true,
    enableBackInStock: true,
    notificationMethods: ['browser'],
  };
};

/**
 * Format percentage for display
 */
export const formatPercentage = (value: number): string => {
  return `${value}%`;
};

/**
 * Calculate price difference
 */
export const calculatePriceDifference = (oldPrice: number, newPrice: number): {
  amount: number;
  percentage: number;
  isIncrease: boolean;
} => {
  const amount = newPrice - oldPrice;
  const percentage = (amount / oldPrice) * 100;
  
  return {
    amount: Math.abs(amount),
    percentage: Math.abs(percentage),
    isIncrease: amount > 0,
  };
};

/**
 * Check if price meets alert criteria
 */
export const shouldTriggerAlert = (
  currentPrice: number,
  originalPrice: number,
  alertSettings: AlertConfiguration
): boolean => {
  if (!alertSettings.enablePriceDrop) return false;
  
  // Check target price
  if (alertSettings.targetPrice && currentPrice <= alertSettings.targetPrice) {
    return true;
  }
  
  // Check percentage threshold
  if (alertSettings.percentageThreshold) {
    const priceDrop = ((originalPrice - currentPrice) / originalPrice) * 100;
    if (priceDrop >= alertSettings.percentageThreshold) {
      return true;
    }
  }
  
  return false;
};
