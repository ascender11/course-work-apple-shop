import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'
import { CartEmpty as CartEmptyIcon } from '@/shared/ui/icons'

export const CartEmpty = () => html`
  <div class="flex flex-col items-center gap-4 py-20 text-center">
    ${CartEmptyIcon({ className: 'w-16 h-16 text-text-quinary' })}
    <div>
      <p class="text-lg text-center font-medium text-text-secondary">${t('cart.empty')}</p>
      <p class="text-sm text-text-quinary">${t('cart.emptyHint')}</p>
    </div>
    <a href="/catalog" data-navigo class="button mt-2">
      ${t('cart.goToCatalog')}
    </a>
  </div>
`
