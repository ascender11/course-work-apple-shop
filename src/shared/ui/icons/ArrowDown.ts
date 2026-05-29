import { cn, html } from '@/shared/lib'

export interface ArrowDownProps {
  className?: string
}

export const ArrowDown = ({ className = '' }: ArrowDownProps = {}) => {
  return html`
    <svg
      viewBox="0 0 24 24"
      class="${cn('w-4 h-4 transition-transform duration-200', className)}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m6 7.2 6 6 6-6 2.4 1.2-8.4 8.4-8.4-8.4L6 7.2Z" fill="currentColor"/>
    </svg>
  `
}
