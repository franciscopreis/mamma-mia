'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useDictionary } from '@/hooks/useDictionary'

interface OpeningStatusProps {
  className?: string
}

export default function OpeningStatus({ className = '' }: OpeningStatusProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const accordionRef = useRef<HTMLButtonElement>(null)
  const { dictionary, loading } = useDictionary()

  // Calcular se está aberto baseado nos horários
  const { isOpen, nextOpening } = useMemo(() => {
    const now = new Date()
    const currentDay = now.getDay() // 0 = Domingo, 1 = Segunda, etc.
    const currentHour = now.getHours()
    const currentMinutes = now.getMinutes()
    const currentTime = currentHour + currentMinutes / 60

    // Horários baseados na secção Contact
    const isMonday = currentDay === 1 // Segunda-feira fechado
    const lunchTime = currentTime >= 12 && currentTime < 14
    const dinnerTime = currentTime >= 18 && currentTime < 23
    const isWeekdayOpen = currentDay >= 2 && currentDay <= 6 // Terça a Sexta
    const isWeekendOpen = currentDay === 0 || currentDay === 6 // Sábado e Domingo

    const isOpen =
      !isMonday && (lunchTime || dinnerTime) && (isWeekdayOpen || isWeekendOpen)

    // Calcular próximo horário de abertura
    let nextOpeningTime = ''
    if (isMonday) {
      nextOpeningTime =
        dictionary?.openingStatus?.nextOpening.tomorrowLunch ||
        'amanhã às 12:00'
    } else if (!lunchTime && currentTime < 12) {
      nextOpeningTime =
        dictionary?.openingStatus?.nextOpening.todayLunch || 'hoje às 12:00'
    } else if (!dinnerTime && currentTime < 18) {
      nextOpeningTime =
        dictionary?.openingStatus?.nextOpening.todayDinner || 'hoje às 18:00'
    } else {
      nextOpeningTime =
        dictionary?.openingStatus?.nextOpening.tomorrowLunch ||
        'amanhã às 12:00'
    }

    return { isOpen, nextOpening: nextOpeningTime }
  }, [dictionary])

  // Efeito para fazer scroll quando o acordeão abre
  useEffect(() => {
    if (isExpanded && accordionRef.current) {
      const timer = setTimeout(() => {
        accordionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
      }, 350)

      return () => clearTimeout(timer)
    }
  }, [isExpanded])

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  // Loading state
  if (loading) {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div className="animate-pulse bg-gray-300 h-6 w-32 rounded mb-4"></div>
      </div>
    )
  }

  if (!dictionary) {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div className="text-gray-500">Horário indisponível</div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Display principal - Aberto/Fechado */}
      <div className="text-center">
        <div
          className={`text-base font-medium mb-1 border rounded-lg px-3 py-1 text-stone-800 ${
            isOpen ? 'bg-emerald-400' : 'bg-red-400'
          }`}
        >
          {isOpen
            ? dictionary.openingStatus?.status.open
            : dictionary.openingStatus?.status.closed}
        </div>
      </div>

      {/* Botão "Ver horários" */}
      {isExpanded ? (
        <button
          onClick={handleToggle}
          className="mt-4 text-xs font-light tracking-wide transition-all duration-300 border border-gray-400 rounded-lg px-3 py-1 backdrop-blur-sm bg-gray-100/80 text-gray-700 hover:scale-105 active:scale-95 cursor-pointer"
          aria-expanded="true"
          aria-label={dictionary.openingStatus?.ariaLabels.close}
        >
          {dictionary.openingStatus?.buttons.close}
        </button>
      ) : (
        <button
          onClick={handleToggle}
          className="mt-4 text-xs font-light tracking-wide transition-all duration-300 border border-gray-300 rounded-lg px-3 py-1 backdrop-blur-sm bg-white/50 text-gray-600 hover:bg-white/70 hover:scale-105 active:scale-95 cursor-pointer"
          aria-expanded="false"
          aria-label={dictionary.openingStatus?.ariaLabels.open}
          ref={accordionRef}
        >
          {dictionary.openingStatus?.buttons.viewHours}
        </button>
      )}

      {/* Acordeão com horários */}
      {isExpanded ? (
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out w-full max-h-55 opacity-70 mt-4"
          aria-hidden="false"
        >
          <div className="bg-white/50 rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="space-y-3 text-sm text-gray-700">
              <div className="text-center font-semibold text-gray-800 mb-2">
                {dictionary.openingStatus?.hours.title}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-emerald-600">
                    {dictionary.openingStatus?.hours.weekdays}
                  </span>
                </div>
                <div className="flex justify-between pl-4 text-sm">
                  <span>{dictionary.openingStatus?.hours.lunch}</span>
                  <span className="font-medium">
                    {dictionary.openingStatus?.hours.lunchTime}
                  </span>
                </div>
                <div className="flex justify-between pl-4 text-sm">
                  <span>{dictionary.openingStatus?.hours.dinner}</span>
                  <span className="font-medium">
                    {dictionary.openingStatus?.hours.dinnerTime}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-medium">
                    {dictionary.openingStatus?.hours.monday}
                  </span>
                  <span className="font-medium text-red-600">
                    {dictionary.openingStatus?.hours.closed}
                  </span>
                </div>
              </div>

              {!isOpen && (
                <div className="pt-3 border-t border-gray-200 text-center">
                  <p className="text-xs text-gray-600">
                    {dictionary.openingStatus?.nextOpening.weOpen}{' '}
                    <span className="font-semibold text-emerald-700">
                      {nextOpening}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out w-full max-h-0 opacity-0"
          aria-hidden="true"
        >
          <div className="bg-white/50 rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="space-y-3 text-sm text-gray-700">
              <div className="text-center font-semibold text-gray-800 mb-2">
                {dictionary.openingStatus?.hours.title}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
