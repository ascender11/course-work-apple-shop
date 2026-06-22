import { cartStore, findItem } from '@/entities/cart'
import { productService } from '@/entities/product'
import { userStore } from '@/entities/user'
import { toast } from '@/features/toast'

import { t } from '@/shared/i18n'

import { updateBtn } from '../lib/update-button'

export const initAddToCartButtons = (): void => {
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
      updateBtn(btn, true)
    }

    btn.addEventListener('click', async (e) => {
      e.preventDefault()
      e.stopPropagation()

      const productId = btn.dataset.productId ?? ''
      const isInCart = btn.dataset.inCart === '1'

      if (isInCart) {
        const item = findItem(cartStore.items, productId)
        if (item) {
          cartStore.remove(user.id, item.id)
        }
        updateBtn(btn, false)
        toast.success(t('toast.removedFromCart'))
      } else {
        try {
          const product = await productService.getById(productId)
          cartStore.add(user.id, { product, quantity: 1 })
          updateBtn(btn, true)
          toast.success(t('toast.addedToCart'))
        } catch {
          toast.error(t('toast.serverError'))
        }
      }
    })
  })
}
