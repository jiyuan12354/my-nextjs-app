// URL validation utilities

import { supportedPlatforms } from './product-extraction';

/**
 * Comprehensive URL validation
 */
export const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Check if URL belongs to supported platform
 */
export const isSupportedPlatform = (url: string): boolean => {
  if (!isValidUrl(url)) return false;
  
  return supportedPlatforms.some(platform => 
    url.toLowerCase().includes(platform.urlPattern)
  );
};

/**
 * Get validation error message for URL
 */
export const getUrlValidationError = (url: string): string | null => {
  if (!url.trim()) {
    return null; // No error for empty URL
  }
  
  if (!isValidUrl(url)) {
    return 'Please enter a valid URL (must start with http:// or https://)';
  }
  
  if (!isSupportedPlatform(url)) {
    const platformNames = supportedPlatforms.map(p => p.name).join(', ');
    return `URL must be from a supported platform: ${platformNames}`;
  }
  
  return null;
};

/**
 * Normalize URL for consistency
 */
export const normalizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    // Remove tracking parameters and fragments
    urlObj.search = '';
    urlObj.hash = '';
    return urlObj.toString();
  } catch {
    return url;
  }
};

/**
 * Extract domain from URL
 */
export const extractDomain = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return null;
  }
};
