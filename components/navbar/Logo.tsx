// Logo.tsx
import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center gap-1">
      <Image
        src="/logo.png"
        alt="Pizzeria Mamma Mia"
        width={40}
        height={40}
        className="w-auto h-auto" // fixo, mantém proporção
      />
      <Image
        src="/mamma-mia-lettering.png"
        alt="Pizzeria Mamma Mia"
        width={120}
        height={40}
        className=" w-auto h-auto" // fixo, mantém proporção
      />
    </div>
  )
}
