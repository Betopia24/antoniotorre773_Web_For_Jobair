"use client";
import Image from "next/image";
import React, { useState, ChangeEvent } from "react";

const RegisterStepThree: React.FC = () => {
  // Set the default age group to "18-24"
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("18-24");

  // Array of age groups to populate the dropdown
  const ageGroups: string[] = [
    "Under 18",
    "18-24",
    "25-34",
    "35-44",
    "45+",
  ];

  // Handle age group selection
  const handleAgeGroupChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedAgeGroup(e.target.value);
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
            Select your age group. This helps us tailor the learning experience.
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
            <h1 className="text-white text-xl font-semibold">Select your age group</h1>

            {/* Age Group Selector */}
            <div>
              <select
                value={selectedAgeGroup}
                onChange={handleAgeGroupChange}
                className="w-full bg-[#24263A] border border-gray-500 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F176B7] mt-2"
              >
                <option value="" disabled>
                  Select an age group
                </option>
                {ageGroups.map((ageGroup, index) => (
                  <option key={index} value={ageGroup}>
                    {ageGroup}
                  </option>
                ))}
              </select>
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

export default RegisterStepThree;
