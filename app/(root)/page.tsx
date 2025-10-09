"use client";

import React, { useState } from "react";
import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import LearningProgress from "@/components/landing/LearningProgress";
import Pricing from "@/components/landing/Pricing";
import Image from "next/image";
import IntroVideo from "@/components/landing/IntroVideo";
import Review from "@/components/landing/Review";
import About from "@/components/landing/About";

export default function Home() {
  const [isVideoFinished, setIsVideoFinished] = useState(false);

  const handleVideoEnd = () => {
    setIsVideoFinished(true);
  };

  return (
    <>
      {!isVideoFinished && <IntroVideo onEnd={handleVideoEnd} />}
      {isVideoFinished && (
        <>
          <Hero />
          <Features />
          <LearningProgress />
          <About />
          <Review />
          <Pricing />
          <FAQ />
        </>
      )}
    </>
  );
}
