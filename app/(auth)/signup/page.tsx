import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SignUp() {
  return (
    <div className="w-full min-h-screen bg-[#05061E] flex items-center justify-center px-4">
      <div className="w-full max-w-lg space-y-8">
        <div className='space-y-2'>
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center uppercase bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD] text-transparent bg-clip-text">
            Manifex
          </h1>

          {/* Subtitle */}
          <p className="text-center text-lg text-gray-300">
            Welcome to MANIFEX! Let’s start your language journey today.
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center rounded-full mb-10 bg-red-500">
          <Image
            src="/avatar.png"
            alt="Avatar"
            width={400}
            height={400}
            className="object-contain"
            priority
          />
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-200 mb-1.5">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2.5 rounded-xl bg-[#24253A] text-white focus:outline-none focus:ring-2 focus:ring-[#FFBC6F]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-200 mb-1.5">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2.5 rounded-xl bg-[#24253A] text-white focus:outline-none focus:ring-2 focus:ring-[#F176B7]"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-300">
            <label className="flex items-center space-x-2">
              <input type="radio" className="accent-[#3797CD]" />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-blue-300 underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD] text-white font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className='text-center text-sm text-gray-100'>New here? <Link href='/signup' className='text-blue-300 underline'>Create new account</Link> to get started</p>
      </div>
    </div>
  )
}
