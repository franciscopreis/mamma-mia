'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface ScrollParallaxProps {
  children: ReactNode
  fromX?: number // movimento horizontal inicial
  fromY?: number // movimento vertical inicial
  stiffness?: number // quão rígida é a animação (spring)
}

export default function ScrollParallax({
  children,
  fromX = -80, // começa 80px para a esquerda
  fromY = 20, // começa 20px abaixo
  stiffness = 0.15, // ***este parâmetro NÃO está a ser usado ainda***
}: ScrollParallaxProps) {
  // Referência ao container (ponto de observação no scroll)
  const ref = useRef(null)

  // Captura o progresso do scroll sobre este elemento
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 20%'],
    /**
     * 'start 85%' → quando 85% do viewport encontra o elemento, animação inicia
     * 'end 10%'   → quando apenas 10% está visível, animação termina
     *
     * Ajusta isto para controlar QUANDO o parallax dispara.
     */
  })

  // Movimento horizontal: começa em fromX → vai para 0
  const x = useTransform(scrollYProgress, [0, 1], [fromX, 0])
  /**
   * Afinar:
   * fromX = -200 → vem de muito mais longe pela esquerda
   * fromX = 200 → vem da direita
   * fromX = 0 → desativa movimento horizontal
   */

  // Movimento vertical: começa em fromY → vai para 0
  const y = useTransform(scrollYProgress, [0, 1], [fromY, 0])
  /**
   * Afinar:
   * fromY = -50 → entra de cima
   * fromY = 80 → entra de baixo lentamente
   */

  // Fade-in: opacidade sobe de 0 → 1 nos primeiros 20% do scroll
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  /**
   * Afinar:
   * [0, 0.4] → fade mais lento
   * [0.2, 1] → fade começa mais tarde
   */

  return (
    <motion.div
      ref={ref}
      style={{ x, y, opacity }}
      // ATENÇÃO: isto ignora o parâmetro stiffness do componente
      // Porque "transition" deve estar dentro do "motion.*" que anima valores, NÃO no wrapper.
      transition={{ type: 'spring', stiffness: 40 }}
      /**
       * stiffness = 100 → resposta rápida (impacto forte)
       * stiffness = 40  → entrada mais suave, natural
       * stiffness = 20  → efeito cinematográfico / lento
       */
    >
      {children}
    </motion.div>
  )
}
