'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, Package, Truck, Clock, ChevronLeft } from 'lucide-react'
import { fetchWCOrder } from '@/lib/wordpress-api'
import { Skeleton } from '@/components/ui/skeleton'

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const result = await fetchWCOrder(parseInt(params.orderId))
        setOrder(result)
        console.log('[padide] Order loaded:', result)
      } catch (error) {
        console.error('[padide] Error loading order:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.orderId) {
      loadOrder()
    }
  }, [params.orderId])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-16 w-full">
          <Skeleton className="w-full h-96" />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/40 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">سفارش شما با موفقیت ثبت شد!</h1>
            <p className="text-lg text-muted-foreground mb-6">شماره سفارش: <span className="font-mono font-bold text-primary">{order?.number || params.orderId}</span></p>
            <p className="text-muted-foreground max-w-md mx-auto">
              ایمیل تأیید به نشانی ثبت شده ارسال خواهد شد. می‌توانید از طریق لینک زیر وضعیت سفارش را پیگیری کنید.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Timeline */}
              <Card className="p-6">
                <h2 className="font-semibold text-lg mb-6">وضعیت سفارش</h2>
                <div className="space-y-4">
                  {[
                    { icon: Package, label: 'سفارش ثبت شد', status: 'تایید شده' },
                    { icon: Clock, label: 'در حال بسته‌بندی', status: 'درحال انجام' },
                    { icon: Truck, label: 'آماده ارسال', status: 'انتظار' },
                    { icon: Truck, label: 'تحویل شده', status: 'انتظار' },
                  ].map((step, i) => {
                    const Icon = step.icon
                    const isDone = step.status === 'تایید شده'
                    const isActive = step.status === 'درحال انجام'
                    return (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                            isDone ? 'bg-emerald-500 text-white' :
                            isActive ? 'bg-primary text-primary-foreground' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {i < 3 && (
                            <div className={`w-0.5 h-12 ${
                              isDone ? 'bg-emerald-500' : 'bg-border'
                            }`} />
                          )}
                        </div>
                        <div className="pt-1">
                          <p className={`font-medium ${
                            isDone ? 'text-emerald-600' :
                            isActive ? 'text-primary' :
                            'text-muted-foreground'
                          }`}>
                            {step.label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {isDone ? 'تایید شده' : isActive ? 'درحال انجام' : 'انتظار'}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* Order Items */}
              {order?.line_items && (
                <Card className="p-6">
                  <h2 className="font-semibold text-lg mb-4">محصولات سفارش</h2>
                  <div className="space-y-3">
                    {order.line_items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">تعداد: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">{new Intl.NumberFormat('fa-IR').format(parseFloat(item.total))}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Billing & Shipping */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">آدرس بیلینگ</h3>
                  {order?.billing && (
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>{order.billing.first_name} {order.billing.last_name}</p>
                      <p>{order.billing.address_1}</p>
                      <p>{order.billing.city}, {order.billing.state}</p>
                      <p>{order.billing.postcode}</p>
                      <p className="pt-2">{order.billing.phone}</p>
                      <p>{order.billing.email}</p>
                    </div>
                  )}
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">آدرس ارسال</h3>
                  {order?.shipping && (
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>{order.shipping.first_name} {order.shipping.last_name}</p>
                      <p>{order.shipping.address_1}</p>
                      <p>{order.shipping.city}, {order.shipping.state}</p>
                      <p>{order.shipping.postcode}</p>
                    </div>
                  )}
                </Card>
              </div>
            </div>

            {/* Summary */}
            <div>
              <Card className="p-6 sticky top-24">
                <h2 className="font-semibold text-lg mb-6">خلاصه سفارش</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">جمع محصولات</span>
                    <span>{new Intl.NumberFormat('fa-IR').format(order?.subtotal ? parseFloat(order.subtotal) : 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">هزینه ارسال</span>
                    <span>{new Intl.NumberFormat('fa-IR').format(order?.shipping_total ? parseFloat(order.shipping_total) : 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">مالیات</span>
                    <span>{new Intl.NumberFormat('fa-IR').format(order?.total_tax ? parseFloat(order.total_tax) : 0)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>مجموع</span>
                  <span className="text-primary">{new Intl.NumberFormat('fa-IR').format(order?.total ? parseFloat(order.total) : 0)}</span>
                </div>

                <div className="space-y-2 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground">شماره سفارش: <span className="font-mono font-bold">{order?.number}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground">تاریخ: {order?.date_created ? new Date(order.date_created).toLocaleDateString('fa-IR') : '-'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground capitalize">وضعیت: {order?.status || '-'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" asChild>
                    <Link href="/shop">ادامه خرید</Link>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/">بازگشت به خانه</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
