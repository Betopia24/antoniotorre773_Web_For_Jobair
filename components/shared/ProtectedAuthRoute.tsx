"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Loader2 } from 'lucide-react';

export function ProtectedAuthRoute<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function AuthProtectedComponent(props: T) {
    const router = useRouter();
    const { isAuthenticated, accessToken, isLoading } = useAuthStore();
    const [isMounted, setIsMounted] = useState(false);
    const [hasChecked, setHasChecked] = useState(false);

    // Wait for component to mount (client-side only)
    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Only check authentication once on initial mount
    useEffect(() => {
      if (isMounted && !isLoading && !hasChecked) {
        if (isAuthenticated && accessToken) {
          console.log('User is authenticated, redirecting from auth page...');
          const lastRoute = sessionStorage.getItem('lastRoute') || '/profile';
          router.replace(lastRoute);
        }
        setHasChecked(true);
      }
    }, [isMounted, isAuthenticated, accessToken, isLoading, hasChecked, router]);

    // Show loading until we're sure about the auth state
    if (!isMounted || (isLoading && !hasChecked)) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-brand-dark to-brand-darker flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
        </div>
      );
    }

    // Render the signin form regardless (errors will now show properly)
    return <WrappedComponent {...props} />;
  };
}