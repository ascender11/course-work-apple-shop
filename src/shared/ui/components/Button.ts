import { cn, html } from '@/shared/lib'

export interface ButtonProps {
  text: string
  className?: string
}

export const Button = ({ text, className = '' }: ButtonProps) => {
  return html`
      <button class="${cn('button', className)}">
        ${text}
      </button>
    `
}
