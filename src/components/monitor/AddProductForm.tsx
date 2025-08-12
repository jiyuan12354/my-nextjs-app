'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';

export const AddProductForm: React.FC = () => {
  const [inputMethod, setInputMethod] = useState<'url' | 'manual'>('url');
  const [productUrl, setProductUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [retailer, setRetailer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Log successful submission
    const submissionLog = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      service: 'my-nextjs-app',
      correlationId: `add-product-${Date.now()}`,
      message: 'Product successfully added to monitoring',
      context: {
        inputMethod,
        productName: inputMethod === 'url' ? 'Sample Product from URL' : productName,
        retailer: inputMethod === 'url' ? 'Amazon' : retailer,
      },
    };
    
    console.log(JSON.stringify(submissionLog));
    
    // Navigate back to dashboard
    router.push('/dashboard?added=success');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Input Method Selection */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          How would you like to add this product?
        </h2>
        
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setInputMethod('url')}
            className={`flex-1 p-4 rounded-lg border-2 text-left transition-colors ${
              inputMethod === 'url'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🔗</div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Product URL
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Paste a product link from a supported store
                </p>
              </div>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => setInputMethod('manual')}
            className={`flex-1 p-4 rounded-lg border-2 text-left transition-colors ${
              inputMethod === 'manual'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">✏️</div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Manual Entry
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter product details manually
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Input Fields */}
      {inputMethod === 'url' ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="productUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Product URL *
            </label>
            <input
              type="url"
              id="productUrl"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              placeholder="https://www.amazon.com/product-name/dp/..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              required
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Supported Platforms:
            </h4>
            <div className="flex flex-wrap gap-2">
              {['📦 Amazon', '🛒 Best Buy', '🎯 Target', '🏪 Walmart'].map((platform) => (
                <span key={platform} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter the product name"
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Price *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="currentPrice"
                  value={currentPrice || ''}
                  onChange={(e) => setCurrentPrice(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="block w-full pl-7 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="retailer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Retailer *
              </label>
              <select
                id="retailer"
                value={retailer}
                onChange={(e) => setRetailer(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                required
              >
                <option value="">Select retailer</option>
                <option value="Amazon">Amazon</option>
                <option value="Best Buy">Best Buy</option>
                <option value="Target">Target</option>
                <option value="Walmart">Walmart</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Basic Alert Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Alert Settings
        </h3>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enableAlerts"
              defaultChecked
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
            />
            <label htmlFor="enableAlerts" className="text-sm font-medium text-blue-800 dark:text-blue-200">
              📧 Enable browser notifications for price drops
            </label>
          </div>
          <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
            Get notified when this product's price drops by 10% or more.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adding Product...</span>
            </div>
          ) : (
            'Add to Monitoring'
          )}
        </button>
      </div>
    </form>
  );
};
