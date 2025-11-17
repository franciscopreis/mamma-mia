'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image, { ImageProps } from 'next/image'

// Recebe todas as props normais do <Image>, exceto height/width (porque usamos fill)
// containerHeight controla a altura do container via tailwind classes
interface CinematicProps extends Omit<ImageProps, 'height' | 'width'> {
  containerHeight?: string
}

export default function CinematicImageReveal({
  containerHeight = 'h-64 md:h-80', // Altura padrão
  alt,
  ...props
}: CinematicProps) {
  // Referência ao elemento que queremos observar no scroll
  const ref = useRef<HTMLDivElement>(null)

  // Lê a progressão do scroll relativa a este elemento
  // scrollYProgress = valor entre 0 e 1 (0 = início, 1 = fim)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 120%', 'end 60%'],
    /**
     * start 85%  → A animação começa quando o elemento entra 85% dentro do viewport
     * end 10%    → A animação termina quando o elemento sai deixando apenas 10% visível
     *
     * Afinar isto muda QUANDO a animação dispara.
     *
     * Exemplos:
     *
     * ['start 90%', 'end 0%'] = muito mais tardia
     * ['start 60%', 'end 20%'] = começa mais cedo
     */
  })

  // Opacidade: 0 → 1
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  /**
   * [0, 1] → faixa do scroll
   * [0, 1] → valores de opacidade
   * Queres mais lento? Faz:
   *   [0, 1] → [0, 0.8]
   */

  // Escala (zoom): 1 → 1 (no momento está desativado)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1])
  /**
   * Para adicionar efeito cinematográfico:
   * [1.1, 1] ou [1.05, 1]
   * Exemplo:
   *   const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
   */

  // Blur dinâmico: 10px → 0px
  const blurValue = useTransform(
    scrollYProgress,
    [0, 1], // intervalo do scroll
    ['blur(10px)', 'blur(0px)'] // valores
  )
  /**
   * Aqui afinamos:
   * Quanto blur no início?
   *   'blur(20px)' = mais cinematográfico
   *
   * Blur invertido (começa nítido e fica desfocado):
   *   ['blur(0px)', 'blur(10px)']
   */

  return (
    <motion.div
      ref={ref}
      style={{
        opacity, // fade in
        scale, // zoom in/out
        filter: blurValue, // blur animado
      }}
      className={`relative w-full ${containerHeight} rounded-xl overflow-hidden shadow-xl`}
    >
      {/* Imagem em si */}
      <Image {...props} alt={alt} fill className="object-cover" />
    </motion.div>
  )
}
