import type { Product } from '@/entities/product'
import { ProductCard } from '@/entities/product'

import { t } from '@/shared/i18n'
import { cn, html } from '@/shared/lib'

export const PAGE_SIZE = 12

export interface ProductListProps {
  products: Product[]
  className?: string
}

export const ProductList = ({ products, className = '' }: ProductListProps) => {
  if (products.length === 0) {
    return html`
      <div class="flex justify-center items-center py-16">
        <p class="text-center text-text-tertiary text-lg">
          ${t('productList.empty')}
        </p>
      </div>
    `
  }

  return html`
    <div class="@container">
      <div class="${cn(
        'grid grid-cols-1 @[640px]:grid-cols-2 @[768px]:grid-cols-3 @[1024px]:grid-cols-4 gap-5 @[1024px]:gap-6 items-start',
        className
      )}">
        ${products.map((product) => ProductCard({ product })).join('')}
      </div>
    </div>
  `
}
