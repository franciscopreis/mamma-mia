// hooks/useDictionary.ts - VOLTA À VERSÃO ORIGINAL
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { Dictionary, SupportedLocale } from '@/i18n/types'

export function useDictionary() {
  const params = useParams()
  const [dictionary, setDictionary] = useState<Dictionary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDictionary = async () => {
      const lang = params.lang as SupportedLocale

      setLoading(true)

      try {
        // ✅ REMOVE o ?ts= - volta ao original
        const dict = await import(`@/i18n/dictionaries/${lang}.json`)
        setDictionary(dict.default as Dictionary)
      } catch (error) {
        console.warn(`Language ${lang} not found, falling back to Portuguese`)
        const dict = await import(`@/i18n/dictionaries/pt.json`)
        setDictionary(dict.default as Dictionary)
      } finally {
        setLoading(false)
      }
    }

    loadDictionary()
  }, [params.lang])

  return { dictionary, loading }
}
