import { cn, html } from '@/shared/lib'

export interface LinkProps {
  text: string
  href: string
  className?: string
}

export const Link = ({ text, href, className = '' }: LinkProps) => {
  return html`
    <a href="${href}" class="${cn('link', className)}">
      ${text}
    </a>
  `
}
