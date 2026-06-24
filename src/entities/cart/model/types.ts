import type { Product } from '@/entities/product/@x/cart'

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedColor?: string
  selectedStorage?: string
}

export interface CartState {
  items: CartItem[]
  loading: boolean
  error: string | null
}

export type ItemKey = { productId: string; color?: string; storage?: string }
