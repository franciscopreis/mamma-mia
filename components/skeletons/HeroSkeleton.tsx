'use client'

import SkeletonBlock from './SkeletonBlock'

export default function HeroSkeleton() {
  return (
    <section className="relative w-full h-[650px] bg-gray-300">
      <SkeletonBlock height="100%" />
    </section>
  )
}
