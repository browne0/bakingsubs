'use client';

import Link from 'next/link';
import { useState } from 'react';

import Logo from '@/app/images/logo_horizontal.png';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src={Logo.src} alt="BakingSubs Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/learn"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Learn
          </Link>
          <Link
            href="/ingredients"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Ingredients
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-foreground transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`w-full h-0.5 bg-foreground transition-all ${isMenuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`w-full h-0.5 bg-foreground transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </div>
        </button>

        {/* Mobile Navigation Overlay */}
        <div
          className={`fixed inset-0 bg-background z-50 md:hidden transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-end">
              <button className="p-2" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col items-center gap-8 mt-8">
              <Link
                href="/"
                className="text-xl font-medium text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/ingredients"
                className="text-xl font-medium text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Ingredients
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
