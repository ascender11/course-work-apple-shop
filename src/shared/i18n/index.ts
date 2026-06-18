export type Language = 'ru' | 'en'

const STORAGE_KEY = 'apple-shop-language'
const EVENT_NAME = 'apple-shop-language-change'
const FALLBACK_LANG: Language = 'en'

let currentLang: Language = 'ru'
const dictionaries: Record<Language, Record<string, string>> = { ru: {}, en: {} }

// --- Language state ---

export const getLanguage = (): Language => {
  return (localStorage.getItem(STORAGE_KEY) as Language) || 'ru'
}

export const setLanguage = (lang: Language): void => {
  localStorage.setItem(STORAGE_KEY, lang)
  document.documentElement.lang = lang
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { lang } }))
  location.reload()
}

export const onLanguageChange = (callback: (lang: Language) => void): (() => void) => {
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<{ lang: Language }>
    callback(customEvent.detail.lang)
  }
  window.addEventListener(EVENT_NAME, handler)
  return () => window.removeEventListener(EVENT_NAME, handler)
}

export const initLanguage = (): void => {
  currentLang = getLanguage()
  document.documentElement.lang = currentLang
}

// --- Dictionary registration ---

export const registerDictionary = (lang: Language, dict: Record<string, string>): void => {
  dictionaries[lang] = { ...dictionaries[lang], ...dict }
}

// --- Translation function ---

const lookup = (key: string, lang: Language): string | undefined => {
  return dictionaries[lang]?.[key]
}

export const t = (key: string, params?: Record<string, string | number>): string => {
  let value = lookup(key, currentLang)

  if (value === undefined && currentLang !== FALLBACK_LANG) {
    value = lookup(key, FALLBACK_LANG)
  }

  if (value === undefined) {
    console.warn(`[i18n] Missing key: "${key}"`)
    return key
  }

  if (params) {
    for (const [param, val] of Object.entries(params)) {
      value = value.replace(new RegExp(`\\{${param}\\}`, 'g'), String(val))
    }
  }

  return value
}

// --- Init ---

export const initI18n = (): void => {
  currentLang = getLanguage()
}
