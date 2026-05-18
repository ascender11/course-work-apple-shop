import { cn, html } from '@/shared/lib'
import { Button } from '@/shared/ui/components'

export interface CtaBannerProps {
  className?: string
}

export const CtaBanner = ({ className = '' }: CtaBannerProps = {}) => {
  return html`
    <section class="${cn(
      'flex flex-col items-center text-center p-4 gap-5 bg-background',
      'md:p-6 md:px-8 md:gap-6',
      'lg:px-16 lg:py-8',
      className
    )}">
      
      <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-bold md:text-3xl">
          Покупайте <span class="text-primary">Apple</span> быстрее и удобнее
        </h2>
        <p class="text-base text-text-quinary sm:text-xl">
          Создайте аккаунт за минуту — и ваша корзина, избранное и заказы всегда будут с вами.
        </p>
      </div>

      <div class="flex gap-3">
        ${Button({
          text: 'Начать',
          href: '#',
          className:
            'text-white text-sm sm:text-lg min-w-30 sm:min-w-40 py-3 rounded-xl bg-linear-to-r from-[#0071E4] to-[#9747FF]',
        })}
        ${Button({
          text: 'Подробнее',
          variant: 'outline',
          href: '#',
          className: 'min-w-30 text-sm sm:text-lg sm:min-w-40 py-3 rounded-xl',
        })}
      </div>
    </section>
  `
}
