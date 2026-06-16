import { cn, html } from '@/shared/lib'

export interface RingsProps {
  className?: string
}

export const Rings = ({ className = '' }: RingsProps = {}) => {
  return html`
    <svg 
      viewBox="0 0 24 24" 
      class="${cn('w-6 h-6 transition-colors duration-200 text-text-quinary hover:text-primary', className)}"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fill-rule="evenodd" 
        clip-rule="evenodd" 
        d="M4.708 15.44a6.967 6.967 0 0 0 3.997 1.266 7 7 0 1 0 6.59-9.413A7 7 0 1 0 4.708 15.44Zm1.147-1.64c.718.505 1.557.81 2.432.886a6.97 6.97 0 0 1 1.256-4.408 6.97 6.97 0 0 1 3.713-2.687 5 5 0 1 0-7.4 6.21V13.8Zm12.29-3.603a4.977 4.977 0 0 0-2.432-.885 6.97 6.97 0 0 1-1.256 4.408 6.97 6.97 0 0 1-3.713 2.687 5 5 0 1 0 7.4-6.21h.001Z"
        fill="currentColor"
      />
    </svg>
  `
}
