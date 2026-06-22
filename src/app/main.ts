import { initI18n, initLanguage } from '@/shared/i18n'
import { initAccessibility } from '@/shared/lib'

import { createRouter } from './router'

initAccessibility()
initLanguage()
initI18n()
createRouter()
