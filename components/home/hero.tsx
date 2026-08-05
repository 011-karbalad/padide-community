'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ArrowLeft, Zap, Shield, Truck, Wrench, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const popularSearches = [
  'صفحه آیفون ۱۵',
  'باتری سامسونگ',
  'ابزار تعمیر',
  'آی‌سی شارژ',
  'دوربین شیائومی',
]

const stats = [
  { label: 'محصول اورجینال', value: '۵۰۰۰+', icon: Shield },
  { label: 'مشتری راضی', value: '۸۰۰۰۰+', icon: TrendingUp },
  { label: 'ارسال سریع', value: '۲۴ ساعته', icon: Truck },
  { label: 'تعمیرکار ماهر', value: '۲۰۰+', icon: Wrench },
]

export function Hero() {
  const [query, setQuery] = useState('')

  return (
    <section className="relative overflow-hidden hero-bg">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[900px] h-[900px] rounded-full bg-white/8 blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/4 -left-1/3 w-[700px] h-[700px] rounded-full bg-emerald-500/5 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-400/5 blur-2xl animate-pulse" style={{ animationDelay: '0.75s' }} />
        {/* Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-right">
            <Badge className="bg-white/20 text-white border-white/30 mb-8 backdrop-blur-md px-4 py-2 text-sm font-medium">
              <Zap className="w-4 h-4 ml-2 fill-current" />
              اقساطی بدون بهره تا ۲۴ ماه
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 text-balance">
              بزرگ‌ترین
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">فروشگاه قطعات</span>
              <br />
              موبایل ایران
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              ۵۰۰۰+ قطعه اورجینال برای تمام برندهای معروف. تعمیر حرفه‌ای، ارسال سریع، و تضمین کیفیت
            </p>

            {/* Search Box */}
            <div className="relative max-w-2xl mx-auto lg:mx-0 mb-8">
              <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/25 overflow-hidden h-16 border border-white/20">
                <div className="flex-1 flex items-center gap-3 px-6">
                  <Search className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="جستجوی قطعه، برند یا مدل..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent text-foreground placeholder:text-gray-400 text-base outline-none py-3 font-sans"
                  />
                </div>
                <Button className="m-2 h-12 px-8 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-base font-semibold btn-shadow" asChild>
                  <Link href={`/shop${query ? `?q=${encodeURIComponent(query)}` : ''}`}>
                    جستجو
                  </Link>
                </Button>
              </div>

              {/* Popular Searches */}
              <div className="flex items-center gap-2 mt-4 flex-wrap justify-center lg:justify-start">
                <span className="text-white/70 text-sm flex-shrink-0 font-medium">جستجوهای پرتقاضا:</span>
                {popularSearches.map((s) => (
                  <Link
                    key={s}
                    href={`/shop?q=${encodeURIComponent(s)}`}
                    className="text-xs text-white/90 hover:text-white bg-white/15 hover:bg-white/25 rounded-full px-3.5 py-1.5 transition-all backdrop-blur-sm border border-white/10"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4 justify-center lg:justify-start flex-wrap">
              <Button size="lg" className="bg-white text-cyan-700 hover:bg-white/95 h-13 px-8 font-bold shadow-lg" asChild>
                <Link href="/shop">
                  مشاهده محصولات
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Link>
              </Button>
              <Button size="lg" className="border-2 border-white text-white hover:bg-white/10 h-13 px-8 font-bold backdrop-blur-sm" asChild>
                <Link href="/repair">
                  <Wrench className="w-5 h-5 ml-2" />
                  ثبت درخواست تعمیر
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-shrink-0 hidden lg:flex items-center justify-center relative">
            <div className="relative w-[380px] h-[420px]">
              {/* Central Product */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-96 bg-white/10 backdrop-blur-sm rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden p-3">
                  <img
                    src="/products/iphone14pro-lcd.png"
                    alt="قطعه یدکی موبایل"
                    className="w-full h-full object-cover rounded-[2.25rem]"
                  />
                </div>
              </div>
              {/* Floating Cards */}
              <div className="absolute top-4 -right-4 bg-white/15 backdrop-blur-sm rounded-2xl p-3 border border-white/20 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/20">
                    <img src="/products/iphone15-bat.png" alt="باتری" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">باتری آیفون ۱۵</p>
                    <p className="text-white/70 text-[10px]">۱۲,۵۰۰ تومان</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-8 -left-4 bg-white/15 backdrop-blur-sm rounded-2xl p-3 border border-white/20 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/20">
                    <img src="/products/s23ultra-lcd.png" alt="ال سی دی" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">LCD آیفون ۱۴ پرو</p>
                    <p className="text-white/70 text-[10px]">اقساطی: ۷۳۳,۳۳۳/ماه</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 -left-8 bg-emerald-500/80 backdrop-blur-sm rounded-2xl p-3 border border-emerald-400/30 shadow-lg">
                <div className="text-white text-center">
                  <p className="text-xs font-medium">تعمیر موفق</p>
                  <p className="text-2xl font-bold">۹۸٪</p>
                  <p className="text-[10px] opacity-80">رضایت مشتری</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="flex items-center gap-3 bg-white/12 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-xl leading-none">{stat.value}</p>
                  <p className="text-white/70 text-sm mt-1">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
