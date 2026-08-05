'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUserStore } from '@/lib/store/user'
import { cn } from '@/lib/utils'
import {
  User, LogOut, MapPin, Package, Heart, Settings, ChevronLeft,
  Clock, CheckCircle, Truck, AlertCircle, Phone, Mail, Calendar
} from 'lucide-react'

// Mock orders data
const mockOrders = [
  {
    id: '1',
    number: 'PD-001234',
    date: '1403/06/15',
    total: 2500000,
    status: 'delivered',
    items: 3,
  },
  {
    id: '2',
    number: 'PD-001235',
    date: '1403/06/10',
    total: 1800000,
    status: 'shipped',
    items: 2,
  },
  {
    id: '3',
    number: 'PD-001236',
    date: '1403/05/20',
    total: 950000,
    status: 'processing',
    items: 1,
  },
]

// Mock addresses
const mockAddresses = [
  {
    id: '1',
    title: 'منزل',
    name: 'علی محمدی',
    phone: '09123456789',
    province: 'تهران',
    city: 'تهران',
    address: 'خیابان انقلاب، نرسیدن به میدان انقلاب، پلاک ۱۲۵',
    postalCode: '1234567890',
    isDefault: true,
  },
]

// Mock wishlist
const mockWishlist = [
  {
    id: '1',
    name: 'ال سی دی آیفون 13',
    brand: 'Apple',
    price: 1200000,
  },
  {
    id: '2',
    name: 'باتری سامسونگ S21',
    brand: 'Samsung',
    price: 350000,
  },
]

const statusConfig = {
  processing: { label: 'در حال پردازش', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock },
  shipped: { label: 'ارسال شده', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: Truck },
  delivered: { label: 'تحویل داده شده', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle },
  cancelled: { label: 'لغو شده', color: 'bg-destructive/10 text-destructive border-destructive/30', icon: AlertCircle },
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoggedIn, logout } = useUserStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-16 flex items-center justify-center w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">دسترسی محدود</h1>
            <p className="text-muted-foreground mb-6">ابتدا باید وارد حساب خود شوید</p>
            <Button asChild className="bg-primary hover:bg-primary/95">
              <Link href="/auth/login">ورود</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">داشبورد</h1>
            <p className="text-muted-foreground">خوش آمدید، {user.name}</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            {/* Profile Card */}
            <div className="lg:col-span-1 bg-card rounded-2xl border border-border p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-lg font-bold text-foreground">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>عضو از {user.joinedAt}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="w-4 h-4" />
                  <span>{mockOrders.length} سفارش</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/profile">
                    <User className="w-4 h-4 mr-2" />
                    ویرایش پروفایل
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    تنظیمات
                  </Link>
                </Button>
                <Button onClick={handleLogout} variant="outline" className="w-full justify-start text-destructive hover:bg-destructive/10">
                  <LogOut className="w-4 h-4 mr-2" />
                  خروج
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="lg:col-span-3 space-y-4">
              {[
                { label: 'سفارش‌های فعال', value: mockOrders.filter(o => o.status !== 'delivered').length, color: 'text-blue-600' },
                { label: 'سفارش‌های تحویل شده', value: mockOrders.filter(o => o.status === 'delivered').length, color: 'text-emerald-600' },
                { label: 'مبلغ کل خریدها', value: `${new Intl.NumberFormat('fa-IR').format(mockOrders.reduce((s, o) => s + o.total, 0))} ت`, color: 'text-primary' },
                { label: 'موارد علاقه', value: mockWishlist.length, color: 'text-rose-600' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-card rounded-2xl border border-border p-4 flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">{stat.label}</span>
                  <span className={cn('text-2xl font-bold', stat.color)}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-surface/50">
              <TabsTrigger value="orders">سفارش‌ها</TabsTrigger>
              <TabsTrigger value="addresses">آدرس‌ها</TabsTrigger>
              <TabsTrigger value="wishlist">علاقه‌مندی‌ها</TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              <h2 className="text-xl font-bold text-foreground mb-4">سفارش‌های شما</h2>
              {mockOrders.map(order => {
                const config = statusConfig[order.status as keyof typeof statusConfig]
                const Icon = config.icon
                return (
                  <div key={order.id} className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">شماره سفارش</p>
                        <p className="text-lg font-bold text-foreground">{order.number}</p>
                      </div>
                      <Badge className={config.color}>
                        <Icon className="w-3 h-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">تاریخ</p>
                        <p className="text-sm font-medium text-foreground">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">تعداد محصول</p>
                        <p className="text-sm font-medium text-foreground">{order.items} عدد</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">مبلغ کل</p>
                        <p className="text-sm font-bold text-primary">{new Intl.NumberFormat('fa-IR').format(order.total)} تومان</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="mt-4 flex items-center gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/orders/${order.id}`}>
                          مشاهده جزئیات
                          <ChevronLeft className="w-3 h-3 mr-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">آدرس‌های تحویل</h2>
                <Button asChild size="sm" className="bg-primary hover:bg-primary/95">
                  <Link href="/dashboard/addresses">افزودن آدرس جدید</Link>
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {mockAddresses.map(addr => (
                  <div key={addr.id} className={cn(
                    'bg-card rounded-2xl border-2 p-6 relative',
                    addr.isDefault ? 'border-primary' : 'border-border'
                  )}>
                    {addr.isDefault && (
                      <Badge className="absolute -top-2 right-4 bg-primary text-white">پیش‌فرض</Badge>
                    )}
                    <p className="text-sm font-semibold text-foreground mb-3">{addr.title}</p>
                    <div className="space-y-2 text-sm mb-4">
                      <p className="font-medium text-foreground">{addr.name}</p>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {addr.phone}
                      </div>
                      <p className="text-muted-foreground">{addr.province}، {addr.city}</p>
                      <p className="text-muted-foreground">{addr.address}</p>
                      <p className="text-xs text-muted-foreground">کد پستی: {addr.postalCode}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link href={`/dashboard/addresses/${addr.id}/edit`}>ویرایش</Link>
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                        حذف
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="space-y-4">
              <h2 className="text-xl font-bold text-foreground mb-4">موارد علاقه</h2>
              {mockWishlist.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockWishlist.map(item => (
                    <div key={item.id} className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow">
                      <div className="w-full aspect-square bg-muted rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                        <Package className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{item.brand}</p>
                      <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2">{item.name}</h3>
                      <p className="text-base font-bold text-primary mb-3">
                        {new Intl.NumberFormat('fa-IR').format(item.price)} تومان
                      </p>
                      <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/95">
                        <Link href={`/shop`}>مشاهده</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-2xl border border-border">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">هنوز موردی را علاقه‌مندی نکرده‌اید</p>
                  <Button asChild className="bg-primary hover:bg-primary/95">
                    <Link href="/shop">مرور فروشگاه</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
