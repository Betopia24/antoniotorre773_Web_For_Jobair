"use client";

import { Loader2 } from "lucide-react";
import React, { useState, useRef } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Zod schema for OTP validation
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits.")
    .regex(/^\d{6}$/, "OTP must contain only numbers."),
});

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]); // To manage focus programmatically
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Allow only one character at a time, and make sure it's a digit
    if (value.length <= 1 && /^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move focus to the next input if the current one is filled
      if (index < 5 && value) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle Backspace (when the user deletes a digit)
  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "") {
      // Focus the previous input if the current one is empty
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Handle form submission (OTP verification)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Combine OTP digits into a string
    const otpString = otp.join("");

    // Validate OTP with Zod
    const result = otpSchema.safeParse({ otp: otpString });

    if (!result.success) {
      // If validation fails, set error
      setError(result.error.format().otp?._errors[0] || "Invalid OTP.");
      return;
    }

    // Simulating OTP verification success
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true); // Set success to true when OTP is verified
    }, 2000); // Simulate delay in OTP verification (2 seconds)
  };

  const handleSignInRedirect = () => {
    router.push("/signin");
  };

  return (
    <div className="w-full min-h-screen bg-[#05061E] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {success ? (
          <div className="space-y-2 bg-gradient-to-br from-[#2A2B4C] to-[#272945] p-8 rounded-xl text-center">
            {/* Success message */}
            <Image
              src="/success-vector.png"
              alt="Success"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h2 className="text-white font-semibold text-xl">
              Password Reset Successful
            </h2>
            <p className="text-gray-300 text-sm mt-2">
              Your password has been updated. You can now sign in with your new
              password.
            </p>
            <div className="mt-8 w-full">
              <button
                onClick={handleSignInRedirect}
                className="w-full py-2 px-6 rounded-xl bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD] text-white font-semibold"
              >
                Sign In
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 bg-gradient-to-br from-[#2A2B4C] to-[#272945] p-8 rounded-xl">
            <div className="text-center">
              <h1 className="inline-block text-3xl sm:text-4xl font-bold uppercase bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD] text-transparent bg-clip-text">
                Manifex
              </h1>
              <h2 className="text-white font-semibold text-lg sm:text-xl mt-4">
                Verify OTP
              </h2>
              <p className="text-gray-300 text-sm mt-2">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-14">
              {/* OTP Input Fields */}
              <div className="flex justify-between gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el!)} // Set a ref for each input
                    id={`otp-input-${index}`} // Set an id to focus the next input
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)} // Handle backspace for removing
                    className="w-12 h-12 text-center bg-[#333450] text-white rounded-xl border border-gray-500 focus:outline-none"
                    placeholder="-"
                  />
                ))}
              </div>

              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

              <div className="flex items-center justify-center mt-6">
                <h1>
                  Didn't receive the code?{" "}
                  <button
                    onClick={() => console.log("Write a dummy function")}
                    className="text-gradient font-semibold"
                  >
                    Resend
                  </button>
                </h1>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD] text-white font-semibold hover:opacity-90 transition flex justify-center items-center mt-6"
              >
                {loading ? (
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                ) : null}
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
