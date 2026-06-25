import { axiosInstance } from '@/shared/api'

import type { Cart, CartProduct } from '../model/types'

export const cartService = {
  async get(userId: string): Promise<Cart | null> {
    const { data } = await axiosInstance.get<Cart[]>('/carts', {
      params: { userId },
    })

    if (!data.length) return null
    return { ...data[0], id: String(data[0].id) }
  },

  async save(userId: string, cart: Cart): Promise<Cart> {
    const { data } = await axiosInstance.put<Cart>(`/carts/${cart.id}`, {
      ...cart,
      userId,
    })

    return { ...data, id: String(data.id) }
  },

  async create(userId: string, products: CartProduct[]): Promise<Cart> {
    const { data } = await axiosInstance.post<Cart>('/carts', {
      products,
      userId,
    })

    return { ...data, id: String(data.id) }
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/carts/${id}`)
  },
}
