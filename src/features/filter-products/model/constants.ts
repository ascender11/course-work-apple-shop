export const PRICE_ABS_MIN = 0
export const PRICE_ABS_MAX = 300000
export const DEFAULT_PRICE_GTE = 33400
export const DEFAULT_PRICE_LTE = 127400

export const CATEGORY_OPTIONS = ['iPhone', 'MacBook', 'AirPods', 'Watch'] as const

export const YEAR_OPTIONS = [
  { value: '', label: 'Все годы' },
  { value: '2026', label: 'Новинки 2026' },
  { value: '2025', label: 'Линейка 2025' },
  { value: '2024', label: 'Модели 2024' },
] as const

export const PAGE_LIMIT = 9
