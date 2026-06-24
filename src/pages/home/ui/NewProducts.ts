import { productService } from '@/entities/product'
import { ProductList } from '@/widgets/product-list'

import { t } from '@/shared/i18n'
import { cn, html } from '@/shared/lib'
import { Spinner } from '@/shared/ui/components'

export interface NewProductsProps {
  className?: string
}

export const NewProducts = ({ className = '' }: NewProductsProps = {}) => {
  const loadProducts = async () => {
    const listContainer = document.getElementById('new-products-list')
    if (!listContainer) return

    try {
      const products = await productService.getAll()
      listContainer.innerHTML = ProductList({ products })
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      listContainer.innerHTML = html`
        <div class="py-10 text-center text-error">${t('home.new.error', { error: errorMessage })}</div>
      `
    }
  }

  if (typeof window !== 'undefined') {
    requestAnimationFrame(loadProducts)
  }

  return html`
    <section class="${cn('py-4 px-6 sm:py-6 sm:px-10 xl:px-16', className)}">
      <p class="text-lg text-primary sm:text-2xl mb-6">${t('home.new.subtitle')}</p>
      <div id="new-products-list" class="w-full">
        <div class="py-12 flex justify-center items-center text-text-quinary">${Spinner()}</div>
      </div>
    </section>
  `
}
