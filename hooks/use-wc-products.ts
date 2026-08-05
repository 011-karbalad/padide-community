'use client'

import { useState, useEffect, useMemo } from 'react'
import { products as localProducts } from '@/lib/data'
import { mergeProducts, getLocalProducts, getFeaturedProducts, getBestSellers } from '@/lib/products'
import type { Product } from '@/lib/types'

interface WCProductsParams {
  page?: number
  perPage?: number
  search?: string
  category?: number
  sort?: string
}

async function fetchProductsFromWordPress(params?: WCProductsParams): Promise<{
  products: Product[]
  error: string | null
}> {
  const query = new URLSearchParams()
  query.set('all', 'true')
  query.set('per_page', String(params?.perPage || 100))
  if (params?.search) query.set('search', params.search)
  if (params?.category) query.set('category', String(params.category))
  if (params?.sort === 'price-asc') {
    query.set('orderby', 'price')
    query.set('order', 'asc')
  } else if (params?.sort === 'price-desc') {
    query.set('orderby', 'price')
    query.set('order', 'desc')
  } else if (params?.sort === 'newest') {
    query.set('orderby', 'date')
    query.set('order', 'desc')
  } else if (params?.sort) {
    query.set('orderby', 'popularity')
    query.set('order', 'desc')
  }

  try {
    const response = await fetch(`/api/products?${query}`)
    const data = await response.json()

    if (!response.ok || !data.success) {
      return {
        products: [],
        error: data.error || 'خطا در دریافت محصولات از وردپرس',
      }
    }

    return { products: data.products || [], error: null }
  } catch {
    return { products: [], error: 'اتصال به سرور وردپرس برقرار نشد' }
  }
}

export function useWCProducts(params?: WCProductsParams) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      const result = await fetchProductsFromWordPress(params)
      setProducts(result.products)
      setError(result.error)
      setLoading(false)
    }

    loadProducts()
  }, [params?.page, params?.perPage, params?.search, params?.category, params?.sort])

  return { products, loading, error }
}

/** محصولات محلی + وردپرس — محلی فوراً نمایش داده می‌شود */
export function useAllProducts(params?: WCProductsParams) {
  const local = useMemo(() => getLocalProducts(), [])
  const { products: wcProducts, loading, error } = useWCProducts(params)

  const products = useMemo(
    () => mergeProducts(local, wcProducts),
    [local, wcProducts]
  )

  return {
    products,
    localProducts: local,
    wcProducts,
    loading,
    error,
    wcCount: wcProducts.length,
    localCount: local.length,
  }
}

export function useFeaturedProducts(limit = 8) {
  const { products, loading, wcCount, error } = useAllProducts({ perPage: 100 })
  const featured = useMemo(() => getFeaturedProducts(products, limit), [products, limit])
  return { products: featured, loading, wcCount, error }
}

export function useBestSellerProducts(limit = 8) {
  const { products, loading, wcCount, error } = useAllProducts({ perPage: 100 })
  const bestSellers = useMemo(() => getBestSellers(products, limit), [products, limit])
  return { products: bestSellers, loading, wcCount, error }
}

export function useWCProduct(slugOrId: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      setError(null)

      const local = localProducts.find((p) => p.slug === slugOrId)
      if (local) {
        setProduct({ ...local, source: 'local' })
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/products/${slugOrId}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data.product)
        } else {
          setError('محصول یافت نشد')
        }
      } catch {
        setError('خطا در بارگذاری محصول از وردپرس')
      } finally {
        setLoading(false)
      }
    }

    if (slugOrId) loadProduct()
  }, [slugOrId])

  return { product, loading, error }
}

export function useWCCategories() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => (r.ok ? r.json() : { categories: [] }))
      .then((data) => setCategories(data.categories || []))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading }
}
