'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Phone, Menu, Close } from '@/components/ui/Icons'
import { useDictionary } from '@/hooks/useDictionary'
import Logo from './Logo'
import LanguageSwitcher from '../LanguageSwitcher'
import SkeletonBlock from '../skeletons/SkeletonBlock'

const phoneNumber = '+351 261 937 695'

export default function Navbar() {
  const { dictionary } = useDictionary()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Mobile menu outside click / ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const links = dictionary
    ? [
        { href: '#restaurant', label: dictionary.navigation.pizzeria },
        { href: '#pizzas', label: dictionary.navigation.menu },
        { href: '#testimonials', label: dictionary.navigation.testimonials },
        { href: '#contact', label: dictionary.navigation.contacts },
      ]
    : []

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-emerald-600 shadow-md">
      <nav className="mx-auto flex items-center justify-between py-2 w-full max-w-7xl px-4 min-h-14">
        {/* Logo */}
        <Link
          href="/"
          aria-label={dictionary?.navigation.ariaLabels.homePage ?? 'Home'}
          className="flex flex-shrink-0 mx-2 md:mx-4"
        >
          {dictionary ? (
            <Logo />
          ) : (
            <SkeletonBlock height={40} width={120} className="rounded-lg" />
          )}
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex flex-1 justify-center gap-6 items-center text-emerald-800 text-sm">
          {dictionary
            ? links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.querySelector(l.href)
                    if (el) {
                      const top =
                        el.getBoundingClientRect().top + window.scrollY - 80
                      window.scrollTo({ top, behavior: 'smooth' })
                    }
                  }}
                  className="md:hover:scale-105 hover:text-red-700 transition-all"
                >
                  {l.label}
                </Link>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <SkeletonBlock
                  key={i}
                  height={20}
                  width={60}
                  className="rounded-md"
                />
              ))}
        </div>

        {/* Right group */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Telefone */}
          {dictionary && (
            <Link
              href={`tel:${phoneNumber}`}
              aria-label={dictionary.navigation.ariaLabels.callPhone}
              className="flex items-center text-emerald-700 hover:text-red-700 transition-colors hover:scale-105"
            >
              <Phone className="text-xl sm:text-2xl" />
              {/* Número visível apenas em md+ */}
              <span className="ml-2 text-sm hidden md:inline">
                {phoneNumber}
              </span>
            </Link>
          )}

          {/* Mobile hamburger */}
          <div className="md:hidden flex-shrink-0 relative">
            <button
              ref={buttonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-emerald-600 cursor-pointer flex items-center justify-center p-2"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <Close className="text-2xl" />
              ) : (
                <Menu className="text-2xl" />
              )}
            </button>

            {isMobileMenuOpen && dictionary && (
              <div
                ref={menuRef}
                className="fixed top-14 right-4 bg-white border border-emerald-200 rounded-lg shadow-xl w-48 flex flex-col py-2 z-[60]"
              >
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-emerald-800 hover:bg-emerald-50 border-b border-emerald-100 last:border-b-0 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
