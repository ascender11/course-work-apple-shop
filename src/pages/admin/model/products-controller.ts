import type { Product } from '@/entities/product'
import { ProductAvailability, productApi } from '@/entities/product'

import { html } from '@/shared/lib'

let allProducts: Product[] = []

const showError = (fieldId: string, message: string) => {
  const errorSpan = document.querySelector(`[data-error="${fieldId}"]`)
  if (!errorSpan) return
  errorSpan.textContent = message
  const input = document.getElementById(fieldId) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  if (input) {
    if (message) {
      input.classList.add('border-error')
      input.classList.remove('border-border')
    } else {
      input.classList.remove('border-error')
      input.classList.add('border-border')
    }
  }
}

const clearErrorOnInput = (fieldId: string) => {
  const input = document.getElementById(fieldId) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  if (!input) return
  input.addEventListener('input', () => showError(fieldId, ''))
  input.addEventListener('change', () => showError(fieldId, ''))
}

const validateTitle = (value: string): string => {
  if (!value.trim()) return 'Введите название товара'
  if (value.trim().length < 2) return 'Название должно содержать минимум 2 символа'
  return ''
}

const validateCategory = (value: string): string => {
  if (!value) return 'Выберите категорию'
  return ''
}

const validatePrice = (value: string): string => {
  if (!value) return 'Введите цену'
  const num = Number(value)
  if (Number.isNaN(num) || num < 0) return 'Введите корректную цену'
  return ''
}

const validateProductForm = (): boolean => {
  const title = (document.getElementById('admin-field-title') as HTMLInputElement)?.value || ''
  const category = (document.getElementById('admin-field-category') as HTMLSelectElement)?.value || ''
  const priceCurrent = (document.getElementById('admin-field-price-current') as HTMLInputElement)?.value || ''
  const availability = (document.getElementById('admin-field-availability') as HTMLSelectElement)?.value || ''

  let hasError = false

  const titleErr = validateTitle(title)
  if (titleErr) {
    showError('admin-field-title', titleErr)
    hasError = true
  }

  const catErr = validateCategory(category)
  if (catErr) {
    showError('admin-field-category', catErr)
    hasError = true
  }

  if (availability === 'in_stock') {
    const priceErr = validatePrice(priceCurrent)
    if (priceErr) {
      showError('admin-field-price-current', priceErr)
      hasError = true
    }
  }

  return !hasError
}

const updateSubmitButton = () => {
  const btn = document.getElementById('admin-product-submit') as HTMLButtonElement
  if (!btn) return
  btn.disabled = !validateProductForm()
}

const renderProductItem = (product: Product): string => {
  const price = 'price' in product ? product.price.current : null
  const oldPrice = 'price' in product && product.price.old ? product.price.old : null
  const isAvailable = product.availability === ProductAvailability.IN_STOCK

  return html`
    <div class="flex items-center gap-4 p-4 rounded-xl border border-border-light hover:border-border transition-colors duration-150">
      <div class="w-14 h-14 rounded-lg bg-background-secondary overflow-hidden shrink-0 flex items-center justify-center">
        ${
          product.images?.[0]
            ? `<img src="${product.images[0]}" alt="" class="w-full h-full object-cover" />`
            : `<span class="text-text-quinary text-xs">Нет фото</span>`
        }
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-text-primary truncate">${product.title}</p>
        <div class="flex items-center gap-2 mt-1">
          ${
            price !== null
              ? `<span class="text-sm font-semibold text-text-primary">${price.toLocaleString('ru-RU')} ₽</span>`
              : `<span class="text-sm text-text-quinary">Нет цены</span>`
          }
          ${
            oldPrice !== null
              ? `<span class="text-xs text-text-quinary line-through">${oldPrice.toLocaleString('ru-RU')} ₽</span>`
              : ''
          }
          <span class="text-xs px-2 py-0.5 rounded-full ${isAvailable ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}">
            ${isAvailable ? 'В наличии' : 'Нет в наличии'}
          </span>
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button
          data-edit-product="${product.id}"
          class="px-3 py-1.5 text-xs font-medium text-primary border border-border rounded-lg hover:bg-background-secondary transition-colors"
        >Редактировать</button>
        <button
          data-delete-product="${product.id}"
          class="px-3 py-1.5 text-xs font-medium text-error border border-border rounded-lg hover:bg-red-50 transition-colors"
        >Удалить</button>
      </div>
    </div>
  `
}

const renderProductsList = () => {
  const container = document.getElementById('admin-products-list')
  if (!container) return
  if (allProducts.length === 0) {
    container.innerHTML = '<p class="text-sm text-text-quinary text-center py-8">Товары не найдены</p>'
    return
  }
  container.innerHTML = allProducts.map(renderProductItem).join('')
  attachProductListeners()
}

const openEditForm = (productId: string) => {
  const product = allProducts.find((p) => p.id === productId)
  if (!product) return

  const formContainer = document.getElementById('admin-product-form-container')
  const formTitle = document.getElementById('admin-product-form-title')
  const idInput = document.getElementById('admin-product-id') as HTMLInputElement
  const titleInput = document.getElementById('admin-field-title') as HTMLInputElement
  const categoryInput = document.getElementById('admin-field-category') as HTMLSelectElement
  const yearInput = document.getElementById('admin-field-year') as HTMLInputElement
  const priceCurrentInput = document.getElementById('admin-field-price-current') as HTMLInputElement
  const priceOldInput = document.getElementById('admin-field-price-old') as HTMLInputElement
  const availabilityInput = document.getElementById('admin-field-availability') as HTMLSelectElement
  const warrantyInput = document.getElementById('admin-field-warranty') as HTMLInputElement
  const soldInput = document.getElementById('admin-field-sold') as HTMLInputElement
  const imagesInput = document.getElementById('admin-field-images') as HTMLTextAreaElement

  if (!formContainer || !formTitle || !idInput) return

  formTitle.textContent = 'Редактировать товар'
  idInput.value = product.id
  titleInput.value = product.title
  yearInput.value = ('year' in product ? (product as unknown as { year?: string }).year : '') || ''
  availabilityInput.value = product.availability
  soldInput.value =
    ('soldCount' in product ? (product as unknown as { soldCount?: number }).soldCount : '')?.toString() || ''
  warrantyInput.value =
    ('warrantyPeriod' in product ? (product as unknown as { warrantyPeriod?: string }).warrantyPeriod : '') || ''
  imagesInput.value = product.images?.join('\n') || ''

  if ('price' in product) {
    priceCurrentInput.value = product.price.current.toString()
    priceOldInput.value = product.price.old?.toString() || ''
  } else {
    priceCurrentInput.value = ''
    priceOldInput.value = ''
  }

  const category = ('category' in product ? (product as unknown as { category?: string }).category : '') || ''
  categoryInput.value = category

  formContainer.classList.remove('hidden')
  updateSubmitButton()
}

const resetForm = () => {
  const formContainer = document.getElementById('admin-product-form-container')
  const form = document.getElementById('admin-product-form') as HTMLFormElement
  const formTitle = document.getElementById('admin-product-form-title')

  if (formContainer) formContainer.classList.add('hidden')
  if (form) form.reset()
  if (formTitle) formTitle.textContent = 'Добавить товар'

  const idInput = document.getElementById('admin-product-id') as HTMLInputElement
  if (idInput) idInput.value = ''

  ;[
    'admin-field-title',
    'admin-field-category',
    'admin-field-price-current',
    'admin-field-price-old',
    'admin-field-availability',
    'admin-field-warranty',
    'admin-field-sold',
    'admin-field-images',
    'admin-field-year',
  ].forEach((id) => {
    showError(id, '')
  })

  updateSubmitButton()
}

const attachProductListeners = () => {
  document.querySelectorAll<HTMLButtonElement>('[data-edit-product]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.editProduct
      if (id) openEditForm(id)
    })
  })

  document.querySelectorAll<HTMLButtonElement>('[data-delete-product]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.deleteProduct
      if (!id) return
      if (!confirm('Вы уверены, что хотите удалить товар?')) return
      try {
        await productApi.delete(id)
        allProducts = allProducts.filter((p) => p.id !== id)
        renderProductsList()
      } catch {
        alert('Ошибка при удалении товара')
      }
    })
  })
}

export const initProductsPage = () => {
  ;['admin-field-title', 'admin-field-category', 'admin-field-price-current', 'admin-field-availability'].forEach(
    (id) => {
      clearErrorOnInput(id)
    }
  )

  ;['admin-field-title', 'admin-field-category', 'admin-field-price-current', 'admin-field-availability'].forEach(
    (id) => {
      const el = document.getElementById(id)
      if (el) el.addEventListener('input', updateSubmitButton)
    }
  )
  ;['admin-field-title', 'admin-field-category', 'admin-field-price-current', 'admin-field-availability'].forEach(
    (id) => {
      const el = document.getElementById(id)
      if (el) el.addEventListener('change', updateSubmitButton)
    }
  )

  document.getElementById('admin-add-product-btn')?.addEventListener('click', () => {
    resetForm()
    document.getElementById('admin-product-form-container')?.classList.remove('hidden')
    document.getElementById('admin-field-title')?.focus()
  })

  document.getElementById('admin-product-cancel')?.addEventListener('click', resetForm)

  document.getElementById('admin-product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const errorEl = document.getElementById('admin-product-error')
    if (errorEl) errorEl.textContent = ''

    if (!validateProductForm()) return

    const idInput = document.getElementById('admin-product-id') as HTMLInputElement
    const isEdit = !!idInput.value

    const title = (document.getElementById('admin-field-title') as HTMLInputElement).value.trim()
    const category = (document.getElementById('admin-field-category') as HTMLSelectElement).value
    const year = (document.getElementById('admin-field-year') as HTMLInputElement).value.trim()
    const priceCurrent = Number((document.getElementById('admin-field-price-current') as HTMLInputElement).value) || 0
    const priceOld = Number((document.getElementById('admin-field-price-old') as HTMLInputElement).value) || undefined
    const availability = (document.getElementById('admin-field-availability') as HTMLSelectElement)
      .value as ProductAvailability
    const warranty = (document.getElementById('admin-field-warranty') as HTMLInputElement).value.trim()
    const soldCount = Number((document.getElementById('admin-field-sold') as HTMLInputElement).value) || 0
    const imagesRaw = (document.getElementById('admin-field-images') as HTMLTextAreaElement).value
    const images = imagesRaw
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

    const submitBtn = document.getElementById('admin-product-submit') as HTMLButtonElement
    submitBtn.disabled = true
    submitBtn.textContent = isEdit ? 'Сохранение...' : 'Создание...'

    try {
      if (isEdit) {
        const existing = allProducts.find((p) => p.id === idInput.value)
        const updated: Product = {
          id: idInput.value,
          title,
          images,
          soldCount,
          rating: existing?.rating || { score: 0, reviewsCount: 0 },
          availability,
          ...(category ? { category } : {}),
          ...(year ? { year } : {}),
          ...(warranty ? { warrantyPeriod: warranty } : {}),
          ...(availability === ProductAvailability.IN_STOCK
            ? { price: { current: priceCurrent, ...(priceOld ? { old: priceOld } : {}) } }
            : {}),
        } as Product
        await productApi.update(idInput.value, updated)
        allProducts = allProducts.map((p) => (p.id === idInput.value ? updated : p))
      } else {
        const productData = {
          title,
          images,
          soldCount,
          rating: { score: 0, reviewsCount: 0 },
          availability,
          ...(category ? { category } : {}),
          ...(year ? { year } : {}),
          ...(warranty ? { warrantyPeriod: warranty } : {}),
          ...(availability === ProductAvailability.IN_STOCK
            ? { price: { current: priceCurrent, ...(priceOld ? { old: priceOld } : {}) } }
            : {}),
        }
        const created = await productApi.create(productData as Omit<Product, 'id'>)
        allProducts.push(created)
      }

      renderProductsList()
      resetForm()
    } catch {
      if (errorEl) errorEl.textContent = 'Ошибка при сохранении товара'
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = 'Сохранить'
      updateSubmitButton()
    }
  })

  loadProducts()
}

const loadProducts = async () => {
  try {
    allProducts = await productApi.getAll()
    renderProductsList()
  } catch {
    const container = document.getElementById('admin-products-list')
    if (container) container.innerHTML = '<p class="text-sm text-error text-center py-8">Ошибка загрузки товаров</p>'
  }
}
