import { cn, html } from '@/shared/lib'
import { Heart } from '@/shared/ui/icons'

export interface FavoriteButtonProps {
  productId: string
  className?: string
}

export const FavoriteButton = ({ productId, className = '' }: FavoriteButtonProps) => html`
  <button
    class="js-fav-btn flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 ${cn(className)}"
    data-product-id="${productId}"
    data-favorite-id=""
    aria-label="Добавить в избранное"
    type="button"
  >${Heart()}</button>
`
