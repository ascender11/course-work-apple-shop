import { cartStore } from '@/entities/cart'
import { userStore } from '@/entities/user'
import { initThemeToggle } from '@/features/theme-switch'

import { navigate } from '@/shared/lib'

export const initProfile = () => {
  document.getElementById('profile-logout-btn')?.addEventListener('click', () => {
    const userId = userStore.user?.id
    if (userId) cartStore.clear(userId)
    userStore.logout()
    navigate('/login')
  })

  initThemeToggle()

  const langButtons = document.querySelectorAll<HTMLButtonElement>('[data-lang]')
  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      langButtons.forEach((b) => {
        b.classList.remove('bg-background', 'shadow-sm', 'text-text-primary')
        b.classList.add('text-text-quinary')
      })
      btn.classList.remove('text-text-quinary')
      btn.classList.add('bg-background', 'shadow-sm', 'text-text-primary')
    })
  })
}
