import Image from 'next/image'

export default function HeroLogo() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[300px] h-[75px]">
        {' '}
        <Image
          src="/pizzeria-lettering.png"
          alt="Pizzeria Mamma Mia"
          width={300}
          height={75}
          className="relative top-15 object-contain"
        />
      </div>
      <div className="w-[200px] h-[200px]">
        {' '}
        <Image
          src="/logo.png"
          alt="Pizzeria Mamma Mia"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>
      <div className="w-[300px] h-[75px]">
        {' '}
        <Image
          src="/mamma-mia-lettering.png"
          alt="Pizzeria Mamma Mia"
          width={300}
          height={75}
          className="object-contain"
        />
      </div>
    </div>
  )
}
