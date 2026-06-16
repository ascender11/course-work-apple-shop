import { cn, html } from '@/shared/lib'

export interface AddedToCartProps {
  className?: string
}

export const AddedToCart = ({ className = '' }: AddedToCartProps = {}) => {
  return html`
    <svg 
      viewBox="0 0 24 24" 
      class="${cn('text-text-button w-6 h-6', className)}"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M.75 1.5a.75.75 0 0 0 0 1.5h1.665l.602 2.41 2.246 11.978A.75.75 0 0 0 6 18h1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6H18a3 3 0 1 0 0 6 3 3 0 0 0 0-6h1.5a.75.75 0 0 0 .736-.612l2.25-12a.75.75 0 0 0-.736-.888H4.335l-.607-2.432A.75.75 0 0 0 3 1.5H.75ZM9 21a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm10.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM17.031 9.531l-4.5 4.5a.751.751 0 0 1-1.062 0l-2.25-2.25a.75.75 0 1 1 1.062-1.062L12 12.439l3.969-3.97a.75.75 0 1 1 1.062 1.062Z" 
        fill="currentColor"
      />
    </svg>
  `
}
