import { cartStore } from '@/entities/cart'

import { updateLineItem, updateSummary } from './cart-summary'
import { removeCardFromDOM } from './cart-ui-helpers'

export const wireCartItem = (itemEl: HTMLElement) => {
  const productId = itemEl.dataset.productId ?? ''
  const color = itemEl.dataset.color || undefined
  const storage = itemEl.dataset.storage || undefined

  const refreshLine = () => updateLineItem(itemEl, productId, color, storage)

  itemEl.querySelector('.js-cart-inc')?.addEventListener('click', () => {
    cartStore.changeQuantity(productId, 1, color, storage)
    refreshLine()
  })

  itemEl.querySelector('.js-cart-dec')?.addEventListener('click', () => {
    const item = cartStore
      .getItems()
      .find((i) => i.product.id === productId && i.selectedColor === color && i.selectedStorage === storage)
    if (item && item.quantity <= 1) {
      cartStore.remove(productId, color, storage)
      removeCardFromDOM(itemEl)
      updateSummary()
    } else {
      cartStore.changeQuantity(productId, -1, color, storage)
      refreshLine()
    }
  })

  itemEl.querySelector('.js-cart-remove')?.addEventListener('click', () => {
    cartStore.remove(productId, color, storage)
    removeCardFromDOM(itemEl)
    updateSummary()
  })
}
