"use client";

import React, { useState, useRef, useEffect } from "react";
import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import LearningProgress from "@/components/landing/LearningProgress";
import Pricing from "@/components/landing/Pricing";
import Review from "@/components/landing/Review";
import About from "@/components/landing/About";
import LanguagePopup from "@/components/shared/LanguagePopup";
import { Volume2, VolumeOff } from "lucide-react";

export default function Home() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showMusicPopup, setShowMusicPopup] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(true);
  const [showIntroVideo, setShowIntroVideo] = useState(true);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);

  // Check if user already has a language preference on component mount
  useEffect(() => {
    const preferredLang = localStorage.getItem("preferredLang");
    if (preferredLang) {
      setHasSelectedLanguage(true);
    }
  }, []);

  // Auto-play music when video modal closes
  const playMusic = () => {
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsMusicPlaying(true);
          console.log("Music auto-started");
        })
        .catch((error) => {
          console.log("Auto-play failed:", error);
          setShowMusicPopup(true);
        });
    }
  };

  // Stop music when video modal opens
  const stopMusic = () => {
    if (audioRef.current && isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
      console.log("Music stopped");
    }
  };

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
    setShowMusicPopup(false);
  };

  // Handle intro video end - Show language popup first
  const handleIntroVideoEnd = () => {
    console.log("Intro video ended");
    setShowIntroVideo(false);
    
    // Check if user has already selected a language
    const preferredLang = localStorage.getItem("preferredLang");
    if (preferredLang) {
      // User has already selected a language, proceed to video modal
      setHasSelectedLanguage(true);
      setIsVideoModalOpen(true);
    } else {
      // Show language selection popup first
      setShowLanguagePopup(true);
    }
  };

  // Handle intro video skip
  const handleSkipIntro = () => {
    if (introVideoRef.current) {
      introVideoRef.current.pause();
    }
    setShowIntroVideo(false);
    
    // Check if user has already selected a language
    const preferredLang = localStorage.getItem("preferredLang");
    if (preferredLang) {
      setHasSelectedLanguage(true);
      setIsVideoModalOpen(true);
    } else {
      setShowLanguagePopup(true);
    }
  };

  // SIMPLE AND RELIABLE LANGUAGE SELECTION HANDLER
  const handleLanguageSelect = (languageCode: string) => {
    console.log("Language selected:", languageCode);
    
    // Save the language preference
    localStorage.setItem("preferredLang", languageCode);
    
    // Set Google Translate cookies directly
    document.cookie = `googtrans=/en/${languageCode}; path=/; max-age=31536000`;
    document.cookie = `googtrans=/en/${languageCode}; path=/; domain=.${window.location.hostname}; max-age=31536000`;
    
    // Close the popup
    setShowLanguagePopup(false);
    setHasSelectedLanguage(true);
    
    // Reload the page - Google Translate will pick up the cookie and translate
    window.location.reload();
  };

  // Handle language popup close (if user closes without selecting)
  const handleLanguagePopupClose = () => {
    setShowLanguagePopup(false);
    // If no language was selected previously, default to English
    const preferredLang = localStorage.getItem("preferredLang");
    if (!preferredLang) {
      localStorage.setItem("preferredLang", "en");
      setHasSelectedLanguage(true);
    }
    setIsVideoModalOpen(true);
  };

  const handleVideoEnd = () => {
    console.log("Video ended, auto-playing music");
    setIsVideoModalOpen(false);
    playMusic();
  };

  const handleVideoModalOpen = () => {
    console.log("Video modal opened, stopping music");
    setIsVideoModalOpen(true);
    stopMusic();
    setShowMusicPopup(false);
  };

  const handleVideoModalClose = () => {
    console.log("Video modal closed, auto-playing music");
    setIsVideoModalOpen(false);
    playMusic();
  };

  // Disable scroll when intro video or language popup is showing
  useEffect(() => {
    if (showIntroVideo || showLanguagePopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showIntroVideo, showLanguagePopup]);

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} loop src="/bg-music-01.mp3" preload="auto" />

      {/* Full-screen Intro Video */}
      {showIntroVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black flex items-center justify-center cursor-pointer"
          onClick={handleSkipIntro}
        >
          <video
            ref={introVideoRef}
            autoPlay
            muted
            onEnded={handleIntroVideoEnd}
            className="w-full h-full object-cover"
          >
            <source src="/intro-01.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Skip button */}
          <button 
            className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-colors cursor-pointer"
            onClick={handleSkipIntro}
          >
            Skip
          </button>
        </div>
      )}

      {/* Language Selection Popup */}
      <LanguagePopup
        isOpen={showLanguagePopup}
        onClose={handleLanguagePopupClose}
        onLanguageSelect={handleLanguageSelect}
      />

      {/* Main Landing Page Content (hidden during intro video and language popup) */}
      {!showIntroVideo && !showLanguagePopup && (
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

          {/* Music toggle button with popup - Only visible when video modal is closed */}
          {!isVideoModalOpen && (
            <div className="fixed bottom-4 right-4 z-50">
              {showMusicPopup && (
                <div className="absolute bottom-16 right-0 mb-4 w-64 p-4 bg-gradient-to-br from-[#28284A] via-[#28284A] to-[#12122A] text-white rounded-lg shadow-xl border border-gray-500">
                  <div className="text-sm text-gray-100 mb-2 font-medium tracking-wide">
                    Enjoy background music while you explore?
                  </div>
                  <div className="absolute -bottom-10 right-8">
                    <svg
                      width="50"
                      height="40"
                      viewBox="0 0 50 40"
                      className="text-gray-400"
                    >
                      <path
                        d="M 0,0 Q 25,25 50,40"
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
        </div>
      )}
    </>
  );
}