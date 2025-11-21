'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useDictionary } from '@/hooks/useDictionary'
import SkeletonBlock from '../skeletons/SkeletonBlock'
import Link from 'next/link'

// ---------------- HERO ----------------
const heroImages = [
  '/pizza-salame.webp',
  '/pizza-deseree.webp',
  '/pizza-prociuto-funghi.webp',
  '/pizza-hawai.webp',
]

const heroLogos = [
  { src: '/pizzeria-lettering.png', width: 300, height: 75, alt: 'Logo 1' },
  { src: '/logo.png', width: 200, height: 200, alt: 'Logo 2' },
  { src: '/mamma-mia-lettering.png', width: 300, height: 75, alt: 'Logo 3' },
]

export function HeroMobile() {
  const { dictionary } = useDictionary()
  const [current, setCurrent] = useState(0)

  // Carousel automático
  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % heroImages.length),
      3000
    )
    return () => clearInterval(interval)
  }, [])

  if (!dictionary) {
    return (
      <section className="relative w-full h-[70vh] flex flex-col justify-center items-center bg-gray-300">
        <SkeletonBlock height={200} width={300} className="mb-4" />
        <SkeletonBlock height={20} width={200} className="mb-2" />
        <SkeletonBlock height={40} width={150} className="mb-2 rounded-xl" />
        <SkeletonBlock height={30} width={100} className="rounded-lg" />
      </section>
    )
  }

  return (
    <section className="relative w-full h-[70vh] overflow-hidden bg-gray-300">
      {/* Imagem de fundo */}
      {heroImages.map((src, idx) => (
        <Image
          key={idx}
          src={src}
          alt={`Pizza ${idx + 1}`}
          fill
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            idx === current ? 'opacity-60 z-10' : 'opacity-0 z-0'
          }`}
          priority={idx === 0}
          loading={idx === 0 ? 'eager' : 'lazy'}
        />
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center">
        {/* Logos */}
        <div className="flex flex-col items-center py-5">
          {heroLogos.map((logo, i) => (
            <Image
              key={i}
              src={logo.src}
              width={logo.width}
              height={logo.height}
              alt={logo.alt}
              className="object-contain w-auto h-auto mb-2"
            />
          ))}
        </div>

        {/* Subtítulo */}
        <p className="tracking-widest text-base font-light italic max-w-xs">
          {dictionary.hero.subtitle}
        </p>

        {/* Botão */}
        <Link href="#pizzas">
          <button className="tracking-widest text-base font-light w-auto border rounded-xl mt-4 px-4 py-1 shadow-xl">
            {dictionary.hero.menuButton}
          </button>
        </Link>
      </div>
    </section>
  )
}
