import { cn, html } from '@/shared/lib'

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
        'flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-gray-100/50',
        'lg:bg-(image:--card-gradient)',
        className
      )}"
    >
      <img
        src="${icon}"
        class="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
      />
      <h5 class="text-xl font-bold text-gray-950 text-center">
        ${title}
      </h5>
      <p class="text-sm text-gray-600 text-center">
        ${description}
      </p>
    </div>
  `
}
