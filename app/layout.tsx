import { Montserrat, Roboto } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'],
})
export const metadata = {
  title: 'Pizzeria Mamma Mia',
  description:
    'Pizzas com o autêntico sabor das pizzas italianas em Santa Cruz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body
        className={`${montserrat.variable} ${roboto.variable} antialiased bg-white text-gray-800 font-montserrat`}
      >
        <Navbar />
        <main className="pt-13">{children}</main>
      </body>
    </html>
  )
}
