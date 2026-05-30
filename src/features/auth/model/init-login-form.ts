import { userApi, userStore } from '@/entities/user'

import { navigate } from '@/shared/lib'

import { initTogglePassword } from './password-helpers'
import { clearErrorOnInput, setSubmitButtonUpdater, showError, updateSubmitButton } from './ui-helpers'
import { validateEmail, validatePassword } from './validators'

export const initLoginForm = () => {
  const form = document.getElementById('login-form') as HTMLFormElement | null
  if (!form) return

  const emailInput = document.getElementById('login-email') as HTMLInputElement
  const passwordInput = document.getElementById('login-password') as HTMLInputElement
  const submitBtn = document.getElementById('login-submit') as HTMLButtonElement
  const serverError = document.getElementById('login-server-error') as HTMLElement

  setSubmitButtonUpdater(() => {
    const email = emailInput?.value || ''
    const password = passwordInput?.value || ''
    const isValid = !validateEmail(email) && !validatePassword(password)
    if (submitBtn) submitBtn.disabled = !isValid
  })

  clearErrorOnInput('login-email')
  clearErrorOnInput('login-password')

  emailInput?.addEventListener('input', () => {
    const error = validateEmail(emailInput.value)
    showError('login-email', error)
    updateSubmitButton()
  })

  passwordInput?.addEventListener('input', () => {
    const error = validatePassword(passwordInput.value)
    showError('login-password', error)
    updateSubmitButton()
  })

  initTogglePassword('login-password', 'toggle-login-pass')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    serverError.textContent = ''

    const email = emailInput.value.trim()
    const password = passwordInput.value

    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    showError('login-email', emailError)
    showError('login-password', passwordError)

    if (emailError || passwordError) return

    submitBtn.disabled = true
    submitBtn.textContent = 'Входим…'

    try {
      const user = await userApi.login(email, password)
      userStore.set({
        user: {
          id: user.id,
          phone: user.phone,
          email: user.email,
          fullName: user.fullName,
          nickname: user.nickname,
          birthDate: user.birthDate,
          role: user.role,
          createdAt: user.createdAt,
        },
        token: user.id,
      })
      navigate('/')
    } catch (err) {
      serverError.textContent = err instanceof Error ? err.message : 'Ошибка входа'
      submitBtn.disabled = false
      submitBtn.textContent = 'Войти'
    }
  })
}
