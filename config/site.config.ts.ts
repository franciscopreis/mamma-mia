import type { Dictionary } from '@/i18n/types'

export const getNavbarLinks = (dictionary: Dictionary) => [
  { href: '#restaurant', label: dictionary.navigation.pizzeria },
  { href: '#pizzas', label: dictionary.navigation.menu },
  { href: '#testimonials', label: dictionary.navigation.testimonials },
  { href: '#contact', label: dictionary.navigation.contacts },
]

export const phoneNumber = '+351261937695'
