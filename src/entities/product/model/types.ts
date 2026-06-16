export interface ProductRating {
  score: number
  reviewsCount: number
}

export interface ProductPrice {
  current: number
  old?: number
}

export enum ProductAvailability {
  IN_STOCK = 'in_stock',
  OUT_OF_STOCK = 'out_of_stock',
}

export interface UnavailableProduct {
  id: string
  title: string
  imageUrl: string
  rating: ProductRating
  availability: ProductAvailability.OUT_OF_STOCK
}

export interface AvailableProduct {
  id: string
  title: string
  imageUrl: string
  rating: ProductRating
  price: ProductPrice
  availability: ProductAvailability.IN_STOCK
  warrantyPeriod?: string
}

export type Product = UnavailableProduct | AvailableProduct
