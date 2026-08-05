'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/products/product-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SlidersHorizontal, Search, X, ChevronLeft, Grid3X3, LayoutList, Loader2 } from 'lucide-react'
import { categories } from '@/lib/data'
import { useAllProducts } from '@/hooks/use-wc-products'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const priceRanges = [
  { label: 'زیر ۵۰۰ هزار', min: 0, max: 500000 },
  { label: '۵۰۰ هزار تا ۲ میلیون', min: 500000, max: 2000000 },
  { label: '۲ تا ۵ میلیون', min: 2000000, max: 5000000 },
  { label: 'بالای ۵ میلیون', min: 5000000, max: Infinity },
]

const brands = ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus', 'Oppo', 'JBC', 'AmScope']

function FilterPanel({
  categories,
  selectedCategories, setSelectedCategories,
  selectedBrands, setSelectedBrands,
  selectedPriceRange, setSelectedPriceRange,
  hasInstallment, setHasInstallment,
  onClear,
}: {
  categories: any[]
  selectedCategories: string[]
  setSelectedCategories: (v: string[]) => void
  selectedBrands: string[]
  setSelectedBrands: (v: string[]) => void
  selectedPriceRange: number | null
  setSelectedPriceRange: (v: number | null) => void
  hasInstallment: boolean
  setHasInstallment: (v: boolean) => void
  onClear: () => void
}) {
  const toggleArr = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">فیلترها</h3>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-7" onClick={onClear}>
          پاک کردن
        </Button>
      </div>

      <Separator />

      <div>
        <p className="text-sm font-medium text-foreground mb-3">دسته‌بندی</p>
        <div className="flex flex-col gap-2">
          {categories.slice(0, 8).map(c => (
            <div key={c.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${c.id}`}
                checked={selectedCategories.includes(c.slug)}
                onCheckedChange={() => toggleArr(selectedCategories, setSelectedCategories, c.slug)}
              />
              <Label htmlFor={`cat-${c.id}`} className="text-sm cursor-pointer flex-1">{c.name}</Label>
              <span className="text-xs text-muted-foreground">{c.count}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <p className="text-sm font-medium text-foreground mb-3">برند</p>
        <div className="flex flex-col gap-2">
          {brands.map(b => (
            <div key={b} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${b}`}
                checked={selectedBrands.includes(b)}
                onCheckedChange={() => toggleArr(selectedBrands, setSelectedBrands, b)}
              />
              <Label htmlFor={`brand-${b}`} className="text-sm cursor-pointer">{b}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <p className="text-sm font-medium text-foreground mb-3">محدوده قیمت</p>
        <div className="flex flex-col gap-2">
          {priceRanges.map((range, i) => (
            <div key={i} className="flex items-center gap-2">
              <Checkbox
                id={`price-${i}`}
                checked={selectedPriceRange === i}
                onCheckedChange={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
              />
              <Label htmlFor={`price-${i}`} className="text-sm cursor-pointer">{range.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex items-center gap-2">
        <Checkbox
          id="installment"
          checked={hasInstallment}
          onCheckedChange={(v) => setHasInstallment(!!v)}
        />
        <Label htmlFor="installment" className="text-sm cursor-pointer">فقط محصولات اقساطی</Label>
      </div>
    </div>
  )
}

export default function ShopPage() {
  const { products: allProducts, loading, wcCount, localCount, error } = useAllProducts({ perPage: 100 })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null)
  const [hasInstallment, setHasInstallment] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const clearFilters = () => {
    setSearchQuery('')
    setSortBy('default')
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedPriceRange(null)
    setHasInstallment(false)
  }

  const filteredProducts = useMemo(() => {
    let result = [...allProducts]
    if (searchQuery) result = result.filter(p => p.name.includes(searchQuery) || p.brand.includes(searchQuery))
    if (selectedCategories.length) result = result.filter(p => selectedCategories.includes(p.categorySlug))
    if (selectedBrands.length) result = result.filter(p => selectedBrands.includes(p.brand))
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange]
      result = result.filter(p => p.price >= range.min && p.price <= range.max)
    }
    if (hasInstallment) result = result.filter(p => p.hasInstallment)
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
    if (sortBy === 'newest') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    return result
  }, [allProducts, searchQuery, sortBy, selectedCategories, selectedBrands, selectedPriceRange, hasInstallment])

  const activeFiltersCount = selectedCategories.length + selectedBrands.length + (selectedPriceRange !== null ? 1 : 0) + (hasInstallment ? 1 : 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-surface/50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">خانه</Link>
            <ChevronLeft className="w-3 h-3 text-muted-foreground" />
            <span className="text-foreground font-medium">فروشگاه</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">فروشگاه پدیده</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredProducts.length} محصول
                {wcCount > 0 && <span className="text-primary mr-1">({wcCount} از وردپرس + {localCount} محلی)</span>}
                {loading && <span className="mr-2"> — در حال دریافت از وردپرس...</span>}
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="جستجو..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pr-9 h-9 text-sm"
                />
              </div>
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-9 w-40 text-sm">
                  <SelectValue placeholder="مرتب‌سازی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">پیش‌فرض</SelectItem>
                  <SelectItem value="price-asc">ارزان‌ترین</SelectItem>
                  <SelectItem value="price-desc">گران‌ترین</SelectItem>
                  <SelectItem value="rating">پربازدیدترین</SelectItem>
                  <SelectItem value="newest">جدیدترین</SelectItem>
                </SelectContent>
              </Select>
              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-1">
                <button onClick={() => setViewMode('grid')} className={cn('p-1 rounded', viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}>
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')} className={cn('p-1 rounded', viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}>
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="sm:hidden h-9 gap-1.5">
                    <SlidersHorizontal className="w-4 h-4" />
                    فیلتر
                    {activeFiltersCount > 0 && <Badge className="h-4 w-4 p-0 text-[10px] bg-primary">{activeFiltersCount}</Badge>}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>فیلترها</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel
                      categories={categories}
                      selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
                      selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}
                      selectedPriceRange={selectedPriceRange} setSelectedPriceRange={setSelectedPriceRange}
                      hasInstallment={hasInstallment} setHasInstallment={setHasInstallment}
                      onClear={clearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="text-xs text-muted-foreground">فیلترهای فعال:</span>
              {selectedCategories.map(slug => {
                const cat = categories.find(c => c.slug === slug)
                return cat ? (
                  <Badge key={slug} variant="secondary" className="gap-1 text-xs">
                    {cat.name}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== slug))} />
                  </Badge>
                ) : null
              })}
              {selectedBrands.map(b => (
                <Badge key={b} variant="secondary" className="gap-1 text-xs">
                  {b}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBrands(selectedBrands.filter(x => x !== b))} />
                </Badge>
              ))}
              {hasInstallment && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  اقساطی
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setHasInstallment(false)} />
                </Badge>
              )}
              <Button variant="ghost" size="sm" className="h-6 text-xs text-destructive" onClick={clearFilters}>
                حذف همه
              </Button>
            </div>
          )}

          {/* وضعیت اتصال وردپرس */}
          {error && !loading && (
            <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-sm text-amber-700 dark:text-amber-400">
              محصولات وردپرس لود نشد ({error}) — محصولات محلی نمایش داده می‌شوند. VPN ایران را روشن کنید و صفحه را رفرش کنید.
            </div>
          )}
          {loading && (
            <div className="mb-4 p-3 rounded-xl bg-primary/5 border border-primary/20 text-sm text-primary flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              در حال دریافت محصولات از hustlershop.ir (وردپرس)...
            </div>
          )}

          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden sm:block w-60 flex-shrink-0">
              <div className="bg-card rounded-2xl border border-border p-5 sticky top-24">
                <FilterPanel
                  categories={categories}
                  selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
                  selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}
                  selectedPriceRange={selectedPriceRange} setSelectedPriceRange={setSelectedPriceRange}
                  hasInstallment={hasInstallment} setHasInstallment={setHasInstallment}
                  onClear={clearFilters}
                />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {filteredProducts.length === 0 && !loading ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">محصولی یافت نشد</h3>
                  <p className="text-sm text-muted-foreground mb-4">فیلترها را تغییر دهید یا جستجو کنید</p>
                  <Button onClick={clearFilters} variant="outline">پاک کردن فیلترها</Button>
                </div>
              ) : (
                <div className={cn(
                  'grid gap-4',
                  viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
                )}>
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} variant={viewMode === 'list' ? 'horizontal' : 'default'} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
