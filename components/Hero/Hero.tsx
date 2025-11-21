'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useDictionary } from '@/hooks/useDictionary'
import SkeletonBlock from '../skeletons/SkeletonBlock'
import Link from 'next/link'

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
  const [current, setCurrent] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [nextOpening, setNextOpening] = useState('')
  const accordionRef = useRef<HTMLButtonElement>(null)

  // Carousel automático
  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % carouselImages.length),
      3000
    )
    return () => clearInterval(interval)
  }, [])

  // Skeleton enquanto carrega
  if (!dictionary) {
    return (
      <section className="relative w-full h-[70vh] flex flex-col justify-center items-center bg-gray-300 overflow-hidden pb-20">
        <SkeletonBlock height={200} width={300} className="mb-4" /> {/* Logo */}
        <SkeletonBlock height={20} width={200} className="mb-2" />{' '}
        {/* Subtítulo */}
        <SkeletonBlock
          height={40}
          width={150}
          className="mb-2 rounded-xl"
        />{' '}
        {/* Botão */}
        <SkeletonBlock height={30} width={100} className="rounded-lg" />{' '}
        {/* Status */}
      </section>
    )
  }

  return (
    <section className="relative w-full flex justify-center overflow-visible bg-gray-300 pb-20">
      {/* Carousel */}
      {carouselImages.map((src, idx) => (
        <Image
          key={idx}
          src={src}
          alt={`Pizza ${idx + 1}`}
          fill
          priority={idx === 0}
          fetchPriority={idx === 0 ? 'high' : 'auto'}
          quality={75}
          sizes="(max-width: 768px) 100vw, 100vw"
          loading="eager"
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
              className={`${logo.className ?? ''} w-auto h-auto object-contain`}
              alt={logo.alt ?? 'Logo'}
              quality={75}
            />
          ))}
        </div>

        <p className="tracking-widest text-xl font-light italic max-w-xl mt-4">
          {dictionary.hero.subtitle}
        </p>

        <div className="flex flex-col justify-center gap-4 mt-4">
          <Link href="#pizzas">
            <button className="tracking-widest md:text-xl text-base font-light w-auto border rounded-xl mx-auto px-4 py-1 shadow-xl cursor-pointer">
              {dictionary.hero.menuButton}
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
