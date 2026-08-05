'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, ShoppingBag, Users, Wrench,
  BarChart3, Settings, Tag, Layers, Warehouse, FileText,
  Bell, ChevronLeft, LogOut, Menu, X, Rss
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useTheme } from '@/components/providers/theme-provider'
import { Sun, Moon } from 'lucide-react'

const navGroups = [
  {
    label: 'اصلی',
    items: [
      { label: 'داشبورد', href: '/admin', icon: LayoutDashboard },
      { label: 'آمار و گزارش', href: '/admin/analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'فروشگاه',
    items: [
      { label: 'محصولات', href: '/admin/products', icon: Package, badge: '۵,۲۴۱' },
      { label: 'دسته‌بندی‌ها', href: '/admin/categories', icon: Layers },
      { label: 'سفارش‌ها', href: '/admin/orders', icon: ShoppingBag, badge: '۱۲' },
      { label: 'مشتریان', href: '/admin/customers', icon: Users },
      { label: 'کوپن‌ها', href: '/admin/coupons', icon: Tag },
    ],
  },
  {
    label: 'انبار',
    items: [
      { label: 'موجودی', href: '/admin/inventory', icon: Warehouse },
    ],
  },
  {
    label: 'تعمیرات',
    items: [
      { label: 'سفارش‌های تعمیر', href: '/admin/repair', icon: Wrench, badge: '۸' },
    ],
  },
  {
    label: 'محتوا',
    items: [
      { label: 'بلاگ', href: '/admin/blog', icon: Rss },
      { label: 'گزارشات', href: '/admin/reports', icon: FileText },
    ],
  },
  {
    label: 'سیستم',
    items: [
      { label: 'تنظیمات', href: '/admin/settings', icon: Settings },
    ],
  },
]

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border flex-shrink-0">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">پ</span>
          </div>
          <div>
            <p className="font-bold text-sidebar-foreground text-sm leading-none">پدیده</p>
            <p className="text-sidebar-foreground/50 text-[10px]">پنل مدیریت</p>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="text-xs font-semibold text-sidebar-foreground/40 uppercase tracking-wider px-3 mb-1">
              {group.label}
            </p>
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all mb-0.5',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge className={cn(
                      'h-5 px-1.5 text-[10px] font-medium',
                      isActive ? 'bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground' : 'bg-sidebar-primary text-sidebar-primary-foreground'
                    )}>
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-sidebar-border flex-shrink-0">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center text-sidebar-primary-foreground font-bold text-sm flex-shrink-0">
            م
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-sidebar-foreground truncate">محمد مدیر</p>
            <p className="text-[10px] text-sidebar-foreground/50">مدیر سیستم</p>
          </div>
          <Link href="/login" className="text-sidebar-foreground/50 hover:text-sidebar-foreground">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 bg-sidebar border-l border-sidebar-border fixed h-full right-0 z-40">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute right-0 top-0 bottom-0 w-64 bg-sidebar border-l border-sidebar-border">
            <Sidebar onClose={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:mr-60 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border h-16 flex items-center px-4 gap-3">
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border text-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 left-1.5 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <Button size="sm" variant="outline" className="h-9 gap-2 hidden sm:flex" asChild>
              <Link href="/">
                <ChevronLeft className="w-4 h-4" />
                بازگشت به سایت
              </Link>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
