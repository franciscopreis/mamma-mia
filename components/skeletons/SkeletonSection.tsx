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
    | 'carousel'
    | 'text'
}

export default function SkeletonSection({
  type = 'hero',
}: SkeletonSectionProps) {
  switch (type) {
    case 'hero':
      return (
        <section className="relative w-full min-h-[70vh] flex flex-col justify-center items-center bg-gray-300 overflow-hidden pb-20">
          <div className="h-[300px] flex flex-col justify-between items-center py-5">
            <SkeletonBlock height={75} width={300} className="mb-4" />
            <SkeletonBlock height={200} width={200} className="mb-4" />
            <SkeletonBlock height={75} width={300} />
          </div>
          <div className="h-[100px] flex items-center justify-center">
            <SkeletonBlock height={20} width={200} />
          </div>
          <div className="h-[50px] flex items-center justify-center">
            <SkeletonBlock height={40} width={150} className="rounded-xl" />
          </div>
        </section>
      )

    case 'restaurant':
      return (
        <section className="py-10 px-5 md:px-10" id="restaurant">
          <SkeletonBlock
            height={50}
            className="mb-5 max-w-2xl mx-auto rounded"
          />
          <SkeletonBlock
            height={160}
            className="mb-5 max-w-4xl mx-auto rounded-lg"
          />
          <SkeletonBlock
            height={180}
            className="max-w-4xl mx-auto rounded-lg"
          />
        </section>
      )

    case 'pizzas':
      return (
        <section className="py-15 w-full bg-amber-200/30" id="pizzas">
          <div className="max-w-6xl mx-auto px-4">
            <div className="h-[100px] flex items-center justify-center mb-8">
              <SkeletonBlock height={40} width={300} className="rounded" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="min-h-[350px] flex flex-col items-center p-4"
                >
                  <SkeletonBlock
                    height={200}
                    className="rounded-xl w-full mb-4"
                  />
                  <SkeletonBlock
                    height={24}
                    width="75%"
                    className="rounded mb-2"
                  />
                  <SkeletonBlock
                    height={20}
                    width="60%"
                    className="rounded mb-2"
                  />
                  <SkeletonBlock height={20} width="30%" className="rounded" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    case 'testimonials':
      return (
        <section
          className="relative py-15 w-full bg-emerald-100"
          id="testimonials"
        >
          <SkeletonBlock
            height={40}
            className="mb-10 mx-auto max-w-3xl rounded"
          />
          <SkeletonBlock
            height={160}
            className="mx-auto max-w-3xl rounded-lg"
          />
        </section>
      )

    case 'footer':
      return (
        <footer className="py-10 w-full bg-gray-100">
          <SkeletonBlock height={20} className="max-w-2xl mx-auto rounded" />
        </footer>
      )

    case 'carousel':
      return <SkeletonBlock height={200} className="rounded-lg w-full" />

    case 'text':
      return <SkeletonBlock height={24} className="rounded w-full" />

    default:
      return <SkeletonBlock height={200} className="rounded-lg" />
  }
}
