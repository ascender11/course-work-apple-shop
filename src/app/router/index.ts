import Navigo from 'navigo'

import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'

const mount = (page: () => string) => {
  const app = document.querySelector<HTMLElement>('#app')
  if (!app) return
  app.innerHTML = page()
}

export const createRouter = () => {
  const router = new Navigo('/')

  router.on('/', () => mount(HomePage)).notFound(() => mount(NotFoundPage))

  router.resolve()

  return router
}
