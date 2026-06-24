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

export const handleDecrement = async (productId: string, color?: string, storage?: string): Promise<boolean> => {
  const userId = getUserId()
  if (!userId) return false
  const item = findItem(cartStore.items, productId, color, storage)
  if (!item) return false

  return await cartStore.decrement(userId, item.id)
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
