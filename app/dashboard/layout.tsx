'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import {
  LayoutDashboard, Package, Wrench, Heart, MapPin,
  FileText, Bell, Wallet, Headphones, User, ChevronLeft, LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const navItems = [
  { label: 'داشبورد', href: '/dashboard', icon: LayoutDashboard },
  { label: 'سفارش‌ها', href: '/dashboard/orders', icon: Package, badge: '۲' },
  { label: 'تعمیرات', href: '/dashboard/repair', icon: Wrench, badge: '۱' },
  { label: 'علاقه‌مندی‌ها', href: '/dashboard/wishlist', icon: Heart },
  { label: 'آدرس‌ها', href: '/dashboard/addresses', icon: MapPin },
  { label: 'فاکتورها', href: '/dashboard/invoices', icon: FileText },
  { label: 'کیف پول', href: '/dashboard/wallet', icon: Wallet },
  { label: 'اعلان‌ها', href: '/dashboard/notifications', icon: Bell, badge: '۳' },
  { label: 'پشتیبانی', href: '/dashboard/support', icon: Headphones },
  { label: 'پروفایل', href: '/dashboard/profile', icon: User },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground">خانه</Link>
            <ChevronLeft className="w-3 h-3 text-muted-foreground" />
            <span className="text-foreground font-medium">پنل کاربری</span>
          </div>

          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col gap-2 w-56 flex-shrink-0">
              {/* User Card */}
              <div className="bg-card border border-border rounded-2xl p-4 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    ع
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">علی محمدی</p>
                    <p className="text-xs text-muted-foreground truncate">09120000000</p>
                  </div>
                </div>
              </div>

              {/* Nav Items */}
              <nav className="bg-card border border-border rounded-2xl p-2 flex flex-col">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-accent'
                      )}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge className={cn('h-5 px-1.5 text-[10px]', isActive ? 'bg-white/20 text-white' : 'bg-primary text-primary-foreground')}>
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
                <div className="mt-1 pt-1 border-t border-border">
                  <Link
                    href="/login"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    خروج
                  </Link>
                </div>
              </nav>
            </aside>

            {/* Mobile Nav */}
            <div className="md:hidden w-full mb-4 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 pb-1">
                {navItems.slice(0, 6).map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 relative',
                        isActive ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-foreground'
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {item.label}
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white text-[9px] rounded-full flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Content */}
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
