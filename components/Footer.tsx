'use client'

import { useDictionary } from '@/hooks/useDictionary'

export default function Footer() {
  const { dictionary } = useDictionary()

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
