'use client'

import { useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '#restaurant', label: 'Pizzeria' },
  { href: '#pizzas', label: 'Menu' },
  { href: '#testimonials', label: 'Avaliações' },
  { href: '#contact', label: 'Contactos' },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-emerald-600 text-3xl cursor-pointer hover:scale-105 transition-transform items-center relative bottom-0.5"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        {isOpen ? 'x' : '☰'}
      </button>

      {/* Menu mobile */}
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white border border-emerald-200 rounded-lg shadow-md w-48 flex flex-col py-2 z-50">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)} // fecha menu ao clicar
              className="px-4 py-2 text-emerald-800 hover:bg-emerald-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
