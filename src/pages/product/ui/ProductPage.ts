import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'
import { Spinner } from '@/shared/ui/components'

import { initProductPage } from '../model/init'

export const ProductPage = (id: string): string => {
  const init = () => {
    const observer = new MutationObserver((_, obs) => {
      const root = document.getElementById('product-page-root')
      if (!root) return
      obs.disconnect()
      initProductPage(id)
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }

  if (typeof window !== 'undefined') init()

  return html`
    ${Header()}
    <main id="product-page-root" class="py-12.5 px-30">
      <div id="product-page-content">
        <div class="py-12 flex justify-center items-center text-text-quinary">${Spinner()}</div>
      </div>
    </main>
    ${Footer()}
  `
}
