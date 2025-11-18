import Hero from '@/components/Hero/Hero'
import Restaurant from '@/components/Restaurant'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// ✅ LAZY LOAD de componentes pesados
import dynamic from 'next/dynamic'

const Pizzas = dynamic(() => import('@/components/Pizzas'), {
  loading: () => <div className="h-96 bg-amber-200/30 animate-pulse" />,
})

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => (
    <section className="py-15 w-full bg-emerald-100">
      <div className="animate-pulse max-w-3xl mx-auto px-4">
        <div className="h-8 bg-gray-300 rounded mb-10"></div>
        <div className="h-20 bg-gray-300 rounded"></div>
      </div>
    </section>
  ),
})

// ✅ INTERFACE CORRETA
interface PageProps {
  params: Promise<{ lang: string }>
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params

  return (
    <>
      <Hero />
      <Restaurant />
      <Pizzas />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}
