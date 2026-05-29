import type { Product } from '@/entities/product'
import { ProductCard } from '@/entities/product'

import { cn, html } from '@/shared/lib'

export interface ProductListProps {
  products: Product[]
  className?: string
}

export const ProductList = ({ products, className = '' }: ProductListProps) => {
  if (products.length === 0) {
    return html`
      <div class="flex justify-center items-center py-16">
        <p class="text-center text-text-tertiary text-lg">
          Ничего не найдено.
        </p>
      </div>
    `
  }

  return html`
    <div class="@container">
      <div class="${cn(
        'grid grid-cols-1 @[640px]:grid-cols-2 @[768px]:grid-cols-3 @[1024px]:grid-cols-4 @[1280px]:grid-cols-5 gap-2.5 justify-items-center items-start',
        className
      )}">
        ${products.map((product) => ProductCard({ product })).join('')}
      </div>
    </div>
  `
}
