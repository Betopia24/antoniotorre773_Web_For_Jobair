"use client";
import React, { useState } from "react";
import { FaCheck, FaUserEdit } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";

// Mocked plan data
const myPlan = [
  {
    title: "Premium",
    price: "$19",
    duration: "per month",
    features: [
      "Unlimited lessons",
      "Advanced progress analytics",
      "Full reward library access",
      "Priority AI support",
      "Parent dashboard",
      "Offline mode",
    ],
    buttonText: "Start With Premium Plan",
    highlight: true,
  },
];

export default function Page() {
  // Local state for user info and password
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [language, setLanguage] = useState("");
  const [hobby, setHobby] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Function to simulate API call
  const handleSaveProfile = () => {
    // Simulating API call
    console.log("Saving Profile Data:");
    console.log({ firstName, lastName, language, hobby });
    // Call the API here later
  };

  const handleChangePassword = () => {
    // Simulating API call
    console.log("Changing Password:");
    console.log({ currentPassword, newPassword });
    // Call the API here later
  };

  const handleLogout = () => {
    console.log("Logout Successfull.");
  };

  return (
    <div className="py-32 sm:pt-36 md:pt-40 min-h-screen bg-gradient-to-br from-brand-dark to-brand-darker">
      <div className="app-container flex flex-col items-center gap-8">
        <div className="w-full flex flex-col items-center justify-center">
          {/* Avatar */}
          <div className="relative w-36 h-36">
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to p-1.5">
              {/* Inner circle to hold the image */}
              <div className="bg-black rounded-full w-full h-full overflow-hidden">
                <img
                  src="/avatar.png"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 w-full flex gap-1 flex-col items-center justify-center">
            <h1 className="text-xl sm:text-2xl font-semibold">Raju Ahamed</h1>
            <p className="text-gray-300 text-sm sm:text-base">
              samplemail@gmail.com
            </p>
            <div className="bg-[#24243B] border border-gray-700 rounded-full flex items-center justify-center gap-2 px-6 py-2 mt-4 text-base sm:text-lg">
              <IoDiamond className="w-6 h-5 text-yellow-400" />
              <span>Premium User</span>
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
              onClick={handleSaveProfile}
              className="flex items-center justify-center gap-2 bg-gradient-brand text-xs sm:text-sm font-semibold tracking-wide py-2.5 px-4 rounded-xl cursor-pointer"
            >
              <FaUserEdit className="w-5 h-5" />
              <span>Edit Profile</span>
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
                  className="p-3 border border-gray-600 bg-[#35364E] rounded-xl text-gray-300"
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
                  className="p-3 border border-gray-600 bg-[#35364E] rounded-xl text-gray-300"
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
                  className="p-3 border border-gray-600 bg-[#35364E] rounded-xl text-gray-300"
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
                  className="p-3 border border-gray-600 bg-[#35364E] rounded-xl text-gray-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Status + Security */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#28284A] to-[#12122A] text-white p-6 rounded-2xl">
            <h1 className="text-xl mb-2 sm:text-2xl font-semibold">
              Subscription Status
            </h1>
            <p className="text-lg sm:text-xl text-gradient inline-block font-semibold">
              {myPlan[0].title} User
            </p>
            <ul className="flex flex-col gap-3 mt-4">
              {myPlan[0].features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-200">
                  <FaCheck className="text-green-500" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <button className="py-2.5 rounded-xl bg-gradient-brand flex items-center justify-center gap-2 font-semibold hover:opacity-90 transition cursor-pointer">
                Upgrade to Family Plan
              </button>
              <button className="mt-2 relative py-2.5 rounded-xl bg-gradient-brand h-10 cursor-pointer">
                <div className="absolute inset-[1px] bg-[#0B0C23] rounded-xl p-2 flex justify-center items-center">
                  <h1 className="text-gradient font-semibold">Cancel Plan</h1>
                </div>
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#28284A] via-[#12122A] to-[#12122A] text-white p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold">Security</h1>
              <p className="text-gray-300 mt-2">Change your password from here.</p>
            </div>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
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
                  className="p-3 border border-gray-600 bg-[#35364E] rounded-xl text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="newPassword" className="text-sm text-gray-300">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="p-3 border border-gray-600 bg-[#35364E] rounded-xl text-gray-300"
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="mt-4 py-2.5 w-full rounded-xl bg-gradient-brand flex items-center justify-center gap-2 font-semibold hover:opacity-90 transition cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full px-6 py-3 sm:py-4 border border-red-500/20 bg-red-500/10 text-red-400 text-xl font-semibold rounded-2xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
