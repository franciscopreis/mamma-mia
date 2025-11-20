'use client'

import { useRef, useEffect, useState } from 'react'

interface ScrollParallaxProps {
  children: React.ReactNode
  startY?: number
  startX?: number
  delay?: number
}

export default function ScrollParallax({
  children,
  startY = 30,
  startX = 0,
  delay = 0,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimate(true), delay)
        }
      },
      {
        threshold: 0.1, // mantido
        rootMargin: '50px 0px 0px 0px', // mantido
      }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className="will-change-transform relative"
      // ⚠️ container nunca desloca → sem CLS
      style={{
        opacity: animate ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* movimento ocorre AQUI → não altera layout → zero CLS */}
      <div
        style={{
          transform: animate
            ? 'translate3d(0,0,0)'
            : `translate3d(${startX}px, ${startY}px, 0)`,
          transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}
