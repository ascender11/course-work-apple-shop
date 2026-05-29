export const SORT_OPTIONS = [
  { value: '', label: 'По умолчанию' },
  { value: 'price.current|asc', label: 'По цене ↑' },
  { value: 'price.current|desc', label: 'По цене ↓' },
  { value: 'rating.score|desc', label: 'По рейтингу ↓' },
] as const
