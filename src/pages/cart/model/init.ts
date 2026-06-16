import { cartStore } from '@/entities/cart'

import { animateRemoval } from '../lib/animations'
import { updateCartTitle, updateLineItem, updateSummary } from '../lib/updaters'
import { CartEmpty } from '../ui/CartEmpty'
import { clearCart, handleDecrement, handleIncrement, handleRemove } from './actions'
import { handleCheckout, handlePromoCode } from './checkout'

export const initCartPage = () => {
  const unsubscribe = cartStore.subscribe(onStoreChange)

  document.querySelectorAll<HTMLElement>('.js-cart-item').forEach(wireCartItem)

  document.getElementById('cart-clear-btn')?.addEventListener('click', () => clearCart())
  document.getElementById('cart-promo-apply')?.addEventListener('click', handlePromoCode)
  document.getElementById('cart-checkout-btn')?.addEventListener('click', () => handleCheckout())

  return unsubscribe
}

const onStoreChange = () => {
  const itemsList = document.getElementById('cart-items-list')
  if (cartStore.count === 0 && itemsList) {
    renderEmptyState()
    return
  }
  updateSummary()
  updateCartTitle()
}

const renderEmptyState = () => {
  const root = document.getElementById('cart-root')
  if (!root) return
  const container = root.querySelector('.px-4')
  if (!container) return

  container.innerHTML = `
    <h1 class="text-2xl font-bold text-text-primary mb-6">Корзина</h1>
    ${CartEmpty()}
  `
}

const wireCartItem = (itemEl: HTMLElement) => {
  const productId = itemEl.dataset.productId ?? ''
  const color = itemEl.dataset.color || undefined
  const storage = itemEl.dataset.storage || undefined

  itemEl.querySelector('.js-cart-inc')?.addEventListener('click', () => {
    handleIncrement(productId, color, storage)
    updateLineItem(itemEl, productId, color, storage)
  })

  itemEl.querySelector('.js-cart-dec')?.addEventListener('click', () => {
    const removed = handleDecrement(productId, color, storage)
    if (removed) {
      animateRemoval(itemEl, updateSummary)
    } else {
      updateLineItem(itemEl, productId, color, storage)
    }
  })

  itemEl.querySelector('.js-cart-remove')?.addEventListener('click', () => {
    handleRemove(productId, color, storage)
    animateRemoval(itemEl, updateSummary)
  })
}
