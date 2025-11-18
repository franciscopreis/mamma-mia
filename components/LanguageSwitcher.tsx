'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

const languages = [
  { code: 'pt', name: 'Português', flag: '🇵🇹', abbr: 'PT' },
  { code: 'en', name: 'English', flag: '🇺🇸', abbr: 'EN' },
  { code: 'es', name: 'Español', flag: '🇪🇸', abbr: 'ES' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', abbr: 'FR' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', abbr: 'DE' },
]

export default function LanguageSwitcher({
  currentLang,
}: {
  currentLang: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find((lang) => lang.code === currentLang)

  const changeLanguage = (newLang: string) => {
    const newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`)
    router.push(newPathname)
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
      {/* Botão do dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-lg px-1 py-1 lg:text-sm text-xs cursor-pointer hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
        aria-label="Escolher língua"
        aria-expanded="true"
      >
        <span className="text-xs lg:text-sm">{currentLanguage?.flag}</span>
        <span className="hidden sm:block">{currentLanguage?.abbr}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-emerald-50 transition-colors ${
                currentLang === lang.code
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{lang.name}</span>
                <span className="text-xs text-gray-500">{lang.abbr}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
