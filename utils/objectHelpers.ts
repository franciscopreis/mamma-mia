// src/utils/objectHelpers.ts
import type { Dictionary } from '@/i18n/types'

// ✅ Tipo seguro para acessar objetos aninhados
type NestedString<T> = T extends string
  ? T
  : {
      [K in keyof T]: T[K] extends object ? NestedString<T[K]> : T[K]
    }

export function getNestedValue(obj: Dictionary, path: string): string {
  const keys = path.split('.') as (keyof Dictionary)[]
  let current: unknown = obj

  for (const key of keys) {
    if (current && typeof current === 'object' && key in (current as object)) {
      current = (current as Record<string, unknown>)[key as string]
    } else {
      console.warn(`Translation key not found: ${path}`)
      return path
    }
  }

  return typeof current === 'string' ? current : path
}
