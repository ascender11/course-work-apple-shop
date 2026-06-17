export const showError = (fieldId: string, message: string) => {
  const errorSpan = document.querySelector(`[data-error="${fieldId}"]`)
  if (!errorSpan) return
  errorSpan.textContent = message
  const input = document.getElementById(fieldId) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
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

export const clearErrorOnInput = (fieldId: string) => {
  const input = document.getElementById(fieldId) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  if (!input) return
  input.addEventListener('input', () => showError(fieldId, ''))
  input.addEventListener('change', () => showError(fieldId, ''))
}
