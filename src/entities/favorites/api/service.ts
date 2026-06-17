import { axiosInstance } from '@/shared/api'

import type { Favorite } from '../model/types'

export const favoritesService = {
  async getByUser(userId: string): Promise<Favorite[]> {
    const response = await axiosInstance.get<Favorite[]>('/favorites', {
      params: { userId },
    })
    return response.data
  },

  async add(userId: string, productId: string): Promise<Favorite> {
    const response = await axiosInstance.post<Favorite>('/favorites', {
      userId,
      productId,
    })
    return response.data
  },

  async remove(id: string): Promise<void> {
    await axiosInstance.delete(`/favorites/${id}`)
  },
}
