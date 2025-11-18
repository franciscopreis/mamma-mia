'use client'

import HeroLogo from './HeroLogo'
import HeroCarousel from './HeroCarousel'
import Link from 'next/link'
import OpeningStatus from './OpeningStatus'
import { useDictionary } from '@/hooks/useDictionary'

export default function Hero() {
  const { dictionary, loading } = useDictionary()

  if (loading) {
    return (
      <section className="relative w-full flex justify-center overflow-visible bg-gray-300 pb-20">
        <div className="animate-pulse bg-gray-400 h-64 w-full"></div>
      </section>
    )
  }

  // ✅ VERIFICAÇÃO EXPLÍCITA
  if (!dictionary) {
    return (
      <section className="relative w-full flex justify-center overflow-visible bg-gray-300 pb-20">
        <div className="text-center">Erro ao carregar traduções</div>
      </section>
    )
  }

  return (
    <section className="relative w-full flex justify-center overflow-visible bg-gray-300 pb-20">
      <HeroCarousel />

      <div className="text-center px-4 max-w-3xl z-20 font-montserrat">
        <div className="hover:scale-105">
          <HeroLogo />
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          {/* ✅ AGORA DICTIONARY NUNCA É NULL */}
          <p className="tracking-widest text-xl font-light italic max-w-xl mt-4">
            {dictionary.hero.subtitle}
          </p>

          <div className="flex flex-col justify-center gap-4 mt-4">
            <Link
              href="#pizzas"
              className="tracking-widest md:text-xl text-base font-light w-auto border rounded-xl mx-auto hover:scale-105 px-4 py-1  shadow-xl"
            >
              {dictionary.hero.menuButton}
            </Link>

            <OpeningStatus className="mb-2" />
          </div>
        </div>
      </div>
    </section>
  )
}
