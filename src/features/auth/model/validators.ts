import { t } from '@/shared/i18n'

export const validateLastName = (value: string): string => {
  if (!value.trim()) return t('auth.validators.lastName.required')
  if (value.trim().length < 2) return t('auth.validators.lastName.min')
  return ''
}

export const validateFirstName = (value: string): string => {
  if (!value.trim()) return t('auth.validators.firstName.required')
  if (value.trim().length < 2) return t('auth.validators.firstName.min')
  return ''
}

export const validatePhone = (value: string): string => {
  const cleaned = value.replace(/\s/g, '')
  const phoneRegex = /^\+375(29|33|44|25)\d{7}$/
  if (!cleaned) return t('auth.validators.phone.required')
  if (!phoneRegex.test(cleaned)) return t('auth.validators.phone.invalid')
  return ''
}

export const validateEmail = (value: string): string => {
  if (!value.trim()) return t('auth.validators.email.required')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) return t('auth.validators.email.invalid')
  return ''
}

export const validateBirthDate = (value: string): string => {
  if (!value) return t('auth.validators.birthDate.required')

  const birthDate = new Date(value)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  if (age < 16) return t('auth.validators.birthDate.tooYoung')
  if (age > 120) return t('auth.validators.birthDate.invalid')
  return ''
}

export const validateNickname = (value: string): string => {
  if (!value.trim()) return t('auth.validators.nickname.required')
  if (value.length < 3) return t('auth.validators.nickname.min')
  if (!/^[a-zA-Z0-9_]+$/.test(value)) return t('auth.validators.nickname.invalid')
  return ''
}

export const validatePassword = (value: string): string => {
  if (!value) return t('auth.validators.password.required')
  if (value.length < 8) return t('auth.validators.password.min')
  if (value.length > 20) return t('auth.validators.password.max')
  if (!/[A-Z]/.test(value)) return t('auth.validators.password.uppercase')
  if (!/[a-z]/.test(value)) return t('auth.validators.password.lowercase')
  if (!/[0-9]/.test(value)) return t('auth.validators.password.digit')
  if (!/[!@#$%^&*]/.test(value)) return t('auth.validators.password.special')
  return ''
}

export const validateConfirm = (password: string, confirm: string): string => {
  if (!confirm) return t('auth.validators.confirm.required')
  if (password !== confirm) return t('auth.validators.confirm.mismatch')
  return ''
}

export const validateAgreement = (checked: boolean): string => {
  if (!checked) return t('auth.validators.agreement.required')
  return ''
}
