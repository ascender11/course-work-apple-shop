import type { AvailableProduct, Product } from '@/entities/product'
import { ProductAvailability, productService } from '@/entities/product'
import { userStore } from '@/entities/user'
import { initAddToCartButtons } from '@/features/add-to-cart'
import { initFavoriteButtons } from '@/features/favorite-toggle'
import { canUserReview, initReviewForm, loadReviews, ReviewForm } from '@/features/submit-review'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'
import { Star } from '@/shared/ui/icons'

import { initGallery } from '../model/gallery-controller'
import { OutOfStockCard } from './OutOfStockCard'
import { PriceCard } from './PriceCard'
import { ProductGallery } from './ProductGallery'
import { ShortProperties } from './ShortProperties'
import { SpecificationsSection } from './SpecificationsSection'

const renderRatingRow = (product: Product) => html`
  <div class="flex flex-wrap items-center gap-2">
    ${
      product.soldCount
        ? html`<span class="text-text-quinary text-sm">Было продано: ${product.soldCount} шт</span>`
        : ''
    }
  </div>
`

const renderProductRating = (rating: { score: number; reviewsCount: number }) => {
  const fullStars = Math.floor(rating.score)

  return html`
    <div class="flex items-center gap-2">
      <div class="flex gap-px">
        ${Array.from({ length: 5 }, (_, i) => Star({ className: i < fullStars ? 'text-amber-400' : '' })).join('')}
      </div>
      <span class="text-sm text-text-primary">${rating.score} (${rating.reviewsCount} отз.)</span>
    </div>
  `
}

export const ProductPage = (id: string): string => {
  const init = () => {
    const observer = new MutationObserver((_, obs) => {
      const root = document.getElementById('product-page-root')
      if (!root) return
      obs.disconnect()

      const renderPage = (product: Product) => {
        const contentEl = document.getElementById('product-page-content')
        if (!contentEl) return

        const isInStock = product.availability === ProductAvailability.IN_STOCK

        const priceSection = isInStock
          ? PriceCard({
              price: (product as AvailableProduct).price,
              availability: product.availability,
              warrantyPeriod: (product as AvailableProduct).warrantyPeriod,
              productId: product.id,
            })
          : OutOfStockCard()

        const ratingHtml = renderProductRating(product.rating)

        contentEl.innerHTML = html`
          <div>

            <div class="lg:hidden mb-5">
              <h1 class="text-2xl font-semibold text-text-primary leading-snug">${product.title}</h1>
              <div class="mt-1">${ratingHtml}</div>
              ${renderRatingRow(product)}
            </div>

            <div class="grid grid-cols-1 gap-8 lg:grid-cols-[400px_1fr] lg:gap-12 lg:items-start">

              ${ProductGallery({ images: product.images, title: product.title })}

              <div class="flex flex-col gap-6">

                <div class="hidden lg:block">
                  <h1 class="text-[38px] font-semibold text-text-primary leading-tight">${product.title}</h1>
                  <div class="mt-1">${ratingHtml}</div>
                  ${renderRatingRow(product)}
                </div>

                <div class="flex flex-col gap-8 lg:flex-row lg:gap-16 lg:items-start">

                  ${ShortProperties({ specifications: product.specifications })}

                  <div class="w-full lg:w-80 shrink-0">
                    ${priceSection}
                  </div>
                </div>
              </div>
            </div>
          </div>

          ${product.specifications ? SpecificationsSection({ specifications: product.specifications }) : ''}

          <div id="review-section"></div>
          <div data-review-list-container></div>
        `

        initGallery()
        initAddToCartButtons()
        initFavoriteButtons()

        const reviewSection = document.getElementById('review-section')
        if (reviewSection) {
          const isAdmin = userStore.isAdmin

          if (isAdmin) {
            reviewSection.innerHTML = html`
              <div class="mt-8 p-6 rounded-2xl bg-background-secondary">
                <h3 class="text-lg font-semibold text-text-primary mb-2">Оставить отзыв</h3>
                <p class="text-text-quinary text-sm">
                  Администраторы не могут оставлять отзывы.
                </p>
              </div>
            `
          } else {
            canUserReview(id).then((canReview) => {
              reviewSection.innerHTML = ReviewForm({ productId: id, canReview })
              initReviewForm(() => {
                loadReviews(id)
                productService.getById(id).then((updated) => {
                  const newRatingHtml = renderProductRating(updated.rating)
                  document.querySelectorAll('.product-rating-live').forEach((el) => {
                    el.innerHTML = newRatingHtml
                  })
                })
              })
            })
          }
        }

        loadReviews(id)
      }

      productService
        .getById(id)
        .then(renderPage)
        .catch(() => {
          const contentEl = document.getElementById('product-page-content')
          if (contentEl) {
            contentEl.innerHTML = html`
              <p class="py-24 text-center text-error text-base">
                Не удалось загрузить товар. Попробуйте обновить страницу.
              </p>
            `
          }
        })
    })

    observer.observe(document.body, { childList: true, subtree: true })
  }

  if (typeof window !== 'undefined') init()

  return html`
    ${Header()}
    <main id="product-page-root">
      <div id="product-page-content" class="flex flex-col justify-center py-12.5 px-30">
        <p>Загрузка товара…</p>
      </div>
    </main>
    ${Footer()}
  `
}
