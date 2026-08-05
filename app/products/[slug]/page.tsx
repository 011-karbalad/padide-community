'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import {
  Star, Heart, ShoppingCart, Shield, Truck, RefreshCw, Headphones,
  ChevronLeft, Share2, Minus, Plus, Check, Package, Zap, ChevronDown,
  FileText, Award, MessageCircle
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/products/product-card'
import { InstallmentCalculator } from '@/components/products/installment-calculator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/data'
import { useWCProduct, useAllProducts } from '@/hooks/use-wc-products'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { product, loading, error } = useWCProduct(slug)
  const { products: allProducts } = useAllProducts({ perPage: 100 })
  const related = product
    ? allProducts.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4)
    : []

  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
    // Cart integration will be added when store is connected
    console.log(`[v0] Added ${quantity} of ${product.name} to cart`)
  }

  const mockReviews = [
    { name: 'علی م.', rating: 5, text: 'قطعه اورجینال بود و بدون هیچ مشکلی نصب شد. کیفیت عالی.', date: '۱۴۰۳/۰۴/۱۰', verified: true },
    { name: 'رضا ک.', rating: 4, text: 'خوب بود ولی بسته‌بندی کمی ضعیف بود. خود قطعه عالیه.', date: '۱۴۰۳/۰۳/۲۵', verified: true },
    { name: 'مریم ش.', rating: 5, text: 'ارسال سریع و قطعه کاملاً سالم رسید. پیشنهاد می‌دم.', date: '۱۴۰۳/۰۳/۱۸', verified: true },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">در حال بارگذاری محصول...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product || error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <p className="text-lg font-semibold">محصول یافت نشد</p>
          <Button asChild><Link href="/shop">بازگشت به فروشگاه</Link></Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-surface/50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-1.5 text-sm flex-wrap">
            <Link href="/" className="text-muted-foreground hover:text-foreground">خانه</Link>
            <ChevronLeft className="w-3 h-3 text-muted-foreground" />
            <Link href="/shop" className="text-muted-foreground hover:text-foreground">فروشگاه</Link>
            <ChevronLeft className="w-3 h-3 text-muted-foreground" />
            <Link href={`/categories/${product.categorySlug}`} className="text-muted-foreground hover:text-foreground">{product.category}</Link>
            <ChevronLeft className="w-3 h-3 text-muted-foreground" />
            <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-10 mb-12">
            {/* Image Gallery */}
            <div className="flex gap-3">
              {/* Thumbnails */}
              <div className="flex flex-col gap-2 w-16">
                {(product.images?.length ? product.images : [product.thumbnail]).slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'aspect-square rounded-xl border-2 overflow-hidden bg-muted transition-colors',
                      activeImage === i ? 'border-primary' : 'border-border'
                    )}
                  >
                    <img src={img || '/placeholder.svg'} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              {/* Main Image */}
              <div className="flex-1 aspect-square bg-gradient-to-br from-muted/60 to-accent/40 rounded-3xl relative overflow-hidden border border-border">
                <img src={product.images?.[activeImage] || product.thumbnail || '/placeholder.svg'} alt={product.name} className="w-full h-full object-cover" />
                {product.discount && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-destructive text-white text-sm px-3 py-1">
                      {product.discount}٪ تخفیف
                    </Badge>
                  </div>
                )}
                <button className="absolute top-4 left-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border hover:bg-background transition-colors">
                  <Share2 className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-5">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">{product.brand}</Badge>
                  <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                  {product.source === 'woocommerce' && <Badge className="bg-blue-500 text-white text-xs">هاسلر شاپ</Badge>}
                  {product.stock <= 5 && <Badge className="bg-amber-500 text-white text-xs">فقط {product.stock} عدد</Badge>}
                </div>
                <h1 className="text-2xl font-bold text-foreground leading-tight mb-3">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={cn('w-4 h-4', i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30')} />
                    ))}
                  </div>
                  <span className="text-sm text-primary font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviewCount} نظر)</span>
                  <span className="text-xs text-muted-foreground">· {product.sold} فروخته شده</span>
                </div>
              </div>

              <Separator />

              {/* Price */}
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-black text-foreground">
                    {new Intl.NumberFormat('fa-IR').format(product.price)}
                  </span>
                  <span className="text-muted-foreground">تومان</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-lg text-muted-foreground/60 line-through">
                      {new Intl.NumberFormat('fa-IR').format(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.hasInstallment && product.monthlyPayment && (
                  <p className="text-sm text-primary flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    یا از <strong>{new Intl.NumberFormat('fa-IR').format(product.monthlyPayment)} تومان</strong> در ماه
                  </p>
                )}
              </div>

              {/* SKU & Warranty */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {product.sku && <span>کد: {product.sku}</span>}
                {product.warranty && (
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-500" />
                    {product.warranty}
                  </span>
                )}
                <span className={cn('flex items-center gap-1', product.stock > 0 ? 'text-emerald-600' : 'text-destructive')}>
                  <Package className="w-3.5 h-3.5" />
                  {product.stock > 0 ? `${product.stock} عدد موجود` : 'ناموجود'}
                </span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-11 flex items-center justify-center hover:bg-muted transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-foreground">
                    {new Intl.NumberFormat('fa-IR').format(quantity)}
                  </span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-10 h-11 flex items-center justify-center hover:bg-muted transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  className={cn(
                    'flex-1 h-11 font-semibold gap-2 transition-all',
                    addedToCart ? 'bg-emerald-500 hover:bg-emerald-500' : 'bg-primary hover:bg-primary/90'
                  )}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {addedToCart ? (
                    <><Check className="w-4 h-4" /> افزوده شد</>
                  ) : (
                    <><ShoppingCart className="w-4 h-4" /> افزودن به سبد</>
                  )}
                </Button>

                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={cn(
                    'w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-all',
                    wishlisted ? 'border-destructive bg-destructive/10' : 'border-border hover:border-destructive/50'
                  )}
                >
                  <Heart className={cn('w-5 h-5', wishlisted ? 'fill-destructive text-destructive' : 'text-muted-foreground')} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-surface/70 rounded-2xl">
                {[
                  { icon: Shield, label: 'ضمانت اصالت کالا' },
                  { icon: Truck, label: 'ارسال سریع' },
                  { icon: RefreshCw, label: 'مرجوعی ۷ روزه' },
                  { icon: Headphones, label: 'پشتیبانی ۲۴/۷' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    {label}
                  </div>
                ))}
              </div>

              {/* Installment Calculator */}
              {product.hasInstallment && (
                <InstallmentCalculator price={product.price} productName={product.name} />
              )}
            </div>
          </div>

          {/* Tabs: Description, Specs, Reviews */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 gap-6">
              {[
                { value: 'description', label: 'توضیحات', icon: FileText },
                { value: 'specs', label: 'مشخصات فنی', icon: Package },
                { value: 'reviews', label: `نظرات (${product.reviewCount})`, icon: MessageCircle },
              ].map(({ value, label, icon: Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-muted-foreground bg-transparent text-sm font-medium flex items-center gap-1.5"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose prose-sm max-w-none text-foreground">
                <p className="leading-loose text-muted-foreground">{product.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                {Object.entries(product.specifications).map(([key, value], i) => (
                  <div key={key} className={cn('flex items-center px-5 py-3.5 text-sm gap-4', i % 2 === 0 ? 'bg-muted/30' : 'bg-transparent')}>
                    <span className="text-muted-foreground w-32 flex-shrink-0">{key}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="flex flex-col gap-4 mb-6">
                {mockReviews.map((review, i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{review.name}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        {review.verified && (
                          <Badge className="bg-emerald-100 text-emerald-700 border-0 text-[10px] mr-2">خرید تأیید شده</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">مشاهده همه نظرات</Button>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {related.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">محصولات مرتبط</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
