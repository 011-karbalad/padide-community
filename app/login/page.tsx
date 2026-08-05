'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeOff, Phone, Lock, ArrowLeft, Smartphone, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/lib/store/user'

type LoginMode = 'password' | 'otp'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, error, clearError } = useUserStore()
  const [mode, setMode] = useState<LoginMode>('password')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOtp = () => {
    if (email.length >= 5) setOtpSent(true)
  }

  const handleLogin = async () => {
    clearError()
    const success = await login(email, password)
    if (success) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex flex-col items-center justify-center flex-1 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative text-center px-8">
          <Link href="/" className="flex items-center gap-3 justify-center mb-8">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-white font-black text-2xl">پ</span>
            </div>
            <span className="text-white font-black text-3xl">پدیده</span>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-4 text-balance">
            بزرگترین فروشگاه<br />قطعات موبایل ایران
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-xs mx-auto">
            با عضویت در پدیده از خرید اقساطی، ضمانت اصالت کالا و پشتیبانی ۲۴/۷ بهره‌مند شوید.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 max-w-xs mx-auto">
            {[
              { value: '۵۰۰۰+', label: 'محصول' },
              { value: '۸۰۰۰۰+', label: 'مشتری' },
              { value: '۱۰+', label: 'سال تجربه' },
              { value: '۲۴/۷', label: 'پشتیبانی' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/15">
                <p className="text-white font-bold text-lg">{value}</p>
                <p className="text-white/60 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full">
        <div className="w-full">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">پ</span>
            </div>
            <span className="font-bold text-xl text-foreground">پدیده</span>
          </Link>

          <h1 className="text-2xl font-bold text-foreground mb-2">خوش آمدید</h1>
          <p className="text-muted-foreground mb-8">
            برای ادامه وارد حساب کاربری خود شوید
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-6 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Mode Tabs */}
          <div className="flex gap-1 bg-muted p-1 rounded-xl mb-6">
            <button
              onClick={() => { setMode('password'); setOtpSent(false) }}
              className={cn(
                'flex-1 py-2 text-sm font-medium rounded-lg transition-all',
                mode === 'password' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
              )}
            >
              رمز عبور
            </button>
            <button
              onClick={() => { setMode('otp'); setOtpSent(false) }}
              className={cn(
                'flex-1 py-2 text-sm font-medium rounded-lg transition-all',
                mode === 'otp' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
              )}
            >
              کد یکبار مصرف
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground mb-1.5 block">
                ایمیل
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 text-sm ltr text-left"
                disabled={isLoading}
              />
            </div>

            {/* Password Mode */}
            {mode === 'password' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">رمز عبور</Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">فراموشی رمز</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="رمز عبور خود را وارد کنید"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 pl-10 h-11 text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* OTP Mode */}
            {mode === 'otp' && !otpSent && (
              <Button
                className="w-full h-11 bg-primary text-primary-foreground font-medium gap-2"
                onClick={handleSendOtp}
                disabled={email.length < 5 || isLoading}
              >
                <Smartphone className="w-4 h-4" />
                ارسال کد تأیید
              </Button>
            )}

            {mode === 'otp' && otpSent && (
              <div>
                <Label htmlFor="otp" className="text-sm font-medium text-foreground mb-1.5 block">کد تأیید</Label>
                <Input
                  id="otp"
                  placeholder="کد ۶ رقمی"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="h-11 text-sm text-center ltr tracking-widest text-lg font-bold"
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  کد به ایمیل {email} ارسال شد
                  <button
                    className="text-primary mr-2 hover:underline"
                    onClick={() => setOtpSent(false)}
                    disabled={isLoading}
                  >
                    تغییر ایمیل
                  </button>
                </p>
              </div>
            )}

            {/* Submit */}
            {mode === 'password' && (
              <Button
                className="w-full h-11 bg-primary text-primary-foreground font-semibold gap-2 mt-2"
                onClick={handleLogin}
                disabled={!email || !password || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    در حال ورود...
                  </>
                ) : (
                  <>
                    ورود به حساب
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}

            {mode === 'otp' && otpSent && (
              <Button
                className="w-full h-11 bg-primary text-primary-foreground font-semibold gap-2"
                disabled={otp.length < 6 || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    در حال ورود...
                  </>
                ) : (
                  <>
                    تأیید و ورود
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3 my-6">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">یا</span>
            <Separator className="flex-1" />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            حساب کاربری ندارید؟{' '}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              ثبت‌نام کنید
            </Link>
          </p>

          <p className="text-xs text-muted-foreground text-center mt-6">
            با ورود، با{' '}
            <Link href="/terms" className="text-primary hover:underline">شرایط استفاده</Link>
            {' '}و{' '}
            <Link href="/privacy" className="text-primary hover:underline">حریم خصوصی</Link>
            {' '}پدیده موافقت می‌کنید.
          </p>
        </div>
      </div>
    </div>
  )
}
