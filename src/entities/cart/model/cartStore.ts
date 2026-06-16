import { AxiosError } from 'axios'

import { cartService } from '../api/service'
import { addItem, calcCount, calcTotal, findItem, removeItem, replaceId, updateQuantity } from './cart.service'
import type { CartItem, CartState } from './types'

let state: CartState = { items: [], loading: false, error: null }
let listeners: (() => void)[] = []

const notify = () =>
  listeners.forEach((fn) => {
    fn()
  })

const setState = (patch: Partial<CartState>) => {
  state = { ...state, ...patch }
  notify()
}

const CACHE_KEY = (id: string) => `cart_${id}`

const loadCache = (userId: string): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY(userId)) || '[]')
  } catch {
    return []
  }
}

const saveCache = (userId: string) => {
  localStorage.setItem(CACHE_KEY(userId), JSON.stringify(state.items))
}

export const cartStore = {
  subscribe(fn: () => void) {
    listeners.push(fn)
    return () => {
      listeners = listeners.filter((l) => l !== fn)
    }
  },

  get items() {
    return state.items
  },
  get total() {
    return calcTotal(state.items)
  },
  get count() {
    return calcCount(state.items)
  },
  get loading() {
    return state.loading
  },
  get error() {
    return state.error
  },

  async init(userId: string) {
    setState({ loading: true })

    const cached = loadCache(userId)
    setState({ items: cached })

    try {
      const items = await cartService.get(userId)
      setState({ items: items, loading: false })
      saveCache(userId)
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({ error: error.message, loading: false })
      }
    }
  },

  async add(userId: string, item: Omit<CartItem, 'id'>) {
    const existing = findItem(state.items, item.product.id, item.selectedColor, item.selectedStorage)

    if (existing) {
      const newQty = existing.quantity + item.quantity
      setState({ items: updateQuantity(state.items, existing.id, newQty) })

      try {
        await cartService.update(existing.id, newQty)
        saveCache(userId)
      } catch (error) {
        if (error instanceof AxiosError) {
          setState({ items: updateQuantity(state.items, existing.id, existing.quantity), error: error.message })
        }
      }
      return
    }

    const tempId = `temp_${Date.now()}`
    const newItem = { ...item, id: tempId }
    setState({ items: addItem(state.items, newItem) })

    try {
      const cartItem = await cartService.add(userId, item)
      setState({ items: replaceId(state.items, tempId, cartItem.id) })
      saveCache(userId)
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({ items: removeItem(state.items, tempId), error: error.message })
      }
    }
  },

  async remove(userId: string, id: string) {
    const item = state.items.find((i) => i.id === id)
    if (!item) return

    setState({ items: removeItem(state.items, id) })

    if (!id.startsWith('temp_')) {
      try {
        await cartService.remove(id)
        saveCache(userId)
      } catch (error) {
        if (error instanceof AxiosError) {
          setState({ items: addItem(state.items, item), error: error.message })
        }
      }
    }
  },

  async clear(userId: string) {
    const old = state.items
    setState({ items: [] })

    try {
      await cartService.clear(userId)
      saveCache(userId)
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({ items: old, error: error.message })
      }
    }
  },
}
