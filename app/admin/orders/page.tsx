'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Download, Eye, Edit, Truck } from 'lucide-react'
import { mockOrders, formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'

const allOrders = [
  ...mockOrders,
  {
    id: '3', orderNumber: 'PAD-1234569', date: '۱۴۰۳/۰۴/۱۹', status: 'shipped' as const,
    items: [{ product: { ...mockOrders[0].items[0].product, id: '99' }, quantity: 1 }],
    total: 4800000, paymentMethod: 'online', address: mockOrders[0].address, trackingCode: 'IR98765432101',
  },
  {
    id: '4', orderNumber: 'PAD-1234570', date: '۱۴۰۳/۰۴/۱۸', status: 'delivered' as const,
    items: [{ product: mockOrders[1].items[0].product, quantity: 3 }],
    total: 3750000, paymentMethod: 'installment', address: mockOrders[0].address,
  },
  {
    id: '5', orderNumber: 'PAD-1234571', date: '۱۴۰۳/۰۴/۱۷', status: 'cancelled' as const,
    items: [{ product: mockOrders[0].items[0].product, quantity: 1 }],
    total: 8500000, paymentMethod: 'online', address: mockOrders[0].address,
  },
]

const statusConfig = {
  pending: { label: 'در انتظار', className: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' },
  processing: { label: 'پردازش', className: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400' },
  shipped: { label: 'ارسال شده', className: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400' },
  delivered: { label: 'تحویل شد', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' },
  cancelled: { label: 'لغو شد', className: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' },
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = allOrders.filter((o) => {
    if (search && !o.orderNumber.includes(search)) return false
    if (statusFilter !== 'all' && o.status !== statusFilter) return false
    return true
  })

  const totals = {
    all: allOrders.length,
    pending: allOrders.filter((o) => o.status === 'pending').length,
    processing: allOrders.filter((o) => o.status === 'processing').length,
    shipped: allOrders.filter((o) => o.status === 'shipped').length,
    delivered: allOrders.filter((o) => o.status === 'delivered').length,
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">مدیریت سفارش‌ها</h1>
          <p className="text-sm text-muted-foreground mt-1">{new Intl.NumberFormat('fa-IR').format(allOrders.length)} سفارش</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 h-9">
          <Download className="w-4 h-4" />
          خروجی Excel
        </Button>
      </div>

      {/* Status Filter Pills */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'all', label: 'همه', count: totals.all },
          { value: 'pending', label: 'در انتظار', count: totals.pending },
          { value: 'processing', label: 'پردازش', count: totals.processing },
          { value: 'shipped', label: 'ارسال شده', count: totals.shipped },
          { value: 'delivered', label: 'تحویل شده', count: totals.delivered },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setStatusFilter(item.value)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all',
              statusFilter === item.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary/40'
            )}
          >
            {item.label}
            <span className={cn('rounded-full w-5 h-5 flex items-center justify-center text-[10px]', statusFilter === item.value ? 'bg-white/20' : 'bg-muted')}>
              {item.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-64">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="جستجوی شماره سفارش..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-9 h-9 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_100px] gap-4 px-4 py-3 border-b border-border bg-surface/40 text-xs font-semibold text-muted-foreground">
          <span>شماره سفارش</span>
          <span>مشتری</span>
          <span>تاریخ</span>
          <span>مبلغ</span>
          <span>وضعیت</span>
          <span>عملیات</span>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((order) => {
            const status = statusConfig[order.status]
            return (
              <div key={order.id} className="grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_100px] gap-3 md:gap-4 px-4 py-4 items-center hover:bg-surface/40 transition-colors">
                <div>
                  <p className="text-sm font-mono font-bold text-foreground ltr">{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">{order.items.length} محصول</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{order.address.fullName}</p>
                  <p className="text-xs text-muted-foreground ltr">{order.address.phone}</p>
                </div>
                <p className="text-sm text-muted-foreground">{order.date}</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{formatPrice(order.total)}</p>
                  <p className="text-xs text-muted-foreground">{order.paymentMethod === 'installment' ? 'اقساطی' : 'آنلاین'}</p>
                </div>
                <Badge className={cn('text-xs border-0 w-fit', status?.className)}>
                  {status?.label}
                </Badge>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-purple-600 transition-colors">
                    <Truck className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
