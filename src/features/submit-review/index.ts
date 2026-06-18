import { registerDictionary } from '@/shared/i18n'

import en from './locale/en.json'
import ru from './locale/ru.json'

registerDictionary('ru', ru)
registerDictionary('en', en)

export { loadReviews } from './lib/load-reviews'
export { canUserReview, initReviewForm } from './model/init-review-form'
export { ReviewForm } from './ui/ReviewForm'
export { ReviewList } from './ui/ReviewList'
