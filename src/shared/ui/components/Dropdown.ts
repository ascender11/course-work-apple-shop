import { cn, html } from '@/shared/lib'
import { ArrowDown } from '@/shared/ui/icons'

export interface DropdownProps {
  id: string
  title: string
  content: string
  openByDefault?: boolean
  isActive?: boolean
  className?: string
}

export const Dropdown = ({
  id,
  title,
  content,
  openByDefault = false,
  isActive = false,
  className = '',
}: DropdownProps) => {
  const isOpen = openByDefault || isActive

  return html`
    <div class="${cn('bg-background rounded-lg', className)}">
      <button
        data-accordion-target="${id}"
        class="flex w-full items-center font-medium justify-between py-3 px-6 transition-colors"
      >
        <span>${title}</span>
        ${ArrowDown({ className: `accordion-arrow text-primary${isOpen ? ' rotate-180' : ''}` })}
      </button>
      <div id="${id}" class="${isOpen ? '' : 'hidden'} pb-3">
        ${content}
      </div>
    </div>
  `
}
