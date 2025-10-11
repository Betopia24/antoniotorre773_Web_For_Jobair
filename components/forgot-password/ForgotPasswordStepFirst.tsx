"use client";
import { Loader2, Mail } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import { authApi } from "@/lib/api";

// Zod schema for email validation
const emailSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .nonempty("Email is required."),
});

interface ForgotPasswordStepFirstProps {
  data: {
    email: string;
  };
  updateData: (data: any) => void;
  nextStep: () => void;
}

export default function ForgotPasswordStepFirst({
  data,
  updateData,
  nextStep,
}: ForgotPasswordStepFirstProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate the email using Zod
    const result = emailSchema.safeParse({ email: data.email });
    
    if (!result.success) {
      setError(result.error.format().email?._errors[0] || "Invalid input.");
      return;
    }

    setLoading(true);

    try {
      // Call forgot password API
      const response = await authApi.forgotPassword(data.email);
      
      if (response.success) {
        console.log("OTP sent successfully:", response.message);
        nextStep(); // Move to OTP verification step
      } else {
        setError(response.message || "Failed to send OTP. Please try again.");
      }
    } catch (error: any) {
      console.error("Forgot password error:", error);
      setError(
        error.response?.data?.message || 
        "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#05061E] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 bg-gradient-to-br from-[#2A2B4C] to-[#272945] p-8 rounded-xl">
          <div className="text-center">
            <h1 className="inline-block text-3xl sm:text-4xl font-bold uppercase bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD] text-transparent bg-clip-text">
              Manifex
            </h1>
            <h2 className="text-white font-semibold text-lg sm:text-xl mt-4">
              Forgot Password?
            </h2>
            <p className="text-gray-300 text-sm mt-2">
              Enter your registered email.
            </p>
            <p className="text-gray-300 text-sm">
              We'll send you an OTP to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-14">
            <div className="mt-4">
              <label htmlFor="email" className="text-white mb-2 block">
                Email Address
              </label>
              <div className="flex items-center border border-gray-500 rounded-xl bg-[#333450] p-2">
                <Mail className="text-gray-400 mr-2 h-5 w-5" />
                <input
                  id="email"
                  type="email"
                  className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-full"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={(e) => updateData({ email: e.target.value })}
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD] text-white font-semibold hover:opacity-90 transition flex justify-center items-center mt-6"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
              ) : null}
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}