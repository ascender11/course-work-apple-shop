export const PRICE_ABS_MIN = 0
export const PRICE_ABS_MAX = 300000
export const DEFAULT_PRICE_GTE = 33400
export const DEFAULT_PRICE_LTE = 127400

export const CATEGORY_OPTIONS = ['iPhone', 'MacBook', 'AirPods', 'Watch'] as const

export const YEAR_OPTIONS = [
  { value: '', labelKey: 'filter.yearAll' },
  { value: '2026', labelKey: 'filter.year2026' },
  { value: '2025', labelKey: 'filter.year2025' },
  { value: '2024', labelKey: 'filter.year2024' },
] as const

export const PAGE_LIMIT = 9
