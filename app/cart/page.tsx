'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  ShoppingCart, Trash2, Plus, Minus, ChevronLeft, Tag,
  Truck, Shield, Zap, ArrowLeft, Package
} from 'lucide-react'
import { products, formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'
import type { CartItem } from '@/lib/types'

// Mock cart items seeded from product data
const initialCart: CartItem[] = [
  { product: products[0], quantity: 1 },
  { product: products[2], quantity: 2 },
  { product: products[5], quantity: 1 },
]

const SHIPPING_THRESHOLD = 500000
const SHIPPING_COST = 45000

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart)
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [useInstallment, setUseInstallment] = useState(false)

  const updateQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, Math.min(item.product.stock, item.quantity + delta)) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0
  const shipping = subtotal - discount >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal - discount + shipping

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'PADIDEH10') {
      setCouponApplied(true)
      setCouponError('')
    } else {
      setCouponError('کد تخفیف معتبر نیست')
      setCouponApplied(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">سبد خرید شما خالی است</h2>
            <p className="text-muted-foreground mb-6">محصولات مورد نظر خود را به سبد خرید اضافه کنید</p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link href="/shop">
                مشاهده محصولات
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
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
            <span className="text-foreground font-medium">سبد خرید</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-8">
            <h1 className="text-2xl font-bold text-foreground">سبد خرید</h1>
            <Badge className="bg-primary text-primary-foreground">
              {new Intl.NumberFormat('fa-IR').format(cartItems.reduce((s, i) => s + i.quantity, 0))} محصول
            </Badge>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cartItems.map((item) => {
                return (
                  <div
                    key={item.product.id}
                    className="bg-card border border-border rounded-2xl p-4 md:p-5 flex gap-4 group"
                  >
                    {/* Image */}
                    <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-muted rounded-xl overflow-hidden border border-border">
                    <img src={item.product.thumbnail || '/placeholder.svg'} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">{item.product.brand} · {item.product.model}</p>
                          <Link href={`/products/${item.product.slug}`}>
                            <h3 className="text-sm font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 leading-relaxed">
                              {item.product.name}
                            </h3>
                          </Link>
                          {item.product.warranty && (
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Shield className="w-3 h-3 text-emerald-500" />
                              {item.product.warranty}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                        {/* Quantity */}
                        <div className="flex items-center border border-border rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateQty(item.product.id, -1)}
                            className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold text-foreground">
                            {new Intl.NumberFormat('fa-IR').format(item.quantity)}
                          </span>
                          <button
                            onClick={() => updateQty(item.product.id, 1)}
                            className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors"
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold text-foreground">
                            {new Intl.NumberFormat('fa-IR').format(item.product.price * item.quantity)}
                            <span className="text-xs font-normal text-muted-foreground mr-1">تومان</span>
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground">
                              {new Intl.NumberFormat('fa-IR').format(item.product.price)} × {new Intl.NumberFormat('fa-IR').format(item.quantity)}
                            </p>
                          )}
                          {item.product.hasInstallment && item.product.monthlyPayment && (
                            <p className="text-xs text-primary flex items-center gap-1 mt-1">
                              <Zap className="w-3 h-3" />
                              {new Intl.NumberFormat('fa-IR').format(item.product.monthlyPayment)}/ماه
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Stock Warning */}
                      {item.product.stock <= 5 && (
                        <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          فقط {new Intl.NumberFormat('fa-IR').format(item.product.stock)} عدد موجود است
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Shipping Note */}
              {shipping === 0 ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
                  <Truck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">ارسال رایگان برای این سفارش</p>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
                  <Truck className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    {new Intl.NumberFormat('fa-IR').format(SHIPPING_THRESHOLD - (subtotal - discount))} تومان دیگر خرید کنید تا ارسال رایگان شود
                  </p>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="flex flex-col gap-4">
              {/* Coupon */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  کد تخفیف
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="کد تخفیف..."
                    value={coupon}
                    onChange={(e) => { setCoupon(e.target.value); setCouponError('') }}
                    className="h-9 text-sm ltr text-left"
                    disabled={couponApplied}
                  />
                  <Button
                    size="sm"
                    variant={couponApplied ? 'secondary' : 'default'}
                    className="h-9 flex-shrink-0"
                    onClick={couponApplied ? () => { setCouponApplied(false); setCoupon('') } : applyCoupon}
                  >
                    {couponApplied ? 'حذف' : 'اعمال'}
                  </Button>
                </div>
                {couponError && <p className="text-xs text-destructive mt-1.5">{couponError}</p>}
                {couponApplied && <p className="text-xs text-emerald-600 mt-1.5 font-medium">تخفیف ۱۰٪ اعمال شد</p>}
                <p className="text-xs text-muted-foreground mt-2">کد تستی: PADIDEH10</p>
              </div>

              {/* Installment Option */}
              <div
                className={cn(
                  'bg-card border rounded-2xl p-5 cursor-pointer transition-all',
                  useInstallment ? 'border-primary bg-primary/5' : 'border-border'
                )}
                onClick={() => setUseInstallment(!useInstallment)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', useInstallment ? 'bg-primary' : 'bg-muted')}>
                      <Zap className={cn('w-5 h-5', useInstallment ? 'text-white' : 'text-muted-foreground')} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">خرید اقساطی</p>
                      <p className="text-xs text-muted-foreground">تا ۲۴ ماه بدون بهره</p>
                    </div>
                  </div>
                  <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0', useInstallment ? 'border-primary' : 'border-border')}>
                    {useInstallment && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                </div>
                {useInstallment && (
                  <div className="mt-3 pt-3 border-t border-primary/20 text-xs text-primary space-y-1">
                    <p>پیش‌پرداخت ۲۰٪: {new Intl.NumberFormat('fa-IR').format(Math.ceil(total * 0.2))} تومان</p>
                    <p>قسط ماهانه ۱۲ ماهه: {new Intl.NumberFormat('fa-IR').format(Math.ceil(total * 0.8 * 1.1 / 12))} تومان</p>
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-4">خلاصه سفارش</h3>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">جمع محصولات</span>
                    <span className="font-medium">{new Intl.NumberFormat('fa-IR').format(subtotal)} تومان</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>تخفیف کد</span>
                      <span className="font-medium">- {new Intl.NumberFormat('fa-IR').format(discount)} تومان</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">هزینه ارسال</span>
                    <span className={cn('font-medium', shipping === 0 ? 'text-emerald-600' : '')}>
                      {shipping === 0 ? 'رایگان' : `${new Intl.NumberFormat('fa-IR').format(shipping)} تومان`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-base">
                    <span className="text-foreground">مبلغ قابل پرداخت</span>
                    <span className="text-foreground">{new Intl.NumberFormat('fa-IR').format(total)} تومان</span>
                  </div>
                </div>

                <Button
                  className="w-full mt-5 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
                  asChild
                >
                  <Link href="/checkout">
                    ادامه و پرداخت
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  پرداخت امن با درگاه بانکی معتبر
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Shield, label: 'پرداخت امن' },
                  { icon: Truck, label: 'ارسال سریع' },
                  { icon: Package, label: 'ضمانت اصالت' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 p-3 bg-card border border-border rounded-xl text-center">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
