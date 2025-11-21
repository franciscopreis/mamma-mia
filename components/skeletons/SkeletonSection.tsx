'use client'
import SkeletonBlock from './SkeletonBlock'

interface SkeletonSectionProps {
  type?:
    | 'hero'
    | 'restaurant'
    | 'pizzas'
    | 'testimonials'
    | 'contact'
    | 'footer'
}

export default function SkeletonSection({
  type = 'hero',
}: SkeletonSectionProps) {
  switch (type) {
    case 'hero':
      return (
        <section className="relative w-full h-[650px]">
          <SkeletonBlock height="100%" className="rounded-lg" />
        </section>
      )

    case 'restaurant':
      return (
        <section className="py-15 px-5 md:px-10" id="restaurant">
          <SkeletonBlock
            height="50px"
            className="mb-5 max-w-2xl mx-auto rounded"
          />
          <SkeletonBlock
            height="160px"
            className="mb-5 max-w-4xl mx-auto rounded-lg"
          />
          <SkeletonBlock
            height="180px"
            className="max-w-4xl mx-auto rounded-lg"
          />
        </section>
      )

    case 'pizzas':
      return (
        <section
          className="py-15 px-4 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto"
          id="pizzas"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBlock
              key={i}
              height="300px"
              className="rounded-xl w-full"
            />
          ))}
        </section>
      )

    case 'testimonials':
      return (
        <section className="py-15 w-full bg-emerald-100">
          <SkeletonBlock
            height="40px"
            className="mb-10 mx-auto max-w-3xl rounded"
          />
          <SkeletonBlock
            height="160px"
            className="mx-auto max-w-3xl rounded-lg"
          />
        </section>
      )

    case 'contact':
      return (
        <section className="py-15 px-4 max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <SkeletonBlock height="650px" className="rounded-lg" />
          <SkeletonBlock height="600px" className="rounded-lg" />
        </section>
      )

    case 'footer':
      return (
        <footer className="py-10 w-full bg-gray-100">
          <SkeletonBlock height="20px" className="max-w-2xl mx-auto rounded" />
        </footer>
      )

    default:
      return <SkeletonBlock height="200px" className="rounded-lg" />
  }
}
