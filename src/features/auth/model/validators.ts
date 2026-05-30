export const validateLastName = (value: string): string => {
  if (!value.trim()) return 'Введите фамилию'
  if (value.trim().length < 2) return 'Фамилия должна содержать минимум 2 символа'
  return ''
}

export const validateFirstName = (value: string): string => {
  if (!value.trim()) return 'Введите имя'
  if (value.trim().length < 2) return 'Имя должно содержать минимум 2 символа'
  return ''
}

export const validatePhone = (value: string): string => {
  const cleaned = value.replace(/\s/g, '')
  const phoneRegex = /^\+375(29|33|44|25)\d{7}$/
  if (!cleaned) return 'Введите номер телефона'
  if (!phoneRegex.test(cleaned)) return 'Введите корректный номер РБ (+375XXXXXXXXX)'
  return ''
}

export const validateEmail = (value: string): string => {
  if (!value.trim()) return 'Введите email'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) return 'Введите корректный email'
  return ''
}

export const validateBirthDate = (value: string): string => {
  if (!value) return 'Введите дату рождения'

  const birthDate = new Date(value)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  if (age < 16) return 'Вам должно быть не менее 16 лет'
  if (age > 120) return 'Проверьте дату рождения'
  return ''
}

export const validateNickname = (value: string): string => {
  if (!value.trim()) return 'Введите никнейм'
  if (value.length < 3) return 'Никнейм должен содержать минимум 3 символа'
  if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Только латиница, цифры и _'
  return ''
}

export const validatePassword = (value: string): string => {
  if (!value) return 'Введите пароль'
  if (value.length < 8) return 'Минимум 8 символов'
  if (value.length > 20) return 'Максимум 20 символов'
  if (!/[A-Z]/.test(value)) return 'Должна быть хотя бы одна заглавная буква'
  if (!/[a-z]/.test(value)) return 'Должна быть хотя бы одна строчная буква'
  if (!/[0-9]/.test(value)) return 'Должна быть хотя бы одна цифра'
  if (!/[!@#$%^&*]/.test(value)) return 'Должен быть хотя бы один спецсимвол (!@#$%^&*)'
  return ''
}

export const validateConfirm = (password: string, confirm: string): string => {
  if (!confirm) return 'Подтвердите пароль'
  if (password !== confirm) return 'Пароли не совпадают'
  return ''
}

export const validateAgreement = (checked: boolean): string => {
  if (!checked) return 'Необходимо принять Соглашение пользователя'
  return ''
}
