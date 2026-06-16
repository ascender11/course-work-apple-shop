import { axiosInstance } from '@/shared/api'

import type { Product } from '../model/types'

export const productService = {
  async getAll(): Promise<Product[]> {
    const response = await axiosInstance.get<Product[]>('/products')
    return response.data
  },

  async getByIds(ids: string[]): Promise<Product[]> {
    if (!ids.length) return []
    const qs = ids.map((id) => `id=${encodeURIComponent(id)}`).join('&')
    const response = await axiosInstance.get<Product[]>(`/products?${qs}`)
    return response.data
  },

  async getFiltered(queryString: string): Promise<{ products: Product[]; totalCount: number }> {
    const params = new URLSearchParams(queryString)

    const page = params.get('page')
    params.delete('page')
    params.set('_page', page ?? '1')
    params.set('_limit', '9')

    const response = await axiosInstance.get<Product[]>('/products', { params })
    const totalCount = parseInt(response.headers['x-total-count'] ?? '0', 10)
    return { products: response.data, totalCount }
  },

  async getById(id: string): Promise<Product> {
    const response = await axiosInstance.get<Product>(`/products/${id}`)
    return response.data
  },

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await axiosInstance.post<Product>('/products', product)
    return response.data
  },

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const response = await axiosInstance.put<Product>(`/products/${id}`, { ...product, id })
    return response.data
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/products/${id}`)
  },
}
