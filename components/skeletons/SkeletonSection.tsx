// SkeletonSection.tsx
'use client'
import SkeletonBlock from './SkeletonBlock'

interface SkeletonSectionProps {
  type?: 'hero' | 'restaurant' | 'pizzas' | 'testimonials' | 'contact'
}

export default function SkeletonSection({
  type = 'hero',
}: SkeletonSectionProps) {
  switch (type) {
    case 'hero':
      return (
        <section className="relative w-full h-[650px]">
          <SkeletonBlock height="100%" />
        </section>
      )
    case 'restaurant':
      return (
        <section className="py-15 px-5 md:px-10">
          <SkeletonBlock height="160px" className="mb-5" />
          <SkeletonBlock height="180px" className="mb-5" />
          <SkeletonBlock height="220px" />
        </section>
      )
    case 'pizzas':
      return (
        <section className="py-15 px-4 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBlock key={i} height="300px" />
          ))}
        </section>
      )
    case 'testimonials':
      return (
        <section className="py-15 w-full bg-emerald-100">
          <SkeletonBlock height="40px" className="mb-10 mx-auto max-w-3xl" />
          <SkeletonBlock height="160px" className="mx-auto max-w-3xl" />
        </section>
      )
    case 'contact':
      return (
        <section className="py-15 px-4 max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <SkeletonBlock height="650px" />
          <SkeletonBlock height="600px" />
        </section>
      )
    default:
      return <SkeletonBlock height="200px" />
  }
}
