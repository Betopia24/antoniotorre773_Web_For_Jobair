'use client'

import { ChevronRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

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

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/signin"
              className="text-gray-300 text-base md:text-lg font-semibold hover:text-white"
            >
              Login
            </Link>
            <Link
              href="/somewhere"
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

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-auto">
            <Link
              href="/signin"
              className="text-gray-300 text-lg font-semibold hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/somewhere"
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
