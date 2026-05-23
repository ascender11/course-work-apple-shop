import { cn, html } from '@/shared/lib'

export interface LinkProps {
  text: string
  href: string
  className?: string
  navigo?: boolean
}

export const Link = ({ text, href, className = '', navigo = true }: LinkProps) => {
  return html`
    <a href="${href}" class="${cn('link', className)}"${navigo ? ' data-navigo' : ''}>
      ${text}
    </a>
  `
}
