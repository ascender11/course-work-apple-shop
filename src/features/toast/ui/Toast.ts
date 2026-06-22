import { html } from '@/shared/lib'

interface ToastItem {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

const icons: Record<string, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
}

export const ToastItem = ({ id, message, type }: ToastItem): string => html`
  <div class="toast toast-${type}" data-toast-id="${id}">
    <span class="toast-icon">${icons[type]}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" data-toast-dismiss="${id}">×</button>
  </div>
`

export const ToastContainer = (toasts: ToastItem[]): string => html`
  <div class="toast-container">
    ${toasts.map((t) => ToastItem(t)).join('')}
  </div>
`
