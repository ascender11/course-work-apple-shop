export interface CartProduct {
  id: string
  title: string
  image: string
  price: number
  quantity: number
}

export interface Cart {
  id: string
  userId: string
  products: CartProduct[]
}
