'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const images = [
  '/pizza-salame.webp',
  '/pizza-deseree.webp',
  '/pizza-prociuto-funghi.webp',
  '/pizza-hawai.jpg',
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      {images.map((src, idx) => (
        <Image
          key={idx}
          src={src}
          alt={`Pizza ${idx + 1}`}
          fill
          priority={idx === 0} // prioriza a primeira imagem
          className={`object-cover transition-opacity duration-1000 ${
            idx === current ? 'opacity-60 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}
    </>
  )
}
