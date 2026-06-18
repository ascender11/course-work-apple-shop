import { t } from '@/shared/i18n'

import { generateNickname, generatePassword } from '../model/generators'
import { showError, updateSubmitButton } from './ui-helpers'

export const initNicknameGeneration = () => {
  const nicknameInput = document.getElementById('reg-nickname') as HTMLInputElement
  const generateBtn = document.getElementById('generate-nickname')

  nicknameInput.readOnly = false
  nicknameInput.placeholder = t('auth.register.nickname')

  const generate = () => {
    const lastName = (document.getElementById('reg-lastname') as HTMLInputElement)?.value || ''
    const firstName = (document.getElementById('reg-firstname') as HTMLInputElement)?.value || ''

    if (!lastName || !firstName) {
      showError('reg-nickname', t('auth.validators.nickname.generateFirst'))
      return
    }

    const nickname = generateNickname(firstName, lastName)
    nicknameInput.value = nickname

    showError('reg-nickname', '')
    updateSubmitButton()
  }

  generateBtn?.addEventListener('click', generate)
}

export const initAutoPasswordGeneration = () => {
  const regenerateBtn = document.getElementById('regenerate-password')
  const autoPasswordInput = document.getElementById('reg-auto-password') as HTMLInputElement

  const generate = () => {
    autoPasswordInput.value = generatePassword()
    updateSubmitButton()
  }

  regenerateBtn?.addEventListener('click', generate)
  setTimeout(generate, 100)
}
