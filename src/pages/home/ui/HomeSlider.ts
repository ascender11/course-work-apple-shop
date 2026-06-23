import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'
import { Button } from '@/shared/ui/components'
import { ArrowLeft, ArrowRight } from '@/shared/ui/icons'

import { initHomeSlider } from '../model/slider-init'

const slides = [
  {
    titleKey: 'home.slider.slide1.title',
    specsKey: 'home.slider.slide1.specs',
    image: '/catalog/iPadPro13.png',
    bg: '#1a2332',
  },
  {
    titleKey: 'home.slider.slide2.title',
    specsKey: 'home.slider.slide2.specs',
    image: '/catalog/iPhone16.png',
    bg: '#1a1a1a',
  },
  {
    titleKey: 'home.slider.slide3.title',
    specsKey: 'home.slider.slide3.specs',
    image: '/catalog/iPhone16ProMax.png',
    bg: '#1a2332',
  },
  {
    titleKey: 'home.slider.slide4.title',
    specsKey: 'home.slider.slide4.specs',
    image: '/catalog/AppleWatchSeries10.png',
    bg: '#f8d7d7',
  },
  {
    titleKey: 'home.slider.slide5.title',
    specsKey: 'home.slider.slide5.specs',
    image: '/catalog/iPadPro11.png',
    bg: '#1a1a1a',
  },
]

export const HomeSlider = () => {
  const init = () => {
    const observer = new MutationObserver((_, obs) => {
      const element = document.getElementById('home-slider')
      if (element) {
        obs.disconnect()
        initHomeSlider()
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }

  if (typeof window !== 'undefined') init()

  const renderSlide = (slide: (typeof slides)[number]) => {
    return html`
      <div class="swiper-slide">
        <div class="home-slide" style="background-color: ${slide.bg};">
          <div class="home-slide-mobile">
            <div class="home-slide__content">
              <h2 class="home-slide__title" style="color: ${slide.bg === '#f8d7d7' ? '#1a1a1a' : '#fff'};">${t(slide.titleKey)}</h2>
              <div class="home-slide__specs" style="color: ${slide.bg === '#f8d7d7' ? '#1a1a1a' : '#fff'};">
                ${t(slide.specsKey)}
              </div>
              ${Button({ text: t('home.slider.more'), className: 'rounded-full px-6 py-2.5 text-base font-semibold', variant: 'outline' })}
            </div>
            <img class="home-slide__image" src="${slide.image}" alt="${t(slide.titleKey)}" />
          </div>
          <div class="home-slide-desktop">
            <div class="home-slide__content">
              <h2 class="home-slide__title" style="color: ${slide.bg === '#f8d7d7' ? '#1a1a1a' : '#fff'};">${t(slide.titleKey)}</h2>
              <div class="home-slide__specs" style="color: ${slide.bg === '#f8d7d7' ? '#1a1a1a' : '#fff'};">
                ${t(slide.specsKey)}
              </div>
              ${Button({ text: t('home.slider.more'), className: 'rounded-full px-6 py-2.5 text-base font-semibold', variant: 'outline' })}
            </div>
            <img class="home-slide__image" src="${slide.image}" alt="${t(slide.titleKey)}" />
          </div>
        </div>
      </div>
    `
  }

  return html`
    <section class="home-slider-section">
      <div class="home-slider-container">
        <div id="home-slider" class="home-slider swiper">
          <div class="swiper-wrapper">
            ${slides.map((slide) => renderSlide(slide)).join('')}
          </div>
        </div>
      </div>
      <div class="home-slider__arrow home-slider__arrow--prev">
        ${ArrowLeft({ className: 'w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10 text-text-primary/50' })}
      </div>
      <div class="home-slider__arrow home-slider__arrow--next">
        ${ArrowRight({ className: 'w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10 text-text-primary/50' })}
      </div>
    </section>
  `
}
