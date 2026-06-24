import { userStore } from '@/entities/user'

import { t } from '@/shared/i18n'
import { navigate } from '@/shared/lib'
import { toast } from '@/shared/toast'

import { initTogglePassword } from '../lib/password-helpers'
import { clearErrorOnInput, setSubmitButtonUpdater, showError, updateSubmitButton } from '../lib/ui-helpers'
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
    submitBtn.textContent = t('auth.login.loading')

    try {
      await userStore.login({ email, password })
      navigate('/')
    } catch (err) {
      serverError.textContent = err instanceof Error ? err.message : t('auth.login.error')
      toast.error(err instanceof Error ? err.message : t('toast.loginError'))
      submitBtn.disabled = false
      submitBtn.textContent = t('auth.login.submit')
    }
  })
}
