'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../auth/AuthProvider';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const router = useRouter();
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  // Check if PWA is installable
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkInstallable = () => {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isInWebAppiOS = (window.navigator as any).standalone === true;
        const isInstalled = isStandalone || isInWebAppiOS;
        
        setIsInstallable(!isInstalled);
      };

      checkInstallable();
      
      // Listen for beforeinstallprompt event
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setIsInstallable(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  // Mock notification count (in real app, this would come from state management)
  useEffect(() => {
    // Simulate notification updates
    const interval = setInterval(() => {
      const randomCount = Math.floor(Math.random() * 5);
      setNotificationCount(randomCount);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleInstallPWA = async () => {
    if (typeof window !== 'undefined' && deferredPrompt) {
      const { installPWA } = await import('../../lib/pwa-utils');
      const success = await installPWA(deferredPrompt);
      if (success) {
        setIsInstallable(false);
        setDeferredPrompt(null);
      }
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const navigation = [
    { name: 'Monitor', href: '/monitor', icon: '📊' },
    { name: 'Shopping Lists', href: '/lists', icon: '📝' },
    { name: 'Compare', href: '/compare', icon: '⚖️' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <span className="hidden sm:block font-semibold text-gray-900 text-lg">
                Shopping Monitor
              </span>
              <span className="sm:hidden font-semibold text-gray-900 text-lg">
                SM
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Authentication Actions */}
            {!isLoading && (
              <>
                {isAuthenticated && user ? (
                  /* Authenticated User Actions */
                  <div className="flex items-center space-x-2">
                    {/* Notifications */}
                    <button
                      onClick={() => handleNavClick('/notifications')}
                      className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Notifications"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5v-5.5a8.5 8.5 0 0 0-17 0v5.5L-.5 17h5m5 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
                      </svg>
                      {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                          {notificationCount > 9 ? '9+' : notificationCount}
                        </span>
                      )}
                    </button>

                    {/* User Menu */}
                    <div className="hidden sm:flex items-center space-x-3">
                      {user.avatar && (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div className="text-sm">
                        <p className="text-gray-900 font-medium">{user.name}</p>
                        <p className="text-gray-500 text-xs">{user.role}</p>
                      </div>
                      <button
                        onClick={logout}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                        title="Logout"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Unauthenticated User Actions */
                  <div className="hidden sm:flex items-center space-x-2">
                    <Link
                      href="/auth/login"
                      className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      className="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* Install PWA Button */}
            {isInstallable && (
              <button
                onClick={handleInstallPWA}
                className="hidden sm:flex items-center space-x-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                title="Install App"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8l-8-8-8 8" />
                </svg>
                <span>Install</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={handleMenuToggle}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
              
              {/* Mobile Authentication Actions */}
              {!isLoading && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  {isAuthenticated && user ? (
                    <>
                      {/* User Info */}
                      <div className="px-3 py-2 mb-2">
                        <div className="flex items-center space-x-3">
                          {user.avatar && (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Logout Button */}
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Sign In Button */}
                      <button
                        onClick={() => handleNavClick('/auth/login')}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign In</span>
                      </button>
                      
                      {/* Sign Up Button */}
                      <button
                        onClick={() => handleNavClick('/auth/register')}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        <span>Sign Up</span>
                      </button>
                    </>
                  )}
                </div>
              )}
              
              {/* Mobile Install Button */}
              {isInstallable && (
                <button
                  onClick={handleInstallPWA}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mt-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8l-8-8-8 8" />
                  </svg>
                  <span>Install App</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
