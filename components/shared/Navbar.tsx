'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
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

  return (
    <div className="fixed top-0 inset-x-0 z-50 backdrop-blur-md">
      {/* Thicker Navbar with responsive padding */}
      <div className="app-container flex items-center justify-between py-4 md:py-5 xl:py-4">
        
        {/* Branding */}
        <div className="text-center">
          <h1 className="inline-block text-3xl sm:text-4xl font-bold uppercase text-gradient tracking-tight">
            Manifex
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'text-base md:text-lg xl:text-xl font-semibold transition-colors hover:text-white',
                pathname === link.href ? 'text-gradient' : 'text-gray-300'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-10">
          <Link
            href="/signin"
            className="text-gray-300 text-base md:text-lg xl:text-xl font-semibold hover:text-white"
          >
            Login
          </Link>
        <Link
        href="/somewhere"
        className="relative inline-flex items-center gap-2 px-5 py-3 text-base md:text-lg xl:text-xl font-semibold text-white bg-transparent rounded-2xl"
        >
        <span className="z-10">Get Started</span>
        <ChevronRight className="w-5 h-5 z-10" />

        {/* Top-left triangle (lighter border) */}
        <div
            className="absolute inset-0 rounded-2xl pointer-events-none border-[2px]"
            style={{
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            borderColor: '#9CA3AF',
            }}
        />

        {/* Bottom-right triangle (darker border) */}
        <div
            className="absolute inset-0 rounded-2xl pointer-events-none border-[2px]"
            style={{
            clipPath: 'polygon(100% 100%, 0 100%, 100% 0)',
            borderColor: '#4B5563', // Tailwind gray-700
            }}
        />
        </Link>
    
        </div>
      </div>
    </div>
  )
}

export default Navbar
