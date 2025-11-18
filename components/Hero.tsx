'use client'

import HeroLogo from './HeroLogo'
import HeroCarousel from './HeroCarousel'
import Link from 'next/link'
import OpeningStatus from './OpeningStatus'

export default function Hero() {
  return (
    <section className="relative w-full flex justify-center  overflow-visible bg-gray-300 pb-20">
      <HeroCarousel />

      <div className="text-center px-4 max-w-3xl z-20 font-montserrat">
        <div className="hover:scale-105">
          <HeroLogo />
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          {/* Mensagem de abertura */}
          <p className="tracking-widest text-xl font-light italic max-w-xl mt-4">
            Desde 1996 a oferecer o autêntico sabor das pizzas italianas em
            Santa Cruz
          </p>

          <div className="flex flex-col justify-center gap-4 mt-4">
            <Link
              href="#pizzas"
              className="tracking-widest md:text-xl text-base font-light w-auto border rounded-xl mx-auto hover:scale-105 px-4 py-1 bg-emerald-600/40 shadow-xl"
            >
              Menu
            </Link>
            {/* Status de abertura */}
            <OpeningStatus className="mb-2" />
          </div>
        </div>
      </div>
    </section>
  )
}
