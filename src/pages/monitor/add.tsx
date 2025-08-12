import React from 'react';
import Link from 'next/link';
import { AddProductForm } from '../../components/monitor/AddProductForm';

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link href="/dashboard" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">Add Product to Monitor</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Add Product to Monitor
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Start monitoring a product for price changes and availability updates.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
          <div className="px-6 py-8">
            <AddProductForm />
          </div>
        </div>
      </div>
    </div>
  );
}
