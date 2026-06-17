import { setTheme, type Theme } from '@/shared/lib'

import { toggleActiveButton } from '../lib/toggle-active-button'

export const initThemeToggle = (): void => {
  const themeButtons = document.querySelectorAll<HTMLButtonElement>('[data-theme]')

  themeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      toggleActiveButton(themeButtons, btn)

      const targetTheme = btn.getAttribute('data-theme') as Theme
      if (targetTheme) {
        setTheme(targetTheme)
      }
    })
  })
}
