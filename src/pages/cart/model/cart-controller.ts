import { cartStore } from '@/entities/cart'

import { initCheckout } from './cart-checkout'
import { wireCartItem } from './cart-item-handler'
import { updateSummary } from './cart-summary'

export const initCartPage = () => {
  document.querySelectorAll<HTMLElement>('.js-cart-item').forEach(wireCartItem)

  document.getElementById('cart-clear-btn')?.addEventListener('click', () => {
    cartStore.clear()
    location.reload()
  })

  document.getElementById('cart-promo-apply')?.addEventListener('click', () => {
    const input = document.getElementById('cart-promo') as HTMLInputElement | null
    const msg = document.getElementById('cart-promo-msg')
    if (!input || !msg) return
    if (input.value.trim()) {
      msg.classList.remove('hidden')
      msg.textContent = `Промокод «${input.value.trim()}» не найден`
    }
  })

  initCheckout()
}

export const addItemToCartDOM = (newItemHtml: string) => {
  const list = document.getElementById('cart-items-list')
  if (!list) return
  const tmp = document.createElement('div')
  tmp.innerHTML = newItemHtml
  const itemEl = tmp.querySelector<HTMLElement>('.js-cart-item')
  if (itemEl) {
    list.appendChild(itemEl)
    wireCartItem(itemEl)
    updateSummary()
  }
}
