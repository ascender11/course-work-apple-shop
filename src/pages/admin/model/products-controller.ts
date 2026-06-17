import type { Product } from '@/entities/product'
import { productService } from '@/entities/product'

import { clearErrorOnInput } from '../lib/dom-helpers'
import { buildProduct, collectProductFormData, openEditForm, resetForm, validateProductForm } from '../lib/form-helpers'
import { ProductItem } from '../ui/ProductItem'

let allProducts: Product[] = []

const FIELD_IDS = ['admin-field-title', 'admin-field-category', 'admin-field-price-current', 'admin-field-availability']

const updateSubmitButton = () => {
  const btn = document.getElementById('admin-product-submit') as HTMLButtonElement
  if (!btn) return
  btn.disabled = !validateProductForm()
}

const renderProductsList = () => {
  const container = document.getElementById('admin-products-list')
  if (!container) return
  if (allProducts.length === 0) {
    container.innerHTML = '<p class="text-sm text-text-quinary text-center py-8">Товары не найдены</p>'
    return
  }
  container.innerHTML = allProducts.map(ProductItem).join('')
  attachProductListeners()
}

const attachProductListeners = () => {
  document.querySelectorAll<HTMLButtonElement>('[data-edit-product]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.editProduct
      if (id) {
        openEditForm(id, allProducts)
        updateSubmitButton()
      }
    })
  })

  document.querySelectorAll<HTMLButtonElement>('[data-delete-product]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.deleteProduct
      if (!id) return
      if (!confirm('Вы уверены, что хотите удалить товар?')) return
      try {
        await productService.delete(id)
        allProducts = allProducts.filter((p) => p.id !== id)
        renderProductsList()
      } catch {
        alert('Ошибка при удалении товара')
      }
    })
  })
}

export const initProductsPage = () => {
  for (const id of FIELD_IDS) clearErrorOnInput(id)
  for (const id of FIELD_IDS) {
    const el = document.getElementById(id)
    if (el) {
      el.addEventListener('input', updateSubmitButton)
      el.addEventListener('change', updateSubmitButton)
    }
  }

  document.getElementById('admin-add-product-btn')?.addEventListener('click', () => {
    resetForm()
    document.getElementById('admin-product-form-container')?.classList.remove('hidden')
    document.getElementById('admin-field-title')?.focus()
  })

  document.getElementById('admin-product-cancel')?.addEventListener('click', () => {
    resetForm()
    updateSubmitButton()
  })

  document.getElementById('admin-product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const errorEl = document.getElementById('admin-product-error')
    if (errorEl) errorEl.textContent = ''

    if (!validateProductForm()) return

    const idInput = document.getElementById('admin-product-id') as HTMLInputElement
    const isEdit = !!idInput.value
    const data = collectProductFormData()

    const submitBtn = document.getElementById('admin-product-submit') as HTMLButtonElement
    submitBtn.disabled = true
    submitBtn.textContent = isEdit ? 'Сохранение...' : 'Создание...'

    try {
      if (isEdit) {
        const existing = allProducts.find((p) => p.id === idInput.value)
        const updated = buildProduct(data, existing)
        await productService.update(idInput.value, updated)
        allProducts = allProducts.map((p) => (p.id === idInput.value ? updated : p))
      } else {
        const productData = buildProduct(data)
        const { id: _, ...rest } = productData
        const created = await productService.create(rest as Omit<Product, 'id'>)
        allProducts.push(created)
      }

      renderProductsList()
      resetForm()
      updateSubmitButton()
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
    allProducts = await productService.getAll()
    renderProductsList()
  } catch {
    const container = document.getElementById('admin-products-list')
    if (container) container.innerHTML = '<p class="text-sm text-error text-center py-8">Ошибка загрузки товаров</p>'
  }
}
