import Navigo from 'navigo'

import { cartStore } from '@/entities/cart'
import { userStore } from '@/entities/user'
import { favoritesStore } from '@/features/favorite-toggle'
import { AdminDashboard, AdminProductsPage, AdminReviewsPage } from '@/pages/admin'
import { LoginPage, RegisterPage } from '@/pages/auth'
import { CartPage } from '@/pages/cart'
import { CatalogPage } from '@/pages/catalog'
import { DeliveryPage } from '@/pages/delivery'
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
  if (userStore.isAuthenticated) {
    next()
  } else {
    router.navigate('/login')
  }
}

const requireAdmin = (next: () => void) => {
  if (userStore.isAuthenticated && userStore.isAdmin) {
    next()
  } else if (userStore.isAuthenticated) {
    router.navigate('/profile')
  } else {
    router.navigate('/login')
  }
}

let router: Navigo

export const createRouter = () => {
  router = new Navigo('/')

  userStore.init()

  const user = userStore.user
  if (user) {
    cartStore.init(user.id)
    favoritesStore.init(user.id)
  }

  router.hooks({
    after: () => {
      setTimeout(() => {
        const path = window.location.pathname
        document.querySelectorAll<HTMLAnchorElement>('[data-active-route]').forEach((link) => {
          const href = link.getAttribute('data-active-route') ?? ''
          const isActive = href === '/' ? path === '/' : path.startsWith(href)
          link.classList.toggle('active', isActive)
        })
      }, 0)
    },
  })

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
    .on('/admin', () => {
      requireAdmin(() => mount(AdminDashboard))
    })
    .on('/admin/dashboard', () => {
      requireAdmin(() => mount(AdminDashboard))
    })
    .on('/admin/products', () => {
      requireAdmin(() => mount(AdminProductsPage))
    })
    .on('/admin/reviews', () => {
      requireAdmin(() => mount(AdminReviewsPage))
    })
    .on('/delivery', () => mount(DeliveryPage))
    .on('/login', () => mount(LoginPage))
    .on('/register', () => mount(RegisterPage))
    .notFound(() => mount(NotFoundPage))

  router.resolve()

  return router
}
