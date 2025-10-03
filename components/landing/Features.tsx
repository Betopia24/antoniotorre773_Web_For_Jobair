import React from "react";
import Heading from "../shared/Heading";
import Image from "next/image";
import { features } from "@/lib/constants";

const Hero = () => {
  return (
    <div className="py-20 bg-section-dark">
      <div className="app-container flex flex-col items-center gap-12">
        {/* Heading */}
        <Heading
          heading="Practice Smarter, Not Harder"
          subheading="Four core learning pillars powered by advanced AI technology, designed specifically for dyslexia-friendly education"
          specialText="Not Harder"
          align="center"
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start gap-4 p-6 bg-gradient-to-br from-[#2B2E4E] to-[#12132F] rounded-2xl shadow-lg hover:shadow-2xl transition"
            >
              {/* Icon - rounded square */}
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-[#4C4F69]">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                {feature.title}
              </h3>

              {/* Paragraph */}
              <p className="text-gray-300 text-sm sm:text-base">
                {feature.paragraph}
              </p>

              {/* Button */}
              <a
                href="#"
                className="mt-auto inline-block w-full text-center px-5 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 xl:px-10 xl:py-5 rounded-3xl bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to font-bold text-white text-sm sm:text-base md:text-lg xl:text-xl shadow-lg transition hover:opacity-90"
              >
                Start {feature.title.split(" ")[0]}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
