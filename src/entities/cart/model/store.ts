import { AxiosError } from 'axios'

import { productService } from '@/entities/product'

import { cartService } from '../api/service'
import type { CartItem, CartState } from './types'

let state: CartState = { items: [] }
let listeners: (() => void)[] = []

const notify = () => {
  for (const fn of listeners) fn()
}

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
    return state.items.reduce((sum, i) => sum + i.product.price.current * i.quantity, 0)
  },

  get count() {
    return state.items.reduce((sum, i) => sum + i.quantity, 0)
  },

  get(productId: string): CartItem | undefined {
    return state.items.find((item) => item.product.id === productId)
  },

  async init(userId: string) {
    const cached = loadCache(userId)
    setState({ items: cached })

    try {
      const items = await cartService.get(userId)
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

    if (existing) {
      const newQuantity = existing.quantity + 1
      setState({ items: state.items.map((i) => (i.product.id === productId ? { ...i, quantity: newQuantity } : i)) })

      try {
        await cartService.update(existing.id, newQuantity)
        saveCache(userId)
      } catch (error) {
        if (error instanceof AxiosError) {
          setState({
            items: state.items.map((i) => (i.product.id === productId ? { ...i, quantity: existing.quantity } : i)),
          })
        }
      }
      return
    }

    const product = await productService.getById(productId)
    const tempId = `temp_${Date.now()}`
    const newItem: CartItem = { id: tempId, product, quantity: 1 }
    setState({ items: [...state.items, newItem] })

    try {
      const cartItem = await cartService.add(userId, { product, quantity: 1 })
      setState({ items: state.items.map((i) => (i.id === tempId ? cartItem : i)) })
      saveCache(userId)
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({ items: state.items.filter((i) => i.id !== tempId) })
      }
    }
  },

  async remove(userId: string, productId: string) {
    const item = state.items.find((i) => i.product.id === productId)
    if (!item) return

    setState({ items: state.items.filter((i) => i.product.id !== productId) })

    if (!item.id.startsWith('temp_')) {
      try {
        await cartService.remove(item.id)
        saveCache(userId)
      } catch (error) {
        if (error instanceof AxiosError) {
          setState({ items: [...state.items, item] })
        }
      }
    }
  },

  async decrement(userId: string, productId: string): Promise<boolean> {
    const item = state.items.find((i) => i.product.id === productId)
    if (!item) return false

    if (item.quantity <= 1) {
      await this.remove(userId, productId)
      return true
    }

    const newQty = item.quantity - 1
    setState({ items: state.items.map((i) => (i.product.id === productId ? { ...i, quantity: newQty } : i)) })

    try {
      await cartService.update(item.id, newQty)
      saveCache(userId)
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({
          items: state.items.map((i) => (i.product.id === productId ? { ...i, quantity: item.quantity } : i)),
        })
      }
    }
    return false
  },

  async clear(userId: string) {
    const old = state.items
    setState({ items: [] })

    try {
      await cartService.clear(userId)
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
