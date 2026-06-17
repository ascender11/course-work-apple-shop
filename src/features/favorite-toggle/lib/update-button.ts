import { Heart } from '@/shared/ui/icons'

export const updateBtn = (btn: HTMLElement, isFavorite: boolean, favoriteId: string) => {
  btn.dataset.favoriteId = favoriteId
  btn.setAttribute('aria-label', isFavorite ? 'Убрать из избранного' : 'Добавить в избранное')
  btn.innerHTML = Heart({ isActive: isFavorite })
}
