import { cn, html } from '@/shared/lib'

export interface PhoneProps {
  width?: number
  height?: number
  className?: string
}

export const Phone = ({ width = 24, height = 24, className = '' }: PhoneProps = {}) => {
  return html`
    <svg 
      width="${width}" 
      height="${height}" 
      class="${cn('text-text-primary', className)}"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="m10.134 10.536 1.611-1.476a3 3 0 0 0 .78-3.264l-.687-1.835a2.874 2.874 0 0 0-3.531-1.74c-2.574.788-4.553 3.18-3.944 6.021a22.927 22.927 0 0 0 2.62 6.711 23.882 23.882 0 0 0 4.542 5.65c2.15 1.957 5.225 1.468 7.204-.377a2.848 2.848 0 0 0 .256-3.894l-1.26-1.53a3 3 0 0 0-3.22-.957l-2.082.655a9.941 9.941 0 0 1-1.404-1.834 9.407 9.407 0 0 1-.885-2.132v.002Z" 
        fill="currentColor"
      />
    </svg>
  `
}
