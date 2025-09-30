"use client"

import Link from "next/link"
import { Github, Twitter } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur-xl">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 group">
          <img
            src="/hedgecore-logo.svg"
            alt="HedgeCore"
            className="w-7 h-7 md:w-8 md:h-8 group-hover:opacity-80 transition-opacity duration-300"
          />
          <span className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
            HedgeCore
          </span>
          <span className="hidden sm:inline text-sm font-medium text-gray-400">
            Docs
          </span>
        </Link>

        {/* Desktop Right Side Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="https://hedgecore.io"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            Main Site
          </Link>
          <Link
            href="https://github.com/HedgeCore-Protocol"
            target="_blank"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="https://x.com/hedgecore_io"
            target="_blank"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <Twitter className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile - социальные сети */}
        <div className="flex md:hidden items-center gap-4">
          <Link
            href="https://github.com/HedgeCore-Protocol"
            target="_blank"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="https://x.com/hedgecore_io"
            target="_blank"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
