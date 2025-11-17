import Image from 'next/image'

const items = [
  {
    name: 'Bacalhau à casa',
    price: '12.50',
    img: 'https://scontent.flis5-4.fna.fbcdn.net/v/t39.30808-6/500739543_3556060464526657_9045518344571953947_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cf85f3&_nc_ohc=tBw2fjGdixAQ7kNvwEFVXms&_nc_oc=Adl1ecF07X2S3v4u6LZ_Nh7SCKeNEO06TkT27uIh2GE5wYWAx3aTtj9h29X_vkpZAlPDlu1B3aIMSULw005yay3J&_nc_zt=23&_nc_ht=scontent.flis5-4.fna&_nc_gid=23lSMePEII_DRglXFIPeYA&oh=00_AfialhQXZj8i8ykIBdTHM3qwTEQ7c9vDjDoLj_SBIzk42A&oe=691EA014',
  },

  {
    name: 'Calamari Fritti',
    price: '22.90',
    img: 'https://scontent.flis5-3.fna.fbcdn.net/v/t39.30808-6/500708292_3556060801193290_6030192453432218128_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cf85f3&_nc_ohc=WZW23pxDaJMQ7kNvwHPa2s7&_nc_oc=Admjr0HQ9qixIOfojmysSvLuasj3Uedanzhb5viI4ZMSOT9kC8c7S5BzPn_zJi5A00wuC43965JwzwyQXCwca0Hn&_nc_zt=23&_nc_ht=scontent.flis5-3.fna&_nc_gid=TCEUld7O1KrV5zv39e1Ffw&oh=00_AfgKEdBHPG6zrqsQl8h26Rt9RoE-cnFhJDbgzCHXV34sdg&oe=691E9F61',
  },
  {
    name: 'Gamberoni All Grilia',
    price: '13.90',
    img: 'https://scontent.flis5-4.fna.fbcdn.net/v/t39.30808-6/500733265_3556060787859958_2407742095810330297_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cf85f3&_nc_ohc=__4gD2Hgjh0Q7kNvwF2wcAN&_nc_oc=AdlW33bQdu4eb5LL2g22yQ-2v0FVg2BXeeyHrN8tEgaXorQR8A6uBYPByxKVEL01rNytHaY-7sUvwcQRikLqKNtL&_nc_zt=23&_nc_ht=scontent.flis5-4.fna&_nc_gid=WF1cZCFUnYKMA1ewCt6DUg&oh=00_AfhTj3vb6iL-haBy-s5sp-5lc6iMzvJijTsyJlxklWFBmg&oe=691E9C94',
  },
  {
    name: 'Bacalhau com natas',
    price: '13.90',
    img: 'https://scontent.flis5-4.fna.fbcdn.net/v/t39.30808-6/500706381_3556060474526656_2790388702125749856_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cf85f3&_nc_ohc=P0mAvyJQV9wQ7kNvwEgzUch&_nc_oc=Adm0bR3oLHgGsn8ao5eeU3kEXgsBB8ZW1-EP4wcTdDGIt47xBQ7U5eBQFbtPB-D382s8U2ET2N93ZrX4sK0ynhSs&_nc_zt=23&_nc_ht=scontent.flis5-4.fna&_nc_gid=bATuZ54qRhDeVrQyCQBZIQ&oh=00_AfgyCXEO0kqfLMjhf8ZSBQMSF6rYRnfgh7UZxXcjpYvbgw&oe=691EACE1',
  },
  {
    name: 'Lulas Grelhadas',
    price: '13.90',
    img: 'https://scontent.flis5-3.fna.fbcdn.net/v/t39.30808-6/500708292_3556060491193321_5148684967931779275_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=cf85f3&_nc_ohc=cKPIKAPXIGgQ7kNvwEuHwKe&_nc_oc=Adlg7-Z0l1WZpg6eKv7jN82NoYs2sZtB9rIJgHRpbMjm5ik3-UylnHz8LfTqg70YUBkzaTO5Xiu9mC2HM4FNY-dE&_nc_zt=23&_nc_ht=scontent.flis5-3.fna&_nc_gid=inv2ZZRFOg_k9A-qGpYTRw&oh=00_AfgmGt6iVMpcjskhUoE8SpxUtM9l8_wtBnz4ifAD2A2jbg&oe=691E9D9C',
  },
  {
    name: 'Carne de porco à alentejana',
    price: '13.90',
    img: 'https://scontent.flis5-3.fna.fbcdn.net/v/t39.30808-6/500736705_3556060661193304_4905793428813736520_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cf85f3&_nc_ohc=n-Wul625zNgQ7kNvwEHEDsP&_nc_oc=AdmnMVLtzn4ieYZ--9whM-Cym2BkaUCn1u3_1I0V9mX-jGl9tBlYZxfRsG7HrPlGovdwpVmxfFO44DxiSMsH-uFH&_nc_zt=23&_nc_ht=scontent.flis5-3.fna&_nc_gid=APlEzaeeeRT1aKC1F44dtw&oh=00_AfhUgcHLtyWOQ6icEKdPAsEqRfQVKL2lkEaEUvp3tyt6kQ&oe=691E96A9',
  },
]

export default function Featured() {
  return (
    <section id="featured" className="py-5 px-4 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl max-w-xl mx-auto md:text-4xl font-bold mb-10">
        Conheça os nossos pratos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-15">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-4 p-4 border rounded-xl shadow-sm"
          >
            <div className="relative w-20 h-20">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-pizza-red font-bold text-lg">€{item.price}</p>
            </div>
          </div>
        ))}
      </div>
      <hr />
    </section>
  )
}
