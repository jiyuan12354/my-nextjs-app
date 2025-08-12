import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../components/auth/AuthProvider';

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        console.log('✅ User authenticated, redirecting to dashboard');
        router.replace('/dashboard');
      } else {
        console.log('🔒 User not authenticated, redirecting to login');
        router.replace('/auth/login');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while determining redirect
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
