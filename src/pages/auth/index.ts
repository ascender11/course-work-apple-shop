import { registerDictionary } from '@/shared/i18n'

import en from './locale/en.json'
import ru from './locale/ru.json'

registerDictionary('ru', ru)
registerDictionary('en', en)

export { LoginPage } from './ui/LoginPage'
export { RegisterPage } from './ui/RegisterPage'
