import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'
import { Button } from '@/shared/ui/components'

export const OutOfStockCard = () => html`
  <div class="flex flex-col gap-4 rounded-2xl border border-border p-6 shadow-card">
    <p class="text-base font-medium text-text-secondary">${t('product.outOfStock')}</p>
    <p class="text-sm text-text-quinary">${t('product.outOfStockHint')}</p>
    ${Button({ text: t('product.notifyMe'), variant: 'outline' })}
  </div>
`
