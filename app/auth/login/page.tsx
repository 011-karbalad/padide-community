'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useUserStore } from '@/lib/store/user'
import { Mail, Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const login = useUserStore(state => state.login)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push('/dashboard')
      } else {
        setError('ایمیل یا رمز عبور اشتباه است')
      }
    } catch (err) {
      setError('خطای ورود سیستم')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Info */}
            <div className="hidden lg:flex flex-col gap-8">
              <div>
                <h1 className="text-4xl font-black text-foreground mb-4 leading-tight">
                  خوش آمدید به پدیده
                </h1>
                <p className="text-lg text-muted-foreground">
                  برای دسترسی به سفارش‌های خود، آدرس‌ها و تاریخچه خریدهای شما وارد شوید
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: '📦', title: 'سفارش‌های شما', desc: 'تمام سفارش‌های را دیدن کنید' },
                  { icon: '📍', title: 'آدرس‌های ذخیره شده', desc: 'چند آدرس را ذخیره کنید' },
                  { icon: '❤️', title: 'علاقه‌مندی‌ها', desc: 'محصولات مورد علاقه را ذخیره کنید' },
                  { icon: '🎁', title: 'تخفیف‌های ویژه', desc: 'تخفیفات اختصاصی برای شما' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-card rounded-3xl border border-border p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-foreground mb-2">ورود به حساب</h2>
              <p className="text-muted-foreground mb-8">ایمیل و رمز عبور خود را وارد کنید</p>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                    ایمیل
                  </Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pr-10 bg-surface/50 border-border ltr text-left h-11"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                      رمز عبور
                    </Label>
                    <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                      فراموشی رمز
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10 bg-surface/50 border-border h-11"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 text-base font-semibold bg-primary hover:bg-primary/95"
                >
                  {loading ? 'در حال ورود...' : 'ورود'}
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">یا</span>
                  <Separator className="flex-1" />
                </div>

                {/* Demo Credentials */}
                <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg border border-cyan-200/50 dark:border-cyan-900/50">
                  <p className="text-xs font-medium text-cyan-700 dark:text-cyan-400 mb-2">برای تست حساب دمو:</p>
                  <p className="text-xs text-cyan-600 dark:text-cyan-300">ایمیل: demo@example.com</p>
                  <p className="text-xs text-cyan-600 dark:text-cyan-300">رمز: 123456</p>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-muted-foreground">
                  حساب ندارید؟{' '}
                  <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
                    ثبت نام کنید
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
