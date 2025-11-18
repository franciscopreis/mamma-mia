import Hero from '@/components/Hero'
import Pizzas from '@/components/Pizzas'
import Testimonials from '@/components/Testimonials'
import Restaurant from '@/components/Restaurant'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// ✅ Interface para params
interface HomePageProps {
  params: Promise<{ lang: string }>
}

export default async function Page({ params }: HomePageProps) {
  // ✅ Obter o idioma dos params (necessário para generateStaticParams)
  const { lang } = await params

  return (
    <>
      {/* ❌ NÃO precisa passar lang - os componentes usam useDictionary() */}
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
