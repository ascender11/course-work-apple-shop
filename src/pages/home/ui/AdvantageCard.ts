import { cn, html } from '@/shared/lib'
import { Button } from '@/shared/ui/components'

export interface AdvantageCardProps {
  icon: string
  title: string
  description: string
  gradient: string
  className?: string
}

export const AdvantageCard = ({ icon, title, description, gradient, className = '' }: AdvantageCardProps) => {
  return html`
    <div
      style="--card-gradient: ${gradient};"
      class="${cn(
        'grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-2 p-4 bg-white rounded-2xl border border-gray-100/50',
        'md:grid-cols-[auto_1fr_1fr] md:grid-rows-[auto_auto] md:gap-x-5 md:gap-y-1 md:items-center',
        'lg:flex lg:flex-col lg:text-center lg:items-center lg:gap-4 lg:p-6 lg:h-full lg:bg-(image:--card-gradient)',
        className
      )}"
    >
      <img
        src="${icon}"
        class="w-6 h-6 md:w-12 md:h-12 lg:w-40 lg:h-40 object-contain md:row-span-2 lg:mx-auto"
      />
      <h5 class="text-xl font-bold text-gray-950 md:col-start-2 lg:col-start-auto">
        ${title}
      </h5>
      <p class="text-base text-gray-600 max-w-sm col-span-2 md:col-span-1 md:col-start-2 lg:col-start-auto">
        ${description}
      </p>
      ${Button({
        text: 'Подробнее',
        variant: 'outline',
        href: '#',
        className: cn(
          'col-span-2 w-full md:col-span-1 md:row-start-1 md:col-start-3 md:row-span-2 md:self-center',
          'lg:col-start-auto lg:row-span-1 lg:mt-auto lg:w-full'
        ),
      })}
    </div>
  `
}
