import { getLanguage, type Language, setLanguage } from '@/shared/i18n'

import { toggleActiveButton } from '../lib/toggle-active-button'

export const initLanguageToggle = (): void => {
  const langButtons = document.querySelectorAll<HTMLButtonElement>('[data-lang]')
  const currentLang = getLanguage()

  langButtons.forEach((btn) => {
    if (btn.dataset.lang === currentLang) {
      btn.classList.add('bg-background', 'shadow-sm', 'text-text-primary')
      btn.classList.remove('text-text-quinary')
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const targetLang = btn.dataset.lang as Language
      if (targetLang && targetLang !== currentLang) {
        toggleActiveButton(langButtons, btn)
        setLanguage(targetLang)
      }
    })
  })
}
