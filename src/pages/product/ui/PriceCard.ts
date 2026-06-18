import type { AvailableProduct } from '@/entities/product'
import { CartToggleButton } from '@/features/cart-toggle'

import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'

export type PriceCardProps = Pick<AvailableProduct, 'price' | 'availability' | 'warrantyPeriod'> & {
  productId: string
}

export const PriceCard = ({ price, warrantyPeriod, productId }: PriceCardProps): string => {
  const oldPrice = price.old
    ? html`<span class="text-lg text-text-quinary line-through">${price.old.toLocaleString('ru-RU')} ₽</span>`
    : ''

  return html`
    <div class="flex flex-col gap-5 px-4 rounded-2xl bg-background-secondary md:p-6">

      <div class="flex flex-col gap-1">
        <div class="flex items-center justify-between gap-3">
          ${oldPrice}
          <div class="flex items-center gap-1.5 text-sm text-text-quinary">
            <span class="w-3.5 h-3.5 rounded-full bg-success inline-block shrink-0"></span>
            <span>${t('product.inStock')}</span>
          </div>
        </div>
        <p class="text-3xl font-semibold text-text-primary">${price.current.toLocaleString('ru-RU')} ₽</p>
        ${warrantyPeriod ? html`<p class="text-xs text-text-quinary mt-0.5">${warrantyPeriod}</p>` : ''}
      </div>

      ${CartToggleButton({ productId })}
    </div>
  `
}
