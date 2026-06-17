import type { Product } from '@/entities/product'
import { ProductAvailability } from '@/entities/product'
import { AddToCartButton } from '@/features/add-to-cart'
import { FavoriteButton } from '@/features/favorite-toggle'

import { cn, html } from '@/shared/lib'
import { Button } from '@/shared/ui/components'
import { Star } from '@/shared/ui/icons'

export interface ProductCardProps {
  product: Product
  className?: string
}

export const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const isInStock = product.availability === ProductAvailability.IN_STOCK
  const score = Math.floor(product.rating.score)
  const stars = Array.from({ length: 5 }, (_, i) => Star({ className: i < score ? 'text-amber-400' : '' })).join('')

  return html`
    <div data-product-card class="${cn('flex flex-col shadow-card gap-3.75 items-center w-full max-w-70 px-1.75 py-3.5 bg-background rounded-2xl dark:bg-background-secondary', className)}">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-1">
          <div class="flex gap-px">${stars}</div>
          <span class="text-primary">(${product.rating.reviewsCount})</span>
        </div>
        ${FavoriteButton({ productId: product.id })}
      </div>

      <a href="/product/${product.id}" data-navigo class="font-medium text-2xl text-text-primary text-center w-full hover:text-primary transition-colors">
        ${product.title}
      </a>

      <a href="/product/${product.id}" data-navigo class="flex justify-center items-center h-50 mb-4">
        <img src="${product.images[0]}" alt="${product.title}" class="max-h-full object-contain" loading="lazy" />
      </a>

      <div class="flex items-center gap-1.25 text-text-quinary w-full">
        <span class="${cn('w-4 h-4 rounded-full inline-block', isInStock ? 'bg-success' : 'bg-primary')}"></span>
        <span class="flex justify-between w-full">
          <span>${isInStock ? 'Есть в наличии' : 'Ожидается поступление'}</span>
          ${isInStock && product.warrantyPeriod ? html`<span>${product.warrantyPeriod}</span>` : ''}
        </span>
      </div>

      ${
        isInStock
          ? html`
          <div class="${cn('text-xl text-center', product.price.old && 'flex items-center gap-4')}">
            ${product.price.old ? html`<span class="text-xl text-text-quinary line-through">${product.price.old.toLocaleString()} ₽</span>` : ''}
            <span class="text-3xl font-medium text-text-primary">${product.price.current.toLocaleString()} ₽</span>
          </div>
        `
          : html`<p class="text-sm text-text-quinary">Мы можем сообщить вам, когда товар появится в наличии</p>`
      }

      <div class="w-full mt-1">
        ${
          isInStock
            ? AddToCartButton({ productId: product.id })
            : Button({ text: 'Сообщить о поступлении', variant: 'outline' })
        }
      </div>
    </div>
  `
}
