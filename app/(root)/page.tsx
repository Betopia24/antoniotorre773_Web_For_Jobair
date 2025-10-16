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
  const [showMusicPopup, setShowMusicPopup] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(true); // Track if video modal is open
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const handleVideoEnd = () => {
    console.log("Video ended, showing music popup");
    setIsVideoModalOpen(false);
    setShowMusicPopup(true);
  };

  const handleVideoModalOpen = () => {
    console.log("Video modal opened, stopping music");
    setIsVideoModalOpen(true);
    // Stop music immediately when video modal opens
    if (audioRef.current && isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    }
    // Hide music popup when video modal opens
    setShowMusicPopup(false);
  };

  const handleVideoModalClose = () => {
    console.log("Video modal closed");
    setIsVideoModalOpen(false);
    setShowMusicPopup(true);
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} loop src="/intro.mp3" preload="auto" />

      {/* Landing page content */}
      <div style={{ minHeight: "100vh", cursor: "default" }}>
        <Hero
          onVideoEnd={handleVideoEnd}
          onVideoModalOpen={handleVideoModalOpen}
          onVideoModalClose={handleVideoModalClose}
        />
        <Features />
        <LearningProgress />
        <About />
        <Review />
        <Pricing />
        <FAQ />
      </div>

      {/* Music toggle button with popup - Only visible when video modal is closed */}
      {!isVideoModalOpen && (
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
      )}
    </>
  );
}
