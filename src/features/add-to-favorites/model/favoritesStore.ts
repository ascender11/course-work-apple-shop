import type { Favorite } from './types'

const KEY = (userId: string) => `apple_shop_favorites_${userId}`

const load = (userId: string): Favorite[] => {
  try {
    const raw = localStorage.getItem(KEY(userId))
    return raw ? (JSON.parse(raw) as Favorite[]) : []
  } catch {
    return []
  }
}

const save = (userId: string, items: Favorite[]) => {
  localStorage.setItem(KEY(userId), JSON.stringify(items))
}

let state: { userId: string; items: Favorite[] } = { userId: '', items: [] }

const init = (userId: string) => {
  state = { userId, items: load(userId) }
}

const getAll = (): Favorite[] => state.items

const has = (productId: string): boolean => state.items.some((f) => f.productId === productId)

const getId = (productId: string): string => state.items.find((f) => f.productId === productId)?.id ?? ''

const add = (favorite: Favorite) => {
  if (has(favorite.productId)) return
  state.items = [...state.items, favorite]
  save(state.userId, state.items)
}

const remove = (productId: string) => {
  state.items = state.items.filter((f) => f.productId !== productId)
  save(state.userId, state.items)
}

const clear = () => {
  state.items = []
  save(state.userId, state.items)
}

const syncFromApi = (favorites: Favorite[]) => {
  state.items = favorites
  save(state.userId, state.items)
}

export const favoritesStore = { init, getAll, has, getId, add, remove, clear, syncFromApi }
