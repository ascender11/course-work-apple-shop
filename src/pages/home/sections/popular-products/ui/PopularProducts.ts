import { productService } from '@/entities/product'
import { initAddToCartButtons } from '@/features/cart-toggle'
import { initFavoriteButtons } from '@/features/favorite-toggle'
import { ProductList } from '@/widgets/product-list'

import { cn, html } from '@/shared/lib'

export interface PopularProductsProps {
  className?: string
}

export const PopularProducts = ({ className = '' }: PopularProductsProps = {}) => {
  const init = () => {
    const observer = new MutationObserver(async (_, obs) => {
      const listContainer = document.getElementById('popular-products-list')

      if (listContainer) {
        obs.disconnect()

        try {
          const products = await productService.getAll()
          listContainer.innerHTML = ProductList({ products })

          await initFavoriteButtons()
          await initAddToCartButtons()
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'

          listContainer.innerHTML = html`
            <div class="py-10 text-center text-error">
              Не удалось загрузить товары: ${errorMessage}
            </div>
          `
        }
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
  }

  if (typeof window !== 'undefined') {
    init()
  }

  return html`
    <section class="${cn('py-4 px-3 sm:py-6 sm:px-4', className)}">
      <h1 class="text-2xl sm:text-4xl xl:text-5xl font-bold mb-2 text-text-primary">Купить iPhone в Москве</h1>
      <p class="text-lg text-primary sm:text-2xl mb-6">Самые популярные</p>
      
      <div id="popular-products-list" class="w-full">
        <div class="py-12 text-center text-text-quinary font-medium">
          Загрузка популярных товаров...
        </div>
      </div>
    </section>
  `
}
