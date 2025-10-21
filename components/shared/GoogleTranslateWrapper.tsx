"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslateWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const userLang = localStorage.getItem("preferredLang") || "en";

    // Function to completely hide Google Translate elements
    const hideGoogleElements = () => {
      // Add CSS to hide everything
      const style = document.createElement('style');
      style.innerHTML = `
        .goog-te-banner-frame, 
        .goog-te-menu-frame, 
        .goog-te-ftab-frame, 
        .goog-te-gadget, 
        .goog-te-combo, 
        .skiptranslate, 
        .goog-te-spinner-pos,
        .goog-text-highlight {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
          position: absolute !important;
          left: -9999px !important;
        }
        body {
          top: 0 !important;
        }
        .goog-tooltip {
          display: none !important;
        }
      `;
      document.head.appendChild(style);

      // Also hide elements dynamically
      const hideElements = () => {
        const elementsToHide = [
          '.goog-te-banner-frame',
          '.goog-te-menu-frame', 
          '.goog-te-gadget',
          '.skiptranslate',
          '.goog-te-combo'
        ];
        
        elementsToHide.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            (el as HTMLElement).style.display = 'none';
          });
        });
        
        document.body.style.top = '0px';
      };

      // Keep hiding elements periodically
      hideElements();
      setInterval(hideElements, 1000);
    };

    // Load Google Translate script if not already loaded
    if (!document.getElementById("google_translate_script")) {
      const script = document.createElement("script");
      script.id = "google_translate_script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr,es,hi,bn,zh-CN,ko,ru,vi,it,de",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Hide Google elements after initialization
      setTimeout(hideGoogleElements, 100);
    };

    // Apply stored language preference
    if (userLang && userLang !== 'en') {
      const applyLanguage = () => {
        const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
        if (select && userLang) {
          if (select.value !== userLang) {
            select.value = userLang;
            select.dispatchEvent(new Event("change"));
          }
          return true;
        }
        return false;
      };

      // Try to apply language every 500ms for 5 seconds
      const startTime = Date.now();
      const interval = setInterval(() => {
        if (applyLanguage() || Date.now() - startTime > 5000) {
          clearInterval(interval);
        }
      }, 500);

      return () => clearInterval(interval);
    }

    // Hide elements initially
    hideGoogleElements();

  }, []);

  return (
    <>
      <div id="google_translate_element" className="hidden" />
      {children}
    </>
  );
}