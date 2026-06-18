import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'

export const SuccessModal = () => html`
  <div id="cart-success-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" id="cart-modal-backdrop"></div>
    <div class="relative bg-background rounded-3xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center gap-5" style="animation: cartFadeUp 0.28s ease both">
      <div class="flex items-center justify-center w-16 h-16 rounded-full bg-background-secondary">
        <svg viewBox="0 0 24 24" class="w-8 h-8 text-success" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div class="text-center">
        <p class="text-xl font-semibold text-text-primary">${t('cart.orderSuccess')}</p>
        <p class="text-sm text-text-quinary mt-1.5">${t('cart.orderSuccessHint')}</p>
      </div>
      <button id="cart-modal-close" class="button w-full">${t('cart.orderClose')}</button>
    </div>
  </div>
`
