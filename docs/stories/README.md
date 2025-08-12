# User Stories - Shopping Monitor Platform

This directory contains all user stories for the Shopping Monitor platform, designed for busy office workers who need efficient price monitoring and shopping management.

## Core Platform Stories

### 01. [Monitor Product Prices](./01-monitor-product-prices.md)
Set up automated price monitoring for products across multiple e-commerce platforms with alert thresholds and price history tracking.

### 02. [Generate Shopping Plans](./02-generate-shopping-plans.md)
Create organized shopping plans that consolidate monitored products with price drops into actionable lists.

### 03. [Compare Prices Across Platforms](./03-compare-prices-across-platforms.md)
View side-by-side price comparisons for the same product across different shopping platforms.

### 04. [Access Platform via Web](./04-access-platform-via-web.md)
Access the shopping platform through a responsive web interface optimized for mobile and desktop use.

### 05. [Manage Shopping Lists](./05-manage-shopping-lists.md)
Create, organize, and manage multiple shopping lists with products and price tracking.

### 06. [Receive Price Notifications](./06-receive-price-notifications.md)
Get real-time notifications when monitored product prices drop below set thresholds.

## Authentication & User Management Stories

### 07. [User Authentication and Login](./07-user-authentication-login.md)
Log in to the platform to access personalized monitoring lists and settings.
- **Phase 1**: Mock authentication for development
- **Phase 2**: Full authentication system
- **Status**: 🟨 IN PROGRESS - BLOCKED on login redirect issue

### 08. [User Registration](./08-user-registration.md)
Create new user accounts to enable personalized shopping monitoring.
- **Phase 1**: Not implemented (mock login only)
- **Phase 2**: Full registration with email verification

### 09. [User Profile Management](./09-user-profile-management.md)
Manage user profile, account settings, and notification preferences.
- **Phase 1**: Basic profile display with mock data
- **Phase 2**: Full profile management with backend integration

### 10. [User Dashboard Homepage](./10-user-dashboard-homepage.md)
Access personalized dashboard after login with monitoring overview and quick actions.
- **Phase 1**: Static dashboard with mock data and getting started guide
- **Phase 2**: Dynamic dashboard with real-time data and analytics

## Feature-Specific Stories

### 11. [Add Product to Monitoring](./11-add-product-to-monitoring.md)
Add new products to monitoring list with customizable alert settings and platform support.

### 12. [View and Manage Monitored Products](./12-view-manage-monitored-products.md)
Comprehensive management interface for all monitored products with editing and bulk operations.

### 13. [Manage Price Alerts and Notifications](./13-manage-price-alerts-notifications.md)
Advanced alert management with custom rules, notification preferences, and alert history.

### 14. [Create and Organize Shopping Lists](./14-create-organize-shopping-lists.md)
Enhanced shopping list management with budgets, sharing, and monitoring integration.

### 15. [Dashboard Quick Actions Navigation](./15-dashboard-quick-actions-navigation.md)
Efficient navigation system through dashboard quick actions for common user workflows.

## Story Dependencies

```
┌─────────────────────────────────────────┐
│ 07. User Authentication (Foundation)    │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│ 10. User Dashboard Homepage             │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│ 01. Monitor Products                    │
│ 05. Manage Shopping Lists               │
│ 09. User Profile Management            │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│ 02. Generate Shopping Plans             │
│ 03. Compare Prices                      │
│ 06. Receive Notifications               │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│ 04. Access Platform via Web (PWA)       │
└─────────────────────────────────────────┘
```

## Implementation Priority

### MVP Phase (Current Development)
1. **US-04**: Access Platform via Web ✅ *Completed*
2. **US-07**: User Authentication (Mock) 🟨 *In Progress - Blocked on redirect*
3. **US-10**: User Dashboard Homepage ✅ *Completed*
4. **US-01**: Monitor Product Prices
5. **US-05**: Manage Shopping Lists
6. **US-06**: Receive Price Notifications

### Future Phases
1. **US-02**: Generate Shopping Plans
2. **US-03**: Compare Prices Across Platforms
3. **US-08**: User Registration (Real)
4. **US-09**: User Profile Management (Full)

## Technical Notes

Based on the meeting transcript analysis:
- **Target Users**: Busy office workers (上班族) who lack time for manual price comparison
- **Core Pain Point**: Time-consuming manual search and price comparison across platforms
- **Platform Decision**: Web-based solution (small program/website) using Next.js
- **Key Challenge**: Aggregating APIs from multiple e-commerce platforms
- **Technical Constraint**: Fast-changing e-commerce pricing requires frequent updates

## Chinese Versions

All user stories are also available in Chinese in the [zh-CN](./zh-CN/) directory for development teams working in Chinese.
