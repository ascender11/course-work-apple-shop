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

export interface ProductSpecification {
  name: string
  value: string
}

export interface ProductSpecificationGroup {
  groupName: string
  specs: ProductSpecification[]
}

export interface UnavailableProduct {
  id: string
  title: string
  images: string[]
  category: string
  year?: string
  soldCount?: number
  rating: ProductRating
  price: ProductPrice
  availability: ProductAvailability.OUT_OF_STOCK
  warrantyPeriod?: string
  specifications?: ProductSpecificationGroup[]
}

export interface AvailableProduct {
  id: string
  title: string
  images: string[]
  category: string
  year?: string
  soldCount?: number
  rating: ProductRating
  price: ProductPrice
  availability: ProductAvailability.IN_STOCK
  warrantyPeriod?: string
  specifications?: ProductSpecificationGroup[]
}

export type Product = UnavailableProduct | AvailableProduct
