"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface RegisterStepFiveProps {
  data: {
    selectedAvatarIndex: number;
    selectedAvatar: string;
  };
  updateData: (data: {
    selectedAvatarIndex: number;
    selectedAvatar: string;
  }) => void;
  prevStep: () => void;
  onSubmit: () => void;
}

const RegisterStepFive: React.FC<RegisterStepFiveProps> = ({
  data,
  updateData,
  prevStep,
  onSubmit,
}) => {
  // Only one avatar available
  const avatars: string[] = [
    "/avatar-01.png",
    // "/about-01.png", // Commented out unnecessary avatars
    // "/avatar.png",
    // "/avatar.png",
  ];

  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number>(
    data.selectedAvatarIndex
  );

  // Comment out navigation functions since we only have one avatar
  /*
  const goToNextAvatar = () => {
    const newIndex = (selectedAvatarIndex + 1) % avatars.length;
    setSelectedAvatarIndex(newIndex);
    updateData({
      selectedAvatarIndex: newIndex,
      selectedAvatar: avatars[newIndex],
    });
  };

  const goToPreviousAvatar = () => {
    const newIndex =
      (selectedAvatarIndex - 1 + avatars.length) % avatars.length;
    setSelectedAvatarIndex(newIndex);
    updateData({
      selectedAvatarIndex: newIndex,
      selectedAvatar: avatars[newIndex],
    });
  };
  */

  const handleSubmit = () => {
    // Final update before submission
    updateData({
      selectedAvatarIndex,
      selectedAvatar: avatars[selectedAvatarIndex],
    });
    onSubmit();
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

          <p className="text-center text-lg text-gray-300">
            Choose your avatar appearance. You can change it anytime.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          {/* Left Button - Commented out but keeping structure */}
          {/* <button
            onClick={goToPreviousAvatar}
            className="absolute left-0 p-2 border border-gray-600 bg-[#232438] bg-opacity-50 text-white rounded-xl hover:bg-opacity-70 transition z-10 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button> */}

          {/* Avatar Image - Updated to show full image without cropping */}
          <div className="w-[400px] h-[400px] relative flex items-center justify-center">
            <Image
              src={avatars[selectedAvatarIndex]}
              alt={`Avatar ${selectedAvatarIndex + 1}`}
              width={380}
              height={380}
              className="object-contain w-full h-full"
              priority
            />
          </div>

          {/* Right Button - Commented out but keeping structure */}
          {/* <button
            onClick={goToNextAvatar}
            className="absolute right-0 p-2 border border-gray-600 bg-[#232438] bg-opacity-50 text-white rounded-xl hover:bg-opacity-70 transition z-10 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button> */}
        </div>

        {/* Avatar Selection Indicator - Commented out since only one avatar */}
        {/* <div className="mt-4 flex justify-center gap-2">
          {avatars.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                selectedAvatarIndex === index ? "bg-gradient-brand" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div> */}

        <div className="flex gap-3">
          <button
            onClick={prevStep}
            className="w-1/3 py-2 rounded-xl bg-gray-600 text-white font-semibold hover:opacity-90 transition flex justify-center items-center cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD] text-white font-semibold hover:opacity-90 transition flex justify-center items-center cursor-pointer"
          >
            Create my profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterStepFive;