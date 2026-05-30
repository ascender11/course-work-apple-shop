import { userStore } from '@/entities/user'

import { Heart } from '@/shared/ui/icons'

import { favoritesApi } from '../api/favoritesApi'
import type { Favorite } from './types'

const updateBtn = (btn: HTMLElement, isFavorite: boolean, favoriteId: string) => {
  btn.dataset.favoriteId = favoriteId
  btn.setAttribute('aria-label', isFavorite ? 'Убрать из избранного' : 'Добавить в избранное')
  btn.innerHTML = Heart({ isActive: isFavorite })
}

export const initFavoriteButtons = async (): Promise<void> => {
  const user = userStore.getUser()
  if (!user) return

  const buttons = document.querySelectorAll<HTMLElement>('.js-fav-btn')
  if (!buttons.length) return

  let favorites: Favorite[] = []
  try {
    favorites = await favoritesApi.getByUserId(user.id)
  } catch {
    return
  }

  buttons.forEach((btn) => {
    const productId = btn.dataset.productId ?? ''
    const fav = favorites.find((f) => f.productId === productId)
    updateBtn(btn, !!fav, fav?.id ?? '')
  })

  buttons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault()
      e.stopPropagation()

      const productId = btn.dataset.productId ?? ''
      const favoriteId = btn.dataset.favoriteId ?? ''
      const isFavorite = !!favoriteId

      if (isFavorite) {
        updateBtn(btn, false, '')
        try {
          await favoritesApi.remove(favoriteId)
          favorites = favorites.filter((f) => f.id !== favoriteId)
        } catch {
          updateBtn(btn, true, favoriteId)
        }
      } else {
        try {
          const newFav = await favoritesApi.add(user.id, productId)
          favorites = [...favorites, newFav]
          updateBtn(btn, true, newFav.id)
        } catch {
          // silent fail — button stays untoggled
        }
      }
    })
  })
}
