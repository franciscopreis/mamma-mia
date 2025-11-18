'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Phone } from '@/components/ui/Icons'
import NavbarLinks from './NavbarLinks'
import MobileMenu from './MobileMenu'
import NavbarLogo from './NavbarLogo'
import LanguageSwitcher from '../LanguageSwitcher'
import { useDictionary } from '@/hooks/useDictionary'

export default function Navbar() {
  const params = useParams()
  const { dictionary } = useDictionary()

  // ✅ Obtém o idioma atual dos params
  const currentLang = params.lang as string

  if (!dictionary) return null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-emerald-600 shadow-md">
      <nav className="mx-auto flex items-center justify-between py-2 w-full max-w-7xl px-4 min-h-14">
        {/* Logo - SEMPRE à esquerda */}
        {/* ✅ CORREÇÃO: Usa o idioma atual no href */}
        <Link
          href={`/${currentLang}`}
          aria-label={dictionary.navigation.ariaLabels.homePage}
          className="flex flex-shrink-0 mx-2 md:mx-4"
        >
          <NavbarLogo />
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavbarLinks />
        </div>

        {/* Grupo DIREITA - Compacto no mobile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Switcher */}
          <div className="flex-shrink-0">
            <LanguageSwitcher currentLang={currentLang} />
          </div>

          {/* Telefone desktop - ícone + número */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <Link
              href="tel:+351261937695"
              className="flex items-center text-emerald-700 hover:text-red-700 transition-colors hover:scale-105"
              aria-label={dictionary.navigation.ariaLabels.callPhone}
            >
              <Phone className="text-xl sm:text-2xl" />
              <span className="ml-2 text-sm">+351 261 937 695</span>
            </Link>
          </div>

          {/* Telefone mobile - apenas ícone */}
          <div className="md:hidden flex-shrink-0">
            <Link
              href="tel:+351261937695"
              className="flex items-center text-emerald-700 hover:text-red-700 transition-colors hover:scale-105"
              aria-label={dictionary.navigation.ariaLabels.callPhone}
            >
              <Phone className="text-xl sm:text-2xl" />
            </Link>
          </div>

          {/* Hamburger mobile */}
          <div className="md:hidden flex-shrink-0">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  )
}
