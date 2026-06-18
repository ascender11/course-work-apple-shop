import { cartStore } from '@/entities/cart'
import { userStore } from '@/entities/user'

import { t } from '@/shared/i18n'
import { Spinner } from '@/shared/ui/components'

import { SuccessModal } from '../ui/SuccessModal'

export const handleCheckout = async () => {
  const btn = document.getElementById('cart-checkout-btn') as HTMLButtonElement | null
  const label = document.getElementById('cart-checkout-label')
  if (!btn || !label) return

  btn.disabled = true
  label.innerHTML = `${Spinner()}<span>${t('cart.processing')}</span>`

  await new Promise((r) => setTimeout(r, 1200))

  const userId = userStore.user?.id
  if (userId) await cartStore.clear(userId)

  const container = document.getElementById('cart-modal-container')
  if (container) {
    container.innerHTML = SuccessModal()
    document.getElementById('cart-modal-close')?.addEventListener('click', () => location.reload())
    document.getElementById('cart-modal-backdrop')?.addEventListener('click', () => location.reload())
  }
}

export const handlePromoCode = () => {
  const input = document.getElementById('cart-promo') as HTMLInputElement | null
  const msg = document.getElementById('cart-promo-msg')
  if (!input || !msg) return
  if (input.value.trim()) {
    msg.classList.remove('hidden')
    msg.textContent = t('cart.promoNotFound', { code: input.value.trim() })
  }
}
