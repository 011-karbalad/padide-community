import { products as localProducts } from './data'
import type { Product } from './types'

export function mergeProducts(local: Product[], remote: Product[]): Product[] {
  const localSlugs = new Set(local.map((p) => p.slug))
  const uniqueRemote = remote.filter((p) => !localSlugs.has(p.slug))
  return [...local, ...uniqueRemote]
}

export function getLocalProducts(): Product[] {
  return localProducts.map((p) => ({ ...p, source: 'local' as const }))
}

export function findProductBySlug(products: Product[], slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getFeaturedProducts(products: Product[], limit = 8): Product[] {
  const featured = products.filter((p) => p.isFeatured)
  if (featured.length >= limit) return featured.slice(0, limit)
  return products.slice(0, limit)
}

export function getBestSellers(products: Product[], limit = 8): Product[] {
  const best = products.filter((p) => p.isBestSeller)
  if (best.length >= limit) return best.slice(0, limit)
  return [...products].sort((a, b) => b.sold - a.sold).slice(0, limit)
}
