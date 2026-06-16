import type { Product } from '@/entities/product'
import { productApi } from '@/entities/product'
import type { Review } from '@/entities/review'
import { reviewApi } from '@/entities/review'
import type { PublicUser } from '@/entities/user'
import { userApi } from '@/entities/user'

let allReviews: Review[] = []
let allProducts: Product[] = []
let allUsers: PublicUser[] = []

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const renderStars = (rating: number): string => {
  return Array.from(
    { length: 5 },
    (_, i) =>
      `<svg class="w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-text-quinary'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
  ).join('')
}

const renderReviewItem = (review: Review, productName?: string): string => {
  return `
    <div class="p-4 rounded-xl border border-border-light hover:border-border transition-colors duration-150">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-0.5">${renderStars(review.rating)}</div>
          <span class="text-sm font-medium text-text-primary">${review.userName}</span>
          <span class="text-xs text-text-quinary">${formatDate(review.createdAt)}</span>
        </div>
        <button
          data-delete-review="${review.id}"
          class="px-3 py-1.5 text-xs font-medium text-error border border-border rounded-lg hover:bg-red-50 transition-colors"
        >Удалить</button>
      </div>
      <p class="text-sm text-text-secondary leading-relaxed">${review.text}</p>
      ${productName ? `<p class="text-xs text-text-quinary mt-2">Товар: ${productName}</p>` : ''}
    </div>
  `
}

const renderReviewsList = (reviews: Review[]) => {
  const container = document.getElementById('admin-reviews-list')
  if (!container) return
  if (reviews.length === 0) {
    container.innerHTML = '<p class="text-sm text-text-quinary text-center py-8">Отзывы не найдены</p>'
    return
  }
  container.innerHTML = reviews
    .map((r) => {
      const product = allProducts.find((p) => p.id === r.productId)
      return renderReviewItem(r, product?.title)
    })
    .join('')
  attachReviewListeners(reviews)
}

const populateSelects = () => {
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

const filterReviews = () => {
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

  renderReviewsList(filtered)
}

const attachReviewListeners = (reviews: Review[]) => {
  document.querySelectorAll<HTMLButtonElement>('[data-delete-review]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.deleteReview
      if (!id) return
      if (!confirm('Вы уверены, что хотите удалить отзыв?')) return
      try {
        await reviewApi.delete(id)
        const review = reviews.find((r) => r.id === id)
        if (review) {
          await reviewApi.syncProductRating(review.productId)
        }
        allReviews = allReviews.filter((r) => r.id !== id)
        filterReviews()
      } catch {
        alert('Ошибка при удалении отзыва')
      }
    })
  })
}

export const initReviewsPage = () => {
  document.getElementById('admin-review-product-select')?.addEventListener('change', filterReviews)
  document.getElementById('admin-review-user-select')?.addEventListener('change', filterReviews)

  loadData()
}

const loadData = async () => {
  try {
    const [reviews, products, users] = await Promise.all([reviewApi.getAll(), productApi.getAll(), userApi.getAll()])
    allReviews = reviews
    allProducts = products
    allUsers = users

    renderReviewsList(allReviews)
    populateSelects()
  } catch {
    const container = document.getElementById('admin-reviews-list')
    if (container) container.innerHTML = '<p class="text-sm text-error text-center py-8">Ошибка загрузки отзывов</p>'
  }
}
