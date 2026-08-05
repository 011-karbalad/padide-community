'use client'

import { useState } from 'react'
import { CheckCircle, Wrench, Clock, Shield, ChevronLeft, Smartphone, Laptop, Tablet } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

const repairTypes = [
  { id: 'screen', label: 'تعویض صفحه نمایش', price: 'از ۴۵۰,۰۰۰' },
  { id: 'battery', label: 'تعویض باتری', price: 'از ۱۸۰,۰۰۰' },
  { id: 'charging', label: 'مشکل شارژ', price: 'از ۱۲۰,۰۰۰' },
  { id: 'camera', label: 'تعمیر دوربین', price: 'از ۲۵۰,۰۰۰' },
  { id: 'water', label: 'آب‌خوردگی', price: 'از ۸۰,۰۰۰ (ارزیابی)' },
  { id: 'motherboard', label: 'تعمیر برد', price: 'از ۱۵۰,۰۰۰' },
  { id: 'other', label: 'سایر مشکلات', price: 'پس از بررسی' },
]

const deviceTypes = [
  { id: 'smartphone', label: 'گوشی هوشمند', icon: Smartphone },
  { id: 'tablet', label: 'تبلت', icon: Tablet },
  { id: 'laptop', label: 'لپ‌تاپ', icon: Laptop },
]

const brands = ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus', 'Oppo', 'Nokia', 'LG', 'Sony', 'سایر']

export default function RepairPage() {
  const [deviceType, setDeviceType] = useState('smartphone')
  const [repairType, setRepairType] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [trackingCode] = useState(`REP-${Math.floor(Math.random() * 900000) + 100000}`)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">درخواست ثبت شد</h1>
              <p className="text-muted-foreground mt-2">درخواست تعمیر شما با موفقیت ثبت گردید</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-sm text-muted-foreground mb-1">کد پیگیری شما</p>
              <p className="text-2xl font-bold text-primary" dir="ltr">{trackingCode}</p>
              <p className="text-xs text-muted-foreground mt-2">این کد را برای پیگیری وضعیت تعمیر نزد خود نگه دارید</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground space-y-1.5">
              <p>کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت</p>
              <p>ساعات پاسخگویی: شنبه تا چهارشنبه ۹ صبح تا ۶ عصر</p>
            </div>
            <div className="flex gap-3">
              <Button asChild className="flex-1">
                <Link href="/dashboard/repair">پیگیری تعمیر</Link>
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setSubmitted(false)}>
                ثبت درخواست جدید
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="hero-bg py-12 px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-7 h-7" />
            </div>
            <h1 className="text-3xl font-bold mb-2">سفارش تعمیر آنلاین</h1>
            <p className="text-white/80 text-sm">دستگاه خود را بدون مراجعه حضوری تعمیر کنید</p>
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
              {[
                { icon: Clock, text: 'پاسخگویی ۲۴ ساعته' },
                { icon: Shield, text: 'ضمانت ۶ ماهه تعمیر' },
                { icon: Wrench, text: 'تکنسین‌های مجرب' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/90">
                  <Icon className="w-4 h-4" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Device Type */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-semibold text-foreground">نوع دستگاه</h2>
              <div className="grid grid-cols-3 gap-3">
                {deviceTypes.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setDeviceType(id)}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-sm font-medium',
                      deviceType === id
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:border-primary/40 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className="w-6 h-6" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Device Info */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-semibold text-foreground">اطلاعات دستگاه</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="brand">برند دستگاه</Label>
                  <Select>
                    <SelectTrigger id="brand">
                      <SelectValue placeholder="انتخاب برند" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="model">مدل دستگاه</Label>
                  <Input id="model" placeholder="مثال: iPhone 14 Pro" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="problem">توضیح مشکل</Label>
                <Textarea id="problem" placeholder="مشکل دستگاه خود را شرح دهید..." rows={3} />
              </div>
            </div>

            {/* Repair Type */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-semibold text-foreground">نوع تعمیر</h2>
              <RadioGroup value={repairType} onValueChange={setRepairType} className="space-y-2">
                {repairTypes.map((r) => (
                  <div
                    key={r.id}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer',
                      repairType === r.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                    )}
                    onClick={() => setRepairType(r.id)}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={r.id} id={r.id} />
                      <Label htmlFor={r.id} className="cursor-pointer font-medium">{r.label}</Label>
                    </div>
                    <span className="text-sm text-primary font-medium">{r.price} تومان</span>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Contact */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-semibold text-foreground">اطلاعات تماس</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">نام و نام خانوادگی</Label>
                  <Input id="name" placeholder="نام شما" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">شماره موبایل</Label>
                  <Input id="phone" placeholder="09XXXXXXXXX" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address">آدرس</Label>
                  <Input id="address" placeholder="آدرس دقیق برای ارسال پیک" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="preferred-time">زمان ترجیحی تماس</Label>
                  <Select>
                    <SelectTrigger id="preferred-time">
                      <SelectValue placeholder="انتخاب بازه زمانی" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">صبح (۹-۱۲)</SelectItem>
                      <SelectItem value="afternoon">بعدازظهر (۱۲-۱۷)</SelectItem>
                      <SelectItem value="evening">عصر (۱۷-۲۱)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full gap-2">
              <Wrench className="w-5 h-5" />
              ثبت درخواست تعمیر
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
