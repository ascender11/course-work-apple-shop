import type { Product } from '@/entities/product'

import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'
import { Star } from '@/shared/ui/icons'

export const renderRatingRow = (product: Product) => html`
  <div class="flex flex-wrap items-center gap-2">
    ${
      product.soldCount
        ? html`<span class="text-text-quinary text-sm">${t('product.sold', { count: product.soldCount })}</span>`
        : ''
    }
  </div>
`

export const renderProductRating = (rating: { score: number; reviewsCount: number }) => {
  const fullStars = Math.floor(rating.score)

  return html`
    <div class="flex items-center gap-2">
      <div class="flex gap-px">
        ${Array.from({ length: 5 }, (_, i) => Star({ className: i < fullStars ? 'text-amber-400' : '' })).join('')}
      </div>
      <span class="text-sm text-text-primary">${rating.score} (${rating.reviewsCount} ${t('product.reviews')})</span>
    </div>
  `
}
