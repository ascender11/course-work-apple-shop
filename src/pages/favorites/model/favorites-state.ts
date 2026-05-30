import type { Product } from '@/entities/product'

export interface FavoritesState {
  products: Product[]
  currentPage: number
  currentSort: string
  isLoading: boolean
}

export const createInitialState = (): FavoritesState => ({
  products: [],
  currentPage: 1,
  currentSort: '',
  isLoading: true,
})
