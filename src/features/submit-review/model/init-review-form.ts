import { reviewService } from '@/entities/review'
import { userStore } from '@/entities/user'
import { toast } from '@/features/toast'

import { t } from '@/shared/i18n'

const MIN_REVIEW_LENGTH = 20
const CURRENT_USER_ID_KEY = 'currentUserId'

const getCurrentUserId = (): string | null => {
  const user = userStore.user
  if (user) return user.id
  return localStorage.getItem(CURRENT_USER_ID_KEY)
}

const isAdmin = (): boolean => {
  return userStore.isAdmin
}

const SKIP_PURCHASE_CHECK = true

export const canUserReview = async (productId: string): Promise<boolean> => {
  if (isAdmin()) return false

  if (SKIP_PURCHASE_CHECK) return true

  const userId = getCurrentUserId()
  if (!userId) return false

  try {
    return await reviewService.checkPurchase(userId as string, productId)
  } catch {
    return false
  }
}

export const initReviewForm = (onSubmitSuccess?: () => void): void => {
  const forms = document.querySelectorAll<HTMLFormElement>('[data-review-form]')
  if (!forms.length) return

  forms.forEach((form) => {
    if (form.dataset.reviewInitialized === '1') return
    form.dataset.reviewInitialized = '1'

    const productId = form.dataset.productId ?? ''
    const textarea = form.querySelector<HTMLTextAreaElement>('#review-text')
    const submitBtn = form.querySelector<HTMLButtonElement>('.js-submit-review')
    const errorEl = form.querySelector<HTMLElement>('[data-review-error]')
    const successEl = form.querySelector<HTMLElement>('[data-review-success]')
    const charCount = form.querySelector<HTMLElement>('[data-char-count]')

    if (!textarea || !submitBtn) return

    let selectedRating = 0

    const ratingContainer = document.querySelector<HTMLElement>(
      `[data-rating-container][data-product-id="${productId}"]`
    )

    if (ratingContainer) {
      const stars = ratingContainer.querySelectorAll<HTMLButtonElement>('.js-rating-star')
      const ratingText = ratingContainer.querySelector<HTMLElement>('[data-rating-text]')

      const toggleStarClasses = (index: number, rating: number) => {
        const svg = stars[index].querySelector('svg')
        if (svg) {
          svg.classList.toggle('text-amber-400', index < rating)
          svg.classList.toggle('text-text-quinary', index >= rating)
        }
      }

      stars.forEach((star) => {
        star.addEventListener('click', () => {
          selectedRating = Number(star.dataset.rating)

          stars.forEach((_, i) => {
            toggleStarClasses(i, selectedRating)
          })

          if (ratingText) {
            ratingText.textContent = `${selectedRating} ${t('review.of5')}`
          }
          validateForm()
        })

        star.addEventListener('mouseenter', () => {
          const hoverRating = Number(star.dataset.rating)
          stars.forEach((_, i) => {
            toggleStarClasses(i, hoverRating)
          })
        })
      })

      ratingContainer.addEventListener('mouseleave', () => {
        stars.forEach((_, i) => {
          toggleStarClasses(i, selectedRating)
        })
      })
    }

    const validateForm = () => {
      const text = textarea.value.trim()
      const isValid = text.length >= MIN_REVIEW_LENGTH && selectedRating > 0
      submitBtn.disabled = !isValid

      if (errorEl) {
        if (text.length > 0 && text.length < MIN_REVIEW_LENGTH) {
          errorEl.textContent = t('review.minChars', { min: MIN_REVIEW_LENGTH, current: text.length })
          errorEl.classList.remove('hidden')
        } else {
          errorEl.classList.add('hidden')
        }
      }
    }

    textarea.addEventListener('input', () => {
      const length = textarea.value.length
      if (charCount) {
        charCount.textContent = `${length} / 1000`
      }
      validateForm()
    })

    form.addEventListener('submit', async (e) => {
      e.preventDefault()

      const userId = getCurrentUserId()
      if (!userId) return

      const user = userStore.user
      const userName = user ? `${user.fullName.firstName} ${user.fullName.lastName}` : t('review.anonymous')

      submitBtn.disabled = true
      const submitSpan = submitBtn.querySelector('span')
      if (submitSpan) submitSpan.textContent = t('review.sending')

      try {
        await reviewService.submit({
          productId,
          userId,
          userName,
          text: textarea.value.trim(),
          rating: selectedRating,
        })

        await reviewService.syncProductRating(productId)

        if (successEl) {
          successEl.classList.remove('hidden')
        }

        toast.success(t('toast.reviewSuccess'))

        textarea.value = ''
        selectedRating = 0
        if (charCount) charCount.textContent = '0 / 1000'

        const stars = ratingContainer?.querySelectorAll<HTMLButtonElement>('.js-rating-star')
        stars?.forEach((s) => {
          const svg = s.querySelector('svg')
          if (svg) {
            svg.classList.remove('text-amber-400')
            svg.classList.add('text-text-quinary')
          }
        })
        const ratingText = ratingContainer?.querySelector<HTMLElement>('[data-rating-text]')
        if (ratingText) ratingText.textContent = `0 ${t('review.of5')}`

        if (onSubmitSuccess) onSubmitSuccess()
      } catch {
        if (errorEl) {
          errorEl.textContent = t('review.error')
          errorEl.classList.remove('hidden')
        }
        toast.error(t('toast.reviewError'))
      } finally {
        submitBtn.disabled = false
        const submitSpan = submitBtn.querySelector('span')
        if (submitSpan) submitSpan.textContent = t('review.submit')
        validateForm()
      }
    })
  })
}
