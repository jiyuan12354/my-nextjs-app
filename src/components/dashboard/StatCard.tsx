// Individual statistic card component

import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  description?: string;
  isClickable?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  description,
  isClickable = false,
  onClick,
  className = '' 
}: StatCardProps) {
  const cardClasses = `
    bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 transition-all duration-150
    ${isClickable ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : ''}
    ${className}
  `;

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={cardClasses}
      onClick={handleClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex items-center">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <span className="text-xl" role="img" aria-label={title}>
              {icon}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="ml-4 w-0 flex-1">
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
            {title}
          </p>
          {description && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {description}
            </p>
          )}
        </div>
        
        {/* Clickable indicator */}
        {isClickable && (
          <div className="flex-shrink-0 ml-2">
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
  );
}
