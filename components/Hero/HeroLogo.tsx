import Image from 'next/image'

export default function HeroLogo() {
  return (
    <div className="flex flex-col items-center">
      <div>
        {' '}
        <Image
          src="/pizzeria-lettering.png"
          className="relative top-15"
          alt="Pizzeria Mamma Mia"
          width={300}
          height={300}
        />
      </div>
      <div>
        {' '}
        <Image
          src="/logo.png"
          alt="Pizzeria Mamma Mia"
          width={200}
          height={200}
        />
      </div>
      <div>
        <Image
          src="/mamma-mia-lettering.png"
          alt="Pizzeria Mamma Mia"
          width={300}
          height={300}
        />
      </div>
    </div>
  )
}
