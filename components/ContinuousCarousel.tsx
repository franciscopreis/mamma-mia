'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ContinuousCarousel() {
  const images = [
    '/santa-cruz-praia.jpg',
    '/guincho-santa-cruz.jpg',
    'https://cdn-outdarego.ptisp.systems/zomato/galeries/u_ODYwOTE1NzA5ND-USER_PHOTO-5f8762a5afe8c5d3a13cfd30b4dfce43_1423054387.jpg',
    'https://scontent.flis5-3.fna.fbcdn.net/v/t1.6435-9/100629522_1971661939633192_2277246451236995072_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=0b6b33&_nc_ohc=H8bgdw7PSVcQ7kNvwHB9cd6&_nc_oc=AdkDH889Eck1_t3ZxvxKXnQv2BNux2LAsxCwM5GyWj1R_XimDZjGQWEpuyeX543h5uBpLHKMDxT-NQ71ZQds0O8f&_nc_zt=23&_nc_ht=scontent.flis5-3.fna&_nc_gid=4FK787crb18t6NvK1DMTKA&oh=00_AfgPGD-Yk-42va42MmvejcL3HZGA8jjhIeorPwiJcftZGA&oe=69409647',
  ]

  // Duplicar imagens para efeito loop contínuo
  const loopedImages = [...images, ...images]

  return (
    <div className="overflow-hidden relative w-full py-5">
      <motion.div
        className="flex"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 20,
          ease: 'linear',
        }}
      >
        {loopedImages.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[50vw] md:w-[35vw] lg:w-[25vw] h-64 md:h-80 relative"
          >
            <Image
              src={src}
              alt={`Imagem ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </motion.div>

      <p></p>
    </div>
  )
}
