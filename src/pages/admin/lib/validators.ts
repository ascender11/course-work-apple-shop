import { t } from '@/shared/i18n'

export const validateTitle = (value: string): string => {
  if (!value.trim()) return t('admin.validators.title.required')
  if (value.trim().length < 2) return t('admin.validators.title.min')
  return ''
}

export const validateCategory = (value: string): string => {
  if (!value) return t('admin.validators.category.required')
  return ''
}

export const validatePrice = (value: string): string => {
  if (!value) return t('admin.validators.price.required')
  const num = Number(value)
  if (Number.isNaN(num) || num < 0) return t('admin.validators.price.invalid')
  return ''
}
