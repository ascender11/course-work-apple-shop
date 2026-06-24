import { productService } from '@/entities/product'
import { initAddToCartButtons } from '@/features/cart-toggle'
import { initFavoriteButtons } from '@/features/favorite-toggle'
import { ProductList } from '@/widgets/product-list'

import { t } from '@/shared/i18n'
import { cn, html } from '@/shared/lib'
import { Spinner } from '@/shared/ui/components'

export interface PopularProductsProps {
  className?: string
}

export const PopularProducts = ({ className = '' }: PopularProductsProps = {}) => {
  const loadProducts = async () => {
    const listContainer = document.getElementById('popular-products-list')
    if (!listContainer) return

    try {
      const products = await productService.getAll()
      listContainer.innerHTML = ProductList({ products })

      initFavoriteButtons()
      initAddToCartButtons()
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      listContainer.innerHTML = html`
        <div class="py-10 text-center text-error">${t('home.popular.error', { error: errorMessage })}</div>
      `
    }
  }

  if (typeof window !== 'undefined') {
    requestAnimationFrame(loadProducts)
  }

  return html`
    <section class="${cn('py-4 px-6 sm:py-6 sm:px-10 xl:px-16', className)}">
      <h1 class="text-2xl sm:text-4xl xl:text-5xl font-bold mb-2 text-text-primary">${t('home.popular.title')}</h1>
      <p class="text-lg text-primary sm:text-2xl mb-6">${t('home.popular.subtitle')}</p>
      <div id="popular-products-list" class="w-full">
        <div class="py-12 flex justify-center items-center text-text-quinary">${Spinner()}</div>
      </div>
    </section>
  `
}
