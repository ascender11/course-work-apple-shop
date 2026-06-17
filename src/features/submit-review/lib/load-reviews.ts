import type { Review } from '@/entities/review'
import { reviewService } from '@/entities/review'

import { ReviewList } from '../ui/ReviewList'

export const loadReviews = async (productId: string, onLoaded?: (reviews: Review[]) => void): Promise<void> => {
  const container = document.querySelector<HTMLElement>('[data-review-list-container]')
  if (!container) return

  try {
    const reviews = await reviewService.getByProduct(productId)
    container.innerHTML = ReviewList(reviews)
    if (onLoaded) onLoaded(reviews)
  } catch {
    container.innerHTML = ''
  }
}
