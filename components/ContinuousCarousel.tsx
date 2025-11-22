'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState, useMemo } from 'react'

const CAROUSEL_IMAGES = [
  '/santa-cruz-praia.webp',
  '/guincho-santa-cruz.webp',
  '/mamma-mia-dentro.webp',
  '/mamma-mia-vista.webp',
]

export default function ContinuousCarousel() {
  const [isMobile, setIsMobile] = useState(false)

  const loopedImages = useMemo(
    () => [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES],
    []
  )

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="overflow-hidden relative w-full h-full">
      {' '}
      {/* ✅ Usar altura completa do container pai */}
      <motion.div
        className="flex h-full will-change-transform"
        animate={{ x: ['0%', isMobile ? '-25%' : '-50%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: isMobile ? 20 : 40,
          ease: 'linear',
        }}
      >
        {loopedImages.map((src, i) => (
          <CarouselImage key={`${src}-${i}`} src={src} index={i} />
        ))}
      </motion.div>
    </div>
  )
}

function CarouselImage({ src, index }: { src: string; index: number }) {
  return (
    <div className="flex-shrink-0 w-[50vw] md:w-[35vw] lg:w-[25vw] h-full aspect-[4/3] relative">
      {' '}
      {/* ✅ Altura completa */}
      <Image
        src={src}
        alt={`Imagem ${index + 1}`}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 35vw, 25vw"
        className="object-cover"
        quality={75}
        loading={index < 2 ? 'eager' : 'lazy'}
      />
    </div>
  )
}
