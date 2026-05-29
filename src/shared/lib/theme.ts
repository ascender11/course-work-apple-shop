export type Theme = 'light' | 'dark'

export const THEME_CHANGE_EVENT = 'apple-shop-theme-change'

export const setTheme = (theme: Theme): void => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('apple-shop-theme', theme)
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } }))
}

export const getTheme = (): Theme => {
  return (localStorage.getItem('apple-shop-theme') as Theme) || 'light'
}

export const onThemeChange = (callback: (theme: Theme) => void): (() => void) => {
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<{ theme: Theme }>
    callback(customEvent.detail.theme)
  }
  window.addEventListener(THEME_CHANGE_EVENT, handler)
  return () => window.removeEventListener(THEME_CHANGE_EVENT, handler)
}

export const initTheme = (): void => {
  const savedTheme = getTheme()
  setTheme(savedTheme)
}
