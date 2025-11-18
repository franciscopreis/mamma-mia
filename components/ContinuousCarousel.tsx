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
    <div className="overflow-hidden relative w-full py-5 min-h-[120px] md:min-h-40">
      <motion.div
        className="flex"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop', // Mudei para 'loop' para ser mais suave
          duration: 40, // Aumentei a duração para ser menos intenso
          ease: 'linear',
        }}
      >
        {loopedImages.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[50vw] md:w-[35vw] lg:w-[25vw] h-48 md:h-56 relative" // Reduzi a altura
          >
            <Image
              src={src}
              alt={`Imagem ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 35vw, 25vw"
              className="object-cover" // Adicionei bordas arredondadas
              quality={70}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
