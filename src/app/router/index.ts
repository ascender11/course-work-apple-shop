import Navigo from 'navigo'

import { CatalogPage } from '@/pages/catalog'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { ProductPage } from '@/pages/product'

const mount = (page: () => string) => {
  const app = document.querySelector<HTMLElement>('#app')
  if (!app) return
  app.innerHTML = page()
}

export const createRouter = () => {
  const router = new Navigo('/')

  router
    .on('/', () => mount(HomePage))
    .on('/catalog', () => {
      mount(() => CatalogPage())
    })
    .on('/product/:id', (match) => {
      const id = match?.data?.id ?? ''
      mount(() => ProductPage(id))
    })
    .notFound(() => mount(NotFoundPage))

  router.resolve()

  return router
}
