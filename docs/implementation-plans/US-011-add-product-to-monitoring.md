# US-011 Add Product to Monitoring - Implementation Planning

## User Story

As a shopper, I want to easily add a new product to my monitoring list with customizable alert settings, so that I can start tracking its price and receive notifications when it meets my criteria.

## Pre-conditions

- User must be authenticated and logged into the platform
- Dashboard with quick actions is accessible and functional
- Basic monitoring system infrastructure exists (types, mock data structure)
- RouteGuard protection is in place for authenticated routes

## Design

### Visual Layout

The Add Product to Monitoring feature will consist of:
- **Main Form Container**: Centered layout with step-by-step product addition flow
- **URL Input Section**: Primary method for adding products via supported platform URLs
- **Manual Entry Section**: Alternative method for entering product details manually
- **Alert Configuration Panel**: Customizable price thresholds and notification settings
- **Product Preview Card**: Shows extracted/entered product information before confirmation
- **Progress Indicators**: Visual feedback during URL validation and product extraction

### Color and Typography

- **Background Colors**: 
  - Primary: bg-white dark:bg-gray-900
  - Form sections: bg-gray-50 dark:bg-gray-800
  - Success states: bg-green-50 dark:bg-green-900/20
  - Error states: bg-red-50 dark:bg-red-900/20

- **Typography**:
  - Form headings: font-inter text-xl font-semibold text-gray-900 dark:text-white
  - Field labels: font-inter text-sm font-medium text-gray-700 dark:text-gray-300
  - Helper text: font-inter text-sm text-gray-500 dark:text-gray-400
  - Error text: font-inter text-sm text-red-600 dark:text-red-400

- **Component-Specific**:
  - Input fields: border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500
  - Buttons: bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300
  - Preview cards: bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700

### Interaction Patterns

- **Form Validation**: 
  - Real-time URL validation with debounced checking
  - Visual feedback for valid/invalid URLs
  - Progressive disclosure of form sections based on input method

- **Product Preview**:
  - Animated loading states during URL processing
  - Expandable product details section
  - Edit capabilities for extracted information

- **Alert Configuration**:
  - Toggle switches for different alert types
  - Slider components for percentage-based thresholds
  - Preview of notification settings

### Measurements and Spacing

- **Container**:
  ```
  max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8
  ```

- **Form Spacing**:
  ```
  - Section spacing: space-y-8
  - Field spacing: space-y-4
  - Button groups: space-x-3
  - Card padding: p-6
  ```

### Responsive Behavior

- **Desktop (lg: 1024px+)**:
  ```
  - Two-column layout for form and preview
  - Side-by-side alert configuration
  - Full-width product preview cards
  ```

- **Tablet (md: 768px - 1023px)**:
  ```
  - Single column layout
  - Stacked form sections
  - Condensed alert controls
  ```

- **Mobile (sm: < 768px)**:
  ```
  - Full-width form elements
  - Simplified alert configuration
  - Touch-optimized input controls
  ```

## Technical Requirements

### Component Structure

```
src/app/monitor/add/
├── page.tsx
└── _components/
    ├── AddProductForm.tsx         # Main form container
    ├── URLInputSection.tsx        # URL-based product addition
    ├── ManualEntrySection.tsx     # Manual product entry
    ├── ProductPreview.tsx         # Product information preview
    ├── AlertConfiguration.tsx     # Alert settings configuration
    ├── PlatformSelector.tsx       # Supported platform selection
    ├── SyncStatusIndicator.tsx    # IndexedDB sync status display
    └── useProductForm.ts          # Custom hook for form state

src/lib/indexeddb/
├── product-db.ts                 # IndexedDB product storage utilities
├── sync-manager.ts               # Data synchronization logic
└── db-types.ts                   # IndexedDB type definitions
```

### Required Components

- AddProductForm ⬜
- URLInputSection ⬜
- ManualEntrySection ⬜
- ProductPreview ⬜
- AlertConfiguration ⬜
- PlatformSelector ⬜
- SyncStatusIndicator ⬜
- useProductForm ⬜
- ProductDB utilities ⬜
- SyncManager ⬜

### State Management Requirements

```typescript
interface ProductFormState {
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
  alertSettings: {
    targetPrice: number | null;
    percentageThreshold: number | null;
    enablePriceDrop: boolean;
    enableBackInStock: boolean;
    notificationMethods: ('email' | 'browser' | 'sms')[];
  };
  
  // Form state
  isSubmitting: boolean;
  errors: Record<string, string>;
  touchedFields: Set<string>;
  
  // IndexedDB state
  localStorageStatus: 'idle' | 'saving' | 'saved' | 'error';
  syncStatus: 'pending' | 'synced' | 'error';
}

interface ExtractedProduct {
  name: string;
  price: number;
  image: string;
  retailer: string;
  category?: string;
  originalUrl: string;
  isAvailable: boolean;
}

// IndexedDB Storage Interfaces
interface StoredMonitoredProduct {
  id: string;
  data: MonitoredProductData;
  timestamp: string;
  status: 'pending' | 'synced' | 'error';
  version: number;
}

interface MonitoredProductData {
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

interface ExtractedProduct {
  name: string;
  price: number;
  image: string;
  retailer: string;
  category?: string;
  originalUrl: string;
  isAvailable: boolean;
}
```

## Acceptance Criteria

### Layout & Content

1. **Form Layout**
   ```
   - Clean, centered form with clear section divisions
   - Progress indicators for multi-step process
   - Responsive design adapting to screen sizes
   - Consistent spacing and visual hierarchy
   ```

2. **Input Methods**
   ```
   - Toggle between URL and manual entry
   - URL input with real-time validation
   - Manual entry fields for all required product data
   - Platform-specific URL format guidance
   ```

3. **Product Preview**
   ```
   - Product card showing extracted/entered information
   - Image thumbnail with fallback handling
   - Price display with currency formatting
   - Retailer and category information
   ```

### Functionality

1. **URL-Based Product Addition**

   - [ ] Support major platforms (Amazon, Best Buy, Target, Walmart)
   - [ ] Real-time URL validation with visual feedback
   - [ ] Product information extraction from valid URLs
   - [ ] Error handling for unsupported or invalid URLs
   - [ ] Loading states during URL processing

2. **Manual Product Entry**

   - [ ] All required fields with proper validation
   - [ ] Image URL validation and preview
   - [ ] Price input with currency formatting
   - [ ] Retailer selection from predefined list
   - [ ] Category selection or custom entry

3. **Alert Configuration**

   - [ ] Target price setting with validation
   - [ ] Percentage-based threshold configuration
   - [ ] Multiple alert type selection (price drop, back in stock)
   - [ ] Notification method preferences
   - [ ] Preview of alert settings before submission

4. **Form Submission & Validation**

   - [ ] Client-side validation for all fields
   - [ ] Real-time validation feedback
   - [ ] Form submission with loading states
   - [ ] Success confirmation with navigation options
   - [ ] Error handling and user feedback

5. **IndexedDB Data Persistence**

   - [ ] Immediate local storage of product data on form submission
   - [ ] Visual confirmation of local storage (sync status indicator)
   - [ ] Optimistic UI updates showing product added immediately
   - [ ] Background synchronization with server API
   - [ ] Offline capability - form works without internet connection
   - [ ] Sync status indicators (pending, synced, error states)
   - [ ] Conflict resolution for simultaneous online/offline changes
   - [ ] Data versioning and migration support
   - [ ] Storage quota management and cleanup
   - [ ] Fallback to server-only mode if IndexedDB unavailable

### Navigation Rules

- Form accessible via dashboard quick action button
- Breadcrumb navigation showing current location
- Cancel option returns to dashboard
- Success state offers navigation to product list or dashboard
- Form state preserved during browser navigation

### Error Handling

- Network errors during URL validation with retry options
- Invalid URL formats with helpful error messages
- Duplicate product detection with override options
- Form validation errors with field-specific guidance
- Server errors with fallback submission options

## Modified Files

```
src/app/monitor/add/
├── page.tsx ⬜
└── _components/
    ├── AddProductForm.tsx ⬜
    ├── URLInputSection.tsx ⬜
    ├── ManualEntrySection.tsx ⬜
    ├── ProductPreview.tsx ⬜
    ├── AlertConfiguration.tsx ⬜
    ├── PlatformSelector.tsx ⬜
    ├── SyncStatusIndicator.tsx ⬜
    └── useProductForm.ts ⬜

src/types/
└── product-monitoring.ts ⬜

src/lib/
├── product-extraction.ts ⬜
├── url-validation.ts ⬜
├── indexeddb/
│   ├── product-db.ts ⬜
│   ├── sync-manager.ts ⬜
│   └── db-types.ts ⬜
└── monitoring/
    └── product-utils.ts ⬜
    └── product-utils.ts ⬜

src/components/ui/ (if needed)
├── currency-input.tsx ⬜
├── url-input.tsx ⬜
└── percentage-slider.tsx ⬜
```

## Status

[~] IN PROGRESS - Updated with IndexedDB requirements

**Previous Implementation Status**: ✅ COMPLETED (Basic functionality without IndexedDB)
**Current Enhancement**: 🔄 Adding IndexedDB data persistence and offline capabilities

1. **Setup & Configuration**

   - [ ] Create route structure (/monitor/add)
   - [ ] Set up TypeScript interfaces for product monitoring
   - [ ] Configure form validation schemas
   - [ ] Set up mock product extraction utilities
   - [ ] Create IndexedDB schema and database initialization
   - [ ] Set up data synchronization utilities
   - [ ] Configure offline storage capabilities

2. **Layout Implementation**

   - [ ] Create main page layout with navigation
   - [ ] Implement responsive form container
   - [ ] Add progress indicators and breadcrumbs
   - [ ] Set up form section transitions

3. **Core Components**

   - [ ] Build URL input section with validation
   - [ ] Create manual entry form fields
   - [ ] Implement product preview component
   - [ ] Build alert configuration interface
   - [ ] Add platform selector component
   - [ ] Create sync status indicator component
   - [ ] Add offline mode indicators

4. **Form Logic & State**

   - [ ] Implement useProductForm custom hook
   - [ ] Add form validation and error handling
   - [ ] Create product extraction simulation
   - [ ] Implement form submission workflow
   - [ ] Integrate IndexedDB storage for immediate persistence
   - [ ] Add optimistic UI updates with rollback capability
   - [ ] Implement background sync with server
   - [ ] Add offline/online state management

5. **Testing**
   - [ ] URL validation functionality
   - [ ] Form submission and error states
   - [ ] Responsive design across devices
   - [ ] Accessibility compliance
   - [ ] Integration with existing monitoring system
   - [ ] IndexedDB storage and retrieval operations
   - [ ] Offline functionality and data persistence
   - [ ] Sync status indicators and error handling
   - [ ] Data migration and schema versioning
   - [ ] Storage quota management and cleanup

## Dependencies

- Authentication system (US-007) - ✅ Complete
- Dashboard quick actions (US-010) - ✅ Complete
- Basic monitoring types and infrastructure
- RouteGuard component for protected routes

## Related Stories

- US-001 (Monitor Product Prices) - Core monitoring functionality
- US-010 (User Dashboard Homepage) - Navigation source
- US-012 (View and Manage Monitored Products) - Where products appear after addition

## Notes

### Technical Considerations

1. **URL Processing**: Implement mock URL validation that simulates extracting product information from major e-commerce platforms
2. **Form State Management**: Use React Hook Form or similar for complex form state with validation
3. **Real-time Validation**: Implement debounced validation to avoid excessive API calls during URL input
4. **Error Boundaries**: Add proper error boundaries to handle unexpected failures gracefully
5. **Accessibility**: Ensure form is fully accessible with proper ARIA labels and keyboard navigation

### Business Requirements

- Support for major e-commerce platforms (Amazon, Best Buy, Target, Walmart)
- Flexible alert configuration to meet different user needs
- User-friendly interface suitable for busy office workers
- Clear feedback and guidance throughout the process

### API Integration

#### Type Definitions

```typescript
interface ProductMonitoringRequest {
  inputMethod: 'url' | 'manual';
  productUrl?: string;
  productData?: ManualProductData;
  alertSettings: AlertConfiguration;
}

interface ManualProductData {
  name: string;
  price: number;
  image: string;
  retailer: string;
  category?: string;
  customUrl?: string;
}

interface AlertConfiguration {
  targetPrice?: number;
  percentageThreshold?: number;
  enablePriceDrop: boolean;
  enableBackInStock: boolean;
  notificationMethods: NotificationMethod[];
}

interface ProductExtractionResult {
  success: boolean;
  product?: ExtractedProduct;
  error?: string;
}
```

### Mock Implementation

#### Mock URL Validation

```typescript
// filepath: src/lib/product-extraction.ts
export const extractProductFromUrl = async (url: string): Promise<ProductExtractionResult> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock extraction based on URL patterns
  if (url.includes('amazon.com')) {
    return {
      success: true,
      product: {
        name: 'iPhone 15 Pro Max',
        price: 1199.99,
        image: '/mock-images/iphone-15-pro.jpg',
        retailer: 'Amazon',
        category: 'Electronics',
        originalUrl: url,
        isAvailable: true,
      }
    };
  }
  
  return {
    success: false,
    error: 'Unsupported platform or invalid URL',
  };
};
```

#### Mock Response

```json
// filepath: mocks/responses/product-extraction.json
{
  "status": "SUCCESS",
  "data": {
    "product": {
      "id": "mock-product-1",
      "name": "Sample Product",
      "price": 99.99,
      "image": "/mock-images/sample-product.jpg",
      "retailer": "Mock Store",
      "category": "Electronics",
      "originalUrl": "https://example.com/product/123",
      "isAvailable": true,
      "lastUpdated": "2024-01-15T10:30:00Z"
    },
    "supportedPlatforms": [
      {
        "name": "Amazon",
        "urlPattern": "amazon.com",
        "enabled": true
      },
      {
        "name": "Best Buy",
        "urlPattern": "bestbuy.com",
        "enabled": true
      }
    ]
  }
}
```

### Custom Hook Implementation

```typescript
const useProductForm = () => {
  const [state, setState] = useState<ProductFormState>(initialState);
  const router = useRouter();

  const validateUrl = useCallback(async (url: string) => {
    if (!url) return;
    
    setState(prev => ({ ...prev, isValidatingUrl: true, urlValidationError: null }));
    
    try {
      const result = await extractProductFromUrl(url);
      if (result.success && result.product) {
        setState(prev => ({
          ...prev,
          extractedProduct: result.product,
          isValidatingUrl: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          urlValidationError: result.error || 'Failed to extract product information',
          isValidatingUrl: false,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        urlValidationError: 'Network error. Please try again.',
        isValidatingUrl: false,
      }));
    }
  }, []);

  const debouncedValidateUrl = useMemo(
    () => debounce(validateUrl, 800),
    [validateUrl]
  );

  const submitForm = useCallback(async () => {
    setState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success state or product list
      router.push('/products?added=success');
    } catch (error) {
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        errors: { submit: 'Failed to add product. Please try again.' },
      }));
    }
  }, [router]);

  return {
    ...state,
    setState,
    validateUrl: debouncedValidateUrl,
    submitForm,
  };
};
```

### IndexedDB Implementation

#### Product Database Setup

```typescript
// filepath: src/lib/indexeddb/product-db.ts
import { StoredMonitoredProduct, MonitoredProductData } from '../types/product-monitoring';

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
        const productsStore = db.createObjectStore('monitored_products', {
          keyPath: 'id'
        });
        productsStore.createIndex('status', 'status', { unique: false });
        productsStore.createIndex('timestamp', 'timestamp', { unique: false });
        
        // Create sync queue store
        const syncStore = db.createObjectStore('sync_queue', {
          keyPath: 'id'
        });
        syncStore.createIndex('operation', 'operation', { unique: false });
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
        }
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  }
}

export const productDB = new ProductDB();
```

#### Sync Manager Implementation

```typescript
// filepath: src/lib/indexeddb/sync-manager.ts
import { productDB } from './product-db';
import { StoredMonitoredProduct } from '../types/product-monitoring';

class SyncManager {
  private isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private syncInProgress = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.syncPendingProducts();
      });
      
      window.addEventListener('offline', () => {
        this.isOnline = false;
      });
    }
  }

  async syncPendingProducts(): Promise<void> {
    if (!this.isOnline || this.syncInProgress) return;
    
    this.syncInProgress = true;
    
    try {
      const products = await productDB.getProducts();
      const pendingProducts = products.filter(p => p.status === 'pending');
      
      for (const product of pendingProducts) {
        try {
          await this.syncProductToServer(product);
          await productDB.updateProductStatus(product.id, 'synced');
          
          console.log(JSON.stringify({
            timestamp: new Date().toISOString(),
            level: 'INFO',
            service: 'my-nextjs-app',
            correlationId: `sync-${product.id}`,
            message: 'Product synchronized with server',
            context: {
              productId: product.id,
              productName: product.data.name,
              syncStatus: 'synced'
            }
          }));
        } catch (error) {
          await productDB.updateProductStatus(product.id, 'error');
          
          console.log(JSON.stringify({
            timestamp: new Date().toISOString(),
            level: 'ERROR',
            service: 'my-nextjs-app',
            correlationId: `sync-error-${product.id}`,
            message: 'Failed to sync product with server',
            context: {
              productId: product.id,
              error: (error as Error).message
            }
          }));
        }
      }
    } finally {
      this.syncInProgress = false;
    }
  }

  private async syncProductToServer(product: StoredMonitoredProduct): Promise<void> {
    // Simulate server API call
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // 90% success rate for demo purposes
        if (Math.random() > 0.1) {
          resolve(undefined);
        } else {
          reject(new Error('Server sync failed'));
        }
      }, 1000 + Math.random() * 2000);
    });
  }

  isOffline(): boolean {
    return !this.isOnline;
  }
}

export const syncManager = new SyncManager();
```

#### Enhanced Custom Hook with IndexedDB

```typescript
// Enhanced useProductForm hook with IndexedDB integration
const useProductForm = () => {
  const [state, setState] = useState<ProductFormState>(initialState);
  const router = useRouter();

  const submitForm = useCallback(async () => {
    setState(prev => ({ 
      ...prev, 
      isSubmitting: true, 
      localStorageStatus: 'saving' 
    }));
    
    try {
      // Create product data from form state
      const productData: MonitoredProductData = {
        name: state.inputMethod === 'url' 
          ? state.extractedProduct?.name || 'Unknown Product'
          : state.productName,
        price: state.inputMethod === 'url'
          ? state.extractedProduct?.price || 0
          : state.currentPrice,
        image: state.inputMethod === 'url'
          ? state.extractedProduct?.image || ''
          : state.productImage,
        retailer: state.inputMethod === 'url'
          ? state.extractedProduct?.retailer || 'Unknown'
          : state.retailer,
        category: state.productCategory,
        originalUrl: state.inputMethod === 'url' ? state.productUrl : undefined,
        alertSettings: state.alertSettings,
        dateAdded: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };

      // Store locally first for immediate feedback
      const productId = await productDB.addProduct(productData);
      
      setState(prev => ({ 
        ...prev, 
        localStorageStatus: 'saved',
        syncStatus: 'pending'
      }));

      // Trigger background sync
      if (!syncManager.isOffline()) {
        syncManager.syncPendingProducts();
      }

      // Navigate with success indication
      router.push('/dashboard?added=success');
      
    } catch (error) {
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        localStorageStatus: 'error',
        errors: { submit: 'Failed to save product. Please try again.' },
      }));
    }
  }, [state, router]);

  // ... rest of hook implementation
};
```

## Testing Requirements

### Integration Tests (Target: 80% Coverage)

1. **Form Functionality Tests**

```typescript
describe('Add Product Form', () => {
  it('should validate URLs and extract product information', async () => {
    // Test URL validation flow
  });

  it('should handle manual product entry with validation', async () => {
    // Test manual entry form
  });

  it('should configure alert settings correctly', async () => {
    // Test alert configuration
  });
});
```

2. **Error Handling Tests**

```typescript
describe('Error Handling', () => {
  it('should handle invalid URLs gracefully', async () => {
    // Test error states
  });

  it('should validate required fields before submission', async () => {
    // Test form validation
  });
});
```

3. **Responsive Tests**

```typescript
describe('Responsive Behavior', () => {
  it('should adapt layout for mobile devices', async () => {
    // Test mobile layout
  });

  it('should maintain functionality across breakpoints', async () => {
    // Test responsive functionality
  });
});
```

### Accessibility Tests

```typescript
describe('Accessibility', () => {
  it('should provide proper ARIA labels for form fields', async () => {
    // Test accessibility
  });

  it('should support keyboard navigation', async () => {
    // Test keyboard interaction
  });
});
```

4. **IndexedDB Integration Tests**

```typescript
describe('IndexedDB Data Persistence', () => {
  beforeEach(async () => {
    // Setup test database
    await productDB.init();
  });

  afterEach(async () => {
    // Clear test data
    const products = await productDB.getProducts();
    for (const product of products) {
      await productDB.deleteProduct(product.id);
    }
  });

  it('should store product data locally on form submission', async () => {
    const productData = {
      name: 'Test Product',
      price: 99.99,
      retailer: 'Test Store',
      // ... other required fields
    };

    const productId = await productDB.addProduct(productData);
    const storedProducts = await productDB.getProducts();
    
    expect(storedProducts).toHaveLength(1);
    expect(storedProducts[0].id).toBe(productId);
    expect(storedProducts[0].status).toBe('pending');
  });

  it('should update sync status after server synchronization', async () => {
    const productId = await productDB.addProduct(mockProductData);
    await productDB.updateProductStatus(productId, 'synced');
    
    const products = await productDB.getProducts();
    const product = products.find(p => p.id === productId);
    
    expect(product?.status).toBe('synced');
  });

  it('should handle offline form submission gracefully', async () => {
    // Simulate offline state
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    const productData = mockProductData;
    const productId = await productDB.addProduct(productData);
    
    // Product should be stored locally
    const products = await productDB.getProducts();
    expect(products).toHaveLength(1);
    expect(products[0].status).toBe('pending');
    
    // Restore online state
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });
  });

  it('should provide visual feedback for storage operations', async () => {
    // Test UI state updates during storage operations
    // This would be tested in component integration tests
  });
});
```

5. **Sync Manager Tests**

```typescript
describe('Sync Manager', () => {
  it('should sync pending products when online', async () => {
    // Add pending product
    const productId = await productDB.addProduct(mockProductData);
    
    // Trigger sync
    await syncManager.syncPendingProducts();
    
    // Check status updated
    const products = await productDB.getProducts();
    const product = products.find(p => p.id === productId);
    expect(product?.status).toBe('synced');
  });

  it('should handle sync errors gracefully', async () => {
    // Mock server error
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Server error'));
    
    const productId = await productDB.addProduct(mockProductData);
    await syncManager.syncPendingProducts();
    
    const products = await productDB.getProducts();
    const product = products.find(p => p.id === productId);
    expect(product?.status).toBe('error');
  });

  it('should detect online/offline status changes', async () => {
    expect(syncManager.isOffline()).toBe(false);
    
    // Simulate going offline
    window.dispatchEvent(new Event('offline'));
    expect(syncManager.isOffline()).toBe(true);
    
    // Simulate coming online
    window.dispatchEvent(new Event('online'));
    expect(syncManager.isOffline()).toBe(false);
  });
});
```
