import { cn, html } from '@/shared/lib'

export interface PackageProps {
  className?: string
}

export const Package = ({ className = '' }: PackageProps = {}) => {
  return html`
    <svg
      viewBox="0 0 24 24"
      class="${cn('text-text-quinary w-6 h-6', className)}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `
}
