import { EyeOff, EyeOpen } from '@/shared/ui/icons'

import { generatePassword } from './generators'

export const isTop100Password = async (password: string): Promise<boolean> => {
  try {
    // TODO: change fetch to axiosInstance, find real API to do the task
    const response = await fetch(
      'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-100.txt'
    )
    const text = await response.text()
    const top100 = text.split('\n').map((p) => p.trim().toLowerCase())
    return top100.includes(password.toLowerCase())
  } catch {
    return false
  }
}

export const initTogglePassword = (inputId: string, toggleId: string) => {
  const input = document.getElementById(inputId) as HTMLInputElement
  const toggle = document.getElementById(toggleId)

  toggle?.addEventListener('click', () => {
    const isPassword = input.type === 'password'
    input.type = isPassword ? 'text' : 'password'

    toggle.innerHTML = isPassword ? EyeOff() : EyeOpen()
  })
}

export const initPasswordModeToggle = (onModeChange: () => void) => {
  const radios = document.querySelectorAll<HTMLInputElement>('input[name="password-mode"]')
  const manualFields = document.getElementById('manual-password-fields')
  const autoFields = document.getElementById('auto-password-fields')
  const autoPasswordInput = document.getElementById('reg-auto-password') as HTMLInputElement

  radios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.value === 'manual') {
        manualFields?.classList.remove('hidden')
        autoFields?.classList.add('hidden')
      } else {
        manualFields?.classList.add('hidden')
        autoFields?.classList.remove('hidden')

        if (autoPasswordInput && !autoPasswordInput.value) {
          autoPasswordInput.value = generatePassword()
        }
      }
      onModeChange()
    })
  })
}
