'use client'

import { useState } from 'react'
import { Search, UserCheck, UserX, ShoppingBag, TrendingUp, Mail, Phone } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const customers = [
  { id: 'C001', name: 'علی رضایی', email: 'ali.rezaei@email.com', phone: '09121234567', orders: 12, totalSpend: 28500000, status: 'active', joined: '۱۴۰۲/۰۱/۱۵', lastOrder: '۱۴۰۳/۰۴/۲۰' },
  { id: 'C002', name: 'مریم احمدی', email: 'maryam.a@email.com', phone: '09351234567', orders: 8, totalSpend: 14200000, status: 'active', joined: '۱۴۰۲/۰۳/۲۲', lastOrder: '۱۴۰۳/۰۴/۱۸' },
  { id: 'C003', name: 'حسین کریمی', email: 'h.karimi@email.com', phone: '09121234568', orders: 24, totalSpend: 87400000, status: 'vip', joined: '۱۴۰۱/۰۸/۱۰', lastOrder: '۱۴۰۳/۰۴/۲۱' },
  { id: 'C004', name: 'سارا موسوی', email: 'sara.m@email.com', phone: '09381234567', orders: 3, totalSpend: 4800000, status: 'active', joined: '۱۴۰۳/۰۲/۰۵', lastOrder: '۱۴۰۳/۰۳/۲۸' },
  { id: 'C005', name: 'رضا تهرانی', email: 'reza.t@email.com', phone: '09121234569', orders: 0, totalSpend: 0, status: 'inactive', joined: '۱۴۰۳/۰۱/۱۲', lastOrder: '-' },
  { id: 'C006', name: 'فاطمه نوری', email: 'f.nouri@email.com', phone: '09121234570', orders: 17, totalSpend: 52100000, status: 'vip', joined: '۱۴۰۲/۰۶/۰۸', lastOrder: '۱۴۰۳/۰۴/۱۵' },
  { id: 'C007', name: 'امیر صادقی', email: 'amir.s@email.com', phone: '09121234571', orders: 6, totalSpend: 9300000, status: 'active', joined: '۱۴۰۲/۱۱/۲۰', lastOrder: '۱۴۰۳/۰۳/۱۰' },
  { id: 'C008', name: 'نگار حسینی', email: 'negar.h@email.com', phone: '09121234572', orders: 1, totalSpend: 1200000, status: 'active', joined: '۱۴۰۳/۰۴/۰۱', lastOrder: '۱۴۰۳/۰۴/۰۱' },
]

const statusConfig = {
  active: { label: 'فعال', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' },
  vip: { label: 'VIP', className: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' },
  inactive: { label: 'غیرفعال', className: 'bg-muted text-muted-foreground' },
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('fa-IR').format(n)
}

export default function CustomersPage() {
  const [search, setSearch] = useState('')

  const filtered = customers.filter(
    (c) =>
      c.name.includes(search) ||
      c.email.includes(search) ||
      c.phone.includes(search)
  )

  const totalCustomers = customers.length
  const vipCount = customers.filter((c) => c.status === 'vip').length
  const activeCount = customers.filter((c) => c.status === 'active').length
  const totalRevenue = customers.reduce((a, c) => a + c.totalSpend, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">مشتریان</h1>
        <p className="text-sm text-muted-foreground mt-1">مدیریت و پروفایل مشتریان</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'کل مشتریان', value: totalCustomers, icon: ShoppingBag, color: 'text-blue-600' },
          { label: 'مشتریان فعال', value: activeCount, icon: UserCheck, color: 'text-emerald-600' },
          { label: 'مشتریان VIP', value: vipCount, icon: TrendingUp, color: 'text-amber-600' },
          { label: 'غیرفعال', value: customers.filter((c) => c.status === 'inactive').length, icon: UserX, color: 'text-red-500' },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
              <div className={cn('w-9 h-9 rounded-xl bg-muted flex items-center justify-center mb-2', s.color)}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="جستجو مشتری..." className="pr-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">مشتری</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">تماس</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">سفارش‌ها</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">کل خرید</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">وضعیت</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden xl:table-cell">آخرین سفارش</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const initials = c.name.split(' ').map((w) => w[0]).join('').slice(0, 2)
                return (
                  <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9 flex-shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{c.name}</p>
                          <p className="text-xs text-muted-foreground">عضویت: {c.joined}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          <span dir="ltr">{c.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          <span>{c.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="font-semibold text-foreground">{c.orders}</span>
                      <span className="text-muted-foreground text-xs mr-1">سفارش</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="font-medium text-foreground">{formatPrice(c.totalSpend)}</span>
                      <span className="text-muted-foreground text-xs mr-1">تومان</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={cn('text-xs', statusConfig[c.status as keyof typeof statusConfig].className)}>
                        {statusConfig[c.status as keyof typeof statusConfig].label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden xl:table-cell">{c.lastOrder}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <p className="text-sm font-semibold text-foreground mb-1">کل درآمد از همه مشتریان</p>
        <p className="text-3xl font-bold text-primary">{formatPrice(totalRevenue)} <span className="text-base font-medium text-muted-foreground">تومان</span></p>
      </div>
    </div>
  )
}
