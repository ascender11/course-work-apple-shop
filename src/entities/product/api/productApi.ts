import { axiosInstance } from '@/shared/api'

import type { Product } from '../model/types'

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await axiosInstance.get<Product[]>('/products')
    return response.data
  },

  getByIds: async (ids: string[]): Promise<Product[]> => {
    if (!ids.length) return []
    const qs = ids.map((id) => `id=${encodeURIComponent(id)}`).join('&')
    const response = await axiosInstance.get<Product[]>(`/products?${qs}`)
    return response.data
  },

  getFiltered: async (queryString: string): Promise<{ products: Product[]; totalCount: number }> => {
    const params = new URLSearchParams(queryString)

    const page = params.get('page')
    params.delete('page')
    params.set('_page', page ?? '1')
    params.set('_limit', '9')

    const response = await axiosInstance.get<Product[]>('/products', { params })
    const totalCount = parseInt(response.headers['x-total-count'] ?? '0', 10)
    return { products: response.data, totalCount }
  },

  getById: async (id: string): Promise<Product> => {
    const response = await axiosInstance.get<Product>(`/products/${id}`)
    return response.data
  },
}
