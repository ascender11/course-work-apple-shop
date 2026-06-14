export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  text: string
  rating: number
  createdAt: string
}

export interface Order {
  id: string
  userId: string
  productId: string
  quantity: number
  totalPrice: number
  status: string
  createdAt: string
}
