import AutoCarousel from './AutoCarousel'
import CinematicImageReveal from './CinematicImageReveal'
import ContinuousCarousel from './ContinuousCarousel'
import ScrollParallax from './ScrollParallax'

export default function Restaurant() {
  return (
    <section className="py-15 px-5 md:px-10 " id="restaurant">
      {/* TITULOS PRINCIPAIS */}
      <div className="max-w-4xl mx-auto flex flex-col">
        <ScrollParallax fromX={-100} fromY={0}>
          <h2 className="text-center text-3xl md:text-4xl tracking-wide italic font-serif text-red-800 leading-snug">
            A vista é de graça <br></br>e a simpatia também
          </h2>
        </ScrollParallax>

        {/* <ScrollParallax fromX={80} fromY={10}>
          <h3 className="text-center text-xl md:text-2xl font-serif text-emerald-700 tracking-wide leading-relaxed">
            Aproveite as nossas pizzas aqui ou leve-as a conhecer Santa Cruz
          </h3>
        </ScrollParallax> */}
      </div>
      {/* CARROSSEL */}
      <div className="mt-5">
        <ContinuousCarousel />
      </div>
      {/* SUBTITULOS ADICIONAIS */}

      <div className="flex flex-col max-w-3xl mx-auto py-2 text-lg gap-3 text-justify">
        <p className="text-lg tracking-widest leading-loose font-semibold text-emerald-800">
          Se não nos conhecer é porque não deve ser de cá{' '}
        </p>
        <p className="text-lg tracking-wide leading-relaxed">
          Há quase 30 anos abertos ao público, a nossa pizzaria já faz parte da
          rotina daqueles que por conhecem Santa Cruz. Poderá contar connosco
          para deliciosas pizzas italianas e também para receitas da cozinha
          portuguesa e italiana.
        </p>
        <p className="text-lg tracking-wide leading-relaxed">
          Venha conhecer-nos. Fique connosco ou venha buscar como take away, e
          saboreie as nossas pizzas imerso na paisagem de Santa Cruz.
        </p>
      </div>
    </section>
  )
}
