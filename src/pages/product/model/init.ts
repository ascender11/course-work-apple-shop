import { productService } from '@/entities/product'
import { initAddToCartButtons } from '@/features/cart-toggle'
import { initFavoriteButtons } from '@/features/favorite-toggle'
import { loadReviews } from '@/features/submit-review'

import { setupReviewSection } from '../lib/review-helpers'
import { ErrorContent } from '../ui/ErrorContent'
import { ProductContent } from '../ui/ProductContent'
import { initGallery } from './gallery-controller'

export const initProductPage = (id: string) => {
  productService
    .getById(id)
    .then((product) => {
      const contentEl = document.getElementById('product-page-content')
      if (!contentEl) return

      contentEl.innerHTML = ProductContent(product)

      initGallery()
      initAddToCartButtons()
      initFavoriteButtons()
      setupReviewSection(product.id)
      loadReviews(product.id)
    })
    .catch(() => {
      const contentEl = document.getElementById('product-page-content')
      if (contentEl) contentEl.innerHTML = ErrorContent()
    })
}
