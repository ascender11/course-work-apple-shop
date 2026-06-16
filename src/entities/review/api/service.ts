import type { ProductRating } from '@/entities/product'

import { axiosInstance } from '@/shared/api'

import type { Order, Review } from '../model/types'

export const reviewService = {
  async getAll(): Promise<Review[]> {
    const response = await axiosInstance.get<Review[]>('/reviews')
    return response.data
  },

  async getByProduct(productId: string): Promise<Review[]> {
    const response = await axiosInstance.get<Review[]>('/reviews', {
      params: { productId },
    })
    return response.data
  },

  async getByUser(userId: string): Promise<Review[]> {
    const response = await axiosInstance.get<Review[]>('/reviews', {
      params: { userId },
    })
    return response.data
  },

  async checkPurchase(userId: string, productId: string): Promise<boolean> {
    const response = await axiosInstance.get<Order[]>('/orders', {
      params: { userId, productId },
    })
    return response.data.length > 0
  },

  async submit(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    const response = await axiosInstance.post<Review>('/reviews', {
      ...review,
      createdAt: new Date().toISOString(),
    })
    return response.data
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/reviews/${id}`)
  },

  async syncProductRating(productId: string): Promise<ProductRating> {
    const reviews = await this.getByProduct(productId)

    let rating: ProductRating
    if (reviews.length === 0) {
      rating = { score: 0, reviewsCount: 0 }
    } else {
      const total = reviews.reduce((sum, r) => sum + r.rating, 0)
      rating = {
        score: parseFloat((total / reviews.length).toFixed(1)),
        reviewsCount: reviews.length,
      }
    }

    await axiosInstance.patch(`/products/${productId}`, { rating })
    return rating
  },
}
