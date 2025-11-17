import Hero from '@/components/Hero'
import Image from 'next/image'
import Section from '@/components/Section'
import Pizzas from '@/components/Pizzas'
import Featured from '@/components/Featured'
import Testimonials from '@/components/Testimonials'
import Restaurant from '@/components/Restaurant'
import Contact from '@/components/Contact'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Hero />

      <Restaurant />

      <Pizzas />

      {/* <Featured /> */}

      <Testimonials />

      {/* <About /> */}

      <Contact />

      <Footer />
    </>
  )
}
