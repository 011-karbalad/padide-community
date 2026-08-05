'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Package, Truck, CheckCircle, Clock, X, ChevronDown,
  MapPin, CreditCard, Copy, ExternalLink
} from 'lucide-react'
import { mockOrders, formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'

const statusConfig = {
  pending: { label: 'در انتظار تأیید', icon: Clock, className: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' },
  processing: { label: 'در حال پردازش', icon: Package, className: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400' },
  shipped: { label: 'ارسال شده', icon: Truck, className: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400' },
  delivered: { label: 'تحویل داده شده', icon: CheckCircle, className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' },
  cancelled: { label: 'لغو شده', icon: X, className: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' },
}

type OrderStatus = keyof typeof statusConfig

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id)
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">سفارش‌های من</h1>
        <p className="text-sm text-muted-foreground mt-1">تاریخچه و جزئیات سفارش‌های شما</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="bg-card border border-border h-auto p-1 gap-1 flex-wrap">
          <TabsTrigger value="all" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">همه</TabsTrigger>
          <TabsTrigger value="processing" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">در پردازش</TabsTrigger>
          <TabsTrigger value="shipped" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">ارسال شده</TabsTrigger>
          <TabsTrigger value="delivered" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">تحویل شده</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 flex flex-col gap-4">
          {mockOrders.map((order) => {
            const status = statusConfig[order.status as OrderStatus]
            const StatusIcon = status?.icon || Clock
            const isExpanded = expandedOrder === order.id

            return (
              <div key={order.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                {/* Order Header */}
                <div
                  className="flex items-center gap-3 p-4 cursor-pointer hover:bg-surface/50 transition-colors"
                  onClick={() => toggleExpand(order.id)}
                >
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', status?.className)}>
                    <StatusIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-mono font-bold text-foreground ltr">{order.orderNumber}</span>
                      <Badge className={cn('text-xs border-0', status?.className)}>
                        {status?.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {order.date} · {order.items.length} محصول
                    </p>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <p className="text-sm font-bold text-foreground">{formatPrice(order.total)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {order.paymentMethod === 'installment' ? 'اقساطی' : 'آنلاین'}
                    </p>
                  </div>
                  <ChevronDown className={cn('w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform', isExpanded && 'rotate-180')} />
                </div>

                {/* Order Details */}
                {isExpanded && (
                  <div className="border-t border-border">
                    {/* Items */}
                    <div className="p-4 flex flex-col gap-3">
                      {order.items.map((item, i) => {
                        return (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-muted rounded-xl overflow-hidden flex-shrink-0 border border-border">
                              <img src={item.product.thumbnail || '/placeholder.svg'} alt={item.product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground line-clamp-1">{item.product.name}</p>
                              <p className="text-xs text-muted-foreground">× {new Intl.NumberFormat('fa-IR').format(item.quantity)}</p>
                            </div>
                            <p className="text-sm font-semibold text-foreground flex-shrink-0">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                          </div>
                        )
                      })}
                    </div>

                    <Separator />

                    {/* Info Row */}
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {order.trackingCode && (
                        <div className="flex items-start gap-2">
                          <Truck className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">کد رهگیری</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-sm font-mono font-medium text-foreground ltr">{order.trackingCode}</span>
                              <button className="text-muted-foreground hover:text-foreground">
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">آدرس تحویل</p>
                          <p className="text-sm text-foreground mt-0.5 line-clamp-1">{order.address.city}، {order.address.street}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">روش پرداخت</p>
                          <p className="text-sm text-foreground mt-0.5">
                            {order.paymentMethod === 'installment' ? 'خرید اقساطی' : 'پرداخت آنلاین'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-4 pb-4 flex gap-2 flex-wrap">
                      <Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs">
                        <ExternalLink className="w-3.5 h-3.5" />
                        مشاهده فاکتور
                      </Button>
                      {order.status === 'delivered' && (
                        <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground gap-1.5">
                          ثبت نظر
                        </Button>
                      )}
                      {(order.status === 'pending' || order.status === 'processing') && (
                        <Button size="sm" variant="outline" className="h-8 text-xs text-destructive border-destructive/30 hover:bg-destructive/5 gap-1.5">
                          لغو سفارش
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </TabsContent>

        {/* Other tabs show same content for demo */}
        {(['processing', 'shipped', 'delivered'] as const).map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <div className="text-center py-12 text-muted-foreground">
              {mockOrders.some((o) => o.status === tab) ? (
                <p className="text-sm">سفارشی با این وضعیت وجود ندارد</p>
              ) : (
                <p className="text-sm">سفارشی با این وضعیت وجود ندارد</p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
