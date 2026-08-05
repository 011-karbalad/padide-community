'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Wrench, Search, Eye, Edit, Clock, CheckCircle, AlertTriangle,
  Package, Truck, User
} from 'lucide-react'
import { mockRepairOrders } from '@/lib/data'
import { cn } from '@/lib/utils'

const repairQueue = [
  ...mockRepairOrders,
  {
    id: '2', ticketNumber: 'REP-78902',
    deviceBrand: 'Samsung', deviceModel: 'Galaxy S23',
    problem: 'باتری خیلی سریع تخلیه می‌شود',
    status: 'pending' as const, estimatedCost: 1200000,
    createdAt: '۱۴۰۳/۰۴/۱۸', updatedAt: '۱۴۰۳/۰۴/۱۸',
    technicianName: undefined, warranty: '۳ ماه', timeline: [],
  },
  {
    id: '3', ticketNumber: 'REP-78903',
    deviceBrand: 'Xiaomi', deviceModel: '13 Pro',
    problem: 'دوربین تصویر تار می‌گیرد',
    status: 'waiting-parts' as const, estimatedCost: 2800000,
    createdAt: '۱۴۰۳/۰۴/۱۶', updatedAt: '۱۴۰۳/۰۴/۱۸',
    technicianName: 'احمد علوی', warranty: '۳ ماه', timeline: [],
  },
  {
    id: '4', ticketNumber: 'REP-78900',
    deviceBrand: 'Apple', deviceModel: 'iPhone 12',
    problem: 'شارژ نمی‌گیرد، کانکتور شارژ خراب است',
    status: 'completed' as const, estimatedCost: 900000, finalCost: 900000,
    createdAt: '۱۴۰۳/۰۴/۱۲', updatedAt: '۱۴۰۳/۰۴/۱۸',
    technicianName: 'محمد رضایی', warranty: '۳ ماه', timeline: [],
  },
]

const statusConfig = {
  pending: { label: 'در انتظار', icon: Clock, color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' },
  diagnosed: { label: 'تشخیص داده شد', icon: AlertTriangle, color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400' },
  'in-progress': { label: 'در حال تعمیر', icon: Wrench, color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400' },
  'waiting-parts': { label: 'انتظار قطعه', icon: Package, color: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400' },
  completed: { label: 'تعمیر شد', icon: CheckCircle, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' },
  delivered: { label: 'تحویل داده شد', icon: Truck, color: 'bg-emerald-200 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' },
}

type RepairStatus = keyof typeof statusConfig

const summaryStats = [
  { label: 'کل سفارش‌ها', value: repairQueue.length, color: 'text-foreground' },
  { label: 'در انتظار', value: repairQueue.filter(r => r.status === 'pending').length, color: 'text-amber-600' },
  { label: 'در حال تعمیر', value: repairQueue.filter(r => r.status === 'in-progress').length, color: 'text-purple-600' },
  { label: 'تکمیل شده', value: repairQueue.filter(r => r.status === 'completed' || r.status === 'delivered').length, color: 'text-emerald-600' },
]

export default function AdminRepairPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = repairQueue.filter((r) => {
    if (search && !r.ticketNumber.includes(search) && !r.deviceModel.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter !== 'all' && r.status !== statusFilter) return false
    return true
  })

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">مدیریت تعمیرات</h1>
        <p className="text-sm text-muted-foreground mt-1">صف تعمیر و پیگیری سفارش‌های تعمیر</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryStats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 text-center">
            <p className={cn('text-2xl font-black', stat.color)}>{new Intl.NumberFormat('fa-IR').format(stat.value)}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="جستجوی شماره تیکت یا مدل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9 h-9 text-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-44 text-sm">
            <SelectValue placeholder="وضعیت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه وضعیت‌ها</SelectItem>
            {Object.entries(statusConfig).map(([key, val]) => (
              <SelectItem key={key} value={key}>{val.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Repair Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((repair) => {
          const status = statusConfig[repair.status as RepairStatus]
          const StatusIcon = status?.icon || Clock
          return (
            <div key={repair.id} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', status?.color)}>
                  <StatusIcon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-foreground text-sm ltr">{repair.ticketNumber}</span>
                    <Badge className={cn('text-xs border-0', status?.color)}>{status?.label}</Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground mt-0.5">{repair.deviceBrand} {repair.deviceModel}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{repair.problem}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div>
                  <p className="text-muted-foreground">تاریخ ثبت</p>
                  <p className="font-medium text-foreground mt-0.5">{repair.createdAt}</p>
                </div>
                {repair.estimatedCost && (
                  <div>
                    <p className="text-muted-foreground">هزینه تخمینی</p>
                    <p className="font-medium text-foreground mt-0.5">{new Intl.NumberFormat('fa-IR').format(repair.estimatedCost)} تومان</p>
                  </div>
                )}
                {repair.technicianName && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">تکنسین</p>
                    <p className="font-medium text-foreground mt-0.5 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {repair.technicianName}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-3 border-t border-border">
                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  جزئیات
                </Button>
                <Button size="sm" className="flex-1 h-8 text-xs bg-primary text-primary-foreground gap-1.5">
                  <Edit className="w-3.5 h-3.5" />
                  به‌روزرسانی
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
