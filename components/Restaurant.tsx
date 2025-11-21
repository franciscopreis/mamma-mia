'use client'

import ScrollParallax from './ScrollParallax'
import ContinuousCarousel from './ContinuousCarousel'
import { useDictionary } from '@/hooks/useDictionary'
import SkeletonSection from './skeletons/SkeletonSection'

export default function Restaurant() {
  const { dictionary } = useDictionary()

  if (!dictionary) return <SkeletonSection type="restaurant" />

  const { restaurant } = dictionary

  return (
    <section className="py-10 px-5 md:px-10" id="restaurant">
      <ScrollParallax startY={30} delay={100}>
        <h2 className="text-center text-3xl md:text-4xl tracking-wide italic font-serif text-red-800 leading-snug max-w-4xl mx-auto py-10">
          {restaurant.mainTitle}
        </h2>
      </ScrollParallax>

      <div className="mt-5 min-h-[160px] md:min-h-[180px]">
        <ContinuousCarousel />
      </div>

      <div className="flex flex-col max-w-3xl mx-auto py-2 text-lg gap-3 text-justify">
        <p className="text-lg tracking-widest leading-loose font-semibold text-emerald-800">
          {restaurant.catchphrase}
        </p>
        <p className="text-lg tracking-wide leading-relaxed">
          {restaurant.description1}
        </p>
        <p className="text-lg tracking-wide leading-relaxed">
          {restaurant.description2}
        </p>
      </div>
    </section>
  )
}
