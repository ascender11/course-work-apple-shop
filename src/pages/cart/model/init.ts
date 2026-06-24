import { cartStore } from '@/entities/cart'

import { t } from '@/shared/i18n'
import { animateRemoval } from '@/shared/lib/animate'
import { toast } from '@/shared/toast'

import { updateCartTitle, updateLineItem, updateSummary } from '../lib/updaters'
import { CartEmpty } from '../ui/CartEmpty'
import { clearCart, handleDecrement, handleIncrement, handleRemove } from './actions'
import { handleCheckout, handlePromoCode } from './checkout'

export const initCartPage = () => {
  const unsubscribe = cartStore.subscribe(onStoreChange)

  document.querySelectorAll<HTMLElement>('.js-cart-item').forEach(wireCartItem)

  document.getElementById('cart-clear-btn')?.addEventListener('click', () => {
    clearCart()
    toast.success(t('toast.removedFromCart'))
  })
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
    <h1 class="text-2xl font-bold text-text-primary mb-6">${t('cart.title')}</h1>
    ${CartEmpty()}
  `
}

const wireCartItem = (itemEl: HTMLElement) => {
  const productId = itemEl.dataset.productId ?? ''

  itemEl.querySelector('.js-cart-inc')?.addEventListener('click', () => {
    handleIncrement(productId)
    updateLineItem(itemEl, productId)
  })

  itemEl.querySelector('.js-cart-dec')?.addEventListener('click', async () => {
    const removed = await handleDecrement(productId)
    if (removed) {
      animateRemoval(itemEl, updateSummary)
      toast.success(t('toast.removedFromCart'))
    } else {
      updateLineItem(itemEl, productId)
    }
  })

  itemEl.querySelector('.js-cart-remove')?.addEventListener('click', () => {
    handleRemove(productId)
    animateRemoval(itemEl, updateSummary)
    toast.success(t('toast.removedFromCart'))
  })
}
