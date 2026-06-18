import { registerDictionary } from '@/shared/i18n'

import en from './locale/en.json'
import ru from './locale/ru.json'

registerDictionary('ru', ru)
registerDictionary('en', en)

export { DEFAULT_PRICE_GTE, DEFAULT_PRICE_LTE, PRICE_ABS_MAX, PRICE_ABS_MIN } from './model/constants'
export { initFiltersPanel } from './model/init-filter-panel'
export type { FiltersState } from './model/types'
export { buildQueryString, isFiltersActive, parseFiltersFromQuery } from './model/utils'
export { FilterPanel } from './ui/FilterPanel'
