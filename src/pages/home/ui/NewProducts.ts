import { productService } from '@/entities/product'
import { initAddToCartButtons } from '@/features/cart-toggle'
import { initFavoriteButtons } from '@/features/favorite-toggle'
import { ProductList } from '@/widgets/product-list'

import { cn, html } from '@/shared/lib'

export interface NewProductsProps {
  className?: string
}

export const NewProducts = ({ className = '' }: NewProductsProps = {}) => {
  const init = () => {
    const observer = new MutationObserver(async (_, obs) => {
      const listContainer = document.getElementById('new-products-list')
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
            <div class="py-10 text-center text-error">Не удалось загрузить товары: ${errorMessage}</div>
          `
        }
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }

  if (typeof window !== 'undefined') init()

  return html`
    <section class="${cn('py-4 px-3 sm:py-6 sm:px-4', className)}">
      <p class="text-lg text-primary sm:text-2xl mb-6">Новинки</p>
      <div id="new-products-list" class="w-full">
        <div class="py-12 text-center text-text-quinary font-medium">Загрузка новых товаров...</div>
      </div>
    </section>
  `
}
