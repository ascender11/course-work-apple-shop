import { cn, html } from '@/shared/lib'

export interface ArrowLeftProps {
  className?: string
}

export const ArrowLeft = ({ className = '' }: ArrowLeftProps = {}) => {
  return html`
    <svg 
      viewBox="0 0 24 24" 
      class="${cn('text-text-primary w-6 h-6', className)}"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="m16.8 6-6 6 6 6-1.2 2.4L7.2 12l8.4-8.4L16.8 6Z" 
        fill="currentColor" 
        opacity="0.5"
      />
    </svg>
  `
}
