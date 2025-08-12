// Welcome section component for dashboard

import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import { getTimeBasedGreeting } from '../../lib/dashboard/mock-data';

interface WelcomeSectionProps {
  monitoredProducts?: number;
  className?: string;
}

export default function WelcomeSection({ 
  monitoredProducts = 0, 
  className = '' 
}: WelcomeSectionProps) {
  const { user } = useAuth();
  
  const greeting = getTimeBasedGreeting();
  const firstName = user?.name?.split(' ')[0] || 'there';
  
  const getStatusMessage = () => {
    if (monitoredProducts === 0) {
      return "Ready to start monitoring products?";
    } else if (monitoredProducts === 1) {
      return `You're monitoring 1 product`;
    } else {
      return `You're monitoring ${monitoredProducts} products`;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {greeting}, {firstName}! 👋
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300">
            {getStatusMessage()}
          </p>
        </div>
        
        {/* Welcome Icon */}
        <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full">
          <span className="text-2xl">🏠</span>
        </div>
      </div>
      
      {/* Additional info for empty state */}
      {monitoredProducts === 0 && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Tip:</strong> Start by adding products you're interested in to track their prices and get notified of deals!
          </p>
        </div>
      )}
    </div>
  );
}
