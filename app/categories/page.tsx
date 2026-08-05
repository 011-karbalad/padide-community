'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ArrowLeft, ShoppingBag, Filter } from 'lucide-react'
import { ProductCard } from '@/components/products/product-card'
import type { Product } from '@/lib/types'

interface WPCategory {
  id: number
  name: string
  slug: string
  description: string
  count: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<WPCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [productLoading, setProductLoading] = useState(false)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        if (data.success && data.categories) {
          setCategories(data.categories)
          if (data.categories.length > 0) {
            setSelectedCategory(data.categories[0].id)
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Fetch products when category changes
  useEffect(() => {
    if (!selectedCategory) return

    const fetchProducts = async () => {
      setProductLoading(true)
      try {
        const response = await fetch(
          `/api/products?category=${selectedCategory}&per_page=50`
        )
        const data = await response.json()
        if (data.success && data.products) {
          setProducts(data.products)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setProductLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory])

  const selectedCategoryData = categories.find(c => c.id === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">دسته‌بندی‌ها</h1>
              <p className="text-sm text-muted-foreground">انتخاب دسته مورد نظر خود</p>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {loading ? (
              <>
                {[1, 2, 3, 4, 5].map(i => (
                  <Skeleton key={i} className="h-10 w-24 rounded-lg flex-shrink-0" />
                ))}
              </>
            ) : (
              <>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Category Info */}
        {selectedCategoryData && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {selectedCategoryData.name}
            </h2>
            {selectedCategoryData.description && (
              <p className="text-muted-foreground">
                {selectedCategoryData.description}
              </p>
            )}
          </div>
        )}

        {/* Products Grid */}
        {productLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Skeleton key={i} className="h-80 rounded-lg" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {products.length} محصول یافت شد
              </p>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                فیلتر
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-semibold text-foreground mb-2">
              محصولی وجود ندارد
            </p>
            <p className="text-muted-foreground mb-6">
              دسته‌بندی انتخاب شده محصولی ندارد
            </p>
            <Button asChild>
              <Link href="/">
                بازگشت به صفحه اصلی
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}