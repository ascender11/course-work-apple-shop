import { registerDictionary } from '@/shared/i18n'

import en from './locale/en.json'
import ru from './locale/ru.json'

registerDictionary('ru', ru)
registerDictionary('en', en)

export { SORT_OPTIONS } from './model/constants'
export { initSortController } from './model/controller'
export { buildSortQueryString, parseSortFromQuery } from './model/utils'
export { SortSelect } from './ui/SortSelect'
