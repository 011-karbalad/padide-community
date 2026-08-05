'use client'

import { useState } from 'react'
import { Search, Filter, AlertTriangle, Package, TrendingDown, Plus, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { products } from '@/lib/data'
import { cn } from '@/lib/utils'

type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

function getStockStatus(stock: number): StockStatus {
  if (stock === 0) return 'out_of_stock'
  if (stock <= 5) return 'low_stock'
  return 'in_stock'
}

const stockConfig: Record<StockStatus, { label: string; className: string }> = {
  in_stock: { label: 'موجود', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' },
  low_stock: { label: 'کم موجود', className: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' },
  out_of_stock: { label: 'ناموجود', className: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' },
}

const inventoryData = products.map((p) => ({
  ...p,
  stock: p.stock ?? Math.floor(Math.random() * 50) + 1,
  maxStock: 100,
  lastUpdated: '۱۴۰۳/۰۴/۲۰',
  warehouse: ['انبار تهران', 'انبار مشهد', 'انبار اصفهان'][Math.floor(Math.random() * 3)],
}))

export default function InventoryPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filtered = inventoryData.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const status = getStockStatus(item.stock)
    const matchStatus = statusFilter === 'all' || status === statusFilter
    return matchSearch && matchStatus
  })

  const totalItems = inventoryData.length
  const lowStock = inventoryData.filter((i) => getStockStatus(i.stock) === 'low_stock').length
  const outOfStock = inventoryData.filter((i) => getStockStatus(i.stock) === 'out_of_stock').length
  const totalUnits = inventoryData.reduce((a, b) => a + b.stock, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مدیریت موجودی</h1>
          <p className="text-sm text-muted-foreground mt-1">کنترل و پایش موجودی انبار</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            خروجی اکسل
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            افزودن موجودی
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'کل محصولات', value: totalItems, icon: Package, color: 'text-blue-600' },
          { label: 'کم موجود', value: lowStock, icon: TrendingDown, color: 'text-amber-600' },
          { label: 'ناموجود', value: outOfStock, icon: AlertTriangle, color: 'text-red-500' },
          { label: 'کل واحد در انبار', value: totalUnits, icon: Package, color: 'text-emerald-600' },
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="جستجو در محصولات..."
            className="pr-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <Filter className="w-4 h-4 ml-2" />
            <SelectValue placeholder="وضعیت موجودی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="in_stock">موجود</SelectItem>
            <SelectItem value="low_stock">کم موجود</SelectItem>
            <SelectItem value="out_of_stock">ناموجود</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">محصول</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">انبار</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">موجودی</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">درصد پر بودن</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">وضعیت</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">آخرین بروز‌رسانی</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const status = getStockStatus(item.stock)
                const pct = Math.min(Math.round((item.stock / item.maxStock) * 100), 100)
                return (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                          <img src={item.thumbnail || '/placeholder.svg'} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{item.warehouse}</td>
                    <td className="px-4 py-3">
                      <span className={cn('font-semibold', status === 'out_of_stock' ? 'text-red-500' : status === 'low_stock' ? 'text-amber-600' : 'text-foreground')}>
                        {item.stock}
                      </span>
                      <span className="text-muted-foreground text-xs mr-1">واحد</span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <Progress value={pct} className="h-1.5 flex-1 max-w-24" />
                        <span className="text-xs text-muted-foreground w-8">{pct}٪</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={cn('text-xs', stockConfig[status].className)}>
                        {stockConfig[status].label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">{item.lastUpdated}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted-foreground text-sm">
            نتیجه‌ای یافت نشد
          </div>
        )}
      </div>
    </div>
  )
}
