import { cartStore } from '@/entities/cart'
import { userStore } from '@/entities/user'

import { navigate } from '@/shared/lib'

export const initProfile = () => {
  document.getElementById('profile-logout-btn')?.addEventListener('click', () => {
    const user = userStore.getUser()
    if (user) {
      cartStore.init(user.id)
      cartStore.clear()
    }
    userStore.clear()
    navigate('/login')
  })

  document.querySelectorAll<HTMLButtonElement>('[data-theme]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll<HTMLButtonElement>('[data-theme]').forEach((b) => {
        b.classList.remove('bg-background', 'shadow-sm', 'text-text-primary')
        b.classList.add('text-text-quinary')
      })
      btn.classList.remove('text-text-quinary')
      btn.classList.add('bg-background', 'shadow-sm', 'text-text-primary')
    })
  })

  document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((b) => {
        b.classList.remove('bg-background', 'shadow-sm', 'text-text-primary')
        b.classList.add('text-text-quinary')
      })
      btn.classList.remove('text-text-quinary')
      btn.classList.add('bg-background', 'shadow-sm', 'text-text-primary')
    })
  })

}
