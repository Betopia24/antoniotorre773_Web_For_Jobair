"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Loader2 } from "lucide-react";

export function ProtectedRoute<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function AuthenticatedComponent(props: T) {
    const router = useRouter();
    const { isAuthenticated, accessToken } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      const checkAuthentication = () => {
        if (!isAuthenticated || !accessToken) {
          console.log("Not authenticated, redirecting to login...");
          router.push("/signin");
          return;
        }
        setIsChecking(false);
      };

      checkAuthentication();
    }, [isAuthenticated, accessToken, router]);

    // Show loading spinner while checking authentication
    if (isChecking) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-brand-dark to-brand-darker flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
        </div>
      );
    }

    // If authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };
}
