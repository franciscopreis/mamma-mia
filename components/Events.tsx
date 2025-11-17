import Image from 'next/image'

const ev = [
  { name: 'Italian Pasta Workshop', date: 'Feb 5', img: '/event1.jpg' },
  { name: 'Pizza House Holiday Sale', date: 'Dec 12', img: '/event2.jpg' },
  { name: 'Pizza House Midseason Sale', date: 'Mar 14', img: '/event3.jpg' },
]

export default function Events() {
  return (
    <section id="events" className="py-20 px-4 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {ev.map((e) => (
          <div key={e.name} className="rounded-xl overflow-hidden shadow">
            <div className="relative w-full h-48">
              <Image src={e.img} alt={e.name} fill className="object-cover" />
            </div>
            <div className="p-4 text-left">
              <h3 className="text-xl font-semibold">{e.name}</h3>
              <p className="text-gray-500 text-sm">{e.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
