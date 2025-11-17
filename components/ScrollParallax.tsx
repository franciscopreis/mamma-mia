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
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      style={{
        transform: isVisible
          ? 'translate(0, 0)'
          : `translate(${startX}px, ${startY}px)`,
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {children}
    </div>
  )
}
