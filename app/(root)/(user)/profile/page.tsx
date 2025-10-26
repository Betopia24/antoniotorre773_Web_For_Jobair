"use client";
import React, { useState, useEffect } from "react";
import { FaCheck, FaUserEdit } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { authApi, usersApi, plansApi } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import toast from "react-hot-toast";

interface Plan {
  id: string;
  planName: string;
  amount: number;
  PlanType: string;
  currency: string;
  interval: string;
  intervalCount: number;
  freeTrialDays: number | null;
  productId: string;
  priceId: string;
  active: boolean;
  description: string;
  maxMembers: number;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

function ProfilePage() {
  const router = useRouter();
  const { user, logout: storeLogout, setUser } = useAuthStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [language, setLanguage] = useState("");
  const [hobby, setHobby] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setHobby(user.hobbies || "");
      setLanguage(user.language || "English");
    }
  }, [user]);

  // Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await plansApi.getAllPlans();
        if (response.success) {
          setPlans(response.data);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast.error("Failed to load plans");
      } finally {
        setIsLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  // Function to handle profile update
  const handleUpdateProfile = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("First name and last name are required!");
      return;
    }

    setIsUpdatingProfile(true);

    try {
      const formData = new FormData();

      formData.append("firstName", firstName.trim());
      formData.append("lastName", lastName.trim());
      formData.append("hobbies", hobby.trim());
      formData.append("language", language.trim());

      const result = await usersApi.updateProfile(formData);

      // Update the user in the auth store
      if (user && result.data) {
        const updatedUser = {
          ...user,
          firstName: result.data.firstName || firstName.trim(),
          lastName: result.data.lastName || lastName.trim(),
          hobbies: result.data.hobbies || hobby.trim(),
          language: result.data.language || language.trim(),
          profilePic: result.data.profilePic || user.profilePic,
        };
        setUser(updatedUser);
      }

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Profile update error:", error);
      const errorMessage = error.response?.data?.message || "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!")
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await authApi.changePassword({
        currentPassword,
        newPassword,
        confirmPassword: newPassword,
      });

      if (response.success) {
        toast.success("Password changed successfully! Logging out...")
        setTimeout(() => {
          storeLogout();
          router.push("/signin");
        }, 1500);
      } else {
        toast.error(response.message || "Failed to change password")
      }
    } catch (error: any) {
      console.error("Password change error:", error);
      toast.error("An error occurred while changing password")
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = () => {
    storeLogout();
    console.log("Logout Successful.");
    router.push("/signin");
  };

  // Get user's current plan data
  const getUserCurrentPlan = () => {
    if (!user) return null;

    // If user has a subscription, find the corresponding plan
    if (user.Subscription && user.Subscription.plan) {
      return user.Subscription.plan;
    }

    // If no subscription but isSubscriptionFree is false, find Premium plan
    if (user.isSubscriptionFree === false) {
      return plans.find(plan => plan.planName === "Premium") || plans.find(plan => plan.planName === "Family");
    }

    // Free trial user - find Free Trial plan
    return plans.find(plan => plan.planName === "Free Trial");
  };

  // Determine user plan status
  const getUserPlanStatus = () => {
    const currentPlan = getUserCurrentPlan();
    return currentPlan?.planName || "Free Trial";
  };

  // Get plan data for display
  const getUserPlanData = () => {
    const currentPlan = getUserCurrentPlan();
    
    if (!currentPlan) {
      // Fallback data if no plan found
      return {
        title: "Free Trial",
        price: "$0",
        duration: "7-day trial",
        features: ["5 Lessons per day", "Basic progress tracking", "Limited reward content", "Mercury AI guidance"],
        buttonText: "Upgrade Plan",
        isPaid: false,
      };
    }

    return {
      title: currentPlan.planName,
      price: `$${currentPlan.amount}`,
      duration: currentPlan.interval === "month" ? "per month" : 
                currentPlan.interval === "week" ? "per week" : 
                currentPlan.interval === "year" ? "per year" : "lifetime",
      features: currentPlan.features || [],
      buttonText: user?.isSubscriptionFree === false ? "Current Plan" : "Upgrade Plan",
      isPaid: user?.isSubscriptionFree === false,
    };
  };

  const getSubscriptionDetails = () => {
    if (!user?.Subscription) return null;

    return {
      planName: user.Subscription.plan?.planName || "Premium",
      startDate: new Date(user.Subscription.startDate).toLocaleDateString(),
      endDate: new Date(user.Subscription.endDate).toLocaleDateString(),
      paymentStatus: user.Subscription.paymentStatus,
      amount: user.Subscription.amount,
      currency: user.Subscription.plan?.currency || "USD",
    };
  };

  const handleUpgradePlan = () => {
    router.push("/pricing");
  };

  const handleManageSubscription = () => {
    router.push("/pricing");
  };

  const userPlanData = getUserPlanData();
  const subscriptionDetails = getSubscriptionDetails();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-dark to-brand-darker flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="py-32 sm:pt-36 md:pt-40 min-h-screen bg-gradient-to-br from-brand-dark to-brand-darker">
      <div className="app-container flex flex-col items-center gap-8">
        <div className="w-full flex flex-col items-center justify-center">
          {/* Avatar */}
          <div className="relative w-36 h-36">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to p-1.5">
              <div className="bg-black rounded-full w-full h-full overflow-hidden">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 w-full flex gap-1 flex-col items-center justify-center">
            <h1 className="text-xl sm:text-2xl font-semibold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">{user.email}</p>
            <div className="bg-[#24243B] border border-gray-700 rounded-full flex items-center justify-center gap-2 px-6 py-2 mt-4 text-base sm:text-lg">
              <IoDiamond
                className={`w-6 h-5 ${
                  userPlanData.isPaid ? "text-yellow-400" : "text-gray-400"
                }`}
              />
              <span>{getUserPlanStatus()}</span>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="mt-8 w-full bg-gradient-to-br from-[#28284A] to-[#12122A] text-white p-6 rounded-2xl">
          <div className="flex justify-between">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Personal Information
            </h1>
            <button
              onClick={handleUpdateProfile}
              disabled={isUpdatingProfile}
              className="flex items-center justify-center gap-2 bg-gradient-brand text-xs sm:text-sm font-semibold tracking-wide py-2.5 px-4 rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaUserEdit className="w-5 h-5" />
              <span>{isUpdatingProfile ? "Saving..." : "Save Profile"}</span>
            </button>
          </div>

          {/* Info Holder */}
          <div className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="text-sm text-gray-300">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-2.5 text-sm border border-gray-600 bg-[#35364E] rounded-xl text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="text-sm text-gray-300">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="p-2.5 text-sm border border-gray-600 bg-[#35364E] rounded-xl text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="language" className="text-sm text-gray-300">
                  Language Preference
                </label>
                <input
                  id="language"
                  type="text"
                  placeholder="English"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="p-2.5 text-sm border border-gray-600 bg-[#35364E] rounded-xl text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="hobby" className="text-sm text-gray-300">
                  Hobby
                </label>
                <input
                  id="hobby"
                  type="text"
                  placeholder="Photography"
                  value={hobby}
                  onChange={(e) => setHobby(e.target.value)}
                  className="p-2.5 text-sm border border-gray-600 bg-[#35364E] rounded-xl text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Status + Security */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Subscription Status */}
          <div className="bg-gradient-to-br from-[#28284A] to-[#12122A] text-white p-6 rounded-2xl">
            <h1 className="text-xl mb-2 sm:text-2xl font-semibold">
              Subscription Status
            </h1>

            {isLoadingPlans ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
              </div>
            ) : userPlanData.isPaid ? (
              // PAID USER - Has active subscription
              <>
                <p className="text-lg sm:text-xl text-gradient inline-block font-semibold">
                  {userPlanData.title} Plan
                </p>
                
                {/* Subscription details for paid users */}
                {subscriptionDetails && (
                  <div className="mt-4 text-sm text-gray-300">
                    <p>Start Date: {subscriptionDetails.startDate}</p>
                    <p>End Date: {subscriptionDetails.endDate}</p>
                    <p>Status: <span className="text-green-400">{subscriptionDetails.paymentStatus}</span></p>
                  </div>
                )}
                
                <ul className="flex flex-col gap-3 mt-6">
                  {userPlanData.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-200"
                    >
                      <FaCheck className="text-green-500" /> {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 flex flex-col gap-3">
                  {/* Current Plan Button - Non clickable */}
                  <button
                    disabled
                    className="py-2.5 rounded-xl bg-gradient-brand flex items-center justify-center gap-2 font-semibold opacity-70 cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                  
                  {/* Manage Subscription - Still clickable */}
                  <button
                    onClick={handleManageSubscription}
                    className="py-2.5 rounded-xl border border-gray-600 bg-transparent text-gray-300 flex items-center justify-center gap-2 font-semibold hover:bg-gray-700 transition cursor-pointer"
                  >
                    Manage Subscription
                  </button>
                </div>
              </>
            ) : (
              // FREE TRIAL USER
              <>
                <p className="text-lg sm:text-xl text-gray-400 inline-block font-semibold">
                  {userPlanData.title}
                </p>
                <p className="text-gray-400 mt-2 text-sm">
                  {userPlanData.duration}
                </p>
                
                <ul className="flex flex-col gap-3 mt-6">
                  {userPlanData.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-200"
                    >
                      <FaCheck className="text-green-500" /> {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <button
                    onClick={handleUpgradePlan}
                    className="w-full py-2.5 rounded-xl bg-gradient-brand flex items-center justify-center gap-2 font-semibold hover:opacity-90 transition cursor-pointer"
                  >
                    Upgrade to Premium
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Security Section */}
          <div className="bg-gradient-to-br from-[#28284A] via-[#12122A] to-[#12122A] text-white p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold">Security</h1>
              <p className="text-gray-300 mt-2">
                Change your password from here.
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="currentPassword"
                  className="text-sm text-gray-300"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="p-2.5 text-sm border border-gray-600 bg-[#35364E] rounded-xl text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="newPassword" className="text-sm text-gray-300">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="p-2.5 text-sm border border-gray-600 bg-[#35364E] rounded-xl text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm text-gray-300"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="p-2.5 text-sm border border-gray-600 bg-[#35364E] rounded-xl text-gray-300"
                />
              </div>
              <button
                onClick={handleChangePassword}
                disabled={isChangingPassword}
                className="mt-4 py-2.5 w-full rounded-xl bg-gradient-brand flex items-center justify-center gap-2 font-semibold hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChangingPassword ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full px-6 py-3 sm:py-4 border border-red-500/20 bg-red-500/10 text-red-400 text-xl font-semibold rounded-2xl hover:bg-red-500/20 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProtectedRoute(ProfilePage);