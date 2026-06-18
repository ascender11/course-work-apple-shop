import { initI18n, initLanguage } from '@/shared/i18n'
import { initTheme } from '@/shared/lib'

import { createRouter } from './router'

initTheme()
initLanguage()
initI18n()
createRouter()
