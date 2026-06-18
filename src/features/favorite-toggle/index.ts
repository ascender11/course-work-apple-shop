import { registerDictionary } from '@/shared/i18n'

import en from './locale/en.json'
import ru from './locale/ru.json'

registerDictionary('ru', ru)
registerDictionary('en', en)

export type { Favorite, FavoriteItem } from '@/entities/favorites'
export { favoritesStore } from '@/entities/favorites'

export { initFavoriteButtons } from './model/init-favorite-buttons'
export { FavoriteButton } from './ui/FavoriteButton'
