import { cn, html } from '@/shared/lib'
import { AddedToCart, AddToCart } from '@/shared/ui/icons'

export interface CartToggleButtonProps {
  productId: string
  isInCart?: boolean
  className?: string
}

export const CartToggleButton = ({ productId, isInCart = false, className = '' }: CartToggleButtonProps) => html`
  <button
    class="js-add-to-cart button flex items-center justify-center gap-2 w-full ${cn(isInCart ? 'bg-success hover:bg-success-hover' : 'bg-primary hover:bg-primary-hover', className)}"
    data-product-id="${productId}"
    ${isInCart ? 'data-in-cart="1"' : ''}
    aria-label="${isInCart ? 'Убрать из корзины' : 'Добавить в корзину'}"
    type="button"
  >
    ${isInCart ? AddedToCart() : AddToCart()}
    <span>${isInCart ? 'В корзине' : 'В корзину'}</span>
  </button>
`
