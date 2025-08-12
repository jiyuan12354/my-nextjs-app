// Quick actions section component

import React from 'react';
import { useRouter } from 'next/router';
import { QuickAction } from '../../types/dashboard';

interface QuickActionsProps {
  actions: QuickAction[];
  className?: string;
}

export default function QuickActions({ actions, className = '' }: QuickActionsProps) {
  const router = useRouter();
  
  const handleActionClick = (action: QuickAction) => {
    console.log(`🚀 Quick action clicked: ${action.title}`);
    
    if (action.isEnabled) {
      if (action.href.startsWith('/')) {
        // Internal navigation
        console.log(`→ Navigating to: ${action.href}`);
        router.push(action.href);
      } else {
        // External link
        window.open(action.href, '_blank', 'noopener noreferrer');
      }
    } else {
      console.log(`⚠️ Feature not yet available: ${action.title}`);
    }
  };

  return (
    <div className={className}>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action)}
            disabled={!action.isEnabled}
            className={`
              p-4 rounded-lg text-left transition-all duration-150
              ${action.isEnabled 
                ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg cursor-pointer' 
                : 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-60'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            `}
          >
            <div className="flex items-center space-x-3">
              {/* Icon */}
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${action.isEnabled 
                  ? 'bg-blue-100 dark:bg-blue-900' 
                  : 'bg-gray-200 dark:bg-gray-600'
                }
              `}>
                <span className="text-xl" role="img" aria-label={action.title}>
                  {action.icon}
                </span>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className={`
                  font-medium text-sm
                  ${action.isEnabled 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400'
                  }
                `}>
                  {action.title}
                  {!action.isEnabled && (
                    <span className="ml-1 text-xs text-gray-400">(Coming Soon)</span>
                  )}
                </h3>
                <p className={`
                  text-xs mt-1
                  ${action.isEnabled 
                    ? 'text-gray-500 dark:text-gray-400' 
                    : 'text-gray-400 dark:text-gray-500'
                  }
                `}>
                  {action.description}
                </p>
              </div>
              
              {/* Arrow for enabled actions */}
              {action.isEnabled && (
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
          </button>
        ))}
      </div>
    </div>
  );
}
