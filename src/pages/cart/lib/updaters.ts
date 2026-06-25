import { cartStore } from '@/entities/cart'

import { t } from '@/shared/i18n'

const formatPrice = (n: number) => `${n.toLocaleString('ru-RU')} ₽`

const pluralize = (n: number) => {
  if (n === 1) return t('cart.itemsCount', { count: n })
  if (n < 5) return t('cart.itemsCount2', { count: n })
  return t('cart.itemsCount5', { count: n })
}

export const updateSummary = () => {
  const total = cartStore.total
  const count = cartStore.count

  const set = (id: string, text: string) => {
    const el = document.getElementById(id)
    if (el) el.textContent = text
  }

  set('summary-total', formatPrice(total))
  set('summary-subtotal', formatPrice(total))
  set('summary-count', String(count))
}

export const updateCartTitle = () => {
  const span = document.querySelector<HTMLElement>('#cart-root h1 span')
  if (span) span.textContent = pluralize(cartStore.count)
}

export const updateLineItem = (itemEl: HTMLElement, productId: string) => {
  const product = cartStore.get(productId)
  if (!product) return

  const qtyEl = itemEl.querySelector<HTMLElement>('.js-cart-qty')
  const lineTotals = itemEl.querySelectorAll<HTMLElement>('.js-cart-line-total')
  const lineTotal = product.price * product.quantity

  if (qtyEl) qtyEl.textContent = String(product.quantity)
  lineTotals.forEach((el) => {
    el.textContent = formatPrice(lineTotal)
  })

  updateSummary()
  updateCartTitle()
}
