import type { Product } from '@/entities/product'
import { ProductAvailability } from '@/entities/product'

import { t } from '@/shared/i18n'
import { cn, html } from '@/shared/lib'
import { Button } from '@/shared/ui/components'
import { Star } from '@/shared/ui/icons'

import { CartToggleButton } from './CartToggleButton'
import { FavoritesToggleButton } from './FavoritesToggleButton'

export interface ProductCardProps {
  product: Product
  className?: string
}

export const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const isInStock = product.availability === ProductAvailability.IN_STOCK
  const score = Math.floor(product.rating.score)
  const stars = Array.from({ length: 5 }, (_, i) => Star({ className: i < score ? 'text-amber-400' : '' })).join('')

  return html`
    <div data-product-card class="${cn('@container flex flex-col shadow-card gap-2 @[16rem]:gap-3 items-center w-full px-2 py-3.5 @[16rem]:px-4 @[16rem]:py-5 bg-background-secondary rounded-2xl overflow-hidden', className)}">
      <div class="flex items-center justify-between w-full min-w-0 overflow-hidden">
        <div class="flex items-center gap-1 min-w-0 shrink">
          <div class="flex gap-px shrink">${stars}</div>
          <span class="text-primary shrink">(${product.rating.reviewsCount})</span>
        </div>
        ${FavoritesToggleButton({ productId: product.id })}
      </div>

      <a href="/product/${product.id}" data-navigo class="font-medium text-2xl text-text-primary text-center w-full min-w-0 hover:text-primary transition-colors">
        ${product.title}
      </a>

      <a href="/product/${product.id}" data-navigo data-product-image class="flex justify-center items-center h-50 my-2">
        <img src="${product.images[0]}" alt="${product.title}" class="max-h-full object-contain" loading="lazy" />
      </a>

      <div class="flex flex-col items-center gap-0.5 text-text-quinary text-base w-full min-w-0 @[16rem]:flex-row @[16rem]:items-center @[16rem]:justify-between @[16rem]:gap-2">
        <div class="flex items-center gap-1">
          <span class="${cn('w-4 h-4 rounded-full inline-block shrink-0', isInStock ? 'bg-success' : 'bg-primary')}"></span>
          <span class="truncate">${isInStock ? t('product.inStock') : t('product.outOfStock')}</span>
        </div>
        ${isInStock && product.warrantyPeriod ? html`<span class="text-sm @[16rem]:text-base">${product.warrantyPeriod}</span>` : ''}
      </div>

      ${
        isInStock
          ? html`
          <div class="${cn('text-center min-w-0', product.price?.old && 'flex items-center gap-3')}">
            ${product.price?.old ? html`<span class="text-sm text-text-quinary line-through truncate">${product.price.old.toLocaleString()} ₽</span>` : ''}
            <span class="text-2xl font-medium text-text-primary">${product.price?.current.toLocaleString() ?? ''} ₽</span>
          </div>
        `
          : html`<p class="text-sm text-text-quinary">${t('product.outOfStockHint')}</p>`
      }

      <div class="w-full mt-1 min-w-0">
        ${
          isInStock
            ? CartToggleButton({ productId: product.id, className: 'rounded-full px-4 py-2' })
            : Button({ text: t('product.notifyMe'), variant: 'outline', className: 'rounded-full px-4 py-2 w-full' })
        }
      </div>
    </div>
  `
}
