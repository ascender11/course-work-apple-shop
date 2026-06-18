import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'

export const ErrorContent = () => html`
  <p class="py-24 text-center text-error text-base">
    ${t('product.error')}
  </p>
`
