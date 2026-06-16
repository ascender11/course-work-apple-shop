import { cartStore, findItem } from '@/entities/cart'
import { userStore } from '@/entities/user'

const getUserId = (): string | null => userStore.user?.id ?? null

export const handleIncrement = (productId: string, color?: string, storage?: string) => {
  const userId = getUserId()
  if (!userId) return
  const item = findItem(cartStore.items, productId, color, storage)
  if (item) {
    cartStore.add(userId, { product: item.product, quantity: 1, selectedColor: color, selectedStorage: storage })
  }
}

export const handleDecrement = (productId: string, color?: string, storage?: string): boolean => {
  const userId = getUserId()
  if (!userId) return false
  const item = findItem(cartStore.items, productId, color, storage)
  if (!item) return false

  if (item.quantity <= 1) {
    cartStore.remove(userId, item.id)
    return true
  }

  cartStore.add(userId, { product: item.product, quantity: -1, selectedColor: color, selectedStorage: storage })
  return false
}

export const handleRemove = (productId: string, color?: string, storage?: string) => {
  const userId = getUserId()
  if (!userId) return
  const item = findItem(cartStore.items, productId, color, storage)
  if (item) cartStore.remove(userId, item.id)
}

export const clearCart = async () => {
  const userId = getUserId()
  if (userId) await cartStore.clear(userId)
}
