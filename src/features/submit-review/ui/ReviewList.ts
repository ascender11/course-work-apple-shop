import type { Review } from '@/entities/review'

import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'
import { Star } from '@/shared/ui/icons'

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const lang = document.documentElement.lang || 'ru'
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const renderStars = (rating: number): string => {
  return [1, 2, 3, 4, 5]
    .map((i) => Star({ className: i <= rating ? 'text-amber-400 w-4 h-4' : 'text-text-quinary w-4 h-4' }))
    .join('')
}

export const ReviewList = (reviews: Review[]): string => {
  if (!reviews.length) {
    return html`
      <div class="mt-8 p-6 rounded-2xl bg-background-secondary">
        <h3 class="text-lg font-semibold text-text-primary mb-2">${t('review.reviews')}</h3>
        <p class="text-text-quinary text-sm">${t('review.noReviews')}</p>
      </div>
    `
  }

  const reviewItems = reviews
    .map(
      (review) => html`
        <div class="py-4 border-b border-border-light last:border-b-0">
          <div class="flex items-center gap-2 mb-2">
            <div class="flex items-center gap-0.5">${renderStars(review.rating)}</div>
            <span class="text-sm font-medium text-text-primary">${review.userName}</span>
            <span class="text-xs text-text-quinary">${formatDate(review.createdAt)}</span>
          </div>
          <p class="text-sm text-text-secondary leading-relaxed">${review.text}</p>
        </div>
      `
    )
    .join('')

  return html`
    <div class="mt-8 p-6 rounded-2xl bg-background-secondary">
      <h3 class="text-lg font-semibold text-text-primary mb-4">${t('review.reviews')} (${reviews.length})</h3>
      <div data-review-list>${reviewItems}</div>
    </div>
  `
}
