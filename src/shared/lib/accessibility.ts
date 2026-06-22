export type FontSize = 'normal' | 'large' | 'xlarge'
export type ColorScheme = 'default' | 'black-white' | 'black-green' | 'white-black' | 'beige-brown' | 'blue-darkblue'

export const ACCESSIBILITY_CHANGE_EVENT = 'apple-shop-accessibility-change'

const FONT_SIZE_KEY = 'apple-shop-font-size'
const COLOR_SCHEME_KEY = 'apple-shop-color-scheme'
const HIDE_IMAGES_KEY = 'apple-shop-hide-images'

export const setFontSize = (size: FontSize): void => {
  document.documentElement.setAttribute('data-font-size', size)
  localStorage.setItem(FONT_SIZE_KEY, size)
  dispatch()
}

export const getFontSize = (): FontSize => {
  return (localStorage.getItem(FONT_SIZE_KEY) as FontSize) || 'normal'
}

export const setColorScheme = (scheme: ColorScheme): void => {
  document.documentElement.setAttribute('data-color-scheme', scheme)
  localStorage.setItem(COLOR_SCHEME_KEY, scheme)
  dispatch()
}

export const getColorScheme = (): ColorScheme => {
  return (localStorage.getItem(COLOR_SCHEME_KEY) as ColorScheme) || 'default'
}

export const setHideImages = (hide: boolean): void => {
  document.documentElement.setAttribute('data-hide-images', String(hide))
  localStorage.setItem(HIDE_IMAGES_KEY, String(hide))
  dispatch()
}

export const getHideImages = (): boolean => {
  return localStorage.getItem(HIDE_IMAGES_KEY) === 'true'
}

export const initAccessibility = (): void => {
  document.documentElement.setAttribute('data-font-size', getFontSize())
  document.documentElement.setAttribute('data-color-scheme', getColorScheme())
  document.documentElement.setAttribute('data-hide-images', String(getHideImages()))
}

export const onAccessibilityChange = (callback: () => void): (() => void) => {
  window.addEventListener(ACCESSIBILITY_CHANGE_EVENT, callback)
  return () => window.removeEventListener(ACCESSIBILITY_CHANGE_EVENT, callback)
}

function dispatch() {
  window.dispatchEvent(new CustomEvent(ACCESSIBILITY_CHANGE_EVENT))
}
