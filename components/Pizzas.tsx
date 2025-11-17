import Image from 'next/image'
import ScrollParallax from './ScrollParallax'

type Pizza = {
  number: number | string
  name: string
  img: string
  ingredients: string
  price: string
  category: string
}

const items: Pizza[] = [
  {
    number: '0A',
    name: 'Pizza Parma',
    img: '/facebook/0A-pizza-parma.jpg',
    ingredients: 'tomate • queijo • presunto',
    price: '17.90',
    category: 'pizzas',
  },
  {
    number: '0B',
    name: 'Pizza Padovana',
    img: '/facebook/0B-pizza-padovana.jpg',
    ingredients: 'tomate • queijo • paio do lombo',
    price: '18.90',
    category: 'pizzas',
  },
  {
    number: '0C',
    name: 'Pizza Bacon',
    img: '/facebook/0C-pizza-bacon.jpg',
    ingredients: 'tomate • queijo • bacon',
    price: '16.90',
    category: 'pizzas',
  },
  {
    number: '1',
    name: 'Pizza Margarita',
    img: '/facebook/1-pizza-margarita.jpg',
    ingredients: 'tomate • queijo',
    price: '16.90',
    category: 'pizzas',
  },
  {
    number: '2',
    name: 'Pizza Salame',
    img: '/facebook/2-pizza-salame.jpg',
    ingredients: 'tomate • queijo • salame',
    price: '16.90',
    category: 'pizzas',
  },
  {
    number: '3',
    name: 'Pizza Funghi',
    img: '/facebook/3-pizza-funghi.jpg',
    ingredients: 'tomate • queijo • cogumelos',
    price: '16.90',
    category: 'pizzas',
  },
]

export default function Pizzas() {
  return (
    <section
      id="pizzas"
      className="py-15 w-full  bg-cover bg-center  bg-amber-200/30 "
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <ScrollParallax startY={30} delay={100}>
          <h2 className="text-center text-3xl md:text-4xl tracking-wide italic font-serif text-red-800 leading-snug mb-5">
            Conheça as nossas <span className="text-emerald-800">pizzas</span>
            <br></br> e não só
          </h2>
        </ScrollParallax>

        <div className="grid grid-cols-2 md:grid-cols-3 ">
          {items.map((p) => (
            <div key={p.name} className="flex flex-col items-center  p-3">
              <div className="relative  mb-4 lg:px-5 lg:pt-5">
                <Image
                  src={p.img}
                  alt={p.name}
                  width={800}
                  height={500}
                  className="object-cover rounded-xl"
                />
              </div>
              <h3 className="md:text-xl text-sm font-medium mb-2 text-emerald-800  tracking-wider leading-tight">
                {p.number} - {p.name}
              </h3>
              <p className="md:text-base text-xs mb-4 text-red-800">
                {p.ingredients}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
