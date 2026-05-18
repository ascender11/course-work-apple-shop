import { cn, html } from '@/shared/lib'
import { Button } from '@/shared/ui/components'

export interface BannerProps {
  className?: string
}

export const Banner = ({ className = '' }: BannerProps = {}) => {
  return html`
    <section class="${cn('relative overflow-hidden min-h-37.75 bg-black flex items-center pl-25 sm:pl-50 sm:min-h-51 lg:pl-112.5 lg:min-h-90', className)}">
      <img 
        src="/src/pages/home/sections/banner/assets/phone-banner-image.png"
        class="absolute top-0 left-4 w-16.25 sm:w-27.5 sm:left-10 lg:w-61.5"  
      />
      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-1 text-white">
          <h1 class="text-xl font-bold sm:text-3xl lg:text-6xl">iPhone 14 Pro Max</h1>
          <p class="lg:text-2xl">по лучшей цене в Москве</p>
        </div>

        ${Button({ text: 'Подробнее', className: 'w-40' })}
      </div>
    </section>
  `
}
