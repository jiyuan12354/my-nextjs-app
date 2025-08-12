// Mock product extraction utilities for development

import { ProductExtractionResult, ExtractedProduct, SupportedPlatform } from '../types/product-monitoring';

// Supported platforms configuration
export const supportedPlatforms: SupportedPlatform[] = [
  {
    name: 'Amazon',
    urlPattern: 'amazon.com',
    enabled: true,
    icon: '📦',
  },
  {
    name: 'Best Buy',
    urlPattern: 'bestbuy.com',
    enabled: true,
    icon: '🛒',
  },
  {
    name: 'Target',
    urlPattern: 'target.com',
    enabled: true,
    icon: '🎯',
  },
  {
    name: 'Walmart',
    urlPattern: 'walmart.com',
    enabled: true,
    icon: '🏪',
  },
];

// Mock product data for different platforms
const mockProducts: Record<string, ExtractedProduct> = {
  'amazon.com': {
    name: 'iPhone 15 Pro Max 256GB',
    price: 1199.99,
    image: '/icons/apple-touch-icon.png', // Using existing icon
    retailer: 'Amazon',
    category: 'Electronics',
    originalUrl: '',
    isAvailable: true,
  },
  'bestbuy.com': {
    name: 'MacBook Air M3 13-inch',
    price: 1099.99,
    image: '/icons/apple-touch-icon.png',
    retailer: 'Best Buy',
    category: 'Computers',
    originalUrl: '',
    isAvailable: true,
  },
  'target.com': {
    name: 'AirPods Pro 2nd Gen',
    price: 199.99,
    image: '/icons/apple-touch-icon.png',
    retailer: 'Target',
    category: 'Electronics',
    originalUrl: '',
    isAvailable: true,
  },
  'walmart.com': {
    name: 'iPad Air 10.9-inch',
    price: 599.99,
    image: '/icons/apple-touch-icon.png',
    retailer: 'Walmart',
    category: 'Tablets',
    originalUrl: '',
    isAvailable: true,
  },
};

/**
 * Validates if a URL belongs to a supported platform
 */
export const validateUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    new URL(url); // Validate URL format
    return supportedPlatforms.some(platform => 
      url.toLowerCase().includes(platform.urlPattern)
    );
  } catch {
    return false;
  }
};

/**
 * Extracts product information from a URL (mock implementation)
 */
export const extractProductFromUrl = async (url: string): Promise<ProductExtractionResult> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (!validateUrl(url)) {
    return {
      success: false,
      error: 'Unsupported platform or invalid URL format',
    };
  }
  
  // Find matching platform
  const platform = supportedPlatforms.find(p => 
    url.toLowerCase().includes(p.urlPattern)
  );
  
  if (!platform) {
    return {
      success: false,
      error: 'Platform not supported',
    };
  }
  
  // Get mock product data
  const mockProduct = mockProducts[platform.urlPattern];
  if (!mockProduct) {
    return {
      success: false,
      error: 'Product information could not be extracted',
    };
  }
  
  // Add some randomness to price for demo
  const priceVariation = (Math.random() - 0.5) * 100;
  const adjustedPrice = Math.max(mockProduct.price + priceVariation, 10);
  
  return {
    success: true,
    product: {
      ...mockProduct,
      originalUrl: url,
      price: Math.round(adjustedPrice * 100) / 100, // Round to 2 decimal places
    },
  };
};

/**
 * Get platform information from URL
 */
export const getPlatformFromUrl = (url: string): SupportedPlatform | null => {
  return supportedPlatforms.find(platform => 
    url.toLowerCase().includes(platform.urlPattern)
  ) || null;
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Generate a unique product ID
 */
export const generateProductId = (): string => {
  return `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
