import { productService } from '@/entities/product'
import { userStore } from '@/entities/user'
import { canUserReview, initReviewForm, loadReviews, ReviewForm } from '@/features/submit-review'

import { html } from '@/shared/lib'

import { renderProductRating } from './render-helpers'

export const setupReviewSection = (productId: string) => {
  const reviewSection = document.getElementById('review-section')
  if (!reviewSection) return

  if (userStore.isAdmin) {
    reviewSection.innerHTML = html`
      <div class="mt-8 p-6 rounded-2xl bg-background-secondary">
        <h3 class="text-lg font-semibold text-text-primary mb-2">Оставить отзыв</h3>
        <p class="text-text-quinary text-sm">
          Администраторы не могут оставлять отзывы.
        </p>
      </div>
    `
    return
  }

  canUserReview(productId).then((canReview) => {
    reviewSection.innerHTML = ReviewForm({ productId, canReview })
    initReviewForm(() => {
      loadReviews(productId)
      productService.getById(productId).then((updated) => {
        const newRatingHtml = renderProductRating(updated.rating)
        document.querySelectorAll('.product-rating-live').forEach((el) => {
          el.innerHTML = newRatingHtml
        })
      })
    })
  })
}
