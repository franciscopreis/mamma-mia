'use client'

import { useMemo } from 'react'
import { useDictionary } from '@/hooks/useDictionary'

interface OpeningStatusProps {
  className?: string
}

export default function OpeningStatus({ className = '' }: OpeningStatusProps) {
  const { dictionary } = useDictionary()

  const { isOpen, nextOpening } = useMemo(() => {
    if (!dictionary) return { isOpen: false, nextOpening: '' }

    const now = new Date()
    const currentDay = now.getDay()
    const currentHour = now.getHours()
    const currentMinutes = now.getMinutes()
    const currentTime = currentHour + currentMinutes / 60

    const isMonday = currentDay === 1
    const lunchTime = currentTime >= 12 && currentTime < 14
    const dinnerTime = currentTime >= 18 && currentTime < 23
    const isWeekdayOpen = currentDay >= 2 && currentDay <= 6
    const isWeekendOpen = currentDay === 0 || currentDay === 6

    const isOpen =
      !isMonday && (lunchTime || dinnerTime) && (isWeekdayOpen || isWeekendOpen)

    let nextOpeningTime = ''
    if (isMonday) {
      nextOpeningTime =
        dictionary.openingStatus?.nextOpening.tomorrowLunch || 'amanhã às 12:00'
    } else if (!lunchTime && currentTime < 12) {
      nextOpeningTime =
        dictionary.openingStatus?.nextOpening.todayLunch || 'hoje às 12:00'
    } else if (!dinnerTime && currentTime < 18) {
      nextOpeningTime =
        dictionary.openingStatus?.nextOpening.todayDinner || 'hoje às 18:00'
    } else {
      nextOpeningTime =
        dictionary.openingStatus?.nextOpening.tomorrowLunch || 'amanhã às 12:00'
    }

    return { isOpen, nextOpening: nextOpeningTime }
  }, [dictionary])

  if (!dictionary) {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div className="text-gray-500">Horário indisponível</div>
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col items-center text-center space-y-4 ${className}`}
    >
      {/* Status Aberto/Fechado */}
      <div
        className={`text-lg font-bold px-6 py-3 rounded-xl shadow-md w-fit ${
          isOpen
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            : 'bg-red-100 text-red-800 border border-red-300'
        }`}
      >
        {isOpen
          ? dictionary.openingStatus?.status.open
          : dictionary.openingStatus?.status.closed}
      </div>

      {/* Próximo horário se fechado */}
      {!isOpen && (
        <div className="text-sm text-gray-700">
          {dictionary.openingStatus?.nextOpening.weOpen}{' '}
          <span className="font-semibold text-emerald-700">{nextOpening}</span>
        </div>
      )}

      {/* Horários detalhados em coluna */}
      <div className="flex flex-col space-y-3 mt-2 w-full max-w-xs bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200">
        {/* Dias de semana */}
        <div className="flex flex-col space-y-1">
          <span className="font-medium text-emerald-700 text-left flex flex-col">
            {dictionary.openingStatus?.hours.weekdays}
          </span>
          <span className="text-gray-700 text-right">
            {dictionary.openingStatus?.hours.lunch}:{' '}
            {dictionary.openingStatus?.hours.lunchTime}
          </span>
          <span className="text-gray-700 text-right">
            {dictionary.openingStatus?.hours.dinner}:{' '}
            {dictionary.openingStatus?.hours.dinnerTime}
          </span>
        </div>

        {/* Segunda-feira fechado */}
        <div className="flex justify-between border-t border-gray-200 pt-2">
          <span className="font-medium text-red-700">
            {dictionary.openingStatus?.hours.monday}:
          </span>
          <span className="text-red-700 font-medium">
            {dictionary.openingStatus?.hours.closed}
          </span>
        </div>
      </div>
    </div>
  )
}
