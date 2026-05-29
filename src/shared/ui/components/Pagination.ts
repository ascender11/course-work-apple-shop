import { html } from '@/shared/lib'
import { ArrowLeft, ArrowRight } from '@/shared/ui/icons'

export interface PaginationProps {
  currentPage: number
  totalCount: number
  pageLimit: number
}

const getPageNumbers = (current: number, total: number): (number | '...')[] => {
  const visible = new Set<number>()
  visible.add(1)
  visible.add(total)
  if (current - 1 >= 1) visible.add(current - 1)
  visible.add(current)
  if (current + 1 <= total) visible.add(current + 1)

  const sorted = [...visible].sort((a, b) => a - b)
  const result: (number | '...')[] = []

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('...')
    result.push(sorted[i])
  }

  return result
}

const btn = 'flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors'

export const Pagination = ({ currentPage, totalCount, pageLimit }: PaginationProps): string => {
  const totalPages = Math.ceil(totalCount / pageLimit)
  if (totalPages <= 1) return ''

  const pages = getPageNumbers(currentPage, totalPages)
  const prevDisabled = currentPage <= 1
  const nextDisabled = currentPage >= totalPages

  const arrowCls = (disabled: boolean) =>
    `${btn} ${disabled ? 'cursor-not-allowed text-text-quinary' : 'cursor-pointer text-text-secondary hover:bg-background-secondary'}`

  return html`
    <nav data-pagination class="flex items-center justify-center gap-1 py-8" aria-label="Пагинация">
      <button
        class="${arrowCls(prevDisabled)}"
        ${prevDisabled ? 'disabled' : `data-page="${currentPage - 1}"`}
        aria-label="Предыдущая страница"
      >
        ${ArrowLeft({ className: 'w-5 h-5' })}
      </button>

      ${pages
        .map((page) => {
          if (page === '...') {
            return html`<span class="${btn} cursor-default select-none text-text-quinary">…</span>`
          }
          const isActive = page === currentPage
          return html`
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
        ${ArrowRight({ className: 'w-5 h-5' })}
      </button>
    </nav>
  `
}
