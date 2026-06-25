import { cn, html } from '@/shared/lib'

interface PayCardProps {
  icon: string
  title: string
  text: string
  className?: string
}

export const PayCard = ({ icon, title, text, className }: PayCardProps): string => html`
  <div class="${cn('bg-background-quaternary rounded-2xl p-4 flex flex-col gap-3', className)}">
    <div class="flex items-center gap-3">
      <img src="/delivery/${icon}" alt="" class="w-14 h-14 object-contain shrink-0" />
      <p class="text-base font-bold text-text-primary pt-1">${title}</p>
    </div>
    <p class="text-sm text-text-tertiary leading-relaxed">${text}</p>
  </div>
`
