import type { CartItem } from '@/entities/cart'
import { CartItemCard } from '@/entities/cart'

import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'

export const CartItems = (items: CartItem[]) => html`
  <div class="flex-1 min-w-0 bg-background-secondary rounded-2xl border border-border-light shadow-card-sm px-4 sm:px-6">
    <div id="cart-items-list">
      ${items.map((item) => CartItemCard(item)).join('')}
    </div>
    <div class="py-4 flex justify-end">
      <button
        id="cart-clear-btn"
        class="text-sm text-text-quinary hover:text-error transition-colors duration-150 cursor-pointer"
      >
        ${t('cart.clear')}
      </button>
    </div>
  </div>
`
