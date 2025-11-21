'use client'

import Link from 'next/link'
import { WhatsApp } from './ui/Icons'
import { useDictionary } from '@/hooks/useDictionary'
import SkeletonBlock from './skeletons/SkeletonBlock'
import SkeletonSection from './skeletons/SkeletonSection'

export default function Contact() {
  const { dictionary } = useDictionary()

  return (
    <section
      id="contact"
      className="py-15 px-4 max-w-5xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-5"
    >
      {dictionary ? (
        <>
          <div className="flex flex-col justify-center text-center md:text-left border-2 border-emerald-800 rounded-lg max-w-sm mx-auto py-6 w-full h-[650px]">
            <h2 className="text-3xl md:text-4xl tracking-wide italic font-serif text-red-800 leading-snug text-center">
              {dictionary.contact?.hours.title}
            </h2>
            {/* Horários */}
            <div className="mt-4 px-6 space-y-4 flex-1">
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-base font-medium mb-3 px-4 py-2 text-emerald-800 bg-emerald-50 rounded-lg">
                    {dictionary.contact?.hours.openDays}
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-emerald-700">
                      {dictionary.contact?.hours.lunch}:
                    </span>
                    <span className="font-semibold">
                      {dictionary.contact?.hours.lunchTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-emerald-700">
                      {dictionary.contact?.hours.dinner}:
                    </span>
                    <span className="font-semibold">
                      {dictionary.contact?.hours.dinnerTime}
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-red-700 font-medium">
                    {dictionary.contact?.hours.closedDay}:
                  </span>
                  <span className="font-medium text-red-700 bg-red-50 px-3 py-1 rounded-lg">
                    {dictionary.contact?.hours.closed}
                  </span>
                </div>
              </div>
              <hr className="w-full border border-emerald-800 my-4" />
              <h2 className="text-3xl md:text-4xl tracking-wide italic font-serif text-red-800 leading-snug text-center">
                {dictionary.contact?.info.title}
              </h2>
              <div className="mt-4 space-y-3 text-gray-700 text-center">
                <p className="font-medium">
                  {dictionary.contact?.info.address}
                </p>
                <p>
                  <Link
                    href="tel:+351261937695"
                    className="text-emerald-700 hover:text-red-700 transition-colors hover:scale-105 font-semibold text-lg"
                    aria-label={dictionary.contact?.ariaLabels.callPhone}
                  >
                    +351 261 937 695
                  </Link>
                </p>
              </div>
              <div className="mt-6 mx-auto text-center">
                <a
                  href="https://wa.me/351913963958?text=Olá!%20Quero%20mais%20informações"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-105 mx-auto"
                >
                  <WhatsApp className="text-xl " />
                  {dictionary.contact?.whatsapp.button}
                </a>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[700px] rounded-2xl overflow-hidden shadow-lg max-w-sm mx-auto">
            <iframe
              aria-label={dictionary.contact?.ariaLabels.mapLocation}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3094.802528970234!2d-9.384554687909617!3d39.13372483260613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1f31bebc2b8daf%3A0x8d7fd173ee42c87e!2sPizzeria%20Mamma%20Mia!5e0!3m2!1sen!2spt!4v1763218420562!5m2!1sen!2spt"
              width="100%"
              height="100%"
              className="rounded-2xl border-2 border-emerald-800"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </>
      ) : (
        <SkeletonSection type="contact" />
      )}
    </section>
  )
}
