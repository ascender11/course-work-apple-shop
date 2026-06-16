import { cn, html } from '@/shared/lib'

export interface ButtonProps {
  text: string
  className?: string
  icon?: string | null
  variant?: 'primary' | 'outline'
}

export const Button = ({ text, className = '', icon = null, variant = 'primary' }: ButtonProps) => {
  return html`
    <button 
      class="${cn('button flex items-center justify-center gap-2', variant === 'outline' && 'outline', className)}"
    >
      ${icon ? icon : ''}
      <span>${text}</span>
    </button>
  `
}
