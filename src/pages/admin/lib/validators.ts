export const validateTitle = (value: string): string => {
  if (!value.trim()) return 'Введите название товара'
  if (value.trim().length < 2) return 'Название должно содержать минимум 2 символа'
  return ''
}

export const validateCategory = (value: string): string => {
  if (!value) return 'Выберите категорию'
  return ''
}

export const validatePrice = (value: string): string => {
  if (!value) return 'Введите цену'
  const num = Number(value)
  if (Number.isNaN(num) || num < 0) return 'Введите корректную цену'
  return ''
}
