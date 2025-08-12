# US-010 User Dashboard Homepage - Implementation Plan

## User Story

**As a** logged-in office worker,  
**I want** to access my personalized dashboard after login,  
**so that** I can quickly view my monitored products, recent alerts, and take action on shopping opportunities.

## Pre-conditions

- User authentication system (US-007) is fully implemented ✅
- Login redirect to dashboard is working correctly ✅
- AuthProvider context provides user information ✅
- RouteGuard protection is in place for dashboard ✅
- Basic dashboard page exists but needs enhancement ⬜
- Mock data structure for dashboard statistics ⬜
- Responsive design system established ✅

## Design

### Visual Layout

The dashboard follows a modern card-based layout with clear information hierarchy:

**Main Layout Structure:**
- **Header**: Fixed navigation with user profile, logout, and app branding
- **Welcome Section**: Personalized greeting with user name and status summary
- **Stats Grid**: Three-column card layout for key metrics (responsive to single column on mobile)
- **Recent Activity**: Timeline-style list of recent price changes and notifications
- **Quick Actions**: Prominent call-to-action buttons for common tasks
- **Getting Started**: Conditional onboarding section for new users

**Key UI Elements:**
- Clean card-based design with subtle shadows and hover effects
- Consistent spacing using Tailwind's spacing scale
- Icon-based visual hierarchy for quick recognition
- Progress indicators and empty states for better UX

### Color and Typography

**Background Colors:**
- Primary: `bg-white dark:bg-gray-900`
- Secondary: `bg-gray-50 dark:bg-gray-800`
- Card surfaces: `bg-white dark:bg-gray-800`
- Accent colors: `bg-blue-50 dark:bg-blue-900/20` for highlights

**Typography:**
- Page title: `text-3xl font-bold text-gray-900 dark:text-white`
- Section headings: `text-xl font-semibold text-gray-900 dark:text-white`
- Body text: `text-base text-gray-600 dark:text-gray-300`
- Stat numbers: `text-2xl font-bold text-gray-900 dark:text-white`
- Labels: `text-sm font-medium text-gray-500 dark:text-gray-400`

**Component-Specific:**
- Stats cards: `bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow`
- Action buttons: `bg-blue-600 hover:bg-blue-700 text-white font-medium`
- Quick action cards: `bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600`

### Interaction Patterns

**Card Hover Effects:**
- Elevation change: `shadow-md` to `shadow-lg` (150ms ease)
- Subtle scale: `hover:scale-[1.02]` for interactive cards
- Border highlight for focused elements
- Accessibility: Focus rings and keyboard navigation

**Button Interactions:**
- Primary buttons: Background color transition with pressed state
- Loading states: Spinner overlay with disabled state
- Icon buttons: Scale down to 95% on click
- Touch targets: Minimum 44px for mobile accessibility

### Measurements and Spacing

**Container Layout:**
```
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6
```

**Component Spacing:**
```
- Section spacing: space-y-8
- Card grid gap: gap-6
- Card internal padding: p-6
- Stat card spacing: p-5
- Mobile adjustments: p-4 on small screens
```

**Grid System:**
```
- Stats cards: grid-cols-1 md:grid-cols-3
- Action buttons: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
- Recent activity: Single column with proper spacing
```

### Responsive Behavior

**Desktop (lg: 1024px+):**
```
- Three-column stats grid
- Four-column quick actions
- Side-by-side welcome and actions
- Full-width recent activity timeline
```

**Tablet (md: 768px - 1023px):**
```
- Two-column stats grid with third item spanning full width
- Two-column quick actions
- Stacked welcome and actions
- Condensed activity timeline
```

**Mobile (sm: < 768px):**
```
- Single column layout for all sections
- Full-width cards and buttons
- Optimized touch targets
- Condensed header with hamburger menu
```

## Technical Requirements

### Component Structure

```
src/pages/
├── dashboard.tsx                  # Enhanced dashboard page
└── components/
    └── dashboard/
        ├── WelcomeSection.tsx     # Personalized welcome area
        ├── StatsGrid.tsx          # Statistics cards container
        ├── StatCard.tsx           # Individual stat card component
        ├── RecentActivity.tsx     # Activity timeline
        ├── QuickActions.tsx       # Action buttons section
        ├── GettingStarted.tsx     # Onboarding for new users
        └── hooks/
            └── useDashboardData.ts # Dashboard data management
```

### Required Components

- WelcomeSection ✅
- StatsGrid ✅
- StatCard ✅
- RecentActivity ✅
- QuickActions ✅
- GettingStarted ✅
- useDashboardData ✅

### State Management Requirements

```typescript
interface DashboardState {
  // UI States
  isLoading: boolean;
  isFirstTime: boolean;
  activeSection: string;
  
  // Data States
  stats: DashboardStats;
  recentActivity: ActivityItem[];
  notifications: Notification[];
  
  // User States
  user: User;
  preferences: UserPreferences;
}

interface DashboardStats {
  monitoredProducts: number;
  activeAlerts: number;
  moneySaved: number;
  recentDeals: number;
}

interface ActivityItem {
  id: string;
  type: 'price_drop' | 'alert' | 'deal' | 'product_added';
  title: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// State Actions
const dashboardActions = {
  loadDashboardData: () => Promise<void>;
  refreshStats: () => Promise<void>;
  markNotificationRead: (id: string) => void;
  dismissGettingStarted: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
}
```

## Acceptance Criteria

### Layout & Content

1. **Header Section**
   ```
   - App logo and name (left-aligned)
   - User profile avatar and name (right-aligned)
   - Logout button accessible
   - Responsive: Collapses to hamburger on mobile
   ```

2. **Welcome Section**
   ```
   - Personalized greeting with user's first name
   - Current time-based greeting (Good morning/afternoon/evening)
   - Brief status summary (e.g., "You're monitoring 5 products")
   - Responsive: Full-width on mobile
   ```

3. **Statistics Grid**
   ```
   - Three stat cards: Monitored Products, Active Alerts, Money Saved
   - Large numbers with descriptive labels
   - Icon indicators for each stat type
   - Responsive: 3-2-1 column layout
   ```

### Functionality

1. **Dashboard Data Display**
   - [ ] Show personalized welcome message with user's name
   - [ ] Display current statistics (mock data for MVP)
   - [ ] Show recent activity timeline (last 10 items)
   - [ ] Render quick action buttons for common tasks
   - [ ] Display getting started guide for new users

2. **User Interactions**
   - [ ] Quick action buttons navigate to appropriate sections
   - [ ] Stat cards show hover effects and are clickable
   - [ ] Recent activity items are clickable for details
   - [ ] Getting started steps can be dismissed
   - [ ] Refresh functionality updates data

3. **Responsive Behavior**
   - [ ] Desktop shows three-column stats grid
   - [ ] Tablet adapts to two-column layout
   - [ ] Mobile stacks all content in single column
   - [ ] Touch targets are minimum 44px
   - [ ] Horizontal scrolling avoided on all devices

### Navigation Rules

- Dashboard is accessible at `/dashboard` for authenticated users
- Unauthenticated access redirects to login with return URL
- Header logout button triggers logout and redirects to login
- Quick action buttons navigate to future feature pages (placeholder for now)
- Back navigation preserves dashboard state

### Error Handling

- Loading states shown while fetching dashboard data
- Error states with retry options for failed data loads
- Graceful degradation if user data is unavailable
- Empty states with helpful guidance for new users

## Modified Files

```
src/pages/
├── dashboard.tsx                  # Enhanced with new sections ✅
└── components/
    └── dashboard/
        ├── WelcomeSection.tsx     # New component ✅
        ├── StatsGrid.tsx          # New component ✅
        ├── StatCard.tsx           # New component ✅
        ├── RecentActivity.tsx     # New component ✅
        ├── QuickActions.tsx       # New component ✅
        ├── GettingStarted.tsx     # New component ✅
        └── hooks/
            └── useDashboardData.ts # New custom hook ✅
src/types/
├── dashboard.ts                   # Type definitions ✅
└── user.ts                        # Enhanced user types ⬜
src/lib/
└── dashboard/
    ├── mock-data.ts              # Mock dashboard data ✅
    └── dashboard-utils.ts        # Helper functions ⬜
```

## Status

🟩 COMPLETED

1. **Setup & Configuration**
   - [x] Create component directory structure
   - [x] Set up TypeScript interfaces
   - [x] Create mock data for dashboard
   - [x] Set up custom hook for data management

2. **Layout Implementation**
   - [x] Implement WelcomeSection component
   - [x] Create responsive StatsGrid layout
   - [x] Build individual StatCard components
   - [x] Implement QuickActions section

3. **Feature Implementation**
   - [x] Add RecentActivity timeline
   - [x] Create GettingStarted onboarding
   - [x] Implement data loading and error states
   - [x] Add user interaction handlers

4. **Testing & Polish**
   - [x] Test responsive behavior across devices
   - [x] Verify accessibility compliance
   - [x] Test loading and error states
   - [x] Performance optimization

## Dependencies

- US-007 (User Authentication) - Completed ✅
- AuthProvider context for user data - Available ✅
- RouteGuard for page protection - Available ✅
- Tailwind CSS for styling - Available ✅
- Next.js router for navigation - Available ✅

## Related Stories

- US-007 (User Authentication and Login) - Provides user context and redirect target
- US-001 (Monitor Product Prices) - Future integration for product counts
- US-006 (Receive Price Notifications) - Future integration for notifications
- US-009 (User Profile Management) - Future integration for profile access

## Notes

### Technical Considerations

1. **Performance Optimization**: Dashboard should load quickly as it's the primary landing page after login
2. **Progressive Loading**: Implement skeleton loaders for better perceived performance
3. **Data Caching**: Consider caching dashboard data to reduce API calls
4. **State Management**: Use local component state for MVP, consider global state for complex interactions
5. **Mobile-First Design**: Ensure excellent mobile experience as primary design target

### Business Requirements

- Dashboard serves as the central hub for all user activities
- Must provide clear value proposition through statistics display
- Quick actions should encourage user engagement with key features
- Getting started guide reduces bounce rate for new users
- Responsive design ensures accessibility across all devices

### Mock Implementation

#### Type Definitions

```typescript
interface DashboardStats {
  monitoredProducts: number;
  activeAlerts: number;
  moneySaved: number;
  lastUpdated: Date;
}

interface RecentActivityItem {
  id: string;
  type: 'price_drop' | 'new_deal' | 'alert_triggered' | 'product_added';
  title: string;
  description: string;
  timestamp: Date;
  icon: string;
  actionUrl?: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  isEnabled: boolean;
}

interface DashboardData {
  stats: DashboardStats;
  recentActivity: RecentActivityItem[];
  quickActions: QuickAction[];
  isFirstTimeUser: boolean;
}
```

#### Mock Data Configuration

```typescript
// src/lib/dashboard/mock-data.ts
const mockDashboardData: DashboardData = {
  stats: {
    monitoredProducts: 0,
    activeAlerts: 0,
    moneySaved: 0,
    lastUpdated: new Date(),
  },
  recentActivity: [],
  quickActions: [
    {
      id: 'add-product',
      title: 'Add Product',
      description: 'Start monitoring a new product',
      icon: '📊',
      href: '/monitor/add',
      isEnabled: true,
    },
    {
      id: 'view-products',
      title: 'My Products',
      description: 'View all monitored products',
      icon: '📱',
      href: '/products',
      isEnabled: false, // Future feature
    },
    {
      id: 'price-alerts',
      title: 'Price Alerts',
      description: 'Manage your price alerts',
      icon: '🔔',
      href: '/alerts',
      isEnabled: false, // Future feature
    },
    {
      id: 'shopping-lists',
      title: 'Shopping Lists',
      description: 'Organize your shopping',
      icon: '📝',
      href: '/lists',
      isEnabled: false, // Future feature
    },
  ],
  isFirstTimeUser: true,
};
```

### Custom Hook Implementation

```typescript
const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const loadDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const dashboardData = {
        ...mockDashboardData,
        isFirstTimeUser: !localStorage.getItem('dashboard-visited'),
      };
      
      setData(dashboardData);
      
      // Mark dashboard as visited
      localStorage.setItem('dashboard-visited', 'true');
      
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard data load error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user, loadDashboardData]);

  const refreshData = () => {
    loadDashboardData();
  };

  const dismissGettingStarted = () => {
    setData(prev => prev ? { ...prev, isFirstTimeUser: false } : null);
    localStorage.setItem('getting-started-dismissed', 'true');
  };

  return {
    data,
    isLoading,
    error,
    refreshData,
    dismissGettingStarted,
  };
};
```

## Testing Requirements

### Integration Tests (Target: 80% Coverage)

1. **Dashboard Rendering Tests**

```typescript
describe('Dashboard Page', () => {
  it('should render welcome section with user name', async () => {
    // Test user greeting appears correctly
  });

  it('should display stats grid with correct values', async () => {
    // Test statistics are rendered with proper formatting
  });

  it('should show getting started guide for new users', async () => {
    // Test onboarding appears for first-time users
  });
});
```

2. **Responsive Layout Tests**

```typescript
describe('Responsive Behavior', () => {
  it('should adapt stats grid for mobile layout', async () => {
    // Test mobile responsive behavior
  });

  it('should maintain usability across screen sizes', async () => {
    // Test tablet and desktop layouts
  });
});
```

3. **User Interaction Tests**

```typescript
describe('User Interactions', () => {
  it('should handle quick action button clicks', async () => {
    // Test navigation to feature pages
  });

  it('should dismiss getting started guide', async () => {
    // Test onboarding dismissal
  });

  it('should refresh dashboard data', async () => {
    // Test data refresh functionality
  });
});
```

### Performance Tests

1. **Loading Performance**

```typescript
describe('Performance', () => {
  it('should load dashboard within 2 seconds', async () => {
    // Test page load performance
  });

  it('should show loading states during data fetch', async () => {
    // Test loading state UX
  });
});
```

### Accessibility Tests

```typescript
describe('Accessibility', () => {
  it('should provide proper ARIA labels and roles', async () => {
    // Test screen reader accessibility
  });

  it('should support keyboard navigation', async () => {
    // Test keyboard accessibility
  });

  it('should maintain focus management', async () => {
    // Test focus handling
  });
});
```

This implementation plan provides a comprehensive roadmap for creating a modern, responsive dashboard that serves as the central hub for authenticated users in the Shopping Monitor application.
