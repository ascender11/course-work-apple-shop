import { registerDictionary } from '@/shared/i18n'

import en from './locale/en.json'
import ru from './locale/ru.json'

registerDictionary('ru', ru)
registerDictionary('en', en)

export { AdminDashboard } from './ui/AdminDashboard'
export { AdminProductsPage } from './ui/AdminProductsPage'
export { AdminReviewsPage } from './ui/AdminReviewsPage'
