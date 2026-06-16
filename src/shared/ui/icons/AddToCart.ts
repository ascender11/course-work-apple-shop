import { cn, html } from '@/shared/lib'

export interface AddToCartProps {
  className?: string
}

export const AddToCart = ({ className = '' }: AddToCartProps = {}) => {
  return html`
    <svg 
      viewBox="0 0 24 24" 
      class="${cn('text-text-button w-6 h-6', className)}"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
        <path 
          d="M.75 1.5a.75.75 0 0 0 0 1.5h1.665l.602 2.41 2.246 11.978A.75.75 0 0 0 6 18h1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6H18a3 3 0 1 0 0 6 3 3 0 0 0 0-6h1.5a.75.75 0 0 0 .736-.612l2.25-12a.75.75 0 0 0-.736-.888H4.335l-.607-2.432A.75.75 0 0 0 3 1.5H.75ZM9 21a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm10.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-6-12.75v2.25h2.25a.75.75 0 1 1 0 1.5H13.5v2.25a.75.75 0 1 1-1.5 0V12H9.75a.75.75 0 1 1 0-1.5H12V8.25a.75.75 0 1 1 1.5 0Z"
          fill="currentColor"
        />
    </svg>
  `
}
