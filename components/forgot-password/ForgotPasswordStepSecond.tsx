"use client";
import { Loader2 } from "lucide-react";
import React, { useState, useRef } from "react";
import { z } from "zod";
import { authApi } from "@/lib/api";

// Zod schema for OTP validation
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits.")
    .regex(/^\d{6}$/, "OTP must contain only numbers."),
});

interface ForgotPasswordStepSecondProps {
  data: {
    otp: string[];
    verified: boolean;
  };
  userEmail: string;
  updateData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function ForgotPasswordStepSecond({
  data,
  userEmail,
  updateData,
  nextStep,
  prevStep,
}: ForgotPasswordStepSecondProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Allow only numbers
    if (/^\d?$/.test(value)) {
      const newOtp = [...data.otp];
      newOtp[index] = value;
      updateData({ otp: newOtp });

      // Move focus to next field only if a number was entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && data.otp[index] === "") {
      // Focus the previous input if the current one is empty
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Combine OTP digits into a string
    const otpString = data.otp.join("");

    // Validate OTP with Zod
    const result = otpSchema.safeParse({ otp: otpString });

    if (!result.success) {
      setError(result.error.format().otp?._errors[0] || "Invalid OTP.");
      return;
    }

    setLoading(true);

    try {
      // Call OTP verification API
      const response = await authApi.verifyResetPasswordOtp(userEmail, otpString);
      
      if (response.success) {
        console.log("OTP verified successfully:", response.message);
        updateData({ verified: true });
        nextStep(); // Move to reset password step
      } else {
        setError(response.message || "OTP verification failed. Please try again.");
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
      setError(
        error.response?.data?.message || 
        "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setLoading(true);

    try {
      // Resend OTP
      const response = await authApi.forgotPassword(userEmail);
      
      if (response.success) {
        console.log("OTP resent successfully");
        // Clear current OTP
        updateData({ otp: ["", "", "", "", "", ""] });
      } else {
        setError(response.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      setError(
        error.response?.data?.message || 
        "An error occurred while resending OTP."
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
              Verify OTP
            </h2>
            <p className="text-gray-300 text-sm mt-2">
              Enter the 6-digit code sent to {userEmail}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-14">
            {/* OTP Input Fields */}
            <div className="flex justify-between gap-4">
              {data.otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el!;
                  }}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  className="w-12 h-12 text-center bg-[#333450] text-white rounded-xl border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F176B7]"
                  required
                />
              ))}
            </div>

            {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}

            <div className="flex items-center justify-center mt-6">
              <h1 className="text-gray-300">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading}
                  className="text-gradient font-semibold hover:opacity-80 disabled:opacity-50"
                >
                  Resend
                </button>
              </h1>
            </div>

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
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}