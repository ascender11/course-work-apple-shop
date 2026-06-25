import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'
import { Spinner } from '@/shared/ui/components'

import { initProductPage } from '../model/init'

export const ProductPage = (id: string) => ({
  html: html`
    ${Header()}
    <main id="product-page-root" class="py-12.5 px-4 sm:px-6 md:px-8 lg:px-30">
      <div id="product-page-content">
        <div class="py-12 flex justify-center items-center text-text-quinary">${Spinner()}</div>
      </div>
    </main>
    ${Footer()}
  `,
  init: () => initProductPage(id),
})
