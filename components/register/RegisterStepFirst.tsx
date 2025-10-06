"use client";
import Image from "next/image";
import React, { useState, ChangeEvent } from "react";

const RegisterStepFirst = () => {
  // Set the default language to "English"
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

  // Array of languages to populate the dropdown (you can add more languages)
  const languages: string[] = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
  ];

  // Handle language selection
  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedLanguage(e.target.value);
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
            Welcome to MANIFEX! Let’s start your language journey today.
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
            <h1 className="text-white text-xl font-semibold">Please select your language</h1>

            {/* Language Selector */}
            <div>
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="w-full bg-[#24263A] border border-gray-500 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F176B7] mt-2"
              >
                <option value="" disabled>
                  Select a language
                </option>
                {languages.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
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

export default RegisterStepFirst;
