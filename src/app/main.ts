import { initI18n, initLanguage } from '@/shared/i18n'
import { initAccessibility, initTheme } from '@/shared/lib'

import { createRouter } from './router'

initTheme()
initAccessibility()
initLanguage()
initI18n()
createRouter()
