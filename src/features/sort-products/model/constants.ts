export const SORT_OPTIONS = [
  { value: '', labelKey: 'sort.default' },
  { value: 'price.current|asc', labelKey: 'sort.priceAsc' },
  { value: 'price.current|desc', labelKey: 'sort.priceDesc' },
  { value: 'rating.score|desc', labelKey: 'sort.ratingDesc' },
] as const
