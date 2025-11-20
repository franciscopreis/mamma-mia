'use client'

import SkeletonBlock from './SkeletonBlock'

export default function RestaurantSkeleton() {
  return (
    <section className="py-15 px-5 md:px-10" id="restaurant">
      <div className="max-w-4xl mx-auto py-10 min-h-[160px]">
        <SkeletonBlock height="100%" />
      </div>

      <div className="mt-5 min-h-[180px] md:min-h-[180px]">
        <SkeletonBlock height="100%" />
      </div>

      <div className="flex flex-col max-w-3xl mx-auto py-2 text-lg gap-3 text-justify min-h-[220px]">
        <SkeletonBlock height="100%" />
      </div>
    </section>
  )
}
