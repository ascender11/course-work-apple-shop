import { t } from '@/shared/i18n'
import { cn, html } from '@/shared/lib'
import { Button } from '@/shared/ui/components'

export interface CtaBannerProps {
  className?: string
}

export const CtaBanner = ({ className = '' }: CtaBannerProps = {}) => {
  return html`
    <section class="${cn(
      'flex flex-col items-center text-center p-6 sm:px-10 xl:px-16 gap-5 bg-background',
      className
    )}">
      <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-bold md:text-3xl">
          ${t('home.cta.title')}
        </h2>
        <p class="text-base text-text-quinary sm:text-xl">
          ${t('home.cta.subtitle')}
        </p>
      </div>
      <div class="flex gap-3">
        ${Button({
          text: t('home.cta.start'),
          href: '/login',
          className:
            'text-white text-sm sm:text-lg min-w-30 sm:min-w-40 py-3 rounded-xl bg-linear-to-r from-[#0071E4] to-[#9747FF]',
        })}
        ${Button({
          text: t('home.cta.more'),
          variant: 'outline',
          href: '/delivery',
          className: 'min-w-30 text-sm sm:text-lg sm:min-w-40 py-3 rounded-xl',
        })}
      </div>
    </section>
  `
}
