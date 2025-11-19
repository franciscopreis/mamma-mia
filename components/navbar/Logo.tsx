// Logo.tsx ATUALIZADO
import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center gap-1">
      <Image
        src="/logo.png"
        alt="Pizzeria Mamma Mia"
        width={40}
        height={40}
        className="w-10 h-10 lg:w-10 lg:h-10"
      />
      <Image
        src="/mamma-mia-lettering.png"
        alt="Pizzeria Mamma Mia"
        width={120}
        height={40}
        className="w-20 h-5 lg:w-30 lg:h-8"
      />
    </div>
  )
}
