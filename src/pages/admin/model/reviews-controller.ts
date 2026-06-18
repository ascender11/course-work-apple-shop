import type { Product } from '@/entities/product'
import { productService } from '@/entities/product'
import type { Review } from '@/entities/review'
import { reviewService } from '@/entities/review'
import type { PublicUser } from '@/entities/user'
import { userService } from '@/entities/user'

import { t } from '@/shared/i18n'

import { filterReviews, populateSelects, renderReviewsList } from '../lib/review-helpers'

let allReviews: Review[] = []
let allProducts: Product[] = []
let allUsers: PublicUser[] = []

const attachReviewListeners = (reviews: Review[]) => {
  document.querySelectorAll<HTMLButtonElement>('[data-delete-review]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.deleteReview
      if (!id) return
      if (!confirm(t('admin.reviews.deleteConfirm'))) return
      try {
        await reviewService.delete(id)
        const review = reviews.find((r) => r.id === id)
        if (review) {
          await reviewService.syncProductRating(review.productId)
        }
        allReviews = allReviews.filter((r) => r.id !== id)
        filterReviews(allReviews, allProducts, attachReviewListeners)
      } catch {
        alert(t('admin.reviews.deleteError'))
      }
    })
  })
}

export const initReviewsPage = () => {
  document.getElementById('admin-review-product-select')?.addEventListener('change', () => {
    filterReviews(allReviews, allProducts, attachReviewListeners)
  })
  document.getElementById('admin-review-user-select')?.addEventListener('change', () => {
    filterReviews(allReviews, allProducts, attachReviewListeners)
  })

  loadData()
}

const loadData = async () => {
  try {
    const [reviews, products, users] = await Promise.all([
      reviewService.getAll(),
      productService.getAll(),
      userService.getAll(),
    ])
    allReviews = reviews
    allProducts = products
    allUsers = users

    renderReviewsList(allReviews, allProducts, attachReviewListeners)
    populateSelects(allProducts, allUsers)
  } catch {
    const container = document.getElementById('admin-reviews-list')
    if (container)
      container.innerHTML = `<p class="text-sm text-error text-center py-8">${t('admin.reviews.loadError')}</p>`
  }
}
