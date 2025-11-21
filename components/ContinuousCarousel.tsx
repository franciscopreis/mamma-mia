'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ContinuousCarousel() {
  const images = [
    '/santa-cruz-praia.webp',
    '/guincho-santa-cruz.webp',
    '/mamma-mia-dentro.webp',
    '/mamma-mia-vista.webp',
  ]

  const looped = [...images, ...images]

  // Detect mobile to reduce animation
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="overflow-hidden relative w-full py-5">
      <motion.div
        className="flex will-change-transform"
        animate={{ x: ['0%', isMobile ? '-25%' : '-50%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: isMobile ? 20 : 40, // mais rápido no mobile
          ease: 'linear',
        }}
      >
        {looped.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[50vw] md:w-[35vw] lg:w-[25vw] aspect-[4/3] relative"
          >
            <Image
              src={src}
              alt={`Imagem ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 35vw, 25vw"
              className="object-cover"
              quality={75}
              loading={i === 0 ? 'eager' : 'lazy'}
              priority={i === 0}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
