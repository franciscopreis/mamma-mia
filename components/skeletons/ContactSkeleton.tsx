'use client'

import SkeletonBlock from './SkeletonBlock'

export default function ContactSkeleton() {
  return (
    <section className="py-15 px-4 max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
      {/* Box de texto */}
      <SkeletonBlock height="650px" className="w-full rounded-lg" />

      {/* Mapa */}
      <SkeletonBlock height="600px" className="w-full rounded-2xl" />
    </section>
  )
}
