'use client'

import Image from 'next/image'
import ScrollParallax from './ScrollParallax'
import { useDictionary } from '@/hooks/useDictionary'
import { getNestedValue } from '@/utils/objectHelpers'
import SkeletonSection from './skeletons/SkeletonSection'

export type Pizza = {
  number: number | string
  nameKey: string
  img: string
  ingredientsKey: string
  price: string
  category: string
}

const items: Pizza[] = [
  {
    number: '0A',
    nameKey: 'pizzas.items.parma.name',
    img: '/facebook/0A-pizza-parma.webp',
    ingredientsKey: 'pizzas.items.parma.ingredients',
    price: '17.90',
    category: 'pizzas',
  },
  {
    number: '0B',
    nameKey: 'pizzas.items.padovana.name',
    img: '/facebook/0B-pizza-padovana.webp',
    ingredientsKey: 'pizzas.items.padovana.ingredients',
    price: '18.90',
    category: 'pizzas',
  },
  {
    number: '0C',
    nameKey: 'pizzas.items.bacon.name',
    img: '/facebook/0C-pizza-bacon.webp',
    ingredientsKey: 'pizzas.items.bacon.ingredients',
    price: '16.90',
    category: 'pizzas',
  },
  {
    number: '1',
    nameKey: 'pizzas.items.margherita.name',
    img: '/facebook/1-pizza-margarita.webp',
    ingredientsKey: 'pizzas.items.margherita.ingredients',
    price: '16.90',
    category: 'pizzas',
  },
  {
    number: '2',
    nameKey: 'pizzas.items.salame.name',
    img: '/facebook/2-pizza-salame.webp',
    ingredientsKey: 'pizzas.items.salame.ingredients',
    price: '16.90',
    category: 'pizzas',
  },
  {
    number: '3',
    nameKey: 'pizzas.items.funghi.name',
    img: '/facebook/3-pizza-funghi.webp',
    ingredientsKey: 'pizzas.items.funghi.ingredients',
    price: '16.90',
    category: 'pizzas',
  },
]

export default function Pizzas() {
  const { dictionary } = useDictionary()

  // ✅ Usar SkeletonSection diretamente
  if (!dictionary) return <SkeletonSection type="pizzas" />

  return (
    <section id="pizzas" className="py-16 w-full bg-amber-200/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* ✅ Título */}
        <div className="mb-12">
          <ScrollParallax startY={30} delay={100}>
            <h2 className="text-center text-2xl md:text-3xl tracking-wide italic font-serif text-red-800 leading-snug">
              {dictionary.pizzas?.title}
            </h2>
          </ScrollParallax>
        </div>

        {/* ✅ Grid compacto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((pizza) => (
            <PizzaCard
              key={pizza.nameKey}
              pizza={pizza}
              dictionary={dictionary}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ✅ Componente de pizza compacto
function PizzaCard({ pizza, dictionary }: { pizza: Pizza; dictionary: any }) {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      {/* ✅ Imagem compacta */}
      <div className="relative w-full aspect-[4/3] mb-4 max-w-[200px]">
        <Image
          src={pizza.img}
          alt={getNestedValue(dictionary, pizza.nameKey)}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={75}
          className="object-cover rounded-lg"
        />
      </div>

      {/* ✅ Conteúdo compacto */}
      <div className="text-center space-y-2 w-full flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-emerald-800 tracking-wide leading-tight">
          {pizza.number} - {getNestedValue(dictionary, pizza.nameKey)}
        </h3>

        <p className="text-xs text-red-700 leading-tight flex-grow flex items-center justify-center px-2">
          {getNestedValue(dictionary, pizza.ingredientsKey)}
        </p>

        <div className="pt-2">
          <span className="text-xl font-bold text-emerald-700">
            {pizza.price}€
          </span>
        </div>
      </div>
    </div>
  )
}
