import { html } from '@/shared/lib'
import { Star } from '@/shared/ui/icons'

export interface ReviewFormProps {
  productId: string
  canReview: boolean
}

export const ReviewForm = ({ productId, canReview }: ReviewFormProps): string => {
  if (!canReview) {
    return html`
      <div class="mt-8 p-6 rounded-2xl bg-background-secondary">
        <h3 class="text-lg font-semibold text-text-primary mb-2">Оставить отзыв</h3>
        <p class="text-text-quinary text-sm">
          Вы не можете оставить отзыв, так как не приобретали этот товар.
        </p>
      </div>
    `
  }

  return html`
    <div class="mt-8 p-6 rounded-2xl bg-background-secondary">
      <h3 class="text-lg font-semibold text-text-primary mb-4">Оставить отзыв</h3>

      <div class="mb-4">
        <label class="block text-sm font-medium text-text-secondary mb-2">Ваша оценка</label>
        <div class="flex items-start gap-1" data-rating-container data-product-id="${productId}">
          ${[1, 2, 3, 4, 5]
            .map(
              (star) => html`
                <button
                  type="button"
                  class="js-rating-star transition-colors cursor-pointer"
                  data-rating="${star}"
                >
                  ${Star({ className: 'text-text-quinary hover:text-amber-400 w-5 h-5' })}
                </button>
              `
            )
            .join('')}
          <span class="ml-2 text-sm text-text-quinary" data-rating-text>0 из 5</span>
        </div>
      </div>

      <form data-review-form data-product-id="${productId}" class="flex flex-col gap-4">
        <div>
          <label for="review-text" class="block text-sm font-medium text-text-secondary mb-2">
            Текст отзыва
          </label>
          <textarea
            id="review-text"
            name="text"
            rows="4"
            maxlength="1000"
            placeholder="Напишите ваш отзыв о товаре (минимум 20 символов)..."
            class="w-full px-4 py-3 rounded-xl border border-border bg-background text-text-primary text-sm placeholder:text-text-quinary focus:outline-none focus:border-primary resize-none"
          ></textarea>
          <div class="flex justify-between mt-1">
            <span class="text-xs text-error hidden" data-review-error></span>
            <span class="text-xs text-text-quinary ml-auto" data-char-count>0 / 1000</span>
          </div>
        </div>

        <button
          type="submit"
          disabled
          class="js-submit-review button w-full disabled:opacity-50 disabled:cursor-not-allowed"
          data-product-id="${productId}"
        >
          <span>Отправить отзыв</span>
        </button>

        <p class="text-xs text-text-quinary text-center hidden" data-review-success>
          Спасибо! Ваш отзыв успешно отправлен.
        </p>
      </form>
    </div>
  `
}
