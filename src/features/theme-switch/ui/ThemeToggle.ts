import { getTheme, html, setTheme, type Theme } from '@/shared/lib'

const toggleActiveButton = (buttons: NodeListOf<HTMLButtonElement>, activeBtn: HTMLButtonElement) => {
  buttons.forEach((b) => {
    b.classList.remove('bg-background', 'shadow-sm', 'text-text-primary')
    b.classList.add('text-text-quinary')
  })
  activeBtn.classList.remove('text-text-quinary')
  activeBtn.classList.add('bg-background', 'shadow-sm', 'text-text-primary')
}

export const ThemeToggle = (): string => {
  const currentTheme = getTheme()

  return html`
    <div class="flex gap-1 rounded-lg bg-background-tertiary p-1">
      <button
        data-theme="light"
        class="px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${currentTheme === 'light' ? 'bg-background shadow-sm text-text-primary' : 'text-text-quinary hover:text-text-secondary'}"
      >Светлая</button>
      <button
        data-theme="dark"
        class="px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${currentTheme === 'dark' ? 'bg-background shadow-sm text-text-primary' : 'text-text-quinary hover:text-text-secondary'}"
      >Тёмная</button>
    </div>
  `
}

export const initThemeToggle = (): void => {
  const themeButtons = document.querySelectorAll<HTMLButtonElement>('[data-theme]')

  themeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleActiveButton(themeButtons, btn)

      const targetTheme = btn.getAttribute('data-theme') as Theme
      if (targetTheme) {
        setTheme(targetTheme)
      }
    })
  })
}
