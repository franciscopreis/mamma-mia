'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FaTripadvisor,
  FaFacebook,
  FaChevronRight,
  FaChevronLeft,
} from 'react-icons/fa'
import { SiGooglemaps } from 'react-icons/si'
import ScrollParallax from './ScrollParallax'

const reviews = [
  // {
  //   text: 'Gosto imenso deste restaurante e da variedade de pratos que tem! O atendimento é excelente e rápido! ',
  //   author: '— Beatriz Mota',
  //   plataform: 'Restaurant Guru',
  // },
  {
    text: 'Recomendo todo o serviço, desde o atendimento rápido até à simpatia da equipa, passando pela qualidade das pizzas.',
    author: '— Ariana Sofia',
    plataform: 'Facebook',
  },
  {
    text: 'To start service is excellent. All the food we had was so tasty, salad, apps and house wine. Would highly recommend. Was in Portugal for 3 months must have ate here at least 5 times.',
    author: '— Sandra Rodrigues',
    plataform: 'Trip Advisor',
  },
  {
    text: 'Wow! The food is Amazing!! Seafood is amazing! Steaks are amazing! All the traditional Portuguese dishes are phenomenal!',
    author: '— Will',
    plataform: 'Google Maps',
  },
  // {
  //   text: 'Um restaurante a visitar nas idas a Santa Cruz. Recomendo a combinação de uma das deliciosas pizzas com uma das frescas e diversas saladas disponíveis no menu, e sangria a acompanhar. A vista para o mar é o ponto forte deste restaurante, tornando toda a experiência bastante agradável. ',
  //   author: '— Inês Ferreira',
  //   plataform: 'Restaurant Guru',
  // },
  {
    text: 'Love this place! Very nice staff! Food is fabulous, and price is excellent. Location is even better, with views of the ocean while you eat.',
    author: '— Jose Shing',
    plataform: 'Facebook',
  },
  {
    text: 'Already eaten very well twice on our holiday. Once pizza and lasagne and once picanha and grilled squid. All super delicious!',
    author: '— Kevin',
    plataform: 'Trip Advisor',
  },
  {
    text: 'Excelente pizzaria com muita escolha além dos pratos italianos. Muita variedade de carnes e excelentes preços. Recomendo',
    author: '— Miguel Peixoto',
    plataform: 'Google Maps',
  },
]

// Função para retornar o ícone correto
const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'Trip Advisor':
      return (
        <FaTripadvisor className="inline-block text-green-600 ml-2 relative bottom-0.5" />
      )
    case 'Facebook':
      return (
        <FaFacebook className="inline-block text-blue-600 ml-2 relative bottom-0.5" />
      )
    case 'Google Maps':
      return (
        <SiGooglemaps className="inline-block text-red-600 ml-2 relative bottom-0.5" />
      )
    // case 'Restaurant Guru':
    //   return (
    //     <Image
    //       src="/icons/restaurant-guru.svg"
    //       alt="Restaurant Guru"
    //       width={25}
    //       height={25}
    //       className="inline-block ml-2 relative"
    //     />
    //   )
    default:
      return null
  }
}

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((i) => (i + 1) % reviews.length)
  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length)

  useEffect(() => {
    const timer = setTimeout(next, 5000) // autoplay a cada 5s
    return () => clearTimeout(timer)
  }, [index])

  return (
    <section className="relative py-15 w-full bg-emerald-100" id="testimonials">
      <div className="relative">
        {/* <Image
          src="/testimonial-bg.jpg"
          alt="Pizza Background"
          fill
          className="object-cover -z-10 opacity-70"
        /> */}

        <ScrollParallax fromX={-100} fromY={0}>
          <h2 className="text-center text-3xl md:text-4xl tracking-wide italic font-serif text-red-800 leading-snug mb-5">
            O que dizem os nossos{' '}
            <span className="text-emerald-800">clientes</span>
          </h2>
        </ScrollParallax>

        <div className="flex flex-row max-w-3xl mx-auto items-center">
          {/* Seta Esquerda */}
          <button
            aria-label="Anterior"
            onClick={prev}
            className=" px-4 py-2 h-8 rounded-lg shadow hover:bg-white transition cursor-pointer"
          >
            <FaChevronLeft />
          </button>
          <div className="h-40 flex items-center justify-center text-sm max-w-xs lg:max-w- mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 50) prev() // arrastou para a direita
                  if (info.offset.x < -50) next() // arrastou para a esquerda
                }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45 }}
                className="absolute cursor-grab active:cursor-grabbing"
              >
                <p className="italic max-w-xl text-center lg:text-base text-sm">
                  {reviews[index].text}
                </p>
                <p className="mt-4 font-semibold text-center">
                  {reviews[index].author}
                  {getPlatformIcon(reviews[index].plataform)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Seta Direita */}
          <button
            aria-label="Seguinte"
            onClick={next}
            className=" px-4 py-2 rounded-lg shadow hover:bg-white transition cursor-pointer"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="mx-auto justify-center flex text-xs ">
        {/* As bola */}
        <div className="flex justify-center gap-2 mt-5">
          {reviews.map((_, i) => (
            <button
              aria-label="Reviews"
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition cursor-pointer ${
                i === index ? 'bg-emerald-600' : 'bg-emerald-200'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="flex  flex-wrap justify-center gap-6 mt-10 mb-5 text-emerald-600 font-semibold">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/mammamia.sta.cruz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border px-4 py-2 rounded-xl  transition"
        >
          <span>99 %</span>
          <FaFacebook className="text-blue-500 text-xl" />
        </a>

        {/* Google Maps */}
        <a
          href="https://www.google.com/maps/place/Pizzeria+Mamma+Mia/@39.1337248,-9.3868453,17z/data=!4m6!3m5!1s0xd1f31bebc2b8daf:0x8d7fd173ee42c87e!8m2!3d39.1337207!4d-9.3819744!16s%2Fg%2F11c0w0hxrr?entry=ttu&g_ep=EgoyMDI1MTExMi4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2  px-4 py-2 rounded-xl border transition "
        >
          <span>4.3 ★ </span>{' '}
          <SiGooglemaps className="text-red-500 text-xl w-max-min" />
        </a>

        {/* TripAdvisor */}
        <a
          href="https://www.tripadvisor.com/Restaurant_Review-g656858-d4783857-Reviews-Pizzeria_Mamma_Mia-Torres_Vedras_Lisbon_District_Central_Portugal.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2  px-4 py-2 rounded-xl border transition"
        >
          <span>4 ★</span>
          <FaTripadvisor className="text-green-500 text-xl" />
        </a>
      </div>
    </section>
  )
}
