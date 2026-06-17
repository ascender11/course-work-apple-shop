import type { Product, ProductSpecificationGroup } from '@/entities/product'
import { ProductAvailability } from '@/entities/product'

import { showError } from './dom-helpers'
import { validateCategory, validatePrice, validateTitle } from './validators'

const ALL_FIELD_IDS = [
  'admin-field-title',
  'admin-field-category',
  'admin-field-price-current',
  'admin-field-availability',
  'admin-field-price-old',
  'admin-field-warranty',
  'admin-field-sold',
  'admin-field-images',
  'admin-field-year',
  'admin-field-specifications',
]

const parseSpecifications = (raw: string): ProductSpecificationGroup[] | undefined => {
  if (!raw.trim()) return undefined
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
    return undefined
  } catch {
    return undefined
  }
}

export const validateProductForm = (): boolean => {
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

  const specsRaw = (document.getElementById('admin-field-specifications') as HTMLTextAreaElement)?.value || ''
  if (specsRaw.trim()) {
    try {
      const parsed = JSON.parse(specsRaw)
      if (!Array.isArray(parsed)) {
        showError('admin-field-specifications', 'Спецификации должны быть массивом JSON')
        hasError = true
      }
    } catch {
      showError('admin-field-specifications', 'Некорректный JSON')
      hasError = true
    }
  } else {
    showError('admin-field-specifications', '')
  }

  return !hasError
}

export const collectProductFormData = () => {
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
  const specsRaw = (document.getElementById('admin-field-specifications') as HTMLTextAreaElement).value
  const specifications = parseSpecifications(specsRaw)

  return { title, category, year, priceCurrent, priceOld, availability, warranty, soldCount, images, specifications }
}

export const buildProduct = (data: ReturnType<typeof collectProductFormData>, existing?: Product): Product => {
  return {
    id: existing?.id || '',
    title: data.title,
    images: data.images,
    soldCount: data.soldCount,
    rating: existing?.rating || { score: 0, reviewsCount: 0 },
    availability: data.availability,
    ...(data.category ? { category: data.category } : {}),
    ...(data.year ? { year: data.year } : {}),
    ...(data.warranty ? { warrantyPeriod: data.warranty } : {}),
    ...(data.availability === ProductAvailability.IN_STOCK
      ? { price: { current: data.priceCurrent, ...(data.priceOld ? { old: data.priceOld } : {}) } }
      : {}),
    ...(data.specifications
      ? { specifications: data.specifications }
      : existing?.specifications
        ? { specifications: existing.specifications }
        : {}),
  } as Product
}

export const openEditForm = (productId: string, allProducts: Product[]) => {
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
  const specsInput = document.getElementById('admin-field-specifications') as HTMLTextAreaElement

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

  if (specsInput) {
    specsInput.value = product.specifications ? JSON.stringify(product.specifications, null, 2) : ''
  }

  formContainer.classList.remove('hidden')
}

export const resetForm = () => {
  const formContainer = document.getElementById('admin-product-form-container')
  const form = document.getElementById('admin-product-form') as HTMLFormElement
  const formTitle = document.getElementById('admin-product-form-title')

  if (formContainer) formContainer.classList.add('hidden')
  if (form) form.reset()
  if (formTitle) formTitle.textContent = 'Добавить товар'

  const idInput = document.getElementById('admin-product-id') as HTMLInputElement
  if (idInput) idInput.value = ''

  for (const id of ALL_FIELD_IDS) showError(id, '')
}
