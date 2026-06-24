import { favoritesStore } from '@/entities/favorites'
import { userStore } from '@/entities/user'

import { t } from '@/shared/i18n'
import { toast } from '@/shared/toast'

import { updateBtn } from '../lib/update-button'

export const initFavoriteButtons = (): void => {
  const user = userStore.user
  if (!user) return

  const buttons = document.querySelectorAll<HTMLElement>('.js-fav-btn')
  if (!buttons.length) return

  buttons.forEach((btn) => {
    if (btn.dataset.initialized === '1') return
    btn.dataset.initialized = '1'

    const productId = btn.dataset.productId ?? ''
    const isFav = favoritesStore.has(productId)
    const favId = favoritesStore.getId(productId)
    updateBtn(btn, isFav, favId)

    btn.addEventListener('click', async (e) => {
      e.preventDefault()
      e.stopPropagation()

      const productId = btn.dataset.productId ?? ''
      const currentlyFav = favoritesStore.has(productId)

      if (currentlyFav) {
        updateBtn(btn, false, '')
        favoritesStore.remove(productId)
        toast.success(t('toast.removedFromFavorites'))
      } else {
        try {
          await favoritesStore.add(user.id, productId)
          const newFavId = favoritesStore.getId(productId)
          updateBtn(btn, true, newFavId)
          toast.success(t('toast.addedToFavorites'))
        } catch {
          toast.error(t('toast.serverError'))
        }
      }
    })
  })
}
