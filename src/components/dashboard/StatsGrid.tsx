// Statistics grid container component

import React from 'react';
import { useRouter } from 'next/router';
import StatCard from './StatCard';
import { DashboardStats } from '../../types/dashboard';
import { formatCurrency } from '../../lib/dashboard/mock-data';

interface StatsGridProps {
  stats: DashboardStats;
  className?: string;
}

export default function StatsGrid({ stats, className = '' }: StatsGridProps) {
  const router = useRouter();
  
  const handleStatClick = (statType: string) => {
    console.log(`📊 Stat card clicked: ${statType}`);
    
    // Future navigation to detailed views
    switch (statType) {
      case 'products':
        // router.push('/products');
        console.log('→ Would navigate to products page');
        break;
      case 'alerts':
        // router.push('/alerts');
        console.log('→ Would navigate to alerts page');
        break;
      case 'savings':
        // router.push('/savings');
        console.log('→ Would navigate to savings page');
        break;
      default:
        break;
    }
  };

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Monitored Products */}
        <StatCard
          title="Monitored Products"
          value={stats.monitoredProducts}
          icon="📊"
          description="Products being tracked"
          isClickable={stats.monitoredProducts > 0}
          onClick={() => handleStatClick('products')}
        />
        
        {/* Active Alerts */}
        <StatCard
          title="Active Alerts"
          value={stats.activeAlerts}
          icon="🔔"
          description="Price alerts set"
          isClickable={stats.activeAlerts > 0}
          onClick={() => handleStatClick('alerts')}
        />
        
        {/* Money Saved */}
        <StatCard
          title="Money Saved"
          value={formatCurrency(stats.moneySaved)}
          icon="💰"
          description="Total savings"
          isClickable={stats.moneySaved > 0}
          onClick={() => handleStatClick('savings')}
        />
      </div>
      
      {/* Last Updated Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Last updated: {stats.lastUpdated.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
