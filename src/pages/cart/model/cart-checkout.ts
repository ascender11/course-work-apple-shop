import { cartStore } from '@/entities/cart'

import { html } from '@/shared/lib'

const SuccessModal = () => html`
  <div id="cart-success-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" id="cart-modal-backdrop"></div>
    <div class="relative bg-background rounded-3xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center gap-5" style="animation: cartFadeUp 0.28s ease both">
      <div class="flex items-center justify-center w-16 h-16 rounded-full bg-background-secondary">
        <svg viewBox="0 0 24 24" class="w-8 h-8 text-success" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div class="text-center">
        <p class="text-xl font-semibold text-text-primary">Заказ оформлен!</p>
        <p class="text-sm text-text-quinary mt-1.5">Мы свяжемся с вами в ближайшее время для подтверждения</p>
      </div>
      <button id="cart-modal-close" class="button w-full">Отлично</button>
    </div>
  </div>
`

export const initCheckout = () => {
  document.getElementById('cart-checkout-btn')?.addEventListener('click', () => {
    const btn = document.getElementById('cart-checkout-btn') as HTMLButtonElement | null
    const label = document.getElementById('cart-checkout-label')
    if (!btn || !label) return

    btn.disabled = true
    label.innerHTML = `
      <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke-linecap="round"/>
      </svg>
      Обрабатываем…
    `

    setTimeout(() => {
      cartStore.clear()

      const container = document.getElementById('cart-modal-container')
      if (container) {
        container.innerHTML = SuccessModal()
        document.getElementById('cart-modal-close')?.addEventListener('click', () => location.reload())
        document.getElementById('cart-modal-backdrop')?.addEventListener('click', () => location.reload())
      }
    }, 1200)
  })
}
