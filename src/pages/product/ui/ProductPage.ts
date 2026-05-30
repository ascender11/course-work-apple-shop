import type { AvailableProduct, Product } from '@/entities/product'
import { ProductAvailability, productApi } from '@/entities/product'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'

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

export const ProductPage = (id: string): string => {
  const init = () => {
    const observer = new MutationObserver((_, obs) => {
      const root = document.getElementById('product-page-root')
      if (!root) return
      obs.disconnect()

      productApi
        .getById(id)
        .then((product) => {
          const contentEl = document.getElementById('product-page-content')
          if (!contentEl) return

          const isInStock = product.availability === ProductAvailability.IN_STOCK

          const priceSection = isInStock
            ? PriceCard({
                price: (product as AvailableProduct).price,
                availability: product.availability,
                warrantyPeriod: (product as AvailableProduct).warrantyPeriod,
              })
            : OutOfStockCard()

          contentEl.innerHTML = html`
            <div>

              <div class="lg:hidden mb-5">
                <h1 class="text-2xl font-semibold text-text-primary leading-snug">${product.title}</h1>
                ${renderRatingRow(product)}
              </div>

              <div class="grid grid-cols-1 gap-8 lg:grid-cols-[400px_1fr] lg:gap-12 lg:items-start">

                ${ProductGallery({ images: product.images, title: product.title })}

                <div class="flex flex-col gap-6">

                  <div class="hidden lg:block">
                    <h1 class="text-[38px] font-semibold text-text-primary leading-tight">${product.title}</h1>
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
          `

          initGallery()
        })
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
