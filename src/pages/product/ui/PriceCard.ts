import type { AvailableProduct } from '@/entities/product'

import { html } from '@/shared/lib'
import { Button } from '@/shared/ui/components'
import { AddToCart } from '@/shared/ui/icons'

export type PriceCardProps = Pick<AvailableProduct, 'price' | 'availability' | 'warrantyPeriod'>

export const PriceCard = ({ price, warrantyPeriod }: PriceCardProps): string => {
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
            <span>В наличии</span>
          </div>
        </div>
        <p class="text-3xl font-semibold text-text-primary">${price.current.toLocaleString('ru-RU')} ₽</p>
        ${warrantyPeriod ? html`<p class="text-xs text-text-quinary mt-0.5">${warrantyPeriod}</p>` : ''}
      </div>

      ${Button({ icon: AddToCart(), text: 'В корзину' })}
    </div>
  `
}
