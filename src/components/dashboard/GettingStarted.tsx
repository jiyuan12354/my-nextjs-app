// Getting started guide component for new users

import React, { useState } from 'react';

interface GettingStartedProps {
  onDismiss: () => void;
  className?: string;
}

interface GuideStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function GettingStarted({ onDismiss, className = '' }: GettingStartedProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps: GuideStep[] = [
    {
      id: 'add-product',
      title: 'Add your first product',
      description: 'Start by adding a product you want to monitor. Simply paste a product URL and we\'ll track its price for you.',
      icon: '📊',
      action: {
        label: 'Add Product',
        onClick: () => {
          console.log('→ Would navigate to add product page');
          // Future: router.push('/monitor/add');
        },
      },
    },
    {
      id: 'set-alerts',
      title: 'Set price alerts',
      description: 'Create alerts to get notified when prices drop below your target amount. Never miss a deal again!',
      icon: '🔔',
    },
    {
      id: 'organize-lists',
      title: 'Create shopping lists',
      description: 'Organize your monitored products into lists like "Electronics", "Home & Garden", or "Wishlist".',
      icon: '📝',
    },
    {
      id: 'save-money',
      title: 'Start saving money',
      description: 'Watch your savings grow as we help you find the best deals and lowest prices across multiple stores.',
      icon: '💰',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onDismiss();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className={className}>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg shadow-md p-6 border border-blue-200 dark:border-blue-800">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🚀</span>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Getting Started
            </h2>
          </div>
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Dismiss getting started guide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center space-x-2 mb-6">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`
                w-8 h-8 rounded-full text-xs font-medium transition-all duration-200
                ${index === currentStep
                  ? 'bg-blue-600 text-white'
                  : index < currentStep
                  ? 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200'
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Current Step Content */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <span className="text-3xl" role="img" aria-label={currentStepData.title}>
              {currentStepData.icon}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {currentStepData.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            {currentStepData.description}
          </p>
        </div>

        {/* Action Button */}
        {currentStepData.action && (
          <div className="text-center mb-6">
            <button
              onClick={currentStepData.action.onClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {currentStepData.action.label}
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`
              px-4 py-2 text-sm font-medium rounded-lg transition-colors
              ${currentStep === 0
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            Previous
          </button>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentStep + 1} of {steps.length}
          </span>

          <button
            onClick={handleNext}
            className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg transition-colors"
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
