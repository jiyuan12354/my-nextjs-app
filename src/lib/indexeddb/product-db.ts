// Product database utilities for IndexedDB

import { StoredMonitoredProduct, MonitoredProductData } from './db-types';

class ProductDB {
  private dbName = 'SmartMonitoringDB';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create products store
        if (!db.objectStoreNames.contains('monitored_products')) {
          const productsStore = db.createObjectStore('monitored_products', {
            keyPath: 'id'
          });
          productsStore.createIndex('status', 'status', { unique: false });
          productsStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
        
        // Create sync queue store
        if (!db.objectStoreNames.contains('sync_queue')) {
          const syncStore = db.createObjectStore('sync_queue', {
            keyPath: 'id'
          });
          syncStore.createIndex('operation', 'operation', { unique: false });
        }
      };
    });
  }

  async addProduct(productData: MonitoredProductData): Promise<string> {
    if (!this.db) await this.init();
    
    const id = `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const storedProduct: StoredMonitoredProduct = {
      id,
      data: productData,
      timestamp: new Date().toISOString(),
      status: 'pending',
      version: 1,
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['monitored_products'], 'readwrite');
      const store = transaction.objectStore('monitored_products');
      const request = store.add(storedProduct);
      
      request.onsuccess = () => {
        console.log(JSON.stringify({
          timestamp: new Date().toISOString(),
          level: 'INFO',
          service: 'my-nextjs-app',
          correlationId: `add-product-${id}`,
          message: 'Product stored locally in IndexedDB',
          context: {
            productId: id,
            productName: productData.name,
            status: 'pending'
          }
        }));
        resolve(id);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getProducts(): Promise<StoredMonitoredProduct[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['monitored_products'], 'readonly');
      const store = transaction.objectStore('monitored_products');
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async getProductCount(): Promise<number> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['monitored_products'], 'readonly');
      const store = transaction.objectStore('monitored_products');
      const request = store.count();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateProductStatus(id: string, status: 'pending' | 'synced' | 'error'): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['monitored_products'], 'readwrite');
      const store = transaction.objectStore('monitored_products');
      const getRequest = store.get(id);
      
      getRequest.onsuccess = () => {
        const product = getRequest.result;
        if (product) {
          product.status = status;
          const updateRequest = store.put(product);
          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = () => reject(updateRequest.error);
        } else {
          resolve(); // Product not found, but don't error
        }
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  async deleteProduct(id: string): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['monitored_products'], 'readwrite');
      const store = transaction.objectStore('monitored_products');
      const request = store.delete(id);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Listen for changes (for real-time updates)
  onProductsChanged(callback: () => void): () => void {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'products-changed') {
        callback();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }

  // Trigger change notification
  private notifyProductsChanged(): void {
    // Use localStorage to notify other tabs/components
    localStorage.setItem('products-changed', Date.now().toString());
    localStorage.removeItem('products-changed');
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('products-changed'));
  }

  // Override add method to include notification
  async addProductWithNotification(productData: MonitoredProductData): Promise<string> {
    const id = await this.addProduct(productData);
    this.notifyProductsChanged();
    return id;
  }
}

export const productDB = new ProductDB();
