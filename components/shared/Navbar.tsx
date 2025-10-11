'use client'

import { ChevronRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useAuthStore } from '@/stores/authStore'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/practice', label: 'Practice' },
  { href: '/progress', label: 'Progress' },
  { href: '/rewards', label: 'Rewards' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
]

const Navbar = () => {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, isAuthenticated } = useAuthStore()

  // Close sidebar on pressing ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <>
      {/* Desktop + Mobile Navbar */}
      <div className="fixed top-0 inset-x-0 z-50 backdrop-blur-md py-2">
        <div className="app-container flex items-center justify-between py-4 md:py-5 xl:py-4">
          {/* Branding */}
          <Link href="/" className="text-center">
            <h1 className="inline-block text-3xl sm:text-4xl font-bold uppercase text-gradient tracking-tight">
              Manifex
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-base md:text-lg font-semibold transition-colors hover:text-white',
                  pathname === link.href ? 'text-gradient' : 'text-gray-300'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons - Show avatar if logged in, otherwise show login buttons */}
          <div className="hidden md:flex items-center gap-10">
            {isAuthenticated && user ? (
              // User is logged in - Show avatar
              <Link href="/profile" className="flex items-center">
                <div className="relative w-12 h-12">
                  {/* Gradient border */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to p-0.5">
                    {/* Inner circle to hold the image */}
                    <div className="bg-black rounded-full w-full h-full overflow-hidden">
                      <img
                        src={user.profilePic || "/avatar.png"}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              // User is not logged in - Show login buttons
              <>
                <Link
                  href="/signin"
                  className="text-gray-300 text-base md:text-lg font-semibold hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="relative inline-flex items-center gap-2 px-5 py-3 text-base md:text-lg font-semibold text-white bg-transparent rounded-2xl"
                >
                  <span className="z-10">Get Started</span>
                  <ChevronRight className="w-5 h-5 z-10" />

                  {/* Top-left triangle */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none border-[2px]"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                      borderColor: '#9CA3AF',
                    }}
                  />

                  {/* Bottom-right triangle */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none border-[2px]"
                    style={{
                      clipPath: 'polygon(100% 100%, 0 100%, 100% 0)',
                      borderColor: '#4B5563',
                    }}
                  />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar Panel */}
      <div
        className={clsx(
          'fixed top-0 right-0 h-full z-50 w-4/5 max-w-xs bg-gradient-to-br from-brand-dark to-brand-darker transform transition-transform',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Top: Branding + Close */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold uppercase text-gradient tracking-tight">
              Manifex
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-2 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-lg font-semibold hover:text-white',
                  pathname === link.href ? 'text-gradient' : 'text-gray-300'
                )}
                onClick={() => setSidebarOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Buttons - Show avatar if logged in, otherwise show login buttons */}
          <div className="flex flex-col gap-4 mt-auto">
            {isAuthenticated && user ? (
              // User is logged in - Show avatar and profile link
              <Link
                href="/profile"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition"
                onClick={() => setSidebarOpen(false)}
              >
                <div className="relative w-10 h-10">
                  {/* Gradient border */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to p-0.5">
                    {/* Inner circle to hold the image */}
                    <div className="bg-black rounded-full w-full h-full overflow-hidden">
                      <img
                        src={user.profilePic || "/avatar.png"}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-sm">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-gray-300 text-xs">
                    View Profile
                  </span>
                </div>
              </Link>
            ) : (
              // User is not logged in - Show login buttons
              <>
                <Link
                  href="/signin"
                  className="text-gray-300 text-lg font-semibold hover:text-white text-center py-2"
                  onClick={() => setSidebarOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="relative inline-flex items-center justify-center gap-2 px-5 py-3 text-lg font-semibold text-white bg-transparent rounded-2xl"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="z-10">Get Started</span>
                  <ChevronRight className="w-5 h-5 z-10" />
                  {/* Top-left triangle */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none border-[2px]"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                      borderColor: '#9CA3AF',
                    }}
                  />
                  {/* Bottom-right triangle */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none border-[2px]"
                    style={{
                      clipPath: 'polygon(100% 100%, 0 100%, 100% 0)',
                      borderColor: '#4B5563',
                    }}
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar