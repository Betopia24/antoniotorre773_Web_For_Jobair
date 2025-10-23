"use client";
import React, { useState, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { useAuthStore } from "@/stores/authStore";
import { usersApi } from "@/lib/api";
import toast from "react-hot-toast";

interface PersonalInfoProps {
  user: any;
  onUserUpdate: (updatedUser: any) => void;
}

export function PersonalInfo({ user, onUserUpdate }: PersonalInfoProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hobby, setHobby] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setHobby(user.hobbies || "");
    }
  }, [user]);

  // Function to handle profile update
  const handleUpdateProfile = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("First name and last name are required!");
      return;
    }

    setIsUpdatingProfile(true);

    try {
      const formData = new FormData();

      // Append all fields individually
      formData.append("firstName", firstName.trim());
      formData.append("lastName", lastName.trim());
      formData.append("hobbies", hobby.trim());

      const result = await usersApi.updateProfile(formData);

      // Update the user in the parent component
      if (user && result.data) {
        const updatedUser = {
          ...user,
          firstName: result.data.firstName || firstName.trim(),
          lastName: result.data.lastName || lastName.trim(),
          hobbies: result.data.hobbies || hobby.trim(),
          profilePic: result.data.profilePic || user.profilePic,
        };
        onUserUpdate(updatedUser);
      }

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Profile update error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#28284A] to-[#12122A] text-white p-6 rounded-2xl">
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
            <label htmlFor="hobby" className="text-sm text-gray-300">
              Hobbies
            </label>
            <input
              id="hobby"
              type="text"
              placeholder="Reading, Traveling, Gaming"
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
              className="p-2.5 text-sm border border-gray-600 bg-[#35364E] rounded-xl text-white"
            />
          </div>
          {/* Display current language as read-only */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">
              Language Preference (Current)
            </label>
            <input
              type="text"
              value={user.language || "English"}
              readOnly
              disabled
              className="p-2.5 text-sm border border-gray-600 bg-[#35364E] rounded-xl text-gray-400 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
