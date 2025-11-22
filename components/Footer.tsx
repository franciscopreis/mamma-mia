'use client'

import { useDictionary } from '@/hooks/useDictionary'
import { useEffect, useState } from 'react'

export default function Footer() {
  const { dictionary } = useDictionary()
  const [currentYear, setCurrentYear] = useState('') // ✅ Inicializar vazio

  // ✅ Só executar no cliente
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  // ✅ Não usar skeleton - simplesmente não renderizar enquanto carrega
  if (!dictionary || !currentYear) {
    return (
      <footer className="py-10 text-center bg-gray-100">
        <div className="h-5 bg-gray-300 rounded animate-pulse w-48 mx-auto"></div>
      </footer>
    )
  }

  return (
    <footer className="py-10 text-center bg-gray-100">
      <p>{dictionary.footer?.copyright.replace('{year}', currentYear)}</p>
    </footer>
  )
}
