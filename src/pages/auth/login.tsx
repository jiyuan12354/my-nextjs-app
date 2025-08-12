// Login page for Shopping Monitor

import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import LoginForm from '../../components/auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  const { redirect } = router.query;
  
  // Default redirect to dashboard, or use provided redirect URL
  const redirectTo = typeof redirect === 'string' ? redirect : '/dashboard';

  return (
    <>
      <Head>
        <title>Sign In - Shopping Monitor</title>
        <meta name="description" content="Sign in to your Shopping Monitor account to access personalized price monitoring and shopping lists." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Shopping Monitor
              </span>
            </Link>
          </div>
        </div>

        {/* Login Form */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
          <LoginForm redirectTo={redirectTo} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Shopping Monitor - Your personal price tracking assistant
          </p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="text-xs text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>
            <Link href="/support" className="text-xs text-blue-600 hover:text-blue-500">
              Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
