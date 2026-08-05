'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/products/product-card'
import { Button } from '@/components/ui/button'
import { Heart, ArrowLeft, ChevronLeft, Share2, Trash2 } from 'lucide-react'
import { products } from '@/lib/data'

const initialWishlist = [products[0], products[1], products[2], products[4], products[5]]

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist)

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-surface/50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">خانه</Link>
            <ChevronLeft className="w-3 h-3 text-muted-foreground" />
            <span className="text-foreground font-medium">لیست علاقه‌مندی‌ها</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-950/30 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-destructive fill-destructive" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">علاقه‌مندی‌ها</h1>
                <p className="text-sm text-muted-foreground">{new Intl.NumberFormat('fa-IR').format(wishlist.length)} محصول</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 hidden sm:flex">
                <Share2 className="w-4 h-4" />
                اشتراک‌گذاری
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5 hidden sm:flex"
                onClick={() => setWishlist([])}
              >
                <Trash2 className="w-4 h-4" />
                پاک کردن همه
              </Button>
            </div>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">لیست علاقه‌مندی‌ها خالی است</h2>
              <p className="text-muted-foreground mb-6">محصولات مورد علاقه خود را ذخیره کنید تا بعداً راحت‌تر پیدا کنید</p>
              <Button className="bg-primary text-primary-foreground" asChild>
                <Link href="/shop">
                  مشاهده محصولات
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {wishlist.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard product={product} />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 left-2 w-7 h-7 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:border-destructive hover:text-white text-muted-foreground z-10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
