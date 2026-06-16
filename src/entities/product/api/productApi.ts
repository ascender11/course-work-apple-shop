import { axiosInstance } from '@/shared/api'

import type { Product } from '../model/types'

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await axiosInstance.get<Product[]>('/products')
    return response.data
  },

  getById: async (id: string): Promise<Product> => {
    const response = await axiosInstance.get<Product>(`/products/${id}`)
    return response.data
  },
}
