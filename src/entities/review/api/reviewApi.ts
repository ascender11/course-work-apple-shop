import { axiosInstance } from '@/shared/api'

import type { ProductRating } from '@/entities/product'

import type { Order, Review } from '../model/types'

export const reviewApi = {
  getReviewsByProduct: async (productId: string): Promise<Review[]> => {
    const response = await axiosInstance.get<Review[]>('/reviews', {
      params: { productId },
    })
    return response.data
  },

  checkPurchase: async (userId: string, productId: string): Promise<boolean> => {
    const response = await axiosInstance.get<Order[]>('/orders', {
      params: { userId, productId },
    })
    return response.data.length > 0
  },

  submitReview: async (review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> => {
    const response = await axiosInstance.post<Review>('/reviews', {
      ...review,
      createdAt: new Date().toISOString(),
    })
    return response.data
  },

  syncProductRating: async (productId: string): Promise<ProductRating> => {
    const reviews = await reviewApi.getReviewsByProduct(productId)

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
