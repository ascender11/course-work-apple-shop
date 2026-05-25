import { cartStore } from '@/entities/cart'
import { productApi } from '@/entities/product'
import { userStore } from '@/entities/user'

import { applyDefaultState, applyInCartState } from './button-state'

export const initAddToCartButtons = async (): Promise<void> => {
  const user = userStore.getUser()
  if (!user) return

  const buttons = document.querySelectorAll<HTMLButtonElement>('.js-add-to-cart')
  if (!buttons.length) return

  const cartItems = cartStore.getItems()
  const cartIds = new Set(cartItems.map((i) => i.product.id))

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
        cartStore.remove(productId)
        applyDefaultState(btn)
      } else {
        try {
          const product = await productApi.getById(productId)
          cartStore.add(product)
          applyInCartState(btn)
        } catch {
          // silent fail — button stays unchanged
        }
      }
    })
  })
}
