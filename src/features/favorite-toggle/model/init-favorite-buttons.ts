import { favoritesStore } from '@/entities/favorites'
import { userStore } from '@/entities/user'

import { updateBtn } from '../lib/update-button'

export const initFavoriteButtons = (): void => {
  const user = userStore.user
  if (!user) return

  const buttons = document.querySelectorAll<HTMLElement>('.js-fav-btn')
  if (!buttons.length) return

  buttons.forEach((btn) => {
    if (btn.dataset.favInitialized === '1') return
    btn.dataset.favInitialized = '1'

    const productId = btn.dataset.productId ?? ''
    const isFav = favoritesStore.has(productId)
    const favId = favoritesStore.getId(productId)
    updateBtn(btn, isFav, favId)

    btn.addEventListener('click', async (e) => {
      e.preventDefault()
      e.stopPropagation()

      const pid = btn.dataset.productId ?? ''
      const currentlyFav = favoritesStore.has(pid)

      if (currentlyFav) {
        updateBtn(btn, false, '')
        favoritesStore.remove(pid)
      } else {
        try {
          await favoritesStore.add(user.id, pid)
          const newFavId = favoritesStore.getId(pid)
          updateBtn(btn, true, newFavId)
        } catch {
          // silent fail — button stays untoggled
        }
      }
    })
  })
}
