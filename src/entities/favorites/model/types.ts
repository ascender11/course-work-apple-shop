import type { Product } from '@/entities/product'

export interface Favorite {
  id: string
  userId: string
  productId: string
}

export interface FavoriteItem {
  id: string
  userId: string
  productId: string
  product: Product
}

export interface FavoritesState {
  items: FavoriteItem[]
  loading: boolean
  error: string | null
}
