export const parseSortFromQuery = (qs: string): string => {
  const p = new URLSearchParams(qs)
  const sortField = p.get('_sort')
  const sortOrder = p.get('_order')
  return sortField ? `${sortField}|${sortOrder ?? 'asc'}` : ''
}

export const buildSortQueryString = (sort: string): string => {
  if (!sort) return ''
  const p = new URLSearchParams()
  const lastBar = sort.lastIndexOf('|')
  p.set('_sort', sort.slice(0, lastBar))
  p.set('_order', sort.slice(lastBar + 1))
  return p.toString()
}
