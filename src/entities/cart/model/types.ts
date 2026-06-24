import type { Product } from '@/entities/product/@x/cart'

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
}
