'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Search, ShoppingCart, Heart, User, Menu, X, Bell,
  ChevronDown, Wrench, Package, Sun, Moon, Phone, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useTheme } from '@/components/providers/theme-provider'
import { categories } from '@/lib/data'
import { cn } from '@/lib/utils'
import Image from "next/image";

const navLinks = [
  { label: 'فروشگاه', href: '/shop' },
  { label: 'دسته‌بندی‌ها', href: '/categories', hasMega: true },
  { label: 'تعمیرات', href: '/repair' },
  { label: 'اقساطی', href: '/installment' },
  { label: 'بلاگ', href: '/blog' },
  { label: 'درباره ما', href: '/about' },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-brand text-white text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> ۰۲۱-۱۲۳۴۵۶۷۸</span>
            <span>|</span>
            <span>ارسال رایگان برای خریدهای بالای ۵۰۰,۰۰۰ تومان</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3" />خرید اقساطی بدون بهره</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-background/98 backdrop-blur-lg border-b border-border/30 shadow-lg'
            : 'bg-background border-b border-border/30'
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <Link
  href="/"
  className="flex items-center gap-2.5 flex-shrink-0 hover:opacity-80 transition-opacity"
>
  <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
    <Image
      src="/logo-padide.webp"
      alt="پدیده"
      width={40}
      height={40}
      className="w-full h-full object-cover"
      priority
    />
  </div>

  <span className="font-bold text-xl text-foreground hidden sm:inline">
    پدیده
  </span>
</Link>
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.hasMega && setMegaOpen(true)}
                  onMouseLeave={() => link.hasMega && setMegaOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                      'text-foreground hover:text-primary hover:bg-accent'
                    )}
                  >
                    {link.label}
                    {link.hasMega && <ChevronDown className="w-3 h-3" />}
                  </Link>
                  {/* Mega Menu */}
                  {link.hasMega && megaOpen && (
                    <div className="absolute top-full right-0 w-[600px] bg-popover border border-border shadow-xl rounded-xl p-4 mt-1 grid grid-cols-3 gap-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/categories/${cat.slug}`}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors text-sm"
                        >
                          <span className="text-lg">{cat.icon}</span>
                          <div>
                            <div className="font-medium text-foreground">{cat.name}</div>
                            <div className="text-xs text-muted-foreground">{cat.count} محصول</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 flex-shrink-0 mr-auto">
              {/* Search */}
              <div className={cn('relative transition-all duration-300', searchOpen ? 'w-64' : 'w-auto')}>
                {searchOpen ? (
                  <div className="flex items-center">
                    <Input
                      autoFocus
                      placeholder="جستجو در پدیده..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-9 text-sm pl-8"
                      onBlur={() => !searchQuery && setSearchOpen(false)}
                    />
                    <X
                      className="absolute left-2 w-4 h-4 text-muted-foreground cursor-pointer"
                      onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                    />
                  </div>
                ) : (
                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setSearchOpen(true)}>
                    <Search className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hidden md:flex"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="h-9 w-9 relative hidden md:flex">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 left-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>

              {/* Wishlist */}
              <Button variant="ghost" size="icon" className="h-9 w-9 relative" asChild>
                <Link href="/wishlist">
                  <Heart className="w-4 h-4" />
                  <Badge className="absolute -top-1 -left-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-primary">۳</Badge>
                </Link>
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="icon" className="h-9 w-9 relative" asChild>
                <Link href="/cart">
                  <ShoppingCart className="w-4 h-4" />
                  <Badge className="absolute -top-1 -left-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-primary">۲</Badge>
                </Link>
              </Button>

              {/* User */}
              <Button variant="ghost" size="icon" className="h-9 w-9 hidden md:flex" asChild>
                <Link href="/dashboard">
                  <User className="w-4 h-4" />
                </Link>
              </Button>

              {/* Login CTA */}
              <Button size="sm" className="hidden md:flex bg-cyan-600 hover:bg-cyan-700 text-white h-10 px-5 font-semibold shadow-lg" asChild>
                <Link href="/login">ورود / ثبت‌نام</Link>
              </Button>

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-background pb-4 px-4">
            <nav className="flex flex-col gap-1 mt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold" asChild>
                  <Link href="/login">ورود / ثبت‌نام</Link>
                </Button>
                <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
