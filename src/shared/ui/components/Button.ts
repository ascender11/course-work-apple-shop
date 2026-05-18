import { cn, html } from '@/shared/lib'

export interface ButtonProps {
  text: string
  className?: string
  icon?: string | null
  variant?: 'primary' | 'outline'
  href?: string
}

export const Button = ({ text, className = '', icon = null, variant = 'primary', href = '' }: ButtonProps) => {
  const classes = cn('button flex items-center justify-center gap-2', variant === 'outline' && 'outline', className)

  if (href) {
    return html`
      <a 
        href="${href}"
        class="${classes}"
      >
        ${icon ? icon : ''}
        <span>${text}</span>
      </a>
    `
  }

  return html`
    <button 
      class="${classes}"
    >
      ${icon ? icon : ''}
      <span>${text}</span>
    </button>
  `
}
