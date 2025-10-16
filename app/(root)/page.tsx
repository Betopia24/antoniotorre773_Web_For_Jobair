"use client";

import React, { useState, useRef, useEffect } from "react";
import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import LearningProgress from "@/components/landing/LearningProgress";
import Pricing from "@/components/landing/Pricing";
import Review from "@/components/landing/Review";
import About from "@/components/landing/About";
import { Volume2, VolumeOff } from "lucide-react";

export default function Home() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [showMusicPopup, setShowMusicPopup] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasUserInteracted = useRef(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsMusicPlaying(true))
          .catch((error) => {
            console.log("Play failed:", error);
          });
      }
    }
    // Hide music popup when user interacts with volume button
    setShowMusicPopup(false);
  };

  const initializeAudio = () => {
    if (!audioRef.current || audioInitialized) return;

    console.log("Initializing audio...");
    audioRef.current.volume = 0.7;

    audioRef.current
      .play()
      .then(() => {
        console.log("Audio started successfully!");
        setIsMusicPlaying(true);
        setAudioInitialized(true);
      })
      .catch((error) => {
        console.log("Audio play failed:", error);
        setIsMusicPlaying(false);
        setAudioInitialized(true);
      });
  };

  const handleVideoEnd = () => {
    console.log("Video ended, showing music popup");
    setShowMusicPopup(true);
  };

  const handleUserInteraction = (event: React.MouseEvent | MouseEvent) => {
    if (!hasUserInteracted.current && showMusicPopup) {
      console.log("User interaction detected, initializing audio...");
      hasUserInteracted.current = true;
      initializeAudio();
    }
  };

  useEffect(() => {
    if (showMusicPopup && !audioInitialized) {
      console.log("Waiting for user interaction after video ends");

      const handleClick = (e: MouseEvent) => handleUserInteraction(e);
      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, [showMusicPopup, audioInitialized]);

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} loop src="/intro.mp3" preload="auto" />

      {/* Landing page content */}
      <div
        style={{ minHeight: "100vh", cursor: "default" }}
        onClick={handleUserInteraction}
        onMouseMove={handleUserInteraction}
      >
        <Hero onVideoEnd={handleVideoEnd} />
        <Features />
        <LearningProgress />
        <About />
        <Review />
        <Pricing />
        <FAQ />
      </div>

      {/* Music toggle button with popup - Always visible after video ends */}
      <div className="fixed bottom-4 right-4 z-50">
        {/* Music Popup */}
        {showMusicPopup && (
          <div className="absolute bottom-16 right-0 mb-4 w-64 p-4 bg-white rounded-lg shadow-xl border border-gray-200">
            <div className="text-sm text-gray-700 mb-2">
              Enjoy background music while you explore?
            </div>
            {/* Curved line pointing to volume button */}
            <div className="absolute bottom-0 right-4 transform translate-y-4">
              <svg
                width="40"
                height="30"
                viewBox="0 0 40 30"
                className="text-gray-400"
              >
                <path
                  d="M 0,0 Q 20,20 40,30"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        )}
        
        <button
          onClick={toggleMusic}
          className="bg-gradient-brand-btn text-white p-2 border rounded-full transition-colors shadow-lg cursor-pointer"
          title={isMusicPlaying ? "Mute music" : "Play music"}
        >
          {isMusicPlaying ? <Volume2 /> : <VolumeOff />}
        </button>
      </div>
    </>
  );
}