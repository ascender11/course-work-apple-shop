import { userStore } from '@/entities/user'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'

import { initReviewsPage } from '../model/reviews-controller'

export const AdminReviewsPage = (): string => {
  if (!userStore.isAdmin) {
    return html`
      ${Header()}
      <main class="min-h-[calc(100vh-60px)] bg-background-secondary flex items-center justify-center px-4 py-8">
        <div class="text-center">
          <h1 class="text-2xl font-semibold text-text-primary mb-2">Доступ запрещён</h1>
          <p class="text-sm text-text-quinary">У вас нет прав администратора</p>
        </div>
      </main>
      ${Footer()}
    `
  }

  const observer = new MutationObserver((_, obs) => {
    if (!document.getElementById('admin-reviews-root')) return
    obs.disconnect()
    initReviewsPage()
  })
  if (typeof window !== 'undefined') observer.observe(document.body, { childList: true, subtree: true })

  const SELECT_BASE =
    'w-full rounded-lg border border-border px-4 py-3 text-sm text-text-primary bg-background outline-none transition-all duration-200 hover:border-border focus:border-primary focus:ring-2 focus:ring-primary/20'

  return html`
    ${Header()}
    <main id="admin-reviews-root" class="min-h-[calc(100vh-60px)] bg-background-secondary px-4 py-8 sm:px-6 lg:px-25">
      <div class="max-w-5xl mx-auto">
        <div class="mb-6 flex items-center gap-3">
          <a
            href="/admin/dashboard"
            data-navigo
            class="text-text-quinary hover:text-text-primary transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          </a>
          <div>
            <h1 class="text-2xl font-semibold text-text-primary">Управление отзывами</h1>
            <p class="text-sm text-text-quinary mt-0.5">Просмотр и удаление отзывов</p>
          </div>
        </div>

        <div class="bg-background rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 sm:p-8">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
            <div class="flex flex-col gap-0.5">
              <label class="text-sm font-medium text-text-secondary">Показать отзывы по товару</label>
              <select
                id="admin-review-product-select"
                class="${SELECT_BASE}"
              >
                <option value="">Все товары</option>
              </select>
            </div>
            <div class="flex flex-col gap-0.5">
              <label class="text-sm font-medium text-text-secondary">Показать отзывы по пользователю</label>
              <select
                id="admin-review-user-select"
                class="${SELECT_BASE}"
              >
                <option value="">Все пользователи</option>
              </select>
            </div>
          </div>

          <div id="admin-reviews-list" class="flex flex-col gap-3">
            <p class="text-sm text-text-quinary text-center py-8">Загрузка отзывов...</p>
          </div>
        </div>
      </div>
    </main>
    ${Footer()}
  `
}
