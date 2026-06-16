import { axiosInstance } from '@/shared/api'

import type { CartItem } from '../model/types'

type CartItemDto = CartItem & { userId: string }

const stripUserId = ({ userId: _, id, ...rest }: CartItemDto): CartItem => ({
  ...rest,
  id: String(id),
})

export const cartService = {
  async get(userId: string): Promise<CartItem[]> {
    const response = await axiosInstance.get<CartItemDto[]>('/carts', {
      params: { userId },
    })

    return response.data.map(stripUserId)
  },

  async add(userId: string, item: Omit<CartItem, 'id'>): Promise<CartItem> {
    const response = await axiosInstance.post<CartItemDto>('/carts', {
      ...item,
      userId,
    })

    return stripUserId(response.data)
  },

  async update(id: string, quantity: number): Promise<CartItem> {
    const response = await axiosInstance.patch<CartItemDto>(`/carts/${id}`, {
      quantity,
    })

    return stripUserId(response.data)
  },

  async remove(id: string): Promise<void> {
    await axiosInstance.delete(`/carts/${id}`)
  },

  async clear(userId: string): Promise<void> {
    const { data } = await axiosInstance.get<CartItemDto[]>('/carts', {
      params: { userId },
    })

    await Promise.all(data.map((item) => axiosInstance.delete(`/carts/${item.id}`)))
  },
}
