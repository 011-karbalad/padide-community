'use client'

import { useState } from 'react'
import { Zap, Calculator, CheckCircle, FileText, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { installmentPlans, calculateInstallment } from '@/lib/data'

interface InstallmentCalculatorProps {
  price: number
  productName: string
}

export function InstallmentCalculator({ price, productName }: InstallmentCalculatorProps) {
  const [selectedMonths, setSelectedMonths] = useState(12)
  const [isOpen, setIsOpen] = useState(false)

  const plan = installmentPlans.find(p => p.months === selectedMonths) || installmentPlans[2]
  const result = calculateInstallment(price, plan.months, plan.minDownPayment, plan.interestRate)

  const fmt = (n: number) => new Intl.NumberFormat('fa-IR').format(Math.ceil(n))

  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <div className="text-right">
            <p className="font-semibold text-sm text-foreground">خرید اقساطی</p>
            <p className="text-xs text-muted-foreground">از {fmt(result.monthlyPayment)} تومان در ماه</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-primary/10 text-primary border-0 text-xs">بدون ضامن</Badge>
          <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform', isOpen && 'rotate-180')} />
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-border p-4 bg-muted/20">
          {/* Month Selector */}
          <p className="text-xs font-medium text-muted-foreground mb-3">تعداد اقساط</p>
          <div className="flex gap-2 mb-4 flex-wrap">
            {installmentPlans.map((plan) => (
              <button
                key={plan.months}
                onClick={() => setSelectedMonths(plan.months)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                  selectedMonths === plan.months
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border text-foreground hover:border-primary/50'
                )}
              >
                {plan.months} ماهه
              </button>
            ))}
          </div>

          {/* Result */}
          <div className="bg-primary/5 rounded-xl p-4 mb-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-muted-foreground mb-1">پیش‌پرداخت</p>
                <p className="font-bold text-sm text-foreground">{fmt(result.downPayment)}</p>
                <p className="text-[10px] text-muted-foreground">تومان</p>
              </div>
              <div className="border-r border-l border-border">
                <p className="text-xs text-muted-foreground mb-1">اقساط ماهانه</p>
                <p className="font-bold text-sm text-primary">{fmt(result.monthlyPayment)}</p>
                <p className="text-[10px] text-muted-foreground">تومان × {selectedMonths}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">کارمزد</p>
                <p className="font-bold text-sm text-foreground">{plan.interestRate}٪</p>
                <p className="text-[10px] text-muted-foreground">سالانه</p>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">مجموع پرداخت</span>
              <span className="font-bold text-foreground text-sm">{fmt(result.total)} تومان</span>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-4">
            <p className="text-xs font-medium text-foreground mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              مدارک مورد نیاز
            </p>
            <div className="flex flex-col gap-1.5">
              {['کارت ملی', 'شناسنامه', 'سند ملکی یا اجاره‌نامه', 'فیش حقوقی'].map((doc) => (
                <div key={doc} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  {doc}
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Calculator className="w-4 h-4 ml-2" />
            درخواست خرید اقساطی
          </Button>
        </div>
      )}
    </div>
  )
}
