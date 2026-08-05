import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, CartItem } from './types'

interface CartStore {
  items: CartItem[]
  wishlist: Product[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleWishlist: (product: Product) => void
  isWishlisted: (productId: string) => boolean
  cartTotal: () => number
  cartCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
                  : i
              ),
            }
          }
          return { items: [...state.items, { product, quantity }] }
        })
      },

      removeFromCart: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) }))
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.product.id !== productId)
              : state.items.map((i) =>
                  i.product.id === productId ? { ...i, quantity } : i
                ),
        }))
      },

      clearCart: () => set({ items: [] }),

      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.wishlist.some((p) => p.id === product.id)
          return {
            wishlist: exists
              ? state.wishlist.filter((p) => p.id !== product.id)
              : [...state.wishlist, product],
          }
        })
      },

      isWishlisted: (productId) => get().wishlist.some((p) => p.id === productId),

      cartTotal: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      cartCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'padideh-cart' }
  )
)
