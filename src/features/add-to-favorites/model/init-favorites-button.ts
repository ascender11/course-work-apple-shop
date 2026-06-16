import { userStore } from '@/entities/user'

import { Heart } from '@/shared/ui/icons'

import { favoritesApi } from '../api/favoritesApi'
import { favoritesStore } from './favoritesStore'

const updateBtn = (btn: HTMLElement, isFavorite: boolean, favoriteId: string) => {
  btn.dataset.favoriteId = favoriteId
  btn.setAttribute('aria-label', isFavorite ? 'Убрать из избранного' : 'Добавить в избранное')
  btn.innerHTML = Heart({ isActive: isFavorite })
}

export const initFavoriteButtons = async (): Promise<void> => {
  const user = userStore.user
  if (!user) return

  const buttons = document.querySelectorAll<HTMLElement>('.js-fav-btn')
  if (!buttons.length) return

  try {
    const apiFavorites = await favoritesApi.getByUserId(user.id)
    favoritesStore.syncFromApi(apiFavorites)
  } catch {
    // use whatever is in the store already
  }

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

      console.log(favoritesStore.getAll())

      if (currentlyFav) {
        const fid = favoritesStore.getId(pid)
        updateBtn(btn, false, '')
        favoritesStore.remove(pid)
        try {
          await favoritesApi.remove(fid)
        } catch {
          // re-add on failure
          favoritesStore.add({ id: fid, userId: user.id, productId: pid })
          updateBtn(btn, true, fid)
        }
      } else {
        try {
          const newFav = await favoritesApi.add(user.id, pid)
          favoritesStore.add(newFav)
          updateBtn(btn, true, newFav.id)
        } catch {
          // silent fail — button stays untoggled
        }
      }
    })
  })
}
