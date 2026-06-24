import { registerDictionary } from '@/shared/i18n'

import en from './locale/en.json'
import ru from './locale/ru.json'

registerDictionary('ru', ru)
registerDictionary('en', en)

export { CartToggleButton } from '@/entities/product'

export { initAddToCartButtons } from './model/init-cart-toggle-buttons'
