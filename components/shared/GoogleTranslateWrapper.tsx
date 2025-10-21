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

    // Avoid loading multiple scripts
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
          includedLanguages: "en,fr,es,de,it,hi,zh-CN,ja,ar",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Try to apply stored language
    const interval = setInterval(() => {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (select && userLang) {
        if (select.value !== userLang && Array.from(select.options).some(o => o.value === userLang)) {
          select.value = userLang;
          select.dispatchEvent(new Event("change"));
        }
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id="google_translate_element" className="hidden" />
      {children}
    </>
  );
}
