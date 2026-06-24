import { cartStore } from '@/entities/cart'
import { favoritesStore } from '@/entities/favorites'
import { userStore } from '@/entities/user'
import { initCartButtons } from '@/features/cart-toggle'
import { initFavoriteButtons } from '@/features/favorite-toggle'

export const initHomePage = async () => {
  userStore.init()

  const user = userStore.user
  if (user) {
    await cartStore.init(user.id)
    await favoritesStore.init(user.id)
  }

  initFavoriteButtons()
  initCartButtons()
}
