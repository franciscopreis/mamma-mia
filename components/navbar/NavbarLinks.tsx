import Link from 'next/link'

export default function NavbarLinks() {
  const links = [
    { href: '#restaurant', label: 'Pizzeria' },
    { href: '#pizzas', label: 'Menu' },
    { href: '#testimonials', label: 'Avaliações' },
    { href: '#contact', label: 'Contactos' },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.querySelector(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80 // offset para header fixo
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="hidden md:flex gap-6 items-center text-emerald-800 text-base">
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
