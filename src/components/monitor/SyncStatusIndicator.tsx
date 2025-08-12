// Sync status indicator component

import React, { useState, useEffect } from 'react';
import { productDB } from '../../lib/indexeddb/product-db';

interface SyncStatusIndicatorProps {
  className?: string;
}

export const SyncStatusIndicator: React.FC<SyncStatusIndicatorProps> = ({ 
  className = '' 
}) => {
  const [pendingCount, setPendingCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkPendingProducts = async () => {
      try {
        const products = await productDB.getProducts();
        const pending = products.filter(p => p.status === 'pending').length;
        setPendingCount(pending);
        setIsVisible(pending > 0);
      } catch (error) {
        console.error('Error checking pending products:', error);
      }
    };

    // Initial check
    checkPendingProducts();

    // Listen for product changes
    const handleProductsChanged = () => {
      checkPendingProducts();
    };

    window.addEventListener('products-changed', handleProductsChanged);
    
    // Also check periodically
    const interval = setInterval(checkPendingProducts, 5000);

    return () => {
      window.removeEventListener('products-changed', handleProductsChanged);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-full text-sm ${className}`}>
      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
      <span className="text-yellow-800 dark:text-yellow-200">
        {pendingCount} product{pendingCount !== 1 ? 's' : ''} syncing...
      </span>
    </div>
  );
};
