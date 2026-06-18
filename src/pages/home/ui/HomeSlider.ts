import { html } from '@/shared/lib'
import { Button } from '@/shared/ui/components'
import { ArrowLeft, ArrowRight } from '@/shared/ui/icons'

import { initHomeSlider } from '../model/slider-init'

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

  return html`
    <div id="home-slider" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide relative flex! flex-col! items-center! gap-2.5 bg-[#D0EAFC] pt-4 min-h-80 sm:gap-3.75 sm:pt-12.5 sm:min-h-120 xl:items-start! xl:pl-179 xl:pt-32 xl:min-h-122">
          <h1 class="text-center font-semibold text-4xl text-[#1E3240] sm:text-6xl xl:text-[88px]">
            iPh<span class="mx-1 inline-block h-4.5 w-10.5 rounded-full border-4 border-[#1E3240] sm:mx-1.25 sm:h-8 sm:w-17.5 sm:border-8 xl:h-11.25 xl:w-25.25 xl:border-11"></span>ne 14
          </h1>
          <h2 class="text-center text-3xl text-[#1E3240] sm:text-4xl xl:text-6xl">от 137 900 ₽</h2>
          ${Button({ text: 'Подробнее', className: 'sm:px-7.5 sm:py-3.75' })}
          <img
            class="absolute top-42.5 w-42.5 sm:top-69.5 sm:w-67.5 xl:left-67.5 xl:top-26.75 xl:w-99.5"
            src="/home/iPhone-14.png"
            alt="iPhone 14"
          />
        </div>
        <div class="swiper-slide relative flex! flex-col! items-center! gap-2.5 bg-[#D0EAFC] pt-4 min-h-80 sm:gap-3.75 sm:pt-12.5 sm:min-h-120 xl:items-start! xl:pl-179 xl:pt-32 xl:min-h-122">
          <h1 class="text-center font-semibold text-4xl text-[#1E3240] sm:text-6xl xl:text-[88px]">
            iPh<span class="mx-1 inline-block h-4.5 w-10.5 rounded-full border-4 border-[#1E3240] sm:mx-1.25 sm:h-8 sm:w-17.5 sm:border-8 xl:h-11.25 xl:w-25.25 xl:border-11"></span>ne 14
          </h1>
          <h2 class="text-center text-3xl text-[#1E3240] sm:text-4xl xl:text-6xl">от 137 900 ₽</h2>
          ${Button({ text: 'Подробнее', className: 'sm:px-7.5 sm:py-3.75' })}
          <img
            class="absolute top-42.5 w-42.5 sm:top-69.5 sm:w-67.5 xl:left-67.5 xl:top-26.75 xl:w-99.5"
            src="/home/iPhone-14.png"
            alt="iPhone 14"
          />
        </div>
      </div>
      <div class="swiper-button-prev bottom-0 left-4! h-6! w-6! sm:left-6! sm:h-10! sm:w-10! xl:left-30!">
        ${ArrowLeft({ className: 'sm:h-10 sm:w-10' })}
      </div>
      <div class="swiper-button-next bottom-0 right-4! h-6! w-6! sm:right-6! sm:h-10! sm:w-10! xl:right-30!">
        ${ArrowRight({ className: 'sm:h-10 sm:w-10' })}
      </div>
    </div>
  `
}
