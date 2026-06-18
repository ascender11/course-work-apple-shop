import { t } from '@/shared/i18n'
import { Heart } from '@/shared/ui/icons'

export const updateBtn = (btn: HTMLElement, isFavorite: boolean, favoriteId: string) => {
  btn.dataset.favoriteId = favoriteId
  btn.setAttribute('aria-label', isFavorite ? t('fav.remove') : t('fav.addTo'))
  btn.innerHTML = Heart({ isActive: isFavorite })
}
