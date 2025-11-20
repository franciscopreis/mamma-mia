'use client'

import SkeletonBlock from './SkeletonBlock'

export default function TestimonialsSkeleton() {
  return (
    <section className="py-15 w-full bg-emerald-100">
      <div className="max-w-3xl mx-auto px-4">
        <SkeletonBlock height="40px" className="mb-10" />
        <SkeletonBlock height="160px" />
      </div>
    </section>
  )
}
