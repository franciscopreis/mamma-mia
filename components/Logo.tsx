import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center gap-1">
      <Image
        src="/logo.png"
        alt="Pizzeria Mamma Mia"
        width={80}
        height={80}
        className="w-10  lg:w-10"
      />

      <Image
        src="/mamma-mia-lettering.png"
        alt="Pizzeria Mamma Mia"
        width={150}
        height={80}
        className="w-20  lg:w-30"
      />
    </div>
  )
}
