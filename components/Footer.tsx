'use client'

import { useDictionary } from '@/hooks/useDictionary'
import SkeletonSection from './skeletons/SkeletonSection'

export default function Footer() {
  const { dictionary } = useDictionary()
  if (!dictionary) return <SkeletonSection type="footer" />

  return (
    <footer className="py-10 text-center">
      <p>
        {dictionary.footer?.copyright.replace(
          '{year}',
          new Date().getFullYear().toString()
        )}
      </p>
    </footer>
  )
}
