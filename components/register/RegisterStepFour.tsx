"use client";
import Image from "next/image";
import React, { useState } from "react";

const RegisterStepFour: React.FC = () => {
  // Set the default hobbies selection as an empty array
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  // Array of hobbies to populate the buttons
  const hobbies: string[] = [
    "Reading",
    "Traveling",
    "Gaming",
    "Cooking",
    "Sports",
    "Music",
    "Technology",
    "Photography",
    "Fitness",
  ];

  // Handle hobby selection (toggle button selection)
  const handleHobbySelect = (hobby: string): void => {
    setSelectedHobbies(
      (prevHobbies) =>
        prevHobbies.includes(hobby)
          ? prevHobbies.filter((item) => item !== hobby) // Unselect hobby if already selected
          : [...prevHobbies, hobby] // Select hobby
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
            Select your hobbies and interests to personalize your reward videos.
          </p>
        </div>

        <div>
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

          <div className="w-full flex items-center justify-center flex-col gap-2">
            <h1 className="text-white text-xl mb-2 font-semibold">Select Hobbies & Interests</h1>

            {/* Word Selection */}
            <div className="flex flex-wrap gap-2">
              {hobbies.map((hobby, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 rounded-lg text-sm
                    border-gray-500 font-semibold cursor-pointer 
                    transition duration-300 ease-in-out
                    ${
                      selectedHobbies.includes(hobby)
                        ? "bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD]" // Selected hobby gradient
                        : "bg-[#2D2F4A] hover:bg-gradient-to-r hover:from-[#FFBC6F] hover:via-[#F176B7] hover:to-[#3797CD]" // Default non-selected hover
                    }`}
                  onClick={() => handleHobbySelect(hobby)}
                >
                  {hobby}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-10 py-2 rounded-xl bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD] text-white font-semibold hover:opacity-90 transition flex justify-center items-center"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RegisterStepFour;
