import { navigate } from '@/shared/lib'

const applySearch = (input: HTMLInputElement, onSearch: (query: string) => void) => {
  const value = input.value.trim()
  const params = new URLSearchParams(window.location.search)

  if (value) {
    params.set('q', value)
  } else {
    params.delete('q')
  }
  params.delete('page')

  const qs = params.toString()
  const url = qs ? `/catalog?${qs}` : '/catalog'
  navigate(url)
  onSearch(qs)
}

export const initSearch = (onSearch: (query: string) => void): (() => void) => {
  const input = document.getElementById('catalog-search') as HTMLInputElement | null
  const btn = document.getElementById('catalog-search-btn') as HTMLButtonElement | null
  if (!input || !btn) return () => {}

  const onBtnClick = () => applySearch(input, onSearch)
  const onEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') applySearch(input, onSearch)
  }

  btn.addEventListener('click', onBtnClick)
  input.addEventListener('keydown', onEnter)

  return () => {
    btn.removeEventListener('click', onBtnClick)
    input.removeEventListener('keydown', onEnter)
  }
}
