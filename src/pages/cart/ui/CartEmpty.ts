import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'
import { CartEmpty as CartEmptyIcon } from '@/shared/ui/icons'

export const CartEmpty = () => html`
  <div class="flex flex-col items-center justify-center gap-5 py-24 text-center">
    ${CartEmptyIcon({ className: 'w-20 h-20' })}
    <div>
      <p class="text-xl text-center font-semibold text-text-primary">${t('cart.empty')}</p>
      <p class="text-sm text-text-quinary">${t('cart.emptyHint')}</p>
    </div>
    <a href="/catalog" data-navigo class="button mt-2">
      ${t('cart.goToCatalog')}
    </a>
  </div>
`
