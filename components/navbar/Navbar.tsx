'use client'

import Link from 'next/link'
import { IoMdCall } from 'react-icons/io'
import NavbarLinks from './NavbarLinks'
import MobileMenu from './MobileMenu'
import NavbarLogo from './NavbarLogo'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-emerald-600 shadow-md">
      <nav className="mx-auto flex items-center justify-between py-2 w-full max-w-7xl px-4 min-h-14">
        {/* Logo sempre à esquerda */}
        <Link
          href="/"
          aria-label="Página inicial"
          className="flex mx-2 md:mx-4"
        >
          <NavbarLogo />
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavbarLinks />
        </div>

        {/* Telefone + Hamburger mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <Link
            href="tel:+351261937695"
            className="flex items-center text-emerald-700 hover:text-red-700 transition-colors hover:scale-105"
            aria-label="Ligar para +351 261 937 695"
          >
            <IoMdCall className="text-xl sm:text-2xl" />
          </Link>

          <MobileMenu />
        </div>

        {/* Telefone desktop */}
        <div className="hidden md:flex items-center">
          <Link
            href="tel:+351261937695"
            className="flex items-center text-emerald-700 hover:text-red-700 transition-colors hover:scale-105"
            aria-label="Ligar para +351 261 937 695"
          >
            <IoMdCall className="text-xl sm:text-2xl" />
            <span className="ml-2 text-sm lg:text-base">+351 261 937 695</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}
