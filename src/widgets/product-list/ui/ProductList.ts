import type { Product } from '@/entities/product'
import { ProductCard } from '@/entities/product'

import { cn, html } from '@/shared/lib'

export interface ProductListProps {
  products: Product[]
  className?: string
}

export const ProductList = ({ products, className = '' }: ProductListProps) => {
  return html`
    <div class="${cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 justify-items-center', className)}">
      ${products.map((product) => ProductCard({ product })).join('')}
    </div>
  `
}
