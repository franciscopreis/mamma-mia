'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

const languages = [
  { code: 'pt', name: 'Português', flag: '🇵🇹', abbr: 'PT' },
  { code: 'en', name: 'English', flag: '🇺🇸', abbr: 'EN' },
  { code: 'es', name: 'Español', flag: '🇪🇸', abbr: 'ES' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', abbr: 'FR' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', abbr: 'DE' },
]

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Linguagem derivada da URL
  const currentLang =
    languages.find((lang) => pathname.split('/')[1] === lang.code) ||
    languages[0]

  const changeLanguage = (newLang: string) => {
    const segments = pathname.split('/').filter(Boolean)
    if (!languages.some((l) => l.code === segments[0]))
      segments.unshift(newLang)
    else segments[0] = newLang

    router.push('/' + segments.join('/'))
    setIsOpen(false)
  }

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1  rounded cursor-pointer"
      >
        <span>{currentLang.flag}</span>
        <span className="hidden sm:block">{currentLang.abbr}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white border rounded shadow-lg z-50 ">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center gap-2 w-full px-4 py-2 text-left cursor-pointer ${
                currentLang.code === lang.code
                  ? 'bg-emerald-400 text-emerald-800'
                  : 'text-gray-700'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
