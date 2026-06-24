import { AxiosError } from 'axios'

import type { Product } from '@/entities/product/@x/favorites'
import { productService } from '@/entities/product/@x/favorites'

import { favoritesService } from '../api/service'
import type { Favorite, FavoriteItem, FavoritesState } from './types'

let state: FavoritesState = { items: [], loading: false, error: null }
let listeners: (() => void)[] = []
let userId = ''

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
    if (product) result.push({ id: f.id, userId: f.userId, productId: f.productId, product })
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
  get loading() {
    return state.loading
  },
  get error() {
    return state.error
  },

  async init(id: string) {
    userId = id
    setState({ loading: true })

    const cached = loadCache(userId)
    setState({ items: cached })

    try {
      const favorites = await favoritesService.getByUser(userId)
      if (!favorites.length) {
        setState({ items: [], loading: false })
        saveCache(userId)
        return
      }
      const items = await mergeWithProducts(favorites)
      setState({ items, loading: false })
      saveCache(userId)
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({ error: error.message, loading: false })
      }
    }
  },

  has(productId: string): boolean {
    return state.items.some((f) => f.productId === productId)
  },

  getId(productId: string): string {
    return state.items.find((f) => f.productId === productId)?.id ?? ''
  },

  async add(addUserId: string, productId: string) {
    const tempId = `temp_${Date.now()}`
    const tempFavorite: FavoriteItem = { id: tempId, userId: addUserId, productId, product: null as unknown as Product }
    setState({ items: [...state.items, tempFavorite] })

    try {
      const [created, product] = await Promise.all([
        favoritesService.add(addUserId, productId),
        productService.getById(productId),
      ])
      const favoriteItem: FavoriteItem = {
        id: created.id,
        userId: created.userId,
        productId: created.productId,
        product,
      }
      setState({
        items: state.items.map((f) => (f.id === tempId ? favoriteItem : f)),
      })
      saveCache(userId)
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({
          items: state.items.filter((f) => f.id !== tempId),
        })
      }
    }
  },

  async remove(productId: string) {
    const item = state.items.find((f) => f.productId === productId)
    setState({ items: state.items.filter((f) => f.productId !== productId) })

    if (item && !item.id.startsWith('temp_')) {
      try {
        await favoritesService.remove(item.id)
        saveCache(userId)
      } catch (error) {
        if (error instanceof AxiosError) {
          setState({ items: [...state.items, item] })
        }
      }
    }
  },

  clear() {
    setState({ items: [] })
    saveCache(userId)
  },
}
