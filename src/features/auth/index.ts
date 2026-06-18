import { registerDictionary } from '@/shared/i18n'

import en from './locale/en.json'
import ru from './locale/ru.json'

registerDictionary('ru', ru)
registerDictionary('en', en)

export { initLoginForm } from './model/init-login-form'
export { initRegisterForm } from './model/init-register-form'
export { LoginForm } from './ui/LoginForm'
export { RegisterForm } from './ui/RegisterForm'
