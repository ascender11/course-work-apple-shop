import { cn, html } from '@/shared/lib'

export interface BurgerMenuProps {
  width?: number
  height?: number
  className?: string
}

export const BurgerMenu = ({ width = 24, height = 24, className = '' }: BurgerMenuProps = {}) => {
  return html`
    <svg 
      width="${width}" 
      height="${height}" 
      class="${cn('burger-menu-icon', className)}"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <line class="line-1" x1="4" y1="6" x2="20" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line class="line-2" x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line class="line-3" x1="4" y1="18" x2="20" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `
}
