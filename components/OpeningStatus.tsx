'use client'

import { useState, useMemo, useRef, useEffect } from 'react'

interface OpeningStatusProps {
  className?: string
}

export default function OpeningStatus({ className = '' }: OpeningStatusProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const accordionRef = useRef<HTMLButtonElement>(null)

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
    let nextOpening = ''
    if (isMonday) {
      nextOpening = 'amanhã às 12:00'
    } else if (!lunchTime && currentTime < 12) {
      nextOpening = 'hoje às 12:00'
    } else if (!dinnerTime && currentTime < 18) {
      nextOpening = 'hoje às 18:00'
    } else {
      nextOpening = 'amanhã às 12:00'
    }

    return { isOpen, nextOpening }
  }, [])

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

  // Função para lidar com o clique do botão
  const handleToggle = () => {
    setIsExpanded(!isExpanded)
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
          {isOpen ? 'Estamos abertos' : 'Estamos fechados'}
        </div>
      </div>

      {/* Botão "Ver horários" */}
      {isExpanded ? (
        <button
          onClick={handleToggle}
          className="mt-4 text-xs font-light tracking-wide transition-all duration-300 border border-gray-400 rounded-lg px-3 py-1 backdrop-blur-sm bg-gray-100/80 text-gray-700 hover:scale-105 active:scale-95 cursor-pointer"
          aria-expanded="true"
          aria-label="Fechar horários"
        >
          Fechar
        </button>
      ) : (
        <button
          onClick={handleToggle}
          className="mt-4 text-xs font-light tracking-wide transition-all duration-300 border border-gray-300 rounded-lg px-3 py-1 backdrop-blur-sm bg-white/50 text-gray-600 hover:bg-white/70 hover:scale-105 active:scale-95 cursor-pointer"
          aria-expanded="false"
          aria-label="Ver horários"
          ref={accordionRef}
        >
          Veja os nossos horários
        </button>
      )}

      {/* Acordeão com horários - com ref para scroll */}
      {isExpanded ? (
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out w-full max-h-55 opacity-70 mt-4"
          aria-hidden="false"
        >
          <div className="bg-white/50 rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="space-y-3 text-sm text-gray-700">
              <div className="text-center font-semibold text-gray-800 mb-2">
                Horário de Funcionamento
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-emerald-600">
                    Terça a Domingo:
                  </span>
                </div>
                <div className="flex justify-between pl-4 text-sm">
                  <span>Almoço</span>
                  <span className="font-medium">12:00 - 14:00</span>
                </div>
                <div className="flex justify-between pl-4 text-sm">
                  <span>Jantar</span>
                  <span className="font-medium">18:00 - 23:00</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-medium">
                    Segunda-feira:
                  </span>
                  <span className="font-medium text-red-600">Fechado</span>
                </div>
              </div>

              {!isOpen && (
                <div className="pt-3 border-t border-gray-200 text-center">
                  <p className="text-xs text-gray-600">
                    Abrimos{' '}
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
                Horário de Funcionamento
              </div>
              {/* Conteúdo vazio quando fechado */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
