// Utility page to clear session for debugging

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ClearSessionPage() {
  const clearSession = () => {
    // Clear all localStorage data
    localStorage.clear();
    alert('Session cleared! You can now test fresh login.');
  };

  return (
    <>
      <Head>
        <title>Clear Session - Shopping Monitor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Debug: Clear Session
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
              This page helps clear stored authentication data for testing purposes.
            </p>

            <div className="space-y-4">
              <button
                onClick={clearSession}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Clear All Session Data
              </button>

              <div className="text-center">
                <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
                  Go to Login Page
                </Link>
              </div>

              <div className="text-center">
                <Link href="/dashboard" className="text-blue-600 hover:text-blue-500">
                  Try Dashboard (Protected)
                </Link>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Current localStorage:
              </h3>
              <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-auto">
                {typeof window !== 'undefined' ? 
                  Object.keys(localStorage).map(key => 
                    `${key}: ${localStorage.getItem(key)?.substring(0, 50)}...`
                  ).join('\n') || 'No data' 
                  : 'Server side rendering'
                }
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
