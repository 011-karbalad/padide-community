'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { User, Camera, Lock, Shield, Eye, EyeOff, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ProfilePage() {
  const [saved, setSaved] = useState(false)
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({
    firstName: 'علی',
    lastName: 'محمدی',
    phone: '09120000000',
    email: 'ali@example.com',
    nationalId: '1234567890',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">اطلاعات پروفایل</h1>
        <p className="text-sm text-muted-foreground mt-1">اطلاعات حساب کاربری خود را مدیریت کنید</p>
      </div>

      {/* Avatar Section */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white font-black text-3xl">
              ع
            </div>
            <button className="absolute -bottom-1 -left-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-card hover:bg-primary/80 transition-colors">
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <div>
            <h2 className="font-bold text-foreground text-lg">علی محمدی</h2>
            <p className="text-sm text-muted-foreground">09120000000</p>
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-0 mt-2 text-xs">
              حساب تأیید شده
            </Badge>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-bold text-foreground mb-5 flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          اطلاعات شخصی
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'firstName', label: 'نام' },
            { id: 'lastName', label: 'نام خانوادگی' },
            { id: 'phone', label: 'شماره موبایل' },
            { id: 'email', label: 'ایمیل' },
            { id: 'nationalId', label: 'کد ملی' },
          ].map(({ id, label }) => (
            <div key={id}>
              <Label htmlFor={id} className="text-sm font-medium text-foreground mb-1.5 block">{label}</Label>
              <Input
                id={id}
                value={form[id as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                className={cn('h-10 text-sm', (id === 'phone' || id === 'email' || id === 'nationalId') && 'ltr text-left')}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-5">
          <Button
            className={cn('h-10 px-6 gap-2 transition-all', saved ? 'bg-emerald-500 hover:bg-emerald-500' : 'bg-primary hover:bg-primary/90 text-primary-foreground')}
            onClick={handleSave}
          >
            {saved ? <><Check className="w-4 h-4" /> ذخیره شد</> : 'ذخیره تغییرات'}
          </Button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-bold text-foreground mb-5 flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary" />
          تغییر رمز عبور
        </h2>
        <div className="flex flex-col gap-4 max-w-md">
          {[
            { id: 'old', label: 'رمز عبور فعلی', show: showOld, setShow: setShowOld },
            { id: 'new', label: 'رمز عبور جدید', show: showNew, setShow: setShowNew },
          ].map(({ id, label, show, setShow }) => (
            <div key={id}>
              <Label htmlFor={id} className="text-sm font-medium text-foreground mb-1.5 block">{label}</Label>
              <div className="relative">
                <Input
                  id={id}
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="h-10 text-sm pl-10"
                />
                <button
                  onClick={() => setShow(!show)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
          <Button className="bg-primary text-primary-foreground h-10 w-full mt-1">
            تغییر رمز عبور
          </Button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-bold text-foreground mb-5 flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          امنیت حساب
        </h2>
        <div className="flex flex-col gap-3">
          {[
            { label: 'احراز هویت دو مرحله‌ای', desc: 'با پیامک OTP حساب خود را ایمن‌تر کنید', active: true },
            { label: 'اعلان ورود ناشناس', desc: 'هنگام ورود از دستگاه جدید پیامک دریافت کنید', active: false },
          ].map(({ label, desc, active }) => (
            <div key={label} className="flex items-center justify-between p-3 bg-surface/60 rounded-xl border border-border/50">
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
              <div className={cn('w-11 h-6 rounded-full relative cursor-pointer transition-colors', active ? 'bg-primary' : 'bg-muted')}>
                <div className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform', active ? 'right-0.5' : 'right-5')} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
