import { getQueryString, navigate } from '@/shared/lib'

export const initPaginationController = () => {
  const nav = document.querySelector<HTMLElement>('[data-pagination]')
  if (!nav) return

  const handler = (e: Event) => {
    const btn = (e.target as Element).closest<HTMLElement>('[data-page]')
    if (!btn) return

    const page = parseInt(btn.dataset.page ?? '1', 10)
    const params = new URLSearchParams(getQueryString())

    params.delete('page')
    if (page > 1) params.set('page', String(page))

    const qs = params.toString()
    const baseUrl = window.location.pathname
    navigate(`${baseUrl}${qs ? `?${qs}` : ''}`)
  }

  nav.addEventListener('click', handler)

  return () => nav.removeEventListener('click', handler)
}
