import { registerDictionary } from '@/shared/i18n'

import en from './locale/en.json'
import ru from './locale/ru.json'

registerDictionary('ru', ru)
registerDictionary('en', en)

export { initAccessibility } from './model/init-accessibility'
export { ColorSchemeToggle } from './ui/ColorSchemeToggle'
export { FontSizeToggle } from './ui/FontSizeToggle'
export { ImagesToggle } from './ui/ImagesToggle'
