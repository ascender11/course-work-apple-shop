import { AxiosError } from 'axios'

import { productService } from '@/entities/product'

import { cartService } from '../api/service'
import type { Cart, CartProduct } from './types'

let cart: Cart | null = null
let listeners: (() => void)[] = []

const notify = () => {
  for (const fn of listeners) fn()
}

const CACHE_KEY = (id: string) => `cart_${id}`

const loadCache = (userId: string): Cart | null => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY(userId)) || 'null')
  } catch {
    return null
  }
}

const saveCache = (userId: string) => {
  if (cart) localStorage.setItem(CACHE_KEY(userId), JSON.stringify(cart))
}

export const cartStore = {
  subscribe(fn: () => void) {
    listeners.push(fn)
    return () => {
      listeners = listeners.filter((l) => l !== fn)
    }
  },

  get products(): CartProduct[] {
    return cart?.products ?? []
  },

  get total() {
    return (cart?.products ?? []).reduce((sum, p) => sum + p.price * p.quantity, 0)
  },

  get count() {
    return (cart?.products ?? []).reduce((sum, p) => sum + p.quantity, 0)
  },

  getCart(): Cart | null {
    return cart
  },

  get(productId: string): CartProduct | undefined {
    return cart?.products.find((p) => p.id === productId)
  },

  async init(userId: string) {
    const cached = loadCache(userId)
    cart = cached
    notify()

    try {
      const loaded = await cartService.get(userId)
      cart = loaded
      saveCache(userId)
      notify()
    } catch (error) {
      if (error instanceof AxiosError) {
        cart = null
        notify()
      }
    }
  },

  async add(userId: string, productId: string) {
    const existing = cart?.products.find((p) => p.id === productId)

    if (existing && cart) {
      const newQty = existing.quantity + 1
      cart = {
        ...cart,
        products: cart.products.map((p) => (p.id === productId ? { ...p, quantity: newQty } : p)),
      }
      notify()

      try {
        await cartService.save(userId, cart)
        saveCache(userId)
      } catch (error) {
        if (error instanceof AxiosError && cart) {
          cart = {
            ...cart,
            products: cart.products.map((p) => (p.id === productId ? { ...p, quantity: existing.quantity } : p)),
          }
          notify()
        }
      }
      return
    }

    const fullProduct = await productService.getById(productId)
    const newProduct: CartProduct = {
      id: fullProduct.id,
      title: fullProduct.title,
      image: fullProduct.images[0] || '',
      price: fullProduct.price.current,
      quantity: 1,
    }

    if (cart) {
      cart = { ...cart, products: [...cart.products, newProduct] }
    } else {
      cart = { id: '', userId, products: [newProduct] }
    }
    notify()

    try {
      if (cart.id) {
        await cartService.save(userId, cart)
      } else {
        const created = await cartService.create(userId, cart.products)
        cart = created
      }
      saveCache(userId)
      notify()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (cart) {
          cart = { ...cart, products: cart.products.filter((p) => p.id !== productId) }
          if (cart.products.length === 0) cart = null
        }
        notify()
      }
    }
  },

  async remove(userId: string, productId: string) {
    if (!cart) return

    const oldProducts = cart.products
    cart = { ...cart, products: cart.products.filter((p) => p.id !== productId) }
    if (cart.products.length === 0) cart = null
    notify()

    if (cart?.id) {
      try {
        await cartService.save(userId, cart)
        saveCache(userId)
      } catch (error) {
        if (error instanceof AxiosError) {
          cart = { id: cart?.id ?? '', userId, products: oldProducts }
          notify()
        }
      }
    }
  },

  async decrement(userId: string, productId: string): Promise<boolean> {
    if (!cart) return false

    const item = cart.products.find((p) => p.id === productId)
    if (!item) return false

    if (item.quantity <= 1) {
      await this.remove(userId, productId)
      return true
    }

    const newQty = item.quantity - 1
    const prev = cart
    cart = {
      ...cart,
      products: cart.products.map((p) => (p.id === productId ? { ...p, quantity: newQty } : p)),
    }
    notify()

    try {
      await cartService.save(userId, cart)
      saveCache(userId)
    } catch (error) {
      if (error instanceof AxiosError) {
        cart = prev
        notify()
      }
    }
    return false
  },

  async clear(userId: string) {
    const old = cart
    cart = null
    notify()

    try {
      if (old?.id) await cartService.delete(old.id)
      localStorage.removeItem(CACHE_KEY(userId))
    } catch (error) {
      if (error instanceof AxiosError) {
        cart = old
        notify()
      }
    }
  },

  clearCache(userId: string) {
    cart = null
    notify()
    localStorage.removeItem(CACHE_KEY(userId))
  },
}
