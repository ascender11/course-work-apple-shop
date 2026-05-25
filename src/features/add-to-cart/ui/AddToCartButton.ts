import { html } from '@/shared/lib'
import { AddedToCart, AddToCart } from '@/shared/ui/icons'

export interface AddToCartButtonProps {
  productId: string
  isInCart?: boolean
  className?: string
}

export const AddToCartButton = ({ productId, isInCart = false, className = '' }: AddToCartButtonProps) => html`
  <button
    class="js-add-to-cart button flex items-center justify-center gap-2 w-full ${className} ${isInCart ? 'bg-success hover:bg-success-hover' : ''}"
    data-product-id="${productId}"
    ${isInCart ? 'data-in-cart="1"' : ''}
    type="button"
  >
    ${isInCart ? AddedToCart() : AddToCart()}
    <span>${isInCart ? 'В корзине' : 'В корзину'}</span>
  </button>
`
