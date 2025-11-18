'use client'

import { useState, useEffect, useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useDictionary } from '@/hooks/useDictionary'

function MobileMenuContent() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { dictionary, loading } = useDictionary()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
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
  }, [isOpen])

  // ✅ Loading state
  if (loading) {
    return (
      <div className="md:hidden">
        <button
          aria-label="Abrir menu"
          className="text-emerald-600 cursor-pointer flex items-center justify-center p-2"
        >
          <GiHamburgerMenu className="text-2xl" />
        </button>
      </div>
    )
  }

  // ✅ Verificação se dictionary existe
  if (!dictionary) {
    return (
      <div className="md:hidden">
        <button
          aria-label="Abrir menu"
          className="text-emerald-600 cursor-pointer flex items-center justify-center p-2"
        >
          <GiHamburgerMenu className="text-2xl" />
        </button>
      </div>
    )
  }

  // ✅ Links internacionalizados
  const links = [
    { href: '#restaurant', label: dictionary.navigation.pizzeria },
    { href: '#pizzas', label: dictionary.navigation.menu },
    { href: '#testimonials', label: dictionary.navigation.testimonials },
    { href: '#contact', label: dictionary.navigation.contacts },
  ]

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-emerald-600 cursor-pointer flex items-center justify-center p-2"
        // ✅ aria-label internacionalizado
        aria-label={
          isOpen
            ? dictionary.navigation.ariaLabels.closeMenu
            : dictionary.navigation.ariaLabels.openMenu
        }
      >
        {isOpen ? (
          <IoClose className="text-2xl" />
        ) : (
          <GiHamburgerMenu className="text-2xl" />
        )}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-14 right-4 bg-white border border-emerald-200 rounded-lg shadow-xl w-48 flex flex-col py-2 z-[60]"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-emerald-800 hover:bg-emerald-50 border-b border-emerald-100 last:border-b-0"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// Apenas o dynamic import já resolve o problema de hydration
export default dynamic(() => Promise.resolve(MobileMenuContent), {
  ssr: false,
})
