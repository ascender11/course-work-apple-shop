export const getPageNumbers = (current: number, total: number): (number | '...')[] => {
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
