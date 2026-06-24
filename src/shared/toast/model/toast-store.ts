import { ToastContainer } from '../ui/Toast'

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  message: string
  type: ToastType
}

let counter = 0
const MAX_VISIBLE = 3
const DISMISS_MS = 3500
const toasts: ToastItem[] = []
let container: HTMLDivElement | null = null

const getContainer = (): HTMLDivElement => {
  if (!container) {
    container = document.createElement('div')
    container.className = 'toast-root'
    document.body.appendChild(container)
  }
  return container
}

const render = () => {
  const el = getContainer()
  el.innerHTML = ToastContainer(toasts)

  el.querySelectorAll<HTMLButtonElement>('[data-toast-dismiss]').forEach((btn) => {
    btn.addEventListener('click', () => {
      dismiss(Number(btn.dataset.toastDismiss))
    })
  })
}

const dismiss = (id: number) => {
  const idx = toasts.findIndex((t) => t.id === id)
  if (idx === -1) return
  const el = container?.querySelector(`[data-toast-id="${id}"]`)
  if (el) {
    el.classList.add('toast-exit')
    el.addEventListener('animationend', () => {
      toasts.splice(idx, 1)
      render()
    })
  } else {
    toasts.splice(idx, 1)
    render()
  }
}

const show = (type: ToastType, message: string) => {
  const id = ++counter
  toasts.push({ id, message, type })
  if (toasts.length > MAX_VISIBLE) {
    toasts.shift()
  }
  render()
  setTimeout(() => dismiss(id), DISMISS_MS)
}

export const toast = {
  success: (msg: string) => show('success', msg),
  error: (msg: string) => show('error', msg),
  info: (msg: string) => show('info', msg),
}
