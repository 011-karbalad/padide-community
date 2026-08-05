'use client'

import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import { TrendingUp, TrendingDown, ShoppingBag, Users, Package, Wrench, Eye, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const monthlyRevenue = [
  { month: 'فروردین', revenue: 12400000, orders: 124, visitors: 4200 },
  { month: 'اردیبهشت', revenue: 18200000, orders: 182, visitors: 5100 },
  { month: 'خرداد', revenue: 15800000, orders: 158, visitors: 4800 },
  { month: 'تیر', revenue: 22400000, orders: 224, visitors: 6300 },
  { month: 'مرداد', revenue: 19600000, orders: 196, visitors: 5900 },
  { month: 'شهریور', revenue: 28100000, orders: 281, visitors: 7800 },
  { month: 'مهر', revenue: 24500000, orders: 245, visitors: 6700 },
  { month: 'آبان', revenue: 31200000, orders: 312, visitors: 8900 },
  { month: 'آذر', revenue: 27800000, orders: 278, visitors: 7600 },
  { month: 'دی', revenue: 35600000, orders: 356, visitors: 9400 },
  { month: 'بهمن', revenue: 29400000, orders: 294, visitors: 8100 },
  { month: 'اسفند', revenue: 42100000, orders: 421, visitors: 11200 },
]

const categoryData = [
  { name: 'LCD/OLED', value: 35, color: '#1565C0' },
  { name: 'باتری', value: 22, color: '#0D47A1' },
  { name: 'تجهیزات', value: 18, color: '#1976D2' },
  { name: 'Face ID', value: 12, color: '#42A5F5' },
  { name: 'سایر', value: 13, color: '#90CAF9' },
]

const topProducts = [
  { name: 'LCD آیفون ۱۴ پرو', sales: 124, revenue: 105400000, trend: 12 },
  { name: 'باتری آیفون ۱۵', sales: 98, revenue: 12250000, trend: 8 },
  { name: 'LCD سامسونگ S23 Ultra', sales: 87, revenue: 112350000, trend: -3 },
  { name: 'میکروسکوپ ترینوکولار', sales: 42, revenue: 75600000, trend: 15 },
  { name: 'باتری سامسونگ A54', sales: 156, revenue: 23400000, trend: 22 },
]

const statCards = [
  { label: 'کل فروش', value: '۳۰۷,۱۰۰,۰۰۰', unit: 'تومان', change: 18.4, icon: ShoppingBag, color: 'text-blue-600' },
  { label: 'سفارش‌ها', value: '۲,۸۷۱', unit: 'سفارش', change: 12.1, icon: Package, color: 'text-emerald-600' },
  { label: 'بازدیدکنندگان', value: '۸۵,۹۰۰', unit: 'نفر', change: 9.7, icon: Eye, color: 'text-purple-600' },
  { label: 'مشتریان جدید', value: '۱,۲۴۸', unit: 'نفر', change: -2.3, icon: Users, color: 'text-amber-600' },
]

function formatPrice(n: number) {
  return new Intl.NumberFormat('fa-IR').format(n)
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">آمار و گزارش</h1>
        <p className="text-sm text-muted-foreground mt-1">نمای کامل عملکرد فروشگاه</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon
          const isUp = s.change >= 0
          return (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={cn('w-10 h-10 rounded-xl bg-muted flex items-center justify-center', s.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={cn('flex items-center gap-0.5 text-xs font-semibold', isUp ? 'text-emerald-600' : 'text-red-500')}>
                  {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {Math.abs(s.change)}٪
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label} · {s.unit}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" dir="rtl">
        <TabsList className="mb-4">
          <TabsTrigger value="revenue">درآمد</TabsTrigger>
          <TabsTrigger value="orders">سفارش‌ها</TabsTrigger>
          <TabsTrigger value="visitors">بازدید</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">درآمد ماهانه (تومان)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1565C0" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1565C0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [`${formatPrice(v)} تومان`, 'درآمد']} />
                <Area type="monotone" dataKey="revenue" stroke="#1565C0" strokeWidth={2} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">تعداد سفارش‌ها</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [v, 'سفارش']} />
                <Bar dataKey="orders" fill="#1565C0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="visitors">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">بازدیدکنندگان ماهانه</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [v, 'بازدید']} />
                <Line type="monotone" dataKey="visitors" stroke="#1976D2" strokeWidth={2} dot={{ r: 4, fill: '#1976D2' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category Pie */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">سهم دسته‌بندی‌ها از فروش</h2>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}٪`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {categoryData.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                    <span className="text-foreground">{c.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{c.value}٪</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">محصولات پرفروش</h2>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-muted text-muted-foreground text-xs flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sales} فروش · {formatPrice(p.revenue)} تومان</p>
                </div>
                <span className={cn('flex items-center gap-0.5 text-xs font-semibold flex-shrink-0', p.trend >= 0 ? 'text-emerald-600' : 'text-red-500')}>
                  <ArrowUpRight className={cn('w-3.5 h-3.5', p.trend < 0 && 'rotate-90')} />
                  {Math.abs(p.trend)}٪
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
