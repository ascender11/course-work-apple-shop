import { cartStore } from '@/entities/cart'
import { userStore } from '@/entities/user'

import { t } from '@/shared/i18n'
import { toast } from '@/shared/toast'

import { updateBtn } from '../lib/update-button'

const syncButtons = (productId: string, inCart: boolean) => {
  document.querySelectorAll<HTMLButtonElement>(`.js-add-to-cart[data-product-id="${productId}"]`).forEach((btn) => {
    updateBtn(btn, inCart)
  })
}

export const initCartButtons = (): void => {
  const user = userStore.user
  if (!user) return

  const buttons = document.querySelectorAll<HTMLButtonElement>('.js-add-to-cart')
  if (!buttons.length) return

  buttons.forEach((btn) => {
    const productId = btn.dataset.productId ?? ''
    const item = cartStore.get(productId)
    updateBtn(btn, !!item)

    btn.addEventListener('click', async (e) => {
      e.preventDefault()
      e.stopPropagation()

      const productId = btn.dataset.productId ?? ''
      const item = cartStore.get(productId)

      if (!item) {
        try {
          await cartStore.add(user.id, productId)
          syncButtons(productId, true)
          toast.success(t('toast.addedToCart'))
        } catch {
          toast.error(t('toast.serverError'))
        }

        return
      }

      await cartStore.remove(user.id, productId)

      syncButtons(productId, false)
      toast.success(t('toast.removedFromCart'))
    })
  })
}
