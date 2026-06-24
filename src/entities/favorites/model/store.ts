import { AxiosError } from 'axios'

import type { Product } from '@/entities/product/@x/favorites'
import { productService } from '@/entities/product/@x/favorites'

import { favoritesService } from '../api/service'
import type { Favorite, FavoriteItem, FavoritesState } from './types'

let state: FavoritesState = { items: [] }
let listeners: (() => void)[] = []

const notify = () => {
  for (const fn of listeners) fn()
}

const setState = (patch: Partial<FavoritesState>) => {
  state = { ...state, ...patch }
  notify()
}

const CACHE_KEY = (id: string) => `favorites_${id}`

const loadCache = (userId: string): FavoriteItem[] => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY(userId)) || '[]')
  } catch {
    return []
  }
}

const saveCache = (userId: string) => {
  localStorage.setItem(CACHE_KEY(userId), JSON.stringify(state.items))
}

const mergeWithProducts = async (favorites: Favorite[]): Promise<FavoriteItem[]> => {
  if (!favorites.length) return []
  const products = await productService.getByIds(favorites.map((f) => f.productId))
  const productMap = new Map(products.map((p: Product) => [p.id, p]))
  const result: FavoriteItem[] = []
  for (const f of favorites) {
    const product = productMap.get(f.productId)
    if (product) result.push({ userId: f.userId, productId: f.productId, product })
  }
  return result
}

export const favoritesStore = {
  subscribe(fn: () => void) {
    listeners.push(fn)
    return () => {
      listeners = listeners.filter((l) => l !== fn)
    }
  },

  get items() {
    return state.items
  },

  get count() {
    return state.items.length
  },

  get(productId: string): FavoriteItem | undefined {
    return state.items.find((f) => f.productId === productId)
  },

  async init(userId: string) {
    const cached = loadCache(userId)
    setState({ items: cached })

    try {
      const favorites = await favoritesService.getByUser(userId)
      if (!favorites.length) {
        setState({ items: [] })
        saveCache(userId)
        return
      }
      const items = await mergeWithProducts(favorites)
      setState({ items })
      saveCache(userId)
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({ items: [] })
      }
    }
  },

  async add(userId: string, productId: string) {
    const existing = this.get(productId)
    if (existing) return

    const tempFavorite: FavoriteItem = { userId, productId, product: null as unknown as Product }
    setState({ items: [...state.items, tempFavorite] })

    try {
      const [created, product] = await Promise.all([
        favoritesService.add(userId, productId),
        productService.getById(productId),
      ])
      const favoriteItem: FavoriteItem = {
        userId: created.userId,
        productId: created.productId,
        product,
      }
      setState({
        items: state.items.map((f) => (f.productId === productId ? favoriteItem : f)),
      })
      saveCache(userId)
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({
          items: state.items.filter((f) => f.productId !== productId),
        })
      }
    }
  },

  async remove(userId: string, productId: string) {
    const item = state.items.find((f) => f.productId === productId)
    if (!item) return

    setState({ items: state.items.filter((f) => f.productId !== productId) })

    try {
      const favorites = await favoritesService.getByUser(userId)
      const fav = favorites.find((f) => f.productId === productId)
      if (fav) await favoritesService.remove(fav.id)
      saveCache(userId)
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({ items: [...state.items, item] })
      }
    }
  },

  async clear(userId: string) {
    const old = state.items
    setState({ items: [] })

    try {
      const favorites = await favoritesService.getByUser(userId)
      for (const fav of favorites) {
        await favoritesService.remove(fav.id)
      }
      saveCache(userId)
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({ items: old })
      }
    }
  },

  clearCache(userId: string) {
    setState({ items: [] })
    localStorage.removeItem(CACHE_KEY(userId))
  },
}
