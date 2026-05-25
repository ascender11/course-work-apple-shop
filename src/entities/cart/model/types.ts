import type { Product } from '@/entities/product'

export interface CartItem {
  product: Product
  quantity: number
  selectedColor?: string
  selectedStorage?: string
}

export interface CartState {
  items: CartItem[]
  userId: string
}
