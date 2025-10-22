import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  preferredLang: string;
  setLanguage: (languageCode: string) => void;
  getCurrentLanguageName: () => string;
}

export const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "zh-CN", name: "Chinese", nativeName: "中文" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
];

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      preferredLang: "en",
      
      setLanguage: (languageCode: string) => {
        set({ preferredLang: languageCode });
        
        // Set Google Translate cookies
        if (typeof window !== 'undefined') {
          document.cookie = `googtrans=/en/${languageCode}; path=/; max-age=31536000`;
          document.cookie = `googtrans=/en/${languageCode}; path=/; domain=.${window.location.hostname}; max-age=31536000`;
          
          // Reload the page for Google Translate to pick up the change
          window.location.reload();
        }
      },
      
      getCurrentLanguageName: () => {
        const state = get();
        const language = languages.find((lang) => lang.code === state.preferredLang);
        return language?.name || "English";
      }
    }),
    {
      name: 'language-storage',
    }
  )
);