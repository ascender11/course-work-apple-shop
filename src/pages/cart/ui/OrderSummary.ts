import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'

export const OrderSummary = (total: number, count: number) => html`
  <div class="bg-background-secondary rounded-2xl border border-border-light shadow-card p-6 flex flex-col gap-4 lg:sticky lg:top-6">
    <h2 class="text-lg font-semibold text-text-primary">${t('cart.yourOrder')}</h2>

    <div class="flex flex-col gap-2 text-sm text-text-secondary">
      <div class="flex justify-between">
        <span>${t('cart.products')} (<span id="summary-count">${count}</span>)</span>
        <span id="summary-subtotal">${total.toLocaleString('ru-RU')} ₽</span>
      </div>
      <div class="flex justify-between text-success">
        <span>${t('cart.delivery')}</span>
        <span>${t('cart.free')}</span>
      </div>
    </div>

    <div class="flex justify-between items-baseline pt-1 border-t border-border-light">
      <span class="text-base font-semibold text-text-primary">${t('cart.total')}</span>
      <span id="summary-total" class="text-2xl font-bold text-text-primary">${total.toLocaleString('ru-RU')} ₽</span>
    </div>

    <button id="cart-checkout-btn" class="button w-full flex items-center justify-center gap-2 mt-1">
      <span id="cart-checkout-label" class="flex items-center gap-1">${t('cart.checkout')}</span>
    </button>

    <p class="text-xs text-text-quinary text-center">
      ${t('cart.checkoutDisclaimer')}
    </p>
  </div>
`
