"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export function RouteTracker() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Don't track auth pages or if user is not authenticated
    const isAuthPage = ['/signin', '/signup', '/otp', '/forgot-password'].includes(pathname);
    
    if (isAuthenticated && !isAuthPage) {
      // Store the current route as the last visited route
      sessionStorage.setItem('lastRoute', pathname);
      console.log('Route tracked:', pathname);
    }
  }, [pathname, isAuthenticated]);

  return null;
}