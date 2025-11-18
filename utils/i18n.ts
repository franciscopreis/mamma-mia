// src/utils/i18n.ts
import 'server-only'
import type { Dictionary, SupportedLocale } from '@/i18n/types'

const dictionaries: Record<SupportedLocale, () => Promise<Dictionary>> = {
  pt: () =>
    import('@/i18n/dictionaries/pt.json').then(
      (module) => module.default as Dictionary
    ),
  en: () =>
    import('@/i18n/dictionaries/en.json').then(
      (module) => module.default as Dictionary
    ),
  es: () =>
    import('@/i18n/dictionaries/es.json').then(
      (module) => module.default as Dictionary
    ),
  fr: () =>
    import('@/i18n/dictionaries/fr.json').then(
      (module) => module.default as Dictionary
    ),
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const supportedLocale = locale as SupportedLocale
  return dictionaries[supportedLocale]?.() ?? dictionaries.pt()
}
