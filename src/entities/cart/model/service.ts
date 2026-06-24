import type { CartItem } from './types'

export const findItem = (items: CartItem[], productId: string, color?: string, storage?: string) =>
  items.find((i) => i.product.id === productId && i.selectedColor === color && i.selectedStorage === storage)

export const removeItem = (items: CartItem[], id: string) => items.filter((i) => i.id !== id)

export const updateQuantity = (items: CartItem[], id: string, quantity: number) =>
  items.map((i) => (i.id === id ? { ...i, quantity } : i))

export const replaceId = (items: CartItem[], oldId: string, newId: string) =>
  items.map((i) => (i.id === oldId ? { ...i, id: newId } : i))

export const addItem = (items: CartItem[], item: CartItem) => [...items, item]

export const calcTotal = (items: CartItem[]) => items.reduce((sum, i) => sum + i.product.price.current * i.quantity, 0)

export const calcCount = (items: CartItem[]) => items.reduce((sum, i) => sum + i.quantity, 0)
