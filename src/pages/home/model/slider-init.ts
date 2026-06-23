import Swiper from 'swiper'
import { Autoplay, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

export const initHomeSlider = () => {
  const container = document.getElementById('home-slider')
  if (!container) return

  const swiper = new Swiper(container, {
    modules: [Navigation, Autoplay],
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.home-slider__arrow--next',
      prevEl: '.home-slider__arrow--prev',
      addIcons: false,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  })

  return swiper
}
