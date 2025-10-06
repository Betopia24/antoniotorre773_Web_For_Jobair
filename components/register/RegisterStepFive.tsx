"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const RegisterStepFive: React.FC = () => {
  // Array of avatars
  const avatars: string[] = [
    "/avatar.png",
    "/about-01.png",
    "/avatar.png",
    "/avatar.png",
  ];

  // State to manage the selected avatar
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number>(0);

  // Handle Avatar Navigation (Left/Right buttons)
  const goToNextAvatar = () => {
    setSelectedAvatarIndex((prevIndex) => (prevIndex + 1) % avatars.length);
  };

  const goToPreviousAvatar = () => {
    setSelectedAvatarIndex(
      (prevIndex) => (prevIndex - 1 + avatars.length) % avatars.length
    );
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
          {/* Left Button */}
          <button
            onClick={goToPreviousAvatar}
            className="absolute left-0 p-2 border border-gray-600 bg-[#232438] bg-opacity-50 text-white rounded-xl hover:bg-opacity-70 transition"
          >
            <ChevronLeft className="w-6 h-6"/>
          </button>

          {/* Avatar Image */}
          <div
            className="w-[350px] h-[350px] relative overflow-hidden rounded-lg"
          >
            <Image
              src={avatars[selectedAvatarIndex]}
              alt={`Avatar ${selectedAvatarIndex + 1}`}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>

          {/* Right Button */}
          <button
            onClick={goToNextAvatar}
            className="absolute right-0 p-2 border border-gray-600 bg-[#232438] bg-opacity-50 text-white rounded-xl hover:bg-opacity-70 transition"
          >
            <ChevronRight className="w-6 h-6"/>
          </button>
        </div>

        {/* Avatar Selection Indicator
        <div className="mt-4 flex justify-center gap-2">
          {avatars.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                selectedAvatarIndex === index ? 'bg-[#F176B7]' : 'bg-gray-400'
              }`}
            ></div>
          ))}
        </div> */}

        {/* Create Profile Button */}
        <button
          type="submit"
          className="w-full mt-10 py-2 rounded-xl bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD] text-white font-semibold hover:opacity-90 transition flex justify-center items-center"
        >
          Create my profile
        </button>
      </div>
    </div>
  );
};

export default RegisterStepFive;
