import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { AuthProvider } from "../components/auth/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Register Service Worker on app startup
    const registerSW = async () => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        try {
          const { registerServiceWorker } = await import('../lib/pwa-utils');
          const registration = await registerServiceWorker();
          
          if (registration) {
            console.log('✅ Service Worker registered successfully');
            
            // Listen for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New content is available, notify user
                    console.log('🔄 New content available, please refresh');
                    // You could show a toast notification here
                  }
                });
              }
            });
          }
        } catch (error) {
          console.error('❌ Service Worker registration failed:', error);
        }
      }
    };

    registerSW();
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
