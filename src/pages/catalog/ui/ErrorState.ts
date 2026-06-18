import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'

export const ErrorState = (message: string) => html`
  <p class="py-16 text-center text-error">${t('catalog.loadError', { error: message })}</p>
`
