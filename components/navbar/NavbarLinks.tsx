'use client'

import Link from 'next/link'
import { useDictionary } from '@/hooks/useDictionary'

export default function NavbarLinks() {
  const { dictionary } = useDictionary()

  if (!dictionary) return null

  const links = [
    { href: '#restaurant', label: dictionary.navigation.pizzeria },
    { href: '#pizzas', label: dictionary.navigation.menu },
    { href: '#testimonials', label: dictionary.navigation.testimonials },
    { href: '#contact', label: dictionary.navigation.contacts },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.querySelector(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="hidden md:flex gap-6 items-center text-emerald-800 text-sm">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          onClick={(e) => handleScroll(e, l.href)}
          className="md:hover:scale-105 hover:text-red-700 transition-all"
        >
          {l.label}
        </Link>
      ))}
    </div>
  )
}
