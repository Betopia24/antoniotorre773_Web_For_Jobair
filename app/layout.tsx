import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAINFEX - AI-Powered English Learning Platform",
  description:
    "MAINFEX is a personalized, AI-powered language learning platform that helps users improve their English skills through guided, fun, and rewarding practice.",
  keywords:
    "AI language learning, English tutor, dyslexia support, interactive reading, phoneme recognition, pronunciation coaching, learn English with AI, progress tracking, personalized English tutor",
  openGraph: {
    title: "MAINFEX - AI-Powered English Learning Platform",
    description:
      "Learn English in a personalized and fun way with MAINFEX. AI-based lessons and activities tailored to your learning needs.",
    url: "https://mainfex.com",
    siteName: "MAINFEX",
    images: [
      {
        url: "https://mainfex.com/avatar.png",
        width: 1200,
        height: 630,
        alt: "MAINFEX Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mainfex",
    title: "MAINFEX - Learn English with AI",
    description:
      "MAINFEX is an AI-powered language learning platform that helps learners improve English skills with personalized lessons and interactive rewards.",
    images: [
      {
        url: "https://mainfex.com/avatar.png",
        width: 1200,
        height: 630,
        alt: "MAINFEX Logo",
      },
    ],
  },
};

// Move viewport to the special generateViewport export
export const generateViewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
