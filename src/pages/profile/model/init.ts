import { cartStore } from '@/entities/cart'
import { favoritesStore } from '@/entities/favorites'
import { userStore } from '@/entities/user'
import { initAccessibility } from '@/features/accessibility-switch'
import { initLanguageToggle } from '@/features/language-switch'

import { navigate } from '@/shared/lib'

export const initProfile = () => {
  document.getElementById('profile-logout-btn')?.addEventListener('click', () => {
    const userId = userStore.user?.id
    if (userId) {
      cartStore.clearCache(userId)
      favoritesStore.clearCache(userId)
    }
    userStore.logout()
    navigate('/login')
  })

  initLanguageToggle()
  initAccessibility()
}
