'use client'

import AutoCarousel from './AutoCarousel'
import CinematicImageReveal from './CinematicImageReveal'
import ContinuousCarousel from './ContinuousCarousel'
import ScrollParallax from './ScrollParallax'
import { useDictionary } from '@/hooks/useDictionary'

export default function Restaurant() {
  const { dictionary, loading } = useDictionary()

  if (loading) {
    return (
      <section className="py-15 px-5 md:px-10" id="restaurant">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-6 bg-gray-300 rounded"></div>
        </div>
      </section>
    )
  }

  if (!dictionary) {
    return (
      <section className="py-15 px-5 md:px-10" id="restaurant">
        <div className="max-w-4xl mx-auto text-center">
          <p>Erro ao carregar conteúdo</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-15 px-5 md:px-10" id="restaurant">
      {/* TITULOS PRINCIPAIS */}
      <div className="max-w-4xl mx-auto flex flex-col">
        <ScrollParallax startY={30} delay={100}>
          <h2 className="text-center text-3xl md:text-4xl tracking-wide italic font-serif text-red-800 leading-snug">
            {dictionary.restaurant.mainTitle}
          </h2>
        </ScrollParallax>

        {/* <ScrollParallax fromX={80} fromY={10}>
          <h3 className="text-center text-xl md:text-2xl font-serif text-emerald-700 tracking-wide leading-relaxed">
            {dictionary.restaurant?.subtitle}
          </h3>
        </ScrollParallax> */}
      </div>

      {/* CARROSSEL */}
      <div className="mt-5">
        <ContinuousCarousel />
      </div>

      {/* SUBTITULOS ADICIONAIS */}
      <div className="flex flex-col max-w-3xl mx-auto py-2 text-lg gap-3 text-justify">
        <p className="text-lg tracking-widest leading-loose font-semibold text-emerald-800">
          {dictionary.restaurant.catchphrase}
        </p>
        <p className="text-lg tracking-wide leading-relaxed">
          {dictionary.restaurant.description1}
        </p>
        <p className="text-lg tracking-wide leading-relaxed">
          {dictionary.restaurant.description2}
        </p>
      </div>
    </section>
  )
}
