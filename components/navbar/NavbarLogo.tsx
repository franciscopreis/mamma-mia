// NavbarLogo.tsx (opcional, se quiser hover/efeitos)
'use client'

import Logo from './Logo'

interface NavbarLogoProps {
  className?: string
}

export default function NavbarLogo({ className = '' }: NavbarLogoProps) {
  return (
    <div className={`transition-transform hover:scale-105 ${className}`}>
      <Logo />
    </div>
  )
}
