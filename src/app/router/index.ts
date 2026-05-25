import Navigo from 'navigo'

import { cartStore } from '@/entities/cart'
import { userStore } from '@/entities/user'
import { LoginPage, RegisterPage } from '@/pages/auth'
import { CartPage } from '@/pages/cart'
import { CatalogPage } from '@/pages/catalog'
import { FavoritesPage } from '@/pages/favorites'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { ProductPage } from '@/pages/product'
import { ProfilePage } from '@/pages/profile'

const mount = (page: () => string) => {
  const app = document.querySelector<HTMLElement>('#app')
  if (!app) return
  app.innerHTML = page()
}

const requireAuth = (next: () => void) => {
  if (userStore.isLoggedIn()) {
    next()
  } else {
    router.navigate('/login')
  }
}

let router: Navigo

export const createRouter = () => {
  router = new Navigo('/')

  const user = userStore.getUser()
  if (user) cartStore.init(user.id)

  router
    .on('/', () => mount(HomePage))
    .on('/catalog', () => {
      requireAuth(() => mount(() => CatalogPage()))
    })
    .on('/product/:id', (match) => {
      requireAuth(() => {
        const id = match?.data?.id ?? ''
        mount(() => ProductPage(id))
      })
    })
    .on('/favorites', () => {
      requireAuth(() => mount(FavoritesPage))
    })
    .on('/cart', () => {
      requireAuth(() => mount(CartPage))
    })
    .on('/profile', () => {
      requireAuth(() => mount(ProfilePage))
    })
    .on('/login', () => mount(LoginPage))
    .on('/register', () => mount(RegisterPage))
    .notFound(() => mount(NotFoundPage))

  router.resolve()

  return router
}
