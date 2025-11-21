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
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animate) {
          // garante que não crias múltiplos timeouts
          if (!timerRef.current) {
            timerRef.current = setTimeout(() => {
              setAnimate(true)
              timerRef.current = null
            }, delay)
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px 0px 0px',
      }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [delay, animate])

  return (
    <div
      ref={ref}
      style={{
        opacity: animate ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
      className="will-change-transform relative"
    >
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
