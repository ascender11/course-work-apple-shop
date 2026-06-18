import { userStore } from '@/entities/user'

import { t } from '@/shared/i18n'
import { navigate } from '@/shared/lib'

import { initAutoPasswordGeneration, initNicknameGeneration } from '../lib/nickname-helpers'
import { initPasswordModeToggle, initTogglePassword, isTop100Password } from '../lib/password-helpers'
import {
  clearErrorOnInput,
  setSubmitButtonUpdater,
  showError,
  updateStrength,
  updateSubmitButton,
} from '../lib/ui-helpers'
import {
  validateAgreement,
  validateBirthDate,
  validateConfirm,
  validateEmail,
  validateFirstName,
  validateLastName,
  validateNickname,
  validatePassword,
  validatePhone,
} from './validators'

export const initRegisterForm = () => {
  const form = document.getElementById('register-form')
  if (!form) return

  setSubmitButtonUpdater(() => {
    const submitBtn = document.getElementById('reg-submit') as HTMLButtonElement
    if (!submitBtn) return

    const lastName = (document.getElementById('reg-lastname') as HTMLInputElement)?.value || ''
    const firstName = (document.getElementById('reg-firstname') as HTMLInputElement)?.value || ''
    const phone = (document.getElementById('reg-phone') as HTMLInputElement)?.value || ''
    const email = (document.getElementById('reg-email') as HTMLInputElement)?.value || ''
    const birthdate = (document.getElementById('reg-birthdate') as HTMLInputElement)?.value || ''
    const nickname = (document.getElementById('reg-nickname') as HTMLInputElement)?.value || ''
    const agreement = (document.getElementById('reg-agreement') as HTMLInputElement)?.checked || false

    const mode = document.querySelector<HTMLInputElement>('input[name="password-mode"]:checked')?.value
    let passwordValid = false

    if (mode === 'manual') {
      const password = (document.getElementById('reg-password') as HTMLInputElement)?.value || ''
      const confirm = (document.getElementById('reg-confirm') as HTMLInputElement)?.value || ''
      passwordValid = !validatePassword(password) && !validateConfirm(password, confirm)
    } else {
      const autoPassword = (document.getElementById('reg-auto-password') as HTMLInputElement)?.value || ''
      passwordValid = !!autoPassword
    }

    const isValid =
      !validateLastName(lastName) &&
      !validateFirstName(firstName) &&
      !validatePhone(phone) &&
      !validateEmail(email) &&
      !validateBirthDate(birthdate) &&
      !validateNickname(nickname) &&
      passwordValid &&
      !validateAgreement(agreement)

    submitBtn.disabled = !isValid
  })

  const fields = [
    'reg-lastname',
    'reg-firstname',
    'reg-patronymic',
    'reg-phone',
    'reg-email',
    'reg-birthdate',
    'reg-nickname',
    'reg-password',
    'reg-confirm',
    'reg-agreement',
  ]

  fields.forEach((field) => {
    clearErrorOnInput(field, field === 'reg-agreement')
  })

  const lastNameInput = document.getElementById('reg-lastname') as HTMLInputElement
  const firstNameInput = document.getElementById('reg-firstname') as HTMLInputElement
  const phoneInput = document.getElementById('reg-phone') as HTMLInputElement
  const emailInput = document.getElementById('reg-email') as HTMLInputElement
  const birthdateInput = document.getElementById('reg-birthdate') as HTMLInputElement
  const nicknameInput = document.getElementById('reg-nickname') as HTMLInputElement
  const passwordInput = document.getElementById('reg-password') as HTMLInputElement
  const confirmInput = document.getElementById('reg-confirm') as HTMLInputElement
  const agreementCheckbox = document.getElementById('reg-agreement') as HTMLInputElement

  const validateField = (fieldId: string, validator: (val: string) => string, getValue?: () => string) => {
    const input = document.getElementById(fieldId) as HTMLInputElement
    if (!input) return

    const value = getValue ? getValue() : input.value
    const error = validator(value)
    showError(fieldId, error)
    updateSubmitButton()
  }

  lastNameInput?.addEventListener('input', () => validateField('reg-lastname', validateLastName))
  firstNameInput?.addEventListener('input', () => validateField('reg-firstname', validateFirstName))
  phoneInput?.addEventListener('input', () => validateField('reg-phone', validatePhone))
  emailInput?.addEventListener('input', () => validateField('reg-email', validateEmail))
  birthdateInput?.addEventListener('change', () => validateField('reg-birthdate', validateBirthDate))

  nicknameInput?.addEventListener('input', () => {
    if (!nicknameInput.readOnly) {
      validateField('reg-nickname', validateNickname)
    }
  })

  passwordInput?.addEventListener('input', () => {
    validateField('reg-password', validatePassword)
    updateStrength(passwordInput.value)
    if (confirmInput.value) {
      validateField('reg-confirm', (v) => validateConfirm(passwordInput.value, v))
    }
    updateSubmitButton()
  })

  confirmInput?.addEventListener('input', () => {
    validateField('reg-confirm', (v) => validateConfirm(passwordInput.value, v))
    updateSubmitButton()
  })

  agreementCheckbox?.addEventListener('change', () => {
    validateField('reg-agreement', () => validateAgreement(agreementCheckbox.checked))
    updateSubmitButton()
  })

  initPasswordModeToggle(() => updateSubmitButton())
  initNicknameGeneration()
  initAutoPasswordGeneration()
  initTogglePassword('reg-password', 'toggle-reg-pass')
  initTogglePassword('reg-confirm', 'toggle-reg-confirm')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const serverError = document.getElementById('reg-server-error')
    if (serverError) serverError.textContent = ''

    const lastName = lastNameInput?.value || ''
    const firstName = firstNameInput?.value || ''
    const patronymic = (document.getElementById('reg-patronymic') as HTMLInputElement)?.value || ''
    const phone = phoneInput?.value || ''
    const email = emailInput?.value || ''
    const birthdate = birthdateInput?.value || ''
    const nickname = nicknameInput?.value || ''
    const agreement = agreementCheckbox?.checked || false

    const errors = {
      lastName: validateLastName(lastName),
      firstName: validateFirstName(firstName),
      phone: validatePhone(phone),
      email: validateEmail(email),
      birthdate: validateBirthDate(birthdate),
      nickname: validateNickname(nickname),
      agreement: validateAgreement(agreement),
    }

    let hasError = false
    Object.entries(errors).forEach(([field, error]) => {
      if (error) {
        showError(`reg-${field}`, error, field === 'agreement')
        hasError = true
      }
    })

    const mode = document.querySelector<HTMLInputElement>('input[name="password-mode"]:checked')?.value
    let password = ''

    if (mode === 'manual') {
      const pwd = passwordInput?.value || ''
      const confirm = confirmInput?.value || ''
      const pwdError = validatePassword(pwd)
      const confirmError = validateConfirm(pwd, confirm)

      if (pwdError) {
        showError('reg-password', pwdError)
        hasError = true
      }
      if (confirmError) {
        showError('reg-confirm', confirmError)
        hasError = true
      }
      password = pwd
    } else {
      const autoPassword = (document.getElementById('reg-auto-password') as HTMLInputElement)?.value || ''
      if (!autoPassword) {
        showError('reg-auto-password', t('auth.validators.generatePassword'))
        hasError = true
      }
      password = autoPassword
    }

    if (!hasError && mode === 'manual') {
      const isTop = await isTop100Password(password)
      if (isTop) {
        showError('reg-password', t('auth.validators.commonPassword'))
        hasError = true
      }
    }

    if (hasError) {
      const submitBtn = document.getElementById('reg-submit') as HTMLButtonElement
      submitBtn.disabled = false
      return
    }

    const submitBtn = document.getElementById('reg-submit') as HTMLButtonElement
    submitBtn.disabled = true
    submitBtn.textContent = t('auth.register.loading')

    try {
      await userStore.register({
        phone: phone.replace(/\s/g, ''),
        email: email.trim().toLowerCase(),
        fullName: {
          lastName: lastName.trim(),
          firstName: firstName.trim(),
          patronymic: patronymic.trim() || undefined,
        },
        nickname: nickname.trim(),
        birthDate: birthdate,
        password: password,
      })

      navigate('/')
    } catch (err) {
      if (serverError) {
        serverError.textContent = err instanceof Error ? err.message : t('auth.register.error')
      }
      submitBtn.disabled = false
      submitBtn.textContent = t('auth.register.submit')
    }
  })
}
