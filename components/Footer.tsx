'use client'

import { useDictionary } from '@/hooks/useDictionary'

export default function Footer() {
  const { dictionary, loading } = useDictionary()

  if (loading) {
    return (
      <footer className="py-10 text-center">
        <div className="animate-pulse h-4 bg-gray-300 rounded max-w-xs mx-auto"></div>
      </footer>
    )
  }

  if (!dictionary) {
    return (
      <footer className="py-10 text-center">
        <p>© {new Date().getFullYear()} FPR</p>
      </footer>
    )
  }

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
