import { ProductAvailability } from '@/entities/product/@x/cart'

import { html } from '@/shared/lib'

import type { CartItem as CartItemType } from '../model/types'

const TrashIcon = () =>
  `<svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`

export const CartItemCard = ({ product, quantity }: CartItemType) => {
  const isInStock = product.availability === ProductAvailability.IN_STOCK
  const price = isInStock ? product.price.current : 0
  const lineTotal = price * quantity

  return html`
    <div
      class="js-cart-item flex items-start gap-4 py-5 border-b border-gray-100 last:border-0 transition-opacity duration-300"
      data-product-id="${product.id}"
    >
      <a href="/product/${product.id}" data-navigo class="shrink-0 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-background-secondary overflow-hidden">
        <img src="${product.images[0]}" alt="${product.title}" class="w-full h-full object-contain p-1" loading="lazy" />
      </a>

      <div class="flex flex-1 flex-col gap-1 min-w-0">
        <a href="/product/${product.id}" data-navigo class="text-sm font-medium text-text-primary leading-snug hover:text-primary transition-colors line-clamp-2">
          ${product.title}
        </a>

        <span class="sm:hidden text-base font-semibold text-text-primary mt-1">
          ${lineTotal.toLocaleString('ru-RU')} ₽
        </span>

        <div class="flex items-center gap-2 mt-2">
          <button
            class="js-cart-dec flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-text-secondary hover:border-primary hover:text-primary active:scale-95 transition-all duration-150 cursor-pointer"
            aria-label="Уменьшить количество"
          >
            <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <span class="js-cart-qty min-w-6 text-center text-sm font-medium text-text-primary">${quantity}</span>
          <button
            class="js-cart-inc flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-text-secondary hover:border-primary hover:text-primary active:scale-95 transition-all duration-150 cursor-pointer"
            aria-label="Увеличить количество"
          >
            <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <button
            class="js-cart-remove-mobile hidden items-center justify-center w-8 h-8 rounded-full text-text-quinary hover:text-red-500 hover:bg-red-50 active:scale-95 transition-all duration-150 cursor-pointer ml-auto"
            aria-label="Удалить товар"
          >
            ${TrashIcon()}
          </button>
        </div>
      </div>

      <div class="shrink-0 flex flex-col items-end gap-3">
        <span class="hidden sm:block js-cart-line-total text-base font-semibold text-text-primary whitespace-nowrap">
          ${lineTotal.toLocaleString('ru-RU')} ₽
        </span>
        <button
          class="js-cart-remove flex items-center justify-center w-8 h-8 rounded-full text-text-quinary hover:text-red-500 hover:bg-red-50 active:scale-95 transition-all duration-150 cursor-pointer"
          aria-label="Удалить товар"
        >
          ${TrashIcon()}
        </button>
      </div>
    </div>
  `
}
