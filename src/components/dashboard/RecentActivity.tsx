// Recent activity timeline component

import React from 'react';
import { RecentActivityItem } from '../../types/dashboard';
import { formatRelativeTime } from '../../lib/dashboard/mock-data';

interface RecentActivityProps {
  activities: RecentActivityItem[];
  className?: string;
}

export default function RecentActivity({ activities, className = '' }: RecentActivityProps) {
  const handleActivityClick = (activity: RecentActivityItem) => {
    console.log(`📋 Activity clicked: ${activity.title}`);
    
    if (activity.actionUrl) {
      console.log(`→ Would navigate to: ${activity.actionUrl}`);
      // Future navigation implementation
      // router.push(activity.actionUrl);
    }
  };

  const getActivityTypeColor = (type: RecentActivityItem['type']) => {
    switch (type) {
      case 'price_drop':
        return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400';
      case 'new_deal':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400';
      case 'alert_triggered':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400';
      case 'product_added':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  if (activities.length === 0) {
    return (
      <div className={className}>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-gray-400">📈</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No activity yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              Once you start monitoring products, you'll see price changes, alerts, and deals here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          View All
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            onClick={() => handleActivityClick(activity)}
            className={`
              p-4 transition-colors duration-150
              ${activity.actionUrl 
                ? 'hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer' 
                : ''
              }
              ${index === 0 ? 'rounded-t-lg' : ''}
              ${index === activities.length - 1 ? 'rounded-b-lg' : ''}
            `}
          >
            <div className="flex items-start space-x-3">
              {/* Activity Icon */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                ${getActivityTypeColor(activity.type)}
              `}>
                <span className="text-lg" role="img" aria-label={activity.type}>
                  {activity.icon}
                </span>
              </div>
              
              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {activity.title}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                    {formatRelativeTime(activity.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {activity.description}
                </p>
              </div>
              
              {/* Action Arrow */}
              {activity.actionUrl && (
                <div className="flex-shrink-0">
                  <svg 
                    className="w-4 h-4 text-gray-400 dark:text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
