import React from "react";
import Link from "next/link";
import { Home, Rocket } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-darker to-brand-darker text-white">
      {/* Main Content */}
      <div className="pt-32 sm:pt-36 pb-20 app-container flex flex-col items-center justify-center text-center">
        {/* 404 Number with Gradient */}
        <div className="relative mb-8">
          <h1 className="text-[120px] sm:text-[150px] md:text-[200px] font-bold bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to bg-clip-text text-transparent">
            404
          </h1>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gradient-from/20 via-gradient-via/20 to-gradient-to/20 blur-2xl rounded-full"></div>
        </div>

        {/* Message */}
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-2">
            It seems Mercury couldn't find the page you're looking for.
          </p>
          <p className="text-base text-gray-400">
            The page might have been moved, deleted, or you entered an incorrect
            URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/"
            className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to font-semibold text-white hover:opacity-90 transition-all duration-300 shadow-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>

          <Link
            href="/pricing"
            className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl border border-gray-500 text-white hover:bg-white/10 transition-all duration-300 font-semibold"
          >
            <Rocket className="w-5 h-5" />
            Start Learning
          </Link>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-brand-dark/50 to-transparent pointer-events-none"></div>
    </div>
  );
}
