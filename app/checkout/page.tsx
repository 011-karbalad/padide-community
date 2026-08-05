'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Loader2 } from 'lucide-react'
import {
  MapPin, Truck, CreditCard, CheckCircle2, ChevronLeft,
  Check, Zap, Building2, Banknote, Shield, Clock, Package
} from 'lucide-react'
import { useWCCart } from '@/hooks/use-wc-cart'
import { cn } from '@/lib/utils'

const shippingMethods = [
  { id: 'post', label: 'پست معمولی', desc: '۳ تا ۵ روز کاری', price: 45000, icon: Package },
  { id: 'express', label: 'ارسال سریع', desc: '۲۴ ساعت کاری', price: 95000, icon: Truck },
  { id: 'free', label: 'ارسال رایگان', desc: '۵ تا ۷ روز کاری', price: 0, icon: Clock },
]

const steps = [
  { id: 1, label: 'آدرس', icon: MapPin },
  { id: 2, label: 'ارسال', icon: Truck },
  { id: 3, label: 'پرداخت', icon: CreditCard },
  { id: 4, label: 'تأیید', icon: CheckCircle2 },
]

export default function CheckoutPage() {
  const router = useRouter()
  const cart = useWCCart()
  
  const [step, setStep] = useState(1)
  const [shippingMethod, setShippingMethod] = useState('express')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    province: 'تهران',
    city: 'تهران',
    address: '',
    postalCode: '',
    email: '',
    paymentMethod: 'bank_transfer',
  })

  const selectedShipping = shippingMethods.find((m) => m.id === shippingMethod)!
  const total = cart.total + selectedShipping.price

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep((s) => Math.min(4, s + 1))
  const prevStep = () => setStep((s) => Math.max(1, s - 1))

  const handleCheckout = async () => {
    const result = await cart.checkout({
      ...form,
      paymentMethod: form.paymentMethod,
    })

    if (result.success) {
      router.push(`/order-confirmation/${result.orderId}`)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">سبد خرید خالی است</h1>
            <p className="text-muted-foreground mb-8">لطفا ابتدا محصول را به سبد خرید اضافه کنید</p>
            <Button asChild>
              <Link href="/shop">برگشت به فروشگاه</Link>
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
            <Link href="/shop" className="text-muted-foreground hover:text-foreground">فروشگاه</Link>
            <ChevronLeft className="w-3 h-3 text-muted-foreground" />
            <span className="text-foreground font-medium">تسویه حساب</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-10">
            {steps.map((s, i) => {
              const Icon = s.icon
              const isActive = step === s.id
              const isDone = step > s.id
              return (
                <div key={s.id} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all',
                      isDone ? 'bg-emerald-500 border-emerald-500 text-white' :
                      isActive ? 'bg-primary border-primary text-primary-foreground' :
                      'bg-background border-border text-muted-foreground'
                    )}>
                      {isDone ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className={cn(
                      'text-xs font-medium',
                      isActive ? 'text-primary' : isDone ? 'text-emerald-600' : 'text-muted-foreground'
                    )}>
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={cn('h-0.5 w-16 md:w-24 mx-2 mb-5 transition-colors', step > s.id ? 'bg-emerald-500' : 'bg-border')} />
                  )}
                </div>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">

              {/* Step 1: Address */}
              {step === 1 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    آدرس تحویل
                  </h2>

                  {/* Saved Address */}
                  <div className="flex items-start gap-3 p-4 border-2 border-primary bg-primary/5 rounded-xl mb-6">
                    <div className="w-5 h-5 rounded-full border-2 border-primary mt-0.5 flex items-center justify-center flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">منزل</p>
                      <p className="text-xs text-muted-foreground mt-1">{form.fullName} · {form.phone}</p>
                      <p className="text-xs text-muted-foreground">{form.province}، {form.city}، {form.street}</p>
                      <p className="text-xs text-muted-foreground">کد پستی: {form.postalCode}</p>
                    </div>
                    <Badge className="mr-auto bg-primary text-primary-foreground text-xs">پیش‌فرض</Badge>
                  </div>

                  <Separator className="my-4" />
                  <p className="text-sm font-semibold text-foreground mb-4">آدرس جدید</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-foreground mb-1.5 block">نام</Label>
                      <Input
                        id="firstName"
                        placeholder="نام شما"
                        value={form.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="h-10 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-foreground mb-1.5 block">نام خانوادگی</Label>
                      <Input
                        id="lastName"
                        placeholder="نام خانوادگی"
                        value={form.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="h-10 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-foreground mb-1.5 block">ایمیل</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-10 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-foreground mb-1.5 block">تلفن</Label>
                      <Input
                        id="phone"
                        placeholder="09xxxxxxxxx"
                        value={form.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="h-10 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="province" className="text-sm font-medium text-foreground mb-1.5 block">استان</Label>
                      <Input
                        id="province"
                        placeholder="استان"
                        value={form.province}
                        onChange={(e) => handleInputChange('province', e.target.value)}
                        className="h-10 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium text-foreground mb-1.5 block">شهر</Label>
                      <Input
                        id="city"
                        placeholder="شهر"
                        value={form.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="h-10 text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address" className="text-sm font-medium text-foreground mb-1.5 block">آدرس کامل</Label>
                      <Input
                        id="address"
                        placeholder="آدرس کامل"
                        value={form.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="h-10 text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="postalCode" className="text-sm font-medium text-foreground mb-1.5 block">کد پستی</Label>
                      <Input
                        id="postalCode"
                        placeholder="کد پستی"
                        value={form.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className="h-10 text-sm ltr text-left"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button className="bg-primary text-primary-foreground h-11 px-8 gap-2" onClick={nextStep}>
                      ادامه - روش ارسال
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping */}
              {step === 2 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    روش ارسال
                  </h2>
                  <div className="flex flex-col gap-3">
                    {shippingMethods.map((method) => {
                      const Icon = method.icon
                      const isSelected = shippingMethod === method.id
                      return (
                        <div
                          key={method.id}
                          onClick={() => setShippingMethod(method.id)}
                          className={cn(
                            'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                            isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                          )}
                        >
                          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', isSelected ? 'bg-primary' : 'bg-muted')}>
                            <Icon className={cn('w-5 h-5', isSelected ? 'text-white' : 'text-muted-foreground')} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">{method.label}</p>
                            <p className="text-xs text-muted-foreground">{method.desc}</p>
                          </div>
                          <div className="text-left">
                            <p className={cn('text-sm font-bold', method.price === 0 ? 'text-emerald-600' : 'text-foreground')}>
                              {method.price === 0 ? 'رایگان' : `${new Intl.NumberFormat('fa-IR').format(method.price)} تومان`}
                            </p>
                          </div>
                          <div className={cn('w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center', isSelected ? 'border-primary' : 'border-border')}>
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" className="h-11 gap-2" onClick={prevStep}>
                      بازگشت
                    </Button>
                    <Button className="bg-primary text-primary-foreground h-11 px-8 gap-2" onClick={nextStep}>
                      ادامه - پرداخت
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    روش پرداخت
                  </h2>
                  <div className="flex flex-col gap-3 mb-6">
                    <div
                      onClick={() => handleInputChange('paymentMethod', 'bank_transfer')}
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                        form.paymentMethod === 'bank_transfer' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                      )}
                    >
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', form.paymentMethod === 'bank_transfer' ? 'bg-primary' : 'bg-muted')}>
                        <CreditCard className={cn('w-5 h-5', form.paymentMethod === 'bank_transfer' ? 'text-white' : 'text-muted-foreground')} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">درگاه بانکی</p>
                        <p className="text-xs text-muted-foreground">پرداخت آنلاین و امن</p>
                      </div>
                      <div className={cn('w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center', form.paymentMethod === 'bank_transfer' ? 'border-primary' : 'border-border')}>
                        {form.paymentMethod === 'bank_transfer' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                    </div>

                    <div
                      onClick={() => handleInputChange('paymentMethod', 'cod')}
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                        form.paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                      )}
                    >
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', form.paymentMethod === 'cod' ? 'bg-primary' : 'bg-muted')}>
                        <Banknote className={cn('w-5 h-5', form.paymentMethod === 'cod' ? 'text-white' : 'text-muted-foreground')} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">پرداخت در محل</p>
                        <p className="text-xs text-muted-foreground">پرداخت هنگام دریافت</p>
                      </div>
                      <div className={cn('w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center', form.paymentMethod === 'cod' ? 'border-primary' : 'border-border')}>
                        {form.paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" className="h-11 gap-2" onClick={prevStep}>
                      بازگشت
                    </Button>
                    <Button className="bg-primary text-primary-foreground h-11 px-8 gap-2" onClick={nextStep}>
                      تأیید سفارش
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    تأیید نهایی سفارش
                  </h2>
                  <Separator className="mb-6" />

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">اطلاعات تحویل:</p>
                      <div className="bg-surface p-3 rounded-lg text-sm">
                        <p className="font-medium">{form.firstName} {form.lastName}</p>
                        <p className="text-muted-foreground text-xs mt-1">{form.phone} - {form.email}</p>
                        <p className="text-muted-foreground text-xs">{form.province}، {form.city}</p>
                        <p className="text-muted-foreground text-xs">{form.address}</p>
                        <p className="text-muted-foreground text-xs">کد پستی: {form.postalCode}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">روش پرداخت:</p>
                      <div className="bg-surface p-3 rounded-lg text-sm font-medium">
                        {form.paymentMethod === 'bank_transfer' ? 'درگاه بانکی' : 'پرداخت در محل'}
                      </div>
                    </div>
                  </div>

                  {cart.error && (
                    <div className="flex gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive mb-4">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {cart.error}
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button variant="outline" className="h-11 gap-2" onClick={prevStep} disabled={cart.isLoading}>
                      بازگشت
                    </Button>
                    <Button 
                      className="bg-primary text-primary-foreground h-11 px-8 gap-2" 
                      onClick={handleCheckout}
                      disabled={cart.isLoading}
                    >
                      {cart.isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          درحال پردازش...
                        </>
                      ) : (
                        <>
                          تأیید و ثبت سفارش
                          <ChevronLeft className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">خلاصه سفارش</h3>
                <div className="flex flex-col gap-2 mb-4 max-h-64 overflow-y-auto">
                  {cart.items.map((item) => {
                    return (
                      <div key={item.product.id} className="flex gap-2 text-sm">
                        <span className="text-muted-foreground">{item.product.name}</span>
                        <span className="text-muted-foreground">×{item.quantity}</span>
                        <span className="font-medium mr-auto">{new Intl.NumberFormat('fa-IR').format(item.product.price * item.quantity)}</span>
                      </div>
                    )
                  })}
                </div>
                <Separator className="my-3" />
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">جمع محصولات</span>
                    <span>{new Intl.NumberFormat('fa-IR').format(cart.subtotal)} تومان</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">هزینه ارسال</span>
                    <span className={selectedShipping.price === 0 ? 'text-emerald-600' : ''}>
                      {selectedShipping.price === 0 ? 'رایگان' : `${new Intl.NumberFormat('fa-IR').format(selectedShipping.price)} تومان`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">مالیات (9%)</span>
                    <span>{new Intl.NumberFormat('fa-IR').format(cart.tax)} تومان</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span className="text-foreground">جمع کل</span>
                    <span className="text-foreground">{new Intl.NumberFormat('fa-IR').format(total)} تومان</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                  <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">پرداخت امن با رمزنگاری SSL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
