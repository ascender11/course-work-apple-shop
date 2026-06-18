import type { AvailableProduct, Product } from '@/entities/product'
import { ProductAvailability } from '@/entities/product'

import { html } from '@/shared/lib'

import { renderProductRating, renderRatingRow } from '../lib/render-helpers'
import { OutOfStockCard } from './OutOfStockCard'
import { PriceCard } from './PriceCard'
import { ProductGallery } from './ProductGallery'
import { ShortProperties } from './ShortProperties'
import { SpecificationsSection } from './SpecificationsSection'

export const ProductContent = (product: Product): string => {
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

  return html`
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
            <div class="w-full lg:w-80 shrink-0">${priceSection}</div>
          </div>
        </div>
      </div>
    </div>

    ${product.specifications ? SpecificationsSection({ specifications: product.specifications }) : ''}

    <div id="review-section"></div>
    <div data-review-list-container></div>
  `
}
