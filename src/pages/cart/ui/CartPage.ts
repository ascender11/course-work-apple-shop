import { cartStore } from '@/entities/cart'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'

import { initCartPage } from '../model/init'
import { CartEmpty } from './CartEmpty'
import { CartItems } from './CartItems'
import { OrderSummary } from './OrderSummary'

const pluralize = (n: number) => {
  if (n === 1) return t('cart.itemsCount', { count: n })
  if (n < 5) return t('cart.itemsCount2', { count: n })
  return t('cart.itemsCount5', { count: n })
}

export const CartPage = () => {
  const items = cartStore.items
  const total = cartStore.total
  const count = cartStore.count
  const isEmpty = items.length === 0

  return {
    html: html`
      ${Header()}
      <div id="cart-root" class="min-h-[calc(100vh-56px)]">
        <div class="px-4 py-6 md:px-6 lg:px-30">
          <h1 class="text-2xl font-bold text-text-primary mb-6">
            ${t('cart.title')}${!isEmpty ? html` <span class="ml-2 text-base font-normal text-text-quinary">${pluralize(count)}</span>` : ''}
          </h1>
          ${
            isEmpty
              ? CartEmpty()
              : html`<div class="flex flex-col lg:flex-row lg:items-start gap-6">
                ${CartItems(items)}
                <div class="w-full lg:w-80 xl:w-96 shrink-0">
                  <div id="cart-summary">${OrderSummary(total, count)}</div>
                </div>
              </div>`
          }
        </div>
      </div>
      <div id="cart-modal-container"></div>
      ${Footer()}
    `,
    init: initCartPage,
  }
}
