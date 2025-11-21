'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ContinuousCarousel() {
  const images = [
    '/santa-cruz-praia.webp',
    '/guincho-santa-cruz.webp',
    '/mamma-mia-dentro.webp',
    '/mamma-mia-vista.webp',
  ]

  const looped = [...images, ...images] // efeito loop

  return (
    <div className="overflow-hidden relative w-full py-5">
      <motion.div
        className="flex will-change-transform"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 40,
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
              priority={i < 2}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
