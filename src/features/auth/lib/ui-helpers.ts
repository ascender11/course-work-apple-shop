import { t } from '@/shared/i18n'

let submitButtonUpdateCallback: (() => void) | null = null

export const setSubmitButtonUpdater = (callback: () => void) => {
  submitButtonUpdateCallback = callback
}

export const updateSubmitButton = () => {
  submitButtonUpdateCallback?.()
}

export const showError = (inputId: string, message: string, isCheckbox = false) => {
  const errorSpan = document.querySelector(`[data-error="${inputId}"]`)
  if (!errorSpan) return

  errorSpan.textContent = message

  if (!isCheckbox) {
    const input = document.getElementById(inputId) as HTMLInputElement
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
}

export const clearErrorOnInput = (inputId: string, isCheckbox = false) => {
  const input = document.getElementById(inputId) as HTMLInputElement
  if (!input) return

  if (!isCheckbox) {
    input.addEventListener('input', () => {
      showError(inputId, '', isCheckbox)
    })
  } else {
    input.addEventListener('change', () => {
      showError(inputId, '', isCheckbox)
    })
  }
}

export const updateStrength = (password: string) => {
  const bar = document.getElementById('strength-bar')
  const label = document.getElementById('strength-label')
  if (!bar || !label) return

  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[!@#$%^&*]/.test(password)) score++

  let width = 'w-0'
  let color = 'bg-background-tertiary'
  let text = ''

  if (password.length === 0) {
    width = 'w-0'
    color = 'bg-background-tertiary'
    text = ''
  } else if (score <= 2) {
    width = 'w-1/3'
    color = 'bg-red-400'
    text = t('auth.strength.weak')
  } else if (score <= 4) {
    width = 'w-2/3'
    color = 'bg-amber-400'
    text = t('auth.strength.medium')
  } else {
    width = 'w-full'
    color = 'bg-green-500'
    text = t('auth.strength.strong')
  }

  bar.className = `h-full rounded-full transition-all duration-300 ${width} ${color}`
  label.textContent = text
  const colorClass =
    text === t('auth.strength.weak')
      ? 'text-red-400'
      : text === t('auth.strength.medium')
        ? 'text-amber-500'
        : text === t('auth.strength.strong')
          ? 'text-green-600'
          : 'text-text-quinary'
  label.className = `text-xs font-medium w-14 text-right ${colorClass}`
}
