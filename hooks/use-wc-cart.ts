'use client'

import { useState, useCallback, useEffect } from 'react'
import { useCartStore } from '@/lib/store'
import { createWCOrder, fetchWCOrder } from '@/lib/wordpress-api'
import type { Product } from '@/lib/types'

export interface CheckoutData {
  firstName: string
  lastName: string
  email: string
  phone: string
  province: string
  city: string
  address: string
  postalCode: string
  paymentMethod: string
}

export function useWCCart() {
  const cartStore = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastOrderId, setLastOrderId] = useState<number | null>(null)

  // Calculate totals
  const subtotal = cartStore.cartTotal()
  const shippingCost = subtotal > 5000000 ? 0 : 50000 // Free shipping over 5M
  const taxRate = 0.09 // 9% tax
  const tax = Math.floor(subtotal * taxRate)
  const total = subtotal + shippingCost + tax

  // Handle checkout with WooCommerce
  const checkout = useCallback(
    async (data: CheckoutData): Promise<{ success: boolean; orderId?: number; error?: string }> => {
      try {
        setIsLoading(true)
        setError(null)

        if (cartStore.items.length === 0) {
          throw new Error('سبد خرید خالی است')
        }

        // Prepare line items from cart
        const lineItems = cartStore.items.map(item => ({
          product_id: item.product.wcId || parseInt(item.product.id),
          quantity: item.quantity,
        }))

        // Create order in WooCommerce
        const order = await createWCOrder({
          customer_email: data.email,
          customer_first_name: data.firstName,
          customer_last_name: data.lastName,
          phone_number: data.phone,
          billing: {
            first_name: data.firstName,
            last_name: data.lastName,
            address_1: data.address,
            city: data.city,
            state: data.province,
            postcode: data.postalCode,
            country: 'IR',
            email: data.email,
            phone: data.phone,
          },
          shipping: {
            first_name: data.firstName,
            last_name: data.lastName,
            address_1: data.address,
            city: data.city,
            state: data.province,
            postcode: data.postalCode,
            country: 'IR',
          },
          line_items: lineItems,
          payment_method: data.paymentMethod,
          payment_method_title: data.paymentMethod === 'bank_transfer' ? 'درگاه بانکی' : 'پرداخت در محل',
          status: 'pending',
        })

        if (!order) {
          throw new Error('خطا در ایجاد سفارش')
        }

        console.log('[padide] Order created successfully:', order.id)
        setLastOrderId(order.id)

        // Clear cart after successful order
        cartStore.clearCart()

        return {
          success: true,
          orderId: order.id,
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'خطای نامشخص'
        setError(errorMessage)
        console.error('[WC Cart] Checkout error:', err)
        return {
          success: false,
          error: errorMessage,
        }
      } finally {
        setIsLoading(false)
      }
    },
    [cartStore]
  )

  // Get order details
  const getOrder = useCallback(
    async (orderId: number) => {
      try {
        const order = await fetchWCOrder(orderId)
        return order
      } catch (err) {
        console.error('[WC Cart] Error fetching order:', err)
        return null
      }
    },
    []
  )

  return {
    items: cartStore.items,
    subtotal,
    shippingCost,
    tax,
    total,
    itemCount: cartStore.cartCount(),
    isLoading,
    error,
    lastOrderId,
    checkout,
    getOrder,
    addToCart: cartStore.addToCart,
    removeFromCart: cartStore.removeFromCart,
    updateQuantity: cartStore.updateQuantity,
    clearCart: cartStore.clearCart,
  }
}
