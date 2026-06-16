import { cartStore, findItem } from '@/entities/cart'
import { productApi } from '@/entities/product'
import { userStore } from '@/entities/user'

import { applyDefaultState, applyInCartState } from './button-state'

export const initAddToCartButtons = async (): Promise<void> => {
  const user = userStore.user
  if (!user) return

  const buttons = document.querySelectorAll<HTMLButtonElement>('.js-add-to-cart')
  if (!buttons.length) return

  const cartIds = new Set(cartStore.items.map((i) => i.product.id))

  buttons.forEach((btn) => {
    if (btn.dataset.addToCartInitialized === '1') return
    btn.dataset.addToCartInitialized = '1'

    const productId = btn.dataset.productId ?? ''
    if (cartIds.has(productId)) {
      applyInCartState(btn)
    }

    btn.addEventListener('click', async (e) => {
      e.preventDefault()

      const productId = btn.dataset.productId ?? ''
      const isInCart = btn.dataset.inCart === '1'

      if (isInCart) {
        const item = findItem(cartStore.items, productId)
        if (item) {
          cartStore.remove(user.id, item.id)
        }
        applyDefaultState(btn)
      } else {
        try {
          const product = await productApi.getById(productId)
          cartStore.add(user.id, { product, quantity: 1 })
          applyInCartState(btn)
        } catch {
          // silent fail — button stays unchanged
        }
      }
    })
  })
}
