import Hero from '@/components/Hero/Hero'
import Restaurant from '@/components/Restaurant'
import Footer from '@/components/Footer'

// ✅ Skeletons
import HeroSkeleton from '@/components/skeletons/HeroSkeleton'
import TestimonialsSkeleton from '@/components/skeletons/TestimonialsSkeleton'
import ContactSkeleton from '@/components/skeletons/ContactSkeleton'
import RestaurantSkeleton from '@/components/skeletons/RestaurantSkeleton'
// ✅ LAZY LOAD de componentes pesados
import dynamic from 'next/dynamic'

const Pizzas = dynamic(() => import('@/components/Pizzas'), {
  loading: () => <div className="h-96 bg-amber-200/30 animate-pulse" />,
})

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <TestimonialsSkeleton />,
})

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <ContactSkeleton />,
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
