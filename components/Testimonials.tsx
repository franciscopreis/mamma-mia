'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Tripadvisor,
  Facebook,
  GoogleMaps,
} from '@/components/ui/Icons'
import ScrollParallax from './ScrollParallax'
import { useDictionary } from '@/hooks/useDictionary'
import SkeletonBlock from './skeletons/SkeletonBlock'

const REVIEWS = [
  {
    text: 'Recomendo todo o serviço, desde o atendimento rápido até à simpatia da equipa, passando pela qualidade das pizzas.',
    author: '— Ariana Sofia',
    platform: 'Facebook',
  },
  {
    text: 'To start service is excellent. All the food we had was so tasty, salad, apps and house wine. Would highly recommend. Was in Portugal for 3 months must have ate here at least 5 times.',
    author: '— Sandra Rodrigues',
    platform: 'Trip Advisor',
  },
  {
    text: 'Wow! The food is Amazing!! Seafood is amazing! Steaks are amazing! All the traditional Portuguese dishes are phenomenal!',
    author: '— Will',
    platform: 'Google Maps',
  },
  {
    text: 'Love this place! Very nice staff! Food is fabulous, and price is excellent. Location is even better, with views of the ocean while you eat.',
    author: '— Jose Shing',
    platform: 'Facebook',
  },
  {
    text: 'Already eaten very well twice on our holiday. Once pizza and lasagne and once picanha and grilled squid. All super delicious!',
    author: '— Kevin',
    platform: 'Trip Advisor',
  },
  {
    text: 'Excelente pizzaria com muita escolha além dos pratos italianos. Muita variedade de carnes e excelentes preços. Recomendo',
    author: '— Miguel Peixoto',
    platform: 'Google Maps',
  },
]

export default function Testimonials() {
  const { dictionary } = useDictionary()
  const [index, setIndex] = useState(0)

  const { next, prev } = useMemo(
    () => ({
      next: () => setIndex((i) => (i + 1) % REVIEWS.length),
      prev: () => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length),
    }),
    []
  )

  useEffect(() => {
    if (!dictionary) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, dictionary])

  if (!dictionary) {
    return (
      <section
        className="relative py-1 w-full bg-emerald-100 min-h-[400px]"
        id="testimonials"
      >
        {/* ✅ Skeleton CORRETO para título */}
        <div className="h-[100px] flex items-center justify-center mb-8">
          <SkeletonBlock height={40} width={350} className="rounded mx-auto" />
        </div>

        {/* ✅ Skeleton CORRETO para conteúdo */}
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="max-w-xl mx-auto text-center w-full">
            <SkeletonBlock height={80} className="rounded-lg mb-4 w-full" />
            <SkeletonBlock
              height={24}
              width={200}
              className="rounded mx-auto"
            />
          </div>
        </div>

        {/* ✅ Skeleton CORRETO para bolinhas */}
        <div className="h-[50px] flex items-center justify-center">
          <div className="flex gap-3">
            {REVIEWS.map((_, i) => (
              <SkeletonBlock
                key={i}
                height={12}
                width={12}
                className="rounded-full"
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  const currentReview = REVIEWS[index]

  return (
    <section
      className="relative py-15 w-full bg-emerald-100 min-h-[400px]"
      id="testimonials"
    >
      {/* ✅ Título */}
      <div className="h-[100px] flex items-center justify-center mb-8">
        <ScrollParallax startY={30} delay={100}>
          <h2 className="text-center text-3xl md:text-4xl tracking-wide italic font-serif text-red-800 leading-snug">
            {dictionary.testimonials?.title}
          </h2>
        </ScrollParallax>
      </div>

      {/* ✅ Container de conteúdo */}
      <div className="min-h-[200px] flex flex-row lg:max-w-3xl mx-auto items-center">
        <button
          onClick={prev}
          aria-label={
            dictionary.testimonials?.ariaLabels?.previous || 'anterior'
          }
          className="px-4 py-2 h-8 rounded-lg hover:text-red-800 transition cursor-pointer hidden md:block"
        >
          <ChevronLeft />
        </button>

        {/* ✅ Review */}
        <div className="h-[150px] flex items-center justify-center text-sm max-w-xs lg:max-w-xl mx-auto w-full">
          <div className="text-center w-full">
            <p className="italic md:max-w-xl text-center lg:text-base text-sm mb-4">
              {currentReview.text}
            </p>
            <p className="font-semibold text-center">
              {currentReview.author}
              {getPlatformIcon(currentReview.platform)}
            </p>
          </div>
        </div>

        <button
          onClick={next}
          aria-label={dictionary.testimonials?.ariaLabels?.next || 'próximo'}
          className="px-4 py-2 rounded-lg hover:text-red-800 transition cursor-pointer hidden md:block"
        >
          <ChevronRight />
        </button>
      </div>

      {/* ✅ Dot indicators - AGORA DEVEM APARECER */}
      <div className="h-[50px] flex items-center justify-center">
        <div className="flex gap-3">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`${dictionary.testimonials?.ariaLabels?.viewReview || 'ver review'} ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                i === index
                  ? 'bg-emerald-600 scale-110'
                  : 'bg-emerald-200 hover:bg-emerald-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function getPlatformIcon(platform: string) {
  switch (platform) {
    case 'Trip Advisor':
      return (
        <Tripadvisor className="inline-block text-green-600 ml-2 bottom-0.5" />
      )
    case 'Facebook':
      return <Facebook className="inline-block text-blue-600 ml-2 bottom-0.5" />
    case 'Google Maps':
      return (
        <GoogleMaps className="inline-block text-red-600 ml-2 bottom-0.5" />
      )
    default:
      return null
  }
}
