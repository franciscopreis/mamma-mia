export interface Dictionary {
  hero: {
    subtitle: string
    menuButton: string
  }
  navigation: {
    home: string
    pizzeria: string
    menu: string
    testimonials: string
    contacts: string
    ariaLabels: {
      openMenu: string
      closeMenu: string
      homePage: string
      callPhone: string
    }
  }
  restaurant: {
    mainTitle: string
    catchphrase: string
    description1: string
    description2: string
  }
  pizzas: {
    title: string
    items: {
      [key: string]: {
        name: string
        ingredients: string
      }
    }
  }
  testimonials: {
    title: string
    ariaLabels: {
      previous: string
      next: string
      viewReview: string
    }
    ratings: {
      facebook: string
      google: string
      tripadvisor: string
    }
  }
  contact: {
    hours: {
      title: string
      open: string
      openDays: string
      closed: string
      closedDay: string
      lunch: string
      lunchTime: string
      dinner: string
      dinnerTime: string
    }
    info: {
      title: string
      address: string
    }
    whatsapp: {
      button: string
    }
    ariaLabels: {
      callPhone: string
      mapLocation: string
    }
  }
  footer: {
    copyright: string
  }
  home: {
    title: string
    description: string
  }
  openingStatus: {
    status: {
      open: string
      closed: string
    }
    buttons: {
      viewHours: string
      close: string
    }
    ariaLabels: {
      open: string
      close: string
    }
    hours: {
      title: string
      weekdays: string
      lunch: string
      lunchTime: string
      dinner: string
      dinnerTime: string
      monday: string
      closed: string
    }
    nextOpening: {
      weOpen: string
      todayLunch: string
      todayDinner: string
      tomorrowLunch: string
    }
  }
}

export type SupportedLocale = 'pt' | 'en' | 'es' | 'fr'
