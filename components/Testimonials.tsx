'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Tripadvisor,
  Facebook,
  GoogleMaps,
} from '@/components/ui/Icons'
import ScrollParallax from './ScrollParallax'
import { useDictionary } from '@/hooks/useDictionary'

// ✅ Reviews mantidas nos idiomas originais
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

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const touchAreaRef = useRef<HTMLDivElement>(null)
  const { dictionary } = useDictionary()

  const next = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      setIndex((i) => (i + 1) % reviews.length)
      setIsVisible(true)
    }, 300)
  }, [])

  const prev = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      setIndex((i) => (i - 1 + reviews.length) % reviews.length)
      setIsVisible(true)
    }, 300)
  }, [])

  const goToReview = useCallback((i: number) => {
    setIsVisible(false)
    setTimeout(() => {
      setIndex(i)
      setIsVisible(true)
    }, 300)
  }, [])

  // Touch event handlers (mantidos iguais)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return
      setCurrentX(e.touches[0].clientX)
    },
    [isDragging]
  )

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return

    const diff = startX - currentX
    const minSwipeDistance = 50

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        next()
      } else {
        prev()
      }
    }

    setIsDragging(false)
    setStartX(0)
    setCurrentX(0)
  }, [isDragging, startX, currentX, next, prev])

  // Mouse event handlers (mantidos iguais)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return
      setCurrentX(e.clientX)
    },
    [isDragging]
  )

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return

    const diff = startX - currentX
    const minSwipeDistance = 50

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        next()
      } else {
        prev()
      }
    }

    setIsDragging(false)
    setStartX(0)
    setCurrentX(0)
  }, [isDragging, startX, currentX, next, prev])

  const getDragTransform = () => {
    if (!isDragging) return ''
    const diff = startX - currentX
    const boundedDiff = Math.max(Math.min(diff, 100), -100)
    return `translateX(${boundedDiff * 0.5}px)`
  }

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  if (!dictionary) {
    return (
      <section
        className="relative py-15 w-full bg-emerald-100"
        id="testimonials"
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p>Erro ao carregar avaliações</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-15 w-full bg-emerald-100" id="testimonials">
      <div className="relative">
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
            className="h-40 flex items-center justify-center text-sm max-w-xs lg:max-w-xl mx-auto touch-pan-y select-none"
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
              className={`transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{
                transform: isDragging ? getDragTransform() : 'translateX(0)',
                transition: isDragging ? 'none' : 'all 0.3s ease',
              }}
            >
              {/* ✅ Reviews mantidas nos idiomas originais */}
              <p className="italic md:max-w-xl text-center lg:text-base text-sm">
                {reviews[index].text}
              </p>
              <p className="mt-4 font-semibold text-center">
                {reviews[index].author}
                {reviews[index].platform === 'Trip Advisor' && (
                  <Tripadvisor className="inline-block text-green-600 ml-2 relative bottom-0.5" />
                )}
                {reviews[index].platform === 'Facebook' && (
                  <Facebook className="inline-block text-blue-600 ml-2 relative bottom-0.5" />
                )}
                {reviews[index].platform === 'Google Maps' && (
                  <GoogleMaps className="inline-block text-red-600 ml-2 relative bottom-0.5" />
                )}
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

      <div className="flex flex-wrap justify-center gap-6 mt-10 mb-5 text-emerald-600 font-semibold">
        <a
          href="https://www.facebook.com/mammamia.sta.cruz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border px-4 py-2 rounded-xl transition text-red-800"
        >
          <span>{dictionary.testimonials?.ratings.facebook}</span>
          <Facebook className="text-blue-500 text-xl" />
        </a>

        <a
          href="https://www.google.com/maps/place/Pizzeria+Mamma+Mia/@39.1337248,-9.3868453,17z/data=!4m6!3m5!1s0xd1f31bebc2b8daf:0x8d7fd173ee42c87e!8m2!3d39.1337207!4d-9.3819744!16s%2Fg%2F11c0w0hxrr?entry=ttu&g_ep=EgoyMDI5MTExMi4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl border transition text-red-800"
        >
          <span>{dictionary.testimonials?.ratings.google}</span>
          <GoogleMaps className="text-red-500 text-xl" />
        </a>

        <a
          href="https://www.tripadvisor.com/Restaurant_Review-g656858-d4783857-Reviews-Pizzeria_Mamma_Mia-Torres_Vedras_Lisbon_District_Central_Portugal.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl border transition text-red-800"
        >
          <span>{dictionary.testimonials?.ratings.tripadvisor}</span>
          <Tripadvisor className="text-green-500 text-xl" />
        </a>
      </div>
    </section>
  )
}
