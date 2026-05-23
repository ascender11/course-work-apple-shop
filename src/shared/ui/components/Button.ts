import { cn, html } from '@/shared/lib'

export interface ButtonProps {
  text: string
  className?: string
  icon?: string | null
  variant?: 'primary' | 'outline'
  href?: string
  navigo?: boolean
}

export const Button = ({ text, className = '', icon = null, variant = 'primary', href = '', navigo = true }: ButtonProps) => {
  const classes = cn('button flex items-center justify-center gap-2', variant === 'outline' && 'outline', className)

  if (href) {
    return html`
      <a
        href="${href}"
        class="${classes}"${navigo ? ' data-navigo' : ''}
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
