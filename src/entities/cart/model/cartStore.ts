import type { Product } from '@/entities/product'
import { ProductAvailability } from '@/entities/product'

import type { CartItem, CartState } from './types'

const KEY = (userId: string) => `apple_shop_cart_${userId}`

const load = (userId: string): CartItem[] => {
  try {
    const raw = localStorage.getItem(KEY(userId))
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

const save = (userId: string, items: CartItem[]) => {
  localStorage.setItem(KEY(userId), JSON.stringify(items))
}

let state: CartState = { items: [], userId: '' }

const init = (userId: string) => {
  state = { userId, items: load(userId) }
}

const getItems = (): CartItem[] => state.items

const getCount = (): number => state.items.reduce((sum, item) => sum + item.quantity, 0)

const calculateTotal = (): number =>
  state.items.reduce((sum, item) => {
    if (item.product.availability !== ProductAvailability.IN_STOCK) return sum
    return sum + item.product.price.current * item.quantity
  }, 0)

const add = (product: Product, qty = 1, selectedColor?: string, selectedStorage?: string) => {
  const existing = state.items.find(
    (i) => i.product.id === product.id && i.selectedColor === selectedColor && i.selectedStorage === selectedStorage
  )
  if (existing) {
    existing.quantity += qty
  } else {
    state.items = [...state.items, { product, quantity: qty, selectedColor, selectedStorage }]
  }
  save(state.userId, state.items)
}

const remove = (productId: string, selectedColor?: string, selectedStorage?: string) => {
  state.items = state.items.filter(
    (i) => !(i.product.id === productId && i.selectedColor === selectedColor && i.selectedStorage === selectedStorage)
  )
  save(state.userId, state.items)
}

const changeQuantity = (productId: string, delta: number, selectedColor?: string, selectedStorage?: string) => {
  const item = state.items.find(
    (i) => i.product.id === productId && i.selectedColor === selectedColor && i.selectedStorage === selectedStorage
  )
  if (!item) return
  const next = item.quantity + delta
  if (next <= 0) {
    remove(productId, selectedColor, selectedStorage)
  } else {
    item.quantity = next
    save(state.userId, state.items)
  }
}

const clear = () => {
  state.items = []
  save(state.userId, state.items)
}

export const cartStore = { init, getItems, getCount, calculateTotal, add, remove, changeQuantity, clear }
