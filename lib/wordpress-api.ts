/**
 * WordPress WooCommerce API Integration
 * Backend: https://hustlershop.ir
 */

import { wcConfig, hasWcCredentials } from './config'
import type { Product } from './types'

const WORDPRESS_API_BASE = wcConfig.apiBase

function encodeCredentials(key: string, secret: string): string {
  const raw = `${key}:${secret}`
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(raw).toString('base64')
  }
  return btoa(raw)
}

function getAuthHeader(): Record<string, string> {
  if (!hasWcCredentials()) return {}
  return {
    Authorization: `Basic ${encodeCredentials(wcConfig.consumerKey, wcConfig.consumerSecret)}`,
  }
}

function appendAuthParams(queryParams: URLSearchParams) {
  if (hasWcCredentials()) {
    queryParams.append('consumer_key', wcConfig.consumerKey)
    queryParams.append('consumer_secret', wcConfig.consumerSecret)
  }
}

async function fetchWithRetry(url: string, init?: RequestInit): Promise<Response> {
  let lastError: unknown

  for (let attempt = 1; attempt <= wcConfig.fetchRetries; attempt++) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), wcConfig.fetchTimeoutMs)

    try {
      const response = await fetch(url, {
        ...init,
        signal: controller.signal,
      })
      clearTimeout(timeout)
      return response
    } catch (error) {
      clearTimeout(timeout)
      lastError = error
      console.warn(`[WooCommerce] Attempt ${attempt}/${wcConfig.fetchRetries} failed:`, error)
      if (attempt < wcConfig.fetchRetries) {
        await new Promise((r) => setTimeout(r, attempt * 2000))
      }
    }
  }

  throw lastError
}

export interface WPProduct {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  featured: boolean
  stock_quantity: number | null
  stock_status: string
  average_rating: string
  rating_count: number
  total_sales: number
  images: Array<{ id: number; src: string; alt: string }>
  categories: Array<{ id: number; name: string; slug: string }>
  sku: string
  date_created: string
}

export interface WPCategory {
  id: number
  name: string
  slug: string
  description: string
  count: number
}

export interface WPOrder {
  id: number
  number: string
  status: string
  date_created: string
  total: string
  customer_id: number
  line_items: Array<{ id: number; product_id: number; quantity: number; total: string }>
}

export async function fetchWPProducts(params?: {
  page?: number
  per_page?: number
  search?: string
  category?: number
  orderby?: string
  order?: 'asc' | 'desc'
}): Promise<WPProduct[]> {
  try {
    const queryParams = new URLSearchParams()
    queryParams.append('per_page', (params?.per_page || 20).toString())
    queryParams.append('status', 'publish')
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.search) queryParams.append('search', params.search)
    if (params?.category) queryParams.append('category', params.category.toString())
    if (params?.orderby) queryParams.append('orderby', params.orderby)
    if (params?.order) queryParams.append('order', params.order)
    appendAuthParams(queryParams)

    const response = await fetchWithRetry(`${WORDPRESS_API_BASE}/products?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...getAuthHeader(),
      },
      next: { revalidate: 600 },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[WooCommerce] Error ${response.status}:`, errorText)
      return []
    }

    return (await response.json()) as WPProduct[]
  } catch (error) {
    console.error('[WooCommerce API] Error fetching products:', error)
    return []
  }
}

export async function fetchAllWPProducts(params?: {
  search?: string
  category?: number
  orderby?: string
  order?: 'asc' | 'desc'
  maxPages?: number
}): Promise<WPProduct[]> {
  const all: WPProduct[] = []
  const maxPages = params?.maxPages || 10

  for (let page = 1; page <= maxPages; page++) {
    const batch = await fetchWPProducts({
      page,
      per_page: 100,
      search: params?.search,
      category: params?.category,
      orderby: params?.orderby,
      order: params?.order,
    })
    if (!batch.length) break
    all.push(...batch)
    if (batch.length < 100) break
  }

  return all
}

export async function fetchWPProduct(id: string | number): Promise<WPProduct | null> {
  try {
    const queryParams = new URLSearchParams()
    appendAuthParams(queryParams)
    const qs = queryParams.toString()

    const response = await fetchWithRetry(
      `${WORDPRESS_API_BASE}/products/${id}${qs ? `?${qs}` : ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...getAuthHeader(),
        },
        next: { revalidate: 600 },
      }
    )

    if (!response.ok) {
      return null
    }

    return (await response.json()) as WPProduct
  } catch (error) {
    console.error('[WooCommerce API] Error fetching product:', error)
    return null
  }
}

export async function fetchWPProductBySlug(slug: string): Promise<WPProduct | null> {
  const products = await fetchWPProducts({ search: slug, per_page: 10 })
  return products.find((p) => p.slug === slug) || products[0] || null
}

export async function fetchWPCategories(): Promise<WPCategory[]> {
  try {
    const queryParams = new URLSearchParams({ per_page: '50' })
    appendAuthParams(queryParams)

    const response = await fetchWithRetry(`${WORDPRESS_API_BASE}/products/categories?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...getAuthHeader(),
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return []
    }

    return (await response.json()) as WPCategory[]
  } catch (error) {
    console.error('[WooCommerce API] Error fetching categories:', error)
    return []
  }
}

export async function searchWPProducts(query: string) {
  return fetchWPProducts({ search: query, per_page: 20 })
}

export async function fetchWPFeaturedProducts() {
  return fetchWPProducts({ per_page: 10, orderby: 'popularity' })
}

export function formatWPPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
  }).format(numPrice)
}

export function calculateDiscount(originalPrice: string | number, salePrice: string | number): number {
  const original = typeof originalPrice === 'string' ? parseFloat(originalPrice) : originalPrice
  const sale = typeof salePrice === 'string' ? parseFloat(salePrice) : salePrice

  if (original <= 0 || sale <= 0) return 0
  return Math.round(((original - sale) / original) * 100)
}

export async function createWCOrder(orderData: {
  customer_id?: number
  customer_email: string
  customer_first_name: string
  customer_last_name: string
  phone_number: string
  billing: {
    first_name: string
    last_name: string
    address_1: string
    city: string
    state: string
    postcode: string
    country: string
    email: string
    phone: string
  }
  shipping: {
    first_name: string
    last_name: string
    address_1: string
    city: string
    state: string
    postcode: string
    country: string
  }
  line_items: Array<{ product_id: number; quantity: number }>
  payment_method: string
  payment_method_title: string
  status?: string
}) {
  try {
    const response = await fetch(`${WORDPRESS_API_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.status}`)
    }

    return (await response.json()) as WPOrder
  } catch (error) {
    console.error('[WooCommerce API] Error creating order:', error)
    return null
  }
}

export async function fetchCustomerOrders(customerId: number) {
  try {
    const response = await fetch(`${WORDPRESS_API_BASE}/orders?customer=${customerId}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      return []
    }

    return (await response.json()) as WPOrder[]
  } catch (error) {
    console.error('[WooCommerce API] Error fetching orders:', error)
    return []
  }
}

export async function fetchWCOrder(orderId: number) {
  try {
    const response = await fetch(`${WORDPRESS_API_BASE}/orders/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      return null
    }

    return (await response.json()) as WPOrder
  } catch (error) {
    console.error('[WooCommerce API] Error fetching order:', error)
    return null
  }
}

export function transformWPProduct(wpProduct: WPProduct): Product {
  const price = parseFloat(wpProduct.price || wpProduct.regular_price || '0')
  const originalPrice = parseFloat(wpProduct.regular_price || wpProduct.price || '0')
  const discount =
    wpProduct.on_sale && wpProduct.sale_price
      ? calculateDiscount(wpProduct.regular_price, wpProduct.sale_price)
      : 0

  const createdAt = new Date(wpProduct.date_created)
  const isNew = Date.now() - createdAt.getTime() < 30 * 24 * 60 * 60 * 1000

  return {
    id: `wc-${wpProduct.id}`,
    source: 'woocommerce',
    wcId: wpProduct.id,
    slug: wpProduct.slug,
    name: wpProduct.name,
    nameEn: wpProduct.name,
    brand: wpProduct.categories?.[0]?.name || 'هاسلر شاپ',
    model: wpProduct.sku || '',
    category: wpProduct.categories?.[0]?.name || 'فروشگاه',
    categorySlug: wpProduct.categories?.[0]?.slug || 'shop',
    price,
    originalPrice: originalPrice > price ? originalPrice : undefined,
    thumbnail: wpProduct.images?.[0]?.src || '/placeholder.svg',
    images: wpProduct.images?.map((img) => img.src) || [],
    stock: wpProduct.stock_quantity ?? (wpProduct.stock_status === 'instock' ? 99 : 0),
    rating: parseFloat(wpProduct.average_rating || '0'),
    reviewCount: wpProduct.rating_count || 0,
    sold: wpProduct.total_sales || 0,
    isNew,
    isFeatured: wpProduct.featured,
    isBestSeller: (wpProduct.total_sales || 0) > 10,
    hasInstallment: false,
    description: wpProduct.description || wpProduct.short_description || '',
    specifications: {},
    tags: [],
    sku: wpProduct.sku,
    discount: discount > 0 ? discount : undefined,
    badge: wpProduct.on_sale ? 'sale' : isNew ? 'new' : wpProduct.featured ? 'bestseller' : undefined,
  }
}
