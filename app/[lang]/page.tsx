// pagelayout.tsx

import Hero from '@/components/Hero/Hero'
import Restaurant from '@/components/Restaurant'
import Footer from '@/components/Footer'
import SkeletonSection from '@/components/skeletons/SkeletonSection'
import dynamic from 'next/dynamic'

// ✅ LAZY LOAD componentes pesados com SkeletonSection
const Pizzas = dynamic(() => import('@/components/Pizzas'), {
  loading: () => <SkeletonSection type="pizzas" />,
})

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <SkeletonSection type="testimonials" />,
})

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <SkeletonSection type="contact" />,
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
