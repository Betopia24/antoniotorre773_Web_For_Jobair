"use client";
import { Loader2, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

// Zod schema for password validation
const passwordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters long."),
  confirmPassword: z.string().min(6, "Please confirm your password."),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

interface ForgotPasswordStepThirdProps {
  data: {
    newPassword: string;
    confirmPassword: string;
  };
  userEmail: string;
  updateData: (data: any) => void;
  prevStep: () => void;
}

export default function ForgotPasswordStepThird({
  data,
  userEmail,
  updateData,
  prevStep,
}: ForgotPasswordStepThirdProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords using Zod
    const result = passwordSchema.safeParse(data);

    if (!result.success) {
      const errorMessages = result.error.format();
      setError(
        errorMessages.newPassword?._errors[0] ||
        errorMessages.confirmPassword?._errors[0] ||
        "Invalid input."
      );
      return;
    }

    setLoading(true);

    try {
      // Call reset password API
      const response = await authApi.resetPassword(
        userEmail,
        data.newPassword,
        data.confirmPassword
      );
      
      if (response.success) {
        console.log("Password reset successfully:", response.message);
        setSuccess(true);
        
        // Redirect to signin after 2 seconds
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else {
        setError(response.message || "Failed to reset password. Please try again.");
      }
    } catch (error: any) {
      console.error("Reset password error:", error);
      setError(
        error.response?.data?.message || 
        "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full min-h-screen bg-[#05061E] flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 bg-gradient-to-br from-[#2A2B4C] to-[#272945] p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white font-semibold text-xl">
              Password Reset Successful
            </h2>
            <p className="text-gray-300 text-sm mt-2">
              Your password has been updated successfully. Redirecting to sign in...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#05061E] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 bg-gradient-to-br from-[#2A2B4C] to-[#272945] p-8 rounded-xl">
          <div className="text-center">
            <h1 className="inline-block text-3xl sm:text-4xl font-bold uppercase bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD] text-transparent bg-clip-text">
              Manifex
            </h1>
            <h2 className="text-white font-semibold text-lg sm:text-xl mt-4">
              Reset Your Password
            </h2>
            <p className="text-gray-300 text-sm mt-2">
              Create a new password for your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-14 space-y-4">
            {/* New Password */}
            <div className="relative">
              <label htmlFor="newPassword" className="text-white mb-2 block">
                New Password
              </label>
              <div className="flex items-center border border-gray-500 rounded-xl bg-[#333450] p-2">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-full"
                  placeholder="Enter new password"
                  value={data.newPassword}
                  onChange={(e) => updateData({ newPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="text-gray-400 hover:text-gray-200 transition"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="text-white mb-2 block">
                Confirm Password
              </label>
              <div className="flex items-center border border-gray-500 rounded-xl bg-[#333450] p-2">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-full"
                  placeholder="Confirm new password"
                  value={data.confirmPassword}
                  onChange={(e) => updateData({ confirmPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-200 transition"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-gray-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD] text-white font-semibold hover:opacity-90 transition flex justify-center items-center disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                ) : null}
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}