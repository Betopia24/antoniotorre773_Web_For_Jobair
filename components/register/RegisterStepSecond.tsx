"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";

// Zod schema for form validation
const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export default function RegisterStepSecond() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({ email: "", password: "" });
    setApiError("");
    setSuccessMessage("");

    const validationResult = signInSchema.safeParse(formData);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.format();
      setErrors({
        email: errorMessages.email?._errors[0] || "",
        password: errorMessages.password?._errors[0] || "",
      });
      return;
    }

    setLoading(true);

    try {
      console.log("Login Data: ", formData);
      // const response = await axios.post("/api/auth/signin", formData, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // setSuccessMessage("Successfully logged in!");
      // console.log("API Response:", response.data);
      // e.g. redirect: window.location.href = "/dashboard";
    } catch (error) {
      setApiError("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#05061E] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2">
          <div className="text-center">
            <h1 className="inline-block text-3xl sm:text-4xl md:text-5xl font-bold uppercase bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD] text-transparent bg-clip-text">
              Manifex
            </h1>
          </div>

          <p className="text-center text-lg text-gray-100">
            Welcome! Let's set up your profile to start learning
          </p>
        </div>

        {/* Image with Blur Background Effect */}
        <div className="flex justify-center mb-10 relative">
          {/* Background Blur */}
          <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-t from-[#05061E] via-[#2C3E50] to-transparent blur-sm opacity-40"></div>

          {/* Image */}
          <div className="relative w-[350px] h-[350px] rounded-full overflow-hidden">
            <Image
              src="/avatar.png"
              alt="Avatar"
              width={400}
              height={400}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

        {/* Form */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-200 mb-1.5"
              >
                First Name
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-500 bg-[#24253A] text-white focus:outline-none focus:ring-2 focus:ring-[#F176B7]"
                placeholder="John"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-200 mb-1.5"
              >
                Last Name
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-500 bg-[#24253A] text-white focus:outline-none focus:ring-2 focus:ring-[#F176B7]"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-200 mb-1.5"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-500 bg-[#24253A] text-white focus:outline-none focus:ring-2 focus:ring-[#F176B7]"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm text-gray-200 mb-1.5"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-500 bg-[#24253A] text-white focus:outline-none focus:ring-2 focus:ring-[#F176B7]"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-200 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm text-gray-200 mb-1.5"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-500 bg-[#24253A] text-white focus:outline-none focus:ring-2 focus:ring-[#F176B7]"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-200 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2 rounded-xl bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD] text-white font-semibold hover:opacity-90 transition flex justify-center items-center"
          >
            Next
          </button>
        </form>

        {apiError && (
          <p className="text-red-500 text-center mt-4">{apiError}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center mt-4">{successMessage}</p>
        )}

        <p className="text-center text-sm text-gray-100">
          Already a member?{" "}
          <Link
            href="/signup"
            className="text-blue-300 underline decoration-blue-300 underline-offset-4 px-1 tracking-tight"
          >
            Log in
          </Link>{" "}
          to your account
        </p>
      </div>
    </div>
  );
}
