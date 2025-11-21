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

  if (!dictionary) return <SkeletonSection type="pizzas" />

  return (
    <section
      id="pizzas"
      className="py-15 w-full bg-cover bg-center bg-amber-200/30"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <ScrollParallax startY={30} delay={100}>
          <h2 className="text-center text-3xl md:text-4xl tracking-wide italic font-serif text-red-800 leading-snug mb-5">
            {dictionary.pizzas?.title}
          </h2>
        </ScrollParallax>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((p) => (
            <div key={p.nameKey} className="flex flex-col items-center p-3">
              <div className="relative mb-4 lg:px-5 lg:pt-5 w-full aspect-4/3">
                <Image
                  src={p.img}
                  alt={getNestedValue(dictionary, p.nameKey)}
                  width={309}
                  height={232}
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  quality={75}
                  className="object-cover rounded-xl w-full h-full"
                />
              </div>
              <h3 className="md:text-xl text-sm font-medium mb-2 text-emerald-800 tracking-wider leading-tight">
                {p.number} - {getNestedValue(dictionary, p.nameKey)}
              </h3>
              <p className="md:text-base text-xs mb-4 text-red-800">
                {getNestedValue(dictionary, p.ingredientsKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
