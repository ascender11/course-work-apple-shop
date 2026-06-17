import { userStore } from '@/entities/user'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'

import { initProductsPage } from '../model/products-controller'

export const AdminProductsPage = (): string => {
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
    if (!document.getElementById('admin-products-root')) return
    obs.disconnect()
    initProductsPage()
  })
  if (typeof window !== 'undefined') observer.observe(document.body, { childList: true, subtree: true })

  const INPUT_BASE =
    'w-full rounded-lg border border-border px-4 py-3 text-sm text-text-primary bg-background outline-none transition-all duration-200 hover:border-border focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-text-quinary'
  const REQUIRED_MARK = '<span class="text-error ml-0.5">*</span>'

  return html`
    ${Header()}
    <main id="admin-products-root" class="min-h-[calc(100vh-60px)] bg-background-secondary px-4 py-8 sm:px-6 lg:px-25">
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
            <h1 class="text-2xl font-semibold text-text-primary">Управление товарами</h1>
            <p class="text-sm text-text-quinary mt-0.5">Добавление, редактирование и удаление товаров</p>
          </div>
        </div>

        <div class="bg-background rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 sm:p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-text-primary">Товары</h2>
            <button
              id="admin-add-product-btn"
              class="button text-sm"
            >Добавить товар</button>
          </div>

          <div id="admin-product-form-container" class="hidden mb-6">
            <div class="p-5 rounded-xl border border-border-light bg-background-secondary">
              <h3 id="admin-product-form-title" class="text-base font-semibold text-text-primary mb-4">Добавить товар</h3>
              <form id="admin-product-form" novalidate class="flex flex-col gap-4">
                <input type="hidden" id="admin-product-id" />

                <div class="flex flex-col gap-0.5">
                  <label class="text-sm font-medium text-text-secondary">
                    Название${REQUIRED_MARK}
                  </label>
                  <input
                    id="admin-field-title"
                    type="text"
                    placeholder="Apple iPhone 17 Pro 128 ГБ"
                    class="${INPUT_BASE}"
                  />
                  <span data-error="admin-field-title" class="text-xs text-error min-h-3.5 block"></span>
                </div>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div class="flex flex-col gap-0.5">
                    <label class="text-sm font-medium text-text-secondary">
                      Категория${REQUIRED_MARK}
                    </label>
                    <select
                      id="admin-field-category"
                      class="${INPUT_BASE}"
                    >
                      <option value="">Выберите категорию</option>
                      <option value="iPhone">iPhone</option>
                      <option value="MacBook">MacBook</option>
                      <option value="AirPods">AirPods</option>
                      <option value="Watch">Watch</option>
                    </select>
                    <span data-error="admin-field-category" class="text-xs text-error min-h-3.5 block"></span>
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <label class="text-sm font-medium text-text-secondary">Год</label>
                    <input
                      id="admin-field-year"
                      type="text"
                      placeholder="2025"
                      class="${INPUT_BASE}"
                    />
                    <span data-error="admin-field-year" class="text-xs text-error min-h-3.5 block"></span>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div class="flex flex-col gap-0.5">
                    <label class="text-sm font-medium text-text-secondary">
                      Цена (₽)${REQUIRED_MARK}
                    </label>
                    <input
                      id="admin-field-price-current"
                      type="number"
                      placeholder="87048"
                      min="0"
                      class="${INPUT_BASE}"
                    />
                    <span data-error="admin-field-price-current" class="text-xs text-error min-h-3.5 block"></span>
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <label class="text-sm font-medium text-text-secondary">Старая цена (₽)</label>
                    <input
                      id="admin-field-price-old"
                      type="number"
                      placeholder="98603"
                      min="0"
                      class="${INPUT_BASE}"
                    />
                    <span data-error="admin-field-price-old" class="text-xs text-error min-h-3.5 block"></span>
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <label class="text-sm font-medium text-text-secondary">
                      Наличие${REQUIRED_MARK}
                    </label>
                    <select
                      id="admin-field-availability"
                      class="${INPUT_BASE}"
                    >
                      <option value="in_stock">В наличии</option>
                      <option value="out_of_stock">Нет в наличии</option>
                    </select>
                    <span data-error="admin-field-availability" class="text-xs text-error min-h-3.5 block"></span>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div class="flex flex-col gap-0.5">
                    <label class="text-sm font-medium text-text-secondary">Гарантия</label>
                    <input
                      id="admin-field-warranty"
                      type="text"
                      placeholder="Гарантия 1 год"
                      class="${INPUT_BASE}"
                    />
                    <span data-error="admin-field-warranty" class="text-xs text-error min-h-3.5 block"></span>
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <label class="text-sm font-medium text-text-secondary">Количество продаж</label>
                    <input
                      id="admin-field-sold"
                      type="number"
                      placeholder="0"
                      min="0"
                      class="${INPUT_BASE}"
                    />
                    <span data-error="admin-field-sold" class="text-xs text-error min-h-3.5 block"></span>
                  </div>
                </div>

                <div class="flex flex-col gap-0.5">
                  <label class="text-sm font-medium text-text-secondary">URL изображений (по одному на строку)</label>
                  <textarea
                    id="admin-field-images"
                    rows="3"
                    placeholder="https://example.com/image1.jpg"
                    class="${INPUT_BASE} resize-none"
                  ></textarea>
                  <span data-error="admin-field-images" class="text-xs text-error min-h-3.5 block"></span>
                </div>

                <div class="flex flex-col gap-0.5">
                  <label class="text-sm font-medium text-text-secondary">Спецификации (JSON)</label>
                  <textarea
                    id="admin-field-specifications"
                    rows="6"
                    placeholder='[{"groupName":"Экран","specs":[{"name":"Диагональ","value":"6.1\\""}]}]'
                    class="${INPUT_BASE} resize-none font-mono text-xs"
                  ></textarea>
                  <span data-error="admin-field-specifications" class="text-xs text-error min-h-3.5 block"></span>
                </div>

                <p id="admin-product-error" class="text-sm text-error text-center min-h-4"></p>

                <div class="flex gap-3">
                  <button
                    id="admin-product-submit"
                    type="submit"
                    disabled
                    class="button flex items-center justify-center px-6 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >Сохранить</button>
                  <button
                    id="admin-product-cancel"
                    type="button"
                    class="button outline flex items-center justify-center px-6 py-2.5 text-sm"
                  >Отмена</button>
                </div>
              </form>
            </div>
          </div>

          <div id="admin-products-list" class="flex flex-col gap-3">
            <p class="text-sm text-text-quinary text-center py-8">Загрузка товаров...</p>
          </div>
        </div>
      </div>
    </main>
    ${Footer()}
  `
}
