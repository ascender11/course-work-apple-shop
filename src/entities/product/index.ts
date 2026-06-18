import { registerDictionary } from '@/shared/i18n'

import en from './locale/en.json'
import ru from './locale/ru.json'

registerDictionary('ru', ru)
registerDictionary('en', en)

export { productService } from './api/service'
export type {
  AvailableProduct,
  Product,
  ProductPrice,
  ProductRating,
  ProductSpecification,
  ProductSpecificationGroup,
  UnavailableProduct,
} from './model/types'
export { ProductAvailability } from './model/types'
export { ProductCard } from './ui/ProductCard'
