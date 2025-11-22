'use client'

import ScrollParallax from './ScrollParallax'
import ContinuousCarousel from './ContinuousCarousel'
import { useDictionary } from '@/hooks/useDictionary'
import SkeletonSection from './skeletons/SkeletonSection'

export default function Restaurant() {
  const { dictionary } = useDictionary()

  // ✅ Usar SkeletonSection diretamente
  if (!dictionary) {
    return <SkeletonSection type="restaurant" />
  }

  const { restaurant } = dictionary

  return (
    <section id="restaurant" className="py-16 px-5 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* ✅ Título */}
        <div className="mb-12">
          <ScrollParallax startY={30} delay={100}>
            <h2 className="text-center text-3xl md:text-4xl tracking-wide italic font-serif text-red-800 leading-snug mb-6">
              {restaurant.mainTitle}
            </h2>
          </ScrollParallax>
        </div>

        {/* ✅ Carousel */}
        <div className="mb-16">
          <ContinuousCarousel />
        </div>

        {/* ✅ Texto */}
        <div className="space-y-8 max-w-3xl mx-auto">
          <div>
            <p className="text-lg md:text-xl tracking-widest leading-loose font-semibold text-emerald-800 mb-4">
              {restaurant.catchphrase}
            </p>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              {restaurant.description1}
            </p>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-gray-700">
              {restaurant.description2}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
