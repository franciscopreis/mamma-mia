'use client'

import { useState, useEffect, useCallback, useRef, ReactElement } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Tripadvisor,
  Facebook,
  GoogleMaps,
} from '@/components/ui/Icons'
import ScrollParallax from './ScrollParallax'
import { useDictionary } from '@/hooks/useDictionary'
import SkeletonSection from './skeletons/SkeletonSection'

const reviews = [
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

const platformIcons: Record<string, ReactElement> = {
  'Trip Advisor': (
    <Tripadvisor className="inline-block text-green-600 ml-2 bottom-0.5" />
  ),
  Facebook: <Facebook className="inline-block text-blue-600 ml-2 bottom-0.5" />,
  'Google Maps': (
    <GoogleMaps className="inline-block text-red-600 ml-2 bottom-0.5" />
  ),
}

export default function Testimonials() {
  const { dictionary } = useDictionary()
  const [index, setIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [ready, setReady] = useState(false)
  const touchAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (dictionary) setReady(true)
  }, [dictionary])

  // Navigation
  const next = useCallback(() => setIndex((i) => (i + 1) % reviews.length), [])
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + reviews.length) % reviews.length),
    []
  )
  const goToReview = useCallback((i: number) => setIndex(i), [])

  // Drag / swipe
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
  }
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) =>
    isDragging && setCurrentX(e.touches[0].clientX)
  const handleTouchEnd = () => {
    if (!isDragging) return
    const diff = startX - currentX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    setIsDragging(false)
    setStartX(0)
    setCurrentX(0)
  }
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
  }
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) =>
    isDragging && setCurrentX(e.clientX)
  const handleMouseUp = () => {
    if (!isDragging) return
    const diff = startX - currentX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    setIsDragging(false)
    setStartX(0)
    setCurrentX(0)
  }
  const getDragTransform = () => {
    if (!isDragging) return ''
    const diff = startX - currentX
    const boundedDiff = Math.max(Math.min(diff, 100), -100)
    return `translateX(${boundedDiff * 0.5}px)`
  }

  // Auto advance
  useEffect(() => {
    if (!ready) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, ready])

  if (!dictionary) return <SkeletonSection type="testimonials" />

  // Render
  return (
    <section className="relative py-15 w-full bg-emerald-100" id="testimonials">
      <ScrollParallax startY={30} delay={100}>
        <h2 className="text-center text-3xl md:text-4xl tracking-wide italic font-serif text-red-800 leading-snug mb-10">
          {dictionary.testimonials?.title}
        </h2>
      </ScrollParallax>

      <div className="flex flex-row lg:max-w-3xl mx-auto items-center">
        <button
          aria-label={dictionary.testimonials?.ariaLabels.previous}
          onClick={prev}
          className="px-4 py-2 h-8 rounded-lg hover:text-red-800 transition cursor-pointer hidden md:block"
        >
          <ChevronLeft />
        </button>

        <div
          ref={touchAreaRef}
          className="h-48 md:h-48 flex items-center justify-center text-sm max-w-xs lg:max-w-xl mx-auto touch-pan-y select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div
            className="transition-opacity duration-300 opacity-100"
            style={{
              transform: isDragging ? getDragTransform() : 'translateX(0)',
              willChange: 'transform, opacity',
            }}
          >
            <p className="italic md:max-w-xl text-center lg:text-base text-sm">
              {reviews[index].text}
            </p>
            <p className="mt-4 font-semibold text-center">
              {reviews[index].author}
              {platformIcons[reviews[index].platform]}
            </p>
          </div>
        </div>

        <button
          aria-label={dictionary.testimonials?.ariaLabels.next}
          onClick={next}
          className="px-4 py-2 rounded-lg hover:text-red-800 transition cursor-pointer hidden md:block"
        >
          <ChevronRight />
        </button>
      </div>

      {/* BOLINHAS */}
      <div className="flex justify-center mt-8">
        <div className="flex gap-3">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goToReview(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                i === index
                  ? 'bg-emerald-600 scale-110'
                  : 'bg-emerald-200 hover:bg-emerald-400'
              }`}
              aria-label={`${dictionary.testimonials?.ariaLabels.viewReview} ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
