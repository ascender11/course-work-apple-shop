import { cartStore } from '@/entities/cart'
import { userStore } from '@/entities/user'

const getUserId = (): string | null => userStore.user?.id ?? null

export const handleIncrement = (productId: string) => {
  const userId = getUserId()
  if (!userId) return
  cartStore.add(userId, productId)
}

export const handleDecrement = async (productId: string): Promise<boolean> => {
  const userId = getUserId()
  if (!userId) return false
  return await cartStore.decrement(userId, productId)
}

export const handleRemove = (productId: string) => {
  const userId = getUserId()
  if (!userId) return
  cartStore.remove(userId, productId)
}

export const clearCart = async () => {
  const userId = getUserId()
  if (userId) await cartStore.clear(userId)
}
