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

  // Duplicar imagens para efeito loop contínuo
  const loopedImages = [...images, ...images]

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
        {loopedImages.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[50vw] md:w-[35vw] lg:w-[25vw] aspect-[4/3] relative"
          >
            <Image
              src={src}
              alt={`Imagem ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 35vw, 25vw"
              className="object-cover "
              quality={70}
              priority={i < 2} // carrega rápido as primeiras imagens
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
