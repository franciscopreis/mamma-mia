'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useDictionary } from '@/hooks/useDictionary'
import SkeletonBlock from '../skeletons/SkeletonBlock'
import Link from 'next/link'

const carouselImages = [
  '/pizza-salame.webp',
  '/pizza-deseree.webp',
  '/pizza-prociuto-funghi.webp',
  '/pizza-hawai.webp',
]

export default function Hero() {
  const { dictionary } = useDictionary()
  const [current, setCurrent] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // ✅ Carousel otimizado
  useEffect(() => {
    setIsClient(true)

    let interval: NodeJS.Timeout
    let isPageVisible = true

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    if (isPageVisible) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % carouselImages.length)
      }, 4000)
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(interval)
    }
  }, [])

  if (!dictionary) {
    return (
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center items-center bg-gray-300 overflow-hidden pb-20">
        <div className="h-[400px] flex flex-col justify-center items-center space-y-8 py-5">
          <SkeletonBlock height={75} width={300} className="mb-2" />
          <SkeletonBlock height={200} width={200} className="my-4" />
          <SkeletonBlock height={75} width={300} className="mt-2" />
        </div>
        <div className="h-[120px] flex items-center justify-center px-4">
          <SkeletonBlock height={24} width={400} className="max-w-xl" />
        </div>
        <div className="h-[80px] flex items-center justify-center">
          <SkeletonBlock height={48} width={180} className="rounded-xl" />
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full min-h-[70vh] flex justify-center bg-gray-300 pb-20">
      {/* ✅ CARROSSEL DE IMAGENS */}
      <div className="absolute inset-0 z-10">
        {carouselImages.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Pizza ${idx + 1} - Pizzeria Mamma Mia`}
            fill
            priority={idx === 0}
            fetchPriority={idx === 0 ? 'high' : 'auto'}
            quality={75}
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ${
              idx === current ? 'opacity-60' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* ✅ CONTEÚDO PRINCIPAL */}
      <div className="text-center px-4 max-w-3xl z-20 font-montserrat w-full py-12">
        {/* ✅ LOGOS INDIVIDUAIS COM MARGENS NEGATIVAS */}
        <div className="flex flex-col items-center py-5">
          <div
            className="-mb-8 mt-5"
            style={{ width: '300px', height: '75px' }}
          >
            <Image
              src="/pizzeria-lettering.png"
              alt="Pizzeria Mamma Mia"
              width={300}
              height={75}
              quality={75}
              priority={true}
              className="object-contain w-full h-full"
            />
          </div>

          <div className="-my-2" style={{ width: '200px', height: '200px' }}>
            <Image
              src="/logo.png"
              alt="Logo Mamma Mia"
              width={200}
              height={200}
              quality={75}
              priority={true}
              className="object-contain w-full h-full"
            />
          </div>

          <div className="-mt-8" style={{ width: '300px', height: '75px' }}>
            <Image
              src="/mamma-mia-lettering.png"
              alt="Mamma Mia"
              width={300}
              height={75}
              quality={75}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* ✅ SUBTÍTULO */}
        <div className="my-12 px-4">
          <p className="tracking-widest text-xl font-light italic max-w-xl mx-auto leading-relaxed text-gray-800">
            {dictionary.hero.subtitle}
          </p>
        </div>

        {/* ✅ BOTÃO CALL-TO-ACTION */}
        <div className="mt-8 mb-4">
          <Link href="#pizzas">
            <button className="tracking-widest md:text-xl text-base w-auto border-2 border-emerald-700 rounded-xl mx-auto px-4 py-2 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200 bg-white/90 backdrop-blur-sm text-emerald-800 hover:bg-white hover:border-red-700 hover:text-red-700 font-semibold">
              {dictionary.hero.menuButton}
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
