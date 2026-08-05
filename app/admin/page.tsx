'use client'

import Link from 'next/link'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  TrendingUp, TrendingDown, ShoppingBag, Users, Package,
  Wrench, DollarSign, ArrowLeft, Clock, CheckCircle, Truck, AlertTriangle
} from 'lucide-react'
import { products, mockOrders } from '@/lib/data'
import { cn } from '@/lib/utils'

const revenueData = [
  { month: 'فروردین', revenue: 12400000, orders: 124 },
  { month: 'اردیبهشت', revenue: 18200000, orders: 182 },
  { month: 'خرداد', revenue: 15800000, orders: 158 },
  { month: 'تیر', revenue: 22400000, orders: 224 },
  { month: 'مرداد', revenue: 19600000, orders: 196 },
  { month: 'شهریور', revenue: 28100000, orders: 281 },
]

const categoryRevenue = [
  { name: 'LCD/OLED', value: 35, color: '#1565C0' },
  { name: 'باتری', value: 22, color: '#0D47A1' },
  { name: 'تجهیزات', value: 18, color: '#1976D2' },
  { name: 'Face ID', value: 12, color: '#42A5F5' },
  { name: 'سایر', value: 13, color: '#90CAF9' },
]

const recentOrders = [
  { id: 'PAD-7234891', customer: 'علی رضایی', total: 8500000, status: 'processing', date: '۱۴۰۳/۰۴/۲۱' },
  { id: 'PAD-7234892', customer: 'مریم احمدی', total: 2500000, status: 'shipped', date: '۱۴۰۳/۰۴/۲۱' },
  { id: 'PAD-7234893', customer: 'حسین کریمی', total: 12500000, status: 'pending', date: '۱۴۰۳/۰۴/۲۰' },
  { id: 'PAD-7234894', customer: 'سارا موسوی', total: 890000, status: 'delivered', date: '۱۴۰۳/۰۴/۲۰' },
  { id: 'PAD-7234895', customer: 'رضا تهرانی', total: 18500000, status: 'processing', date: '۱۴۰۳/۰۴/۱۹' },
]

const orderStatusConfig = {
  pending: { label: 'در انتظار', className: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' },
  processing: { label: 'پردازش', className: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400' },
  shipped: { label: 'ارسال شده', className: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400' },
  delivered: { label: 'تحویل شد', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' },
  cancelled: { label: 'لغو شد', className: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' },
}

const kpiCards = [
  {
    label: 'درآمد امروز',
    value: '۱۲,۸۰۰,۰۰۰',
    unit: 'تومان',
    change: '+۱۸٪',
    positive: true,
    icon: DollarSign,
    color: 'text-primary bg-primary/10',
  },
  {
    label: 'سفارش‌های امروز',
    value: '۴۷',
    unit: 'سفارش',
    change: '+۱۲٪',
    positive: true,
    icon: ShoppingBag,
    color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/30',
  },
  {
    label: 'مشتریان جدید',
    value: '۱۳',
    unit: 'نفر',
    change: '-۳٪',
    positive: false,
    icon: Users,
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-950/30',
  },
  {
    label: 'تعمیرات فعال',
    value: '۸',
    unit: 'سفارش',
    change: '+۲',
    positive: true,
    icon: Wrench,
    color: 'text-amber-600 bg-amber-100 dark:bg-amber-950/30',
  },
]

function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-3 shadow-lg text-sm">
        <p className="font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-muted-foreground">
            {entry.name}: <span className="font-semibold text-foreground">{new Intl.NumberFormat('fa-IR').format(entry.value)}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">داشبورد مدیریت</h1>
          <p className="text-sm text-muted-foreground mt-1">خلاصه عملکرد فروشگاه پدیده</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-0 text-xs gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            آنلاین
          </Badge>
          <p className="text-sm text-muted-foreground hidden sm:block">شنبه ۲۱ تیر ۱۴۰۳</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', card.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={cn('text-xs font-semibold flex items-center gap-0.5', card.positive ? 'text-emerald-600' : 'text-destructive')}>
                  {card.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-black text-foreground ltr">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{card.unit} · {card.label}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-foreground">درآمد ماهانه</h2>
            <Button variant="ghost" size="sm" className="text-primary text-xs h-7 gap-1" asChild>
              <Link href="/admin/analytics">جزئیات <ArrowLeft className="w-3 h-3" /></Link>
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1565C0" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1565C0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.06} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'currentColor', fillOpacity: 0.5 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'currentColor', fillOpacity: 0.5 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="درآمد (تومان)" stroke="#1565C0" strokeWidth={2} fill="url(#revenueGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold text-foreground mb-5">سهم دسته‌بندی‌ها</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={categoryRevenue}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryRevenue.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}٪`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-3">
            {categoryRevenue.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-semibold text-foreground">{item.value}٪</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground">آخرین سفارش‌ها</h2>
            <Button variant="ghost" size="sm" className="text-primary text-xs h-7 gap-1" asChild>
              <Link href="/admin/orders">همه <ArrowLeft className="w-3 h-3" /></Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {recentOrders.map((order) => {
              const status = orderStatusConfig[order.status as keyof typeof orderStatusConfig]
              return (
                <div key={order.id} className="flex items-center gap-3 p-3 bg-surface/60 rounded-xl border border-border/40">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-foreground ltr">{order.id}</span>
                      <Badge className={cn('text-[10px] border-0 px-1.5 py-0', status?.className)}>
                        {status?.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{order.customer} · {order.date}</p>
                  </div>
                  <p className="text-sm font-bold text-foreground flex-shrink-0">
                    {new Intl.NumberFormat('fa-IR').format(order.total)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Low Stock Alert + Monthly Bar */}
        <div className="flex flex-col gap-5">
          {/* Bar Chart for orders */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-bold text-foreground mb-4">سفارش‌های روزانه</h2>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={revenueData} margin={{ top: 0, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.06} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'currentColor', fillOpacity: 0.5 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'currentColor', fillOpacity: 0.5 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="orders" name="سفارش" fill="#1565C0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Low Stock */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h2 className="font-bold text-foreground">موجودی کم</h2>
            </div>
            <div className="flex flex-col gap-2">
              {products.filter((p) => p.stock <= 5).slice(0, 3).map((p) => (
                <div key={p.id} className="flex items-center gap-2 p-2.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl">
                  <Package className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground line-clamp-1">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">SKU: {p.sku}</p>
                  </div>
                  <Badge className="bg-amber-500 text-white text-xs flex-shrink-0">
                    {new Intl.NumberFormat('fa-IR').format(p.stock)} عدد
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
