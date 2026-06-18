import { cartStore } from '@/entities/cart'
import { userStore } from '@/entities/user'
import { initThemeToggle } from '@/features/theme-switch'

import { navigate } from '@/shared/lib'

import { initLanguageToggle } from '../lib/language-toggle'

export const initProfile = () => {
  document.getElementById('profile-logout-btn')?.addEventListener('click', () => {
    const userId = userStore.user?.id
    if (userId) cartStore.clear(userId)
    userStore.logout()
    navigate('/login')
  })

  initThemeToggle()
  initLanguageToggle()
}
