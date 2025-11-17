import Image from 'next/image'

export default function About() {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-center mx-auto ">
      <div className="flex mx-auto justify-center items-center">
        <p className="text-gray-700 max-w-3xl">
          A nossa pizzaria foi fundada a 25 de Julho de 1996 e quem conhece
          Santa Cruz conhece o Mamma Mia e as suas pizzas.
        </p>
      </div>
      <div className="relative w-full h-64 rounded-xl overflow-hidden shadow">
        <Image src="/hero.jpg" alt="Our Story" fill className="object-cover" />
      </div>
    </div>
  )
}
