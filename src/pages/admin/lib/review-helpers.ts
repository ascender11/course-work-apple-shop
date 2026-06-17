import type { Product } from '@/entities/product'
import type { Review } from '@/entities/review'
import type { PublicUser } from '@/entities/user'

import { ReviewItem } from '../ui/ReviewItem'

export const renderReviewsList = (
  reviews: Review[],
  allProducts: Product[],
  attachListeners: (reviews: Review[]) => void
) => {
  const container = document.getElementById('admin-reviews-list')
  if (!container) return
  if (reviews.length === 0) {
    container.innerHTML = '<p class="text-sm text-text-quinary text-center py-8">Отзывы не найдены</p>'
    return
  }
  container.innerHTML = reviews
    .map((r) => {
      const product = allProducts.find((p) => p.id === r.productId)
      return ReviewItem(r, product?.title)
    })
    .join('')
  attachListeners(reviews)
}

export const populateSelects = (allProducts: Product[], allUsers: PublicUser[]) => {
  const productSelect = document.getElementById('admin-review-product-select') as HTMLSelectElement
  const userSelect = document.getElementById('admin-review-user-select') as HTMLSelectElement

  if (productSelect) {
    const options = allProducts.map((p) => `<option value="${p.id}">${p.title}</option>`).join('')
    productSelect.innerHTML = `<option value="">Все товары</option>${options}`
  }

  if (userSelect) {
    const options = allUsers
      .map((u) => {
        const name =
          'fullName' in u && u.fullName
            ? `${u.fullName.firstName} ${u.fullName.lastName}`
            : 'name' in u
              ? (u as unknown as { name: string }).name
              : u.email
        return `<option value="${u.id}">${name} (${u.email})</option>`
      })
      .join('')
    userSelect.innerHTML = `<option value="">Все пользователи</option>${options}`
  }
}

export const filterReviews = (
  allReviews: Review[],
  allProducts: Product[],
  attachListeners: (reviews: Review[]) => void
) => {
  const productSelect = document.getElementById('admin-review-product-select') as HTMLSelectElement
  const userSelect = document.getElementById('admin-review-user-select') as HTMLSelectElement

  const productId = productSelect?.value || ''
  const userId = userSelect?.value || ''

  let filtered = [...allReviews]

  if (productId) {
    filtered = filtered.filter((r) => r.productId === productId)
  }
  if (userId) {
    filtered = filtered.filter((r) => r.userId === userId)
  }

  renderReviewsList(filtered, allProducts, attachListeners)
}
