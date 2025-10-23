"use client";
import React, { useState } from "react";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SecuritySectionProps {
  user: any;
}

export function SecuritySection({ user }: SecuritySectionProps) {
  const router = useRouter();
  const { logout: storeLogout } = useAuthStore();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
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
        toast.success("Password changed successfully! Logging out...");
        setTimeout(() => {
          storeLogout();
          router.push("/signin");
        }, 1500);
      } else {
        toast.error(response.message || "Failed to change password");
      }
    } catch (error: any) {
      console.error("Password change error:", error);
      toast.error("An error occurred while changing password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#28284A] via-[#12122A] to-[#12122A] text-white p-6 rounded-2xl flex flex-col justify-between">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold">Security</h1>
        <p className="text-gray-300 mt-2">Change your password from here.</p>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="currentPassword" className="text-sm text-gray-300">
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
          <label htmlFor="confirmPassword" className="text-sm text-gray-300">
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
  );
}
