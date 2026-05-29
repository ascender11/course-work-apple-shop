import { getPageNumbers } from '../model/utils'

interface PaginationProps {
  currentPage: number
  totalCount: number
  pageLimit: number
}

const btn = 'flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors'

export const Pagination = (props: PaginationProps): string => {
  const { currentPage, totalCount, pageLimit } = props
  const totalPages = Math.ceil(totalCount / pageLimit)
  if (totalPages <= 1) return ''

  const pages = getPageNumbers(currentPage, totalPages)
  const prevDisabled = currentPage <= 1
  const nextDisabled = currentPage >= totalPages

  const arrowCls = (disabled: boolean) =>
    `${btn} ${disabled ? 'cursor-not-allowed text-text-quinary' : 'cursor-pointer text-text-secondary hover:bg-background-secondary'}`

  return `
    <nav data-pagination class="flex items-center justify-center gap-1 py-8" aria-label="Пагинация">
      <button
        class="${arrowCls(prevDisabled)}"
        ${prevDisabled ? 'disabled' : `data-page="${currentPage - 1}"`}
        aria-label="Предыдущая страница"
      >
        <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      ${pages
        .map((page) => {
          if (page === '...') {
            return `<span class="${btn} cursor-default select-none text-text-quinary">…</span>`
          }
          const isActive = page === currentPage
          return `
            <button
              class="${btn} ${isActive ? 'bg-primary text-text-button' : 'cursor-pointer text-text-secondary hover:bg-background-secondary'}"
              ${isActive ? 'disabled aria-current="page"' : `data-page="${page}"`}
            >
              ${page}
            </button>
          `
        })
        .join('')}

      <button
        class="${arrowCls(nextDisabled)}"
        ${nextDisabled ? 'disabled' : `data-page="${currentPage + 1}"`}
        aria-label="Следующая страница"
      >
        <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </nav>
  `
}
