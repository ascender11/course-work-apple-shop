import { html } from '@/shared/lib'
import { Heart } from '@/shared/ui/icons'

export interface FavoriteButtonProps {
  productId: string
  isFavorite?: boolean
  favoriteId?: string
}

export const FavoriteButton = ({ productId, isFavorite = false, favoriteId = '' }: FavoriteButtonProps) => html`
  <button
    class="js-fav-btn flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95"
    data-product-id="${productId}"
    data-favorite-id="${favoriteId}"
    aria-label="${isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}"
    type="button"
  >
    ${Heart({ isActive: isFavorite })}
  </button>
`
