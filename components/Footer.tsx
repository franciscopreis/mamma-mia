'use client'

import { useDictionary } from '@/hooks/useDictionary'
import SkeletonBlock from './skeletons/SkeletonBlock'

export default function Footer() {
  const { dictionary } = useDictionary()

  return (
    <footer className="py-10 text-center">
      {dictionary ? (
        <p>
          {dictionary.footer?.copyright.replace(
            '{year}',
            new Date().getFullYear().toString()
          )}
        </p>
      ) : (
        <SkeletonBlock height={20} width={120} className="mx-auto rounded-lg" />
      )}
    </footer>
  )
}
