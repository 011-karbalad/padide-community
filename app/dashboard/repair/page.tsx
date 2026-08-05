import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Wrench, Plus, Clock, CheckCircle, AlertTriangle, Truck, Package, ArrowLeft } from 'lucide-react'
import { mockRepairOrders } from '@/lib/data'
import { cn } from '@/lib/utils'

const statusConfig = {
  pending: { label: 'در انتظار بررسی', icon: Clock, color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400', step: 1 },
  diagnosed: { label: 'تشخیص داده شد', icon: AlertTriangle, color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400', step: 2 },
  'in-progress': { label: 'در حال تعمیر', icon: Wrench, color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400', step: 3 },
  'waiting-parts': { label: 'انتظار قطعه', icon: Package, color: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400', step: 2.5 },
  completed: { label: 'تعمیر شد', icon: CheckCircle, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400', step: 4 },
  delivered: { label: 'تحویل داده شد', icon: Truck, color: 'bg-emerald-200 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300', step: 5 },
}

type RepairStatus = keyof typeof statusConfig

const timelineSteps = [
  { label: 'دریافت', desc: 'تحویل دستگاه' },
  { label: 'تشخیص', desc: 'بررسی مشکل' },
  { label: 'تعمیر', desc: 'در حال انجام' },
  { label: 'کنترل کیفی', desc: 'تست دستگاه' },
  { label: 'تحویل', desc: 'آماده تحویل' },
]

export default function RepairDashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">سفارش‌های تعمیر</h1>
          <p className="text-sm text-muted-foreground mt-1">وضعیت تعمیر دستگاه‌های شما</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2 h-9" asChild>
          <Link href="/repair/new">
            <Plus className="w-4 h-4" />
            درخواست جدید
          </Link>
        </Button>
      </div>

      {mockRepairOrders.map((repair) => {
        const status = statusConfig[repair.status as RepairStatus]
        const StatusIcon = status?.icon || Clock
        const currentStep = status?.step ?? 1

        return (
          <div key={repair.id} className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', status?.color)}>
                  <StatusIcon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-foreground ltr">{repair.ticketNumber}</span>
                    <Badge className={cn('text-xs border-0', status?.color)}>{status?.label}</Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground mt-1">
                    {repair.deviceBrand} {repair.deviceModel}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{repair.problem}</p>
                </div>
                <div className="text-left flex-shrink-0">
                  <p className="text-xs text-muted-foreground">ثبت شد</p>
                  <p className="text-sm font-medium text-foreground">{repair.createdAt}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-3">
                  {timelineSteps.map((step, i) => {
                    const stepNum = i + 1
                    const isDone = currentStep > stepNum
                    const isCurrent = Math.ceil(currentStep) === stepNum
                    return (
                      <div key={i} className="flex flex-col items-center gap-1 flex-1">
                        <div className={cn(
                          'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all',
                          isDone ? 'bg-emerald-500 border-emerald-500 text-white' :
                          isCurrent ? 'bg-primary border-primary text-primary-foreground' :
                          'bg-background border-border text-muted-foreground'
                        )}>
                          {isDone ? '✓' : new Intl.NumberFormat('fa-IR').format(stepNum)}
                        </div>
                        <div className="text-center hidden sm:block">
                          <p className={cn('text-[10px] font-medium', isCurrent ? 'text-primary' : isDone ? 'text-emerald-600' : 'text-muted-foreground')}>{step.label}</p>
                        </div>
                        {i < timelineSteps.length - 1 && (
                          <div className="absolute" style={{ display: 'none' }} />
                        )}
                      </div>
                    )
                  })}
                </div>
                {/* Connector line behind */}
                <div className="relative -mt-8 mb-6 hidden sm:block">
                  <div className="absolute top-3.5 right-3.5 left-3.5 h-0.5 bg-border" />
                  <div
                    className="absolute top-3.5 right-3.5 h-0.5 bg-emerald-500 transition-all"
                    style={{ width: `${Math.min(100, ((currentStep - 1) / (timelineSteps.length - 1)) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Timeline Events */}
            <div className="p-5">
              <p className="text-sm font-semibold text-foreground mb-3">رویدادها</p>
              <div className="flex flex-col gap-3">
                {repair.timeline.map((event, i) => (
                  <div key={event.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={cn('w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0', i === repair.timeline.length - 1 ? 'bg-primary' : 'bg-emerald-500')}>
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                      {i < repair.timeline.length - 1 && <div className="w-0.5 flex-1 bg-border mt-1 min-h-4" />}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">{event.status}</p>
                        <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{event.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Footer */}
            <div className="p-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-4 text-sm">
                {repair.estimatedCost && (
                  <div>
                    <span className="text-muted-foreground">هزینه تخمینی: </span>
                    <span className="font-semibold text-foreground">
                      {new Intl.NumberFormat('fa-IR').format(repair.estimatedCost)} تومان
                    </span>
                  </div>
                )}
                {repair.technicianName && (
                  <div>
                    <span className="text-muted-foreground">تکنسین: </span>
                    <span className="font-semibold text-foreground">{repair.technicianName}</span>
                  </div>
                )}
              </div>
              <Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs" asChild>
                <Link href={`/repair/track?ticket=${repair.ticketNumber}`}>
                  پیگیری آنلاین
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        )
      })}

      {/* Empty state (if no repairs) */}
      {mockRepairOrders.length === 0 && (
        <div className="text-center py-16 bg-card border border-border rounded-2xl">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Wrench className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">سفارش تعمیری ندارید</h3>
          <p className="text-sm text-muted-foreground mb-4">گوشی شما مشکل دارد؟ درخواست تعمیر ثبت کنید</p>
          <Button className="bg-primary text-primary-foreground gap-2" asChild>
            <Link href="/repair/new">
              <Plus className="w-4 h-4" />
              ثبت درخواست تعمیر
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
