import type { Product } from '@/entities/product'
import { ProductAvailability } from '@/entities/product'

import { html } from '@/shared/lib'

export const ProductItem = (product: Product): string => {
  const price = 'price' in product ? product.price.current : null
  const oldPrice = 'price' in product && product.price.old ? product.price.old : null
  const isAvailable = product.availability === ProductAvailability.IN_STOCK

  return html`
    <div class="flex items-center gap-4 p-4 rounded-xl border border-border-light hover:border-border transition-colors duration-150">
      <div class="w-14 h-14 rounded-lg bg-background-secondary overflow-hidden shrink-0 flex items-center justify-center">
        ${
          product.images?.[0]
            ? `<img src="${product.images[0]}" alt="" class="w-full h-full object-cover" />`
            : `<span class="text-text-quinary text-xs">Нет фото</span>`
        }
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-text-primary truncate">${product.title}</p>
        <div class="flex items-center gap-2 mt-1">
          ${
            price !== null
              ? `<span class="text-sm font-semibold text-text-primary">${price.toLocaleString('ru-RU')} ₽</span>`
              : `<span class="text-sm text-text-quinary">Нет цены</span>`
          }
          ${
            oldPrice !== null
              ? `<span class="text-xs text-text-quinary line-through">${oldPrice.toLocaleString('ru-RU')} ₽</span>`
              : ''
          }
          <span class="text-xs px-2 py-0.5 rounded-full ${isAvailable ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}">
            ${isAvailable ? 'В наличии' : 'Нет в наличии'}
          </span>
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button
          data-edit-product="${product.id}"
          class="px-3 py-1.5 text-xs font-medium text-primary border border-border rounded-lg hover:bg-background-secondary transition-colors"
        >Редактировать</button>
        <button
          data-delete-product="${product.id}"
          class="px-3 py-1.5 text-xs font-medium text-error border border-border rounded-lg hover:bg-red-50 transition-colors"
        >Удалить</button>
      </div>
    </div>
  `
}
