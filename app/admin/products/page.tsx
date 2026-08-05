'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Package, Plus, Search, SlidersHorizontal, Edit, Trash2,
  Eye, MoreHorizontal, TrendingUp, AlertTriangle, CheckCircle
} from 'lucide-react'
import { products, categories, formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function AdminProductsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const filtered = products
    .filter((p) => {
      if (search && !p.name.toLowerCase().includes(search) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false
      if (category !== 'all' && p.categorySlug !== category) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'stock') return a.stock - b.stock
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">مدیریت محصولات</h1>
          <p className="text-sm text-muted-foreground mt-1">{new Intl.NumberFormat('fa-IR').format(products.length)} محصول</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2 h-9">
          <Plus className="w-4 h-4" />
          افزودن محصول
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="جستجو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9 h-9 text-sm"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-9 w-40 text-sm">
            <SelectValue placeholder="دسته‌بندی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه دسته‌ها</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-9 w-36 text-sm">
            <SelectValue placeholder="مرتب‌سازی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">پیش‌فرض</SelectItem>
            <SelectItem value="price-asc">ارزان‌ترین</SelectItem>
            <SelectItem value="price-desc">گران‌ترین</SelectItem>
            <SelectItem value="stock">موجودی</SelectItem>
            <SelectItem value="rating">امتیاز</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-4 px-4 py-3 border-b border-border bg-surface/40 text-xs font-semibold text-muted-foreground">
          <span>محصول</span>
          <span>دسته‌بندی</span>
          <span>قیمت</span>
          <span>موجودی</span>
          <span>وضعیت</span>
          <span>عملیات</span>
        </div>

        <div className="divide-y divide-border">
          {filtered.map((product) => {
            const emoji =
              product.categorySlug === 'lcd' ? '📱' :
              product.categorySlug === 'battery' ? '🔋' :
              product.categorySlug === 'equipment' ? '🔬' :
              product.categorySlug === 'tools' ? '🔧' :
              product.categorySlug === 'face-id' ? '🔐' : '📦'

            const stockStatus =
              product.stock === 0 ? { label: 'ناموجود', className: 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400' } :
              product.stock <= 5 ? { label: 'موجودی کم', className: 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' } :
              { label: 'موجود', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' }

            return (
              <div key={product.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-3 md:gap-4 px-4 py-4 items-center hover:bg-surface/40 transition-colors">
                {/* Product */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.brand} · {product.sku}</p>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-center gap-1 md:block">
                  <span className="text-xs text-muted-foreground md:hidden">دسته: </span>
                  <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                </div>

                {/* Price */}
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {new Intl.NumberFormat('fa-IR').format(product.price)}
                  </p>
                  {product.discount && (
                    <p className="text-xs text-destructive">{product.discount}٪ تخفیف</p>
                  )}
                </div>

                {/* Stock */}
                <div>
                  <p className={cn('text-sm font-semibold', product.stock <= 5 ? 'text-amber-600' : product.stock === 0 ? 'text-destructive' : 'text-foreground')}>
                    {new Intl.NumberFormat('fa-IR').format(product.stock)}
                  </p>
                  <p className="text-xs text-muted-foreground">عدد</p>
                </div>

                {/* Status */}
                <Badge className={cn('text-xs border-0 w-fit', stockStatus.className)}>
                  {stockStatus.label}
                </Badge>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">محصولی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  )
}
