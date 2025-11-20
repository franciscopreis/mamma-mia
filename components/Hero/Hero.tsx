'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useDictionary } from '@/hooks/useDictionary'
import SkeletonBlock from '../skeletons/SkeletonBlock'

const carouselImages = [
  '/pizza-salame.webp',
  '/pizza-deseree.webp',
  '/pizza-prociuto-funghi.webp',
  '/pizza-hawai.webp',
]

const logos = [
  {
    src: '/pizzeria-lettering.png',
    width: 300,
    height: 75,
    alt: 'Pizzeria Mamma Mia',
    className: '-mb-5 mt-5',
  },
  {
    src: '/logo.png',
    width: 200,
    height: 200,
    alt: 'Pizzeria Mamma Mia',
    className: '-mt-5',
  },
  {
    src: '/mamma-mia-lettering.png',
    width: 300,
    height: 75,
    alt: 'Pizzeria Mamma Mia',
    className: '-mt-5',
  },
]

export default function Hero() {
  const { dictionary } = useDictionary()

  // 🔹 hooks sempre executados na mesma ordem
  const [current, setCurrent] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [nextOpening, setNextOpening] = useState('')
  const accordionRef = useRef<HTMLButtonElement>(null)

  // 🔹 Carousel automático
  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % carouselImages.length),
      3000
    )
    return () => clearInterval(interval)
  }, [])

  // 🔹 Calcula status da pizzaria
  useEffect(() => {
    if (!dictionary) return

    const now = new Date()
    const day = now.getDay()
    const time = now.getHours() + now.getMinutes() / 60

    const closedDay = 1 // Segunda
    const lunchStart = 12
    const lunchEnd = 14
    const dinnerStart = 18
    const dinnerEnd = 23

    const isClosedDay = day === closedDay
    const lunchTime = time >= lunchStart && time < lunchEnd
    const dinnerTime = time >= dinnerStart && time < dinnerEnd
    const open = !isClosedDay && (lunchTime || dinnerTime)

    let nextTime = ''
    if (isClosedDay)
      nextTime = dictionary.openingStatus.nextOpening.tomorrowLunch
    else if (!lunchTime && time < lunchStart)
      nextTime = dictionary.openingStatus.nextOpening.todayLunch
    else if (!dinnerTime && time < dinnerStart)
      nextTime = dictionary.openingStatus.nextOpening.todayDinner
    else nextTime = dictionary.openingStatus.nextOpening.tomorrowLunch

    setIsOpen(open)
    setNextOpening(nextTime)
  }, [dictionary])

  // 🔹 Mantém a mesma árvore de JSX sempre
  return (
    <section className="relative w-full flex justify-center overflow-visible bg-gray-300 pb-20">
      {dictionary ? (
        <>
          {/* Carousel */}
          {carouselImages.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={`Pizza ${idx + 1}`}
              fill
              priority={idx === 0}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
              quality={idx === 0 ? 80 : 70}
              sizes="100vw"
              className={`object-cover transition-opacity duration-1000 ${idx === current ? 'opacity-60 z-10' : 'opacity-0 z-0'}`}
            />
          ))}

          <div className="text-center px-4 max-w-3xl z-20 font-montserrat">
            {/* Logos */}
            <div className="hover:scale-105 flex flex-col items-center py-5">
              {logos.map((logo, i) => (
                <Image
                  key={i}
                  {...logo}
                  className={logo.className ?? 'object-contain'}
                  alt={logo.alt ?? 'Logo'}
                />
              ))}
            </div>

            <p className="tracking-widest text-xl font-light italic max-w-xl mt-4">
              {dictionary.hero.subtitle}
            </p>

            <div className="flex flex-col justify-center gap-4 mt-4">
              <Link
                href="#pizzas"
                className="tracking-widest md:text-xl text-base font-light w-auto border rounded-xl mx-auto hover:scale-105 px-4 py-1 shadow-xl"
              >
                {dictionary.hero.menuButton}
              </Link>

              <div className="flex flex-col items-center">
                <div
                  className={`text-base font-medium mb-1 border rounded-lg px-3 py-1 text-stone-800 ${
                    isOpen ? 'bg-emerald-500/50' : 'bg-red-500/50'
                  }`}
                >
                  {isOpen
                    ? dictionary.openingStatus.status.open
                    : dictionary.openingStatus.status.closed}
                </div>

                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-4 text-xs font-light tracking-wide transition-all duration-300 border border-gray-300 rounded-lg px-3 py-1 backdrop-blur-sm bg-white/50 text-gray-600 hover:bg-white/70 hover:scale-105 active:scale-95 cursor-pointer"
                  aria-expanded={isExpanded}
                  aria-label={
                    isExpanded
                      ? dictionary.openingStatus.ariaLabels.close
                      : dictionary.openingStatus.ariaLabels.open
                  }
                  ref={accordionRef}
                >
                  {isExpanded
                    ? dictionary.openingStatus.buttons.close
                    : dictionary.openingStatus.buttons.viewHours}
                </button>

                {isExpanded && (
                  <div className="overflow-hidden transition-all duration-300 ease-in-out w-full opacity-70 mt-4">
                    <div className="bg-white/50 rounded-xl p-4 shadow-lg border border-gray-200">
                      {/* Horários */}
                      <div className="space-y-3 text-sm text-gray-700">
                        <div className="text-center font-semibold text-gray-800 mb-2">
                          {dictionary.openingStatus.hours.title}
                        </div>
                        {/* ... restante do conteúdo */}
                        {!isOpen && (
                          <div className="pt-3 border-t border-gray-200 text-center text-xs text-gray-600">
                            {dictionary.openingStatus.nextOpening.weOpen}{' '}
                            <span className="font-semibold text-emerald-700">
                              {nextOpening}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        // Skeleton enquanto carrega
        <SkeletonBlock height={650} className="w-full rounded-lg" />
      )}
    </section>
  )
}
