// hooks/useSubscription.ts
import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { subscriptionApi } from '@/lib/api';
import toast from 'react-hot-toast';

export const useSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useAuthStore();

  // Add this new function to check existing subscription
  const checkExistingSubscription = async () => {
    try {
      const subscriptionData = await subscriptionApi.getMySubscription();
      return subscriptionData.data;
    } catch (error) {
      // No subscription found or other error
      return null;
    }
  };

  const createSubscription = async (planId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if user already has an active subscription
      const existingSub = await checkExistingSubscription();
      if (existingSub?.paymentStatus === "COMPLETED") {
        toast.error("You already have an active subscription! Please cancel your current subscription before purchasing a new one.");
        throw new Error("Active subscription exists");
      }
      
      const result = await subscriptionApi.createSubscription(planId);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create subscription';
      if (errorMessage !== "Active subscription exists") {
        toast.error(errorMessage);
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refreshUserSubscription = async () => {
    try {
      const subscriptionData = await subscriptionApi.getMySubscription();
      // Update user subscription status in store
      if (user) {
        setUser({
          ...user,
          isSubscribed: true,
          Subscription: subscriptionData.data
        });
      }
      toast.success("Subscription activated successfully!");
    } catch (error) {
      console.error('Failed to refresh subscription:', error);
    }
  };

  return {
    createSubscription,
    refreshUserSubscription,
    checkExistingSubscription,
    loading,
    error
  };
};