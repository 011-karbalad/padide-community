import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg">
          {/* 404 graphic */}
          <div className="relative mb-8">
            <p className="text-[9rem] font-black text-muted/40 leading-none select-none">۴۰۴</p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-primary" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-3">صفحه پیدا نشد</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            صفحه‌ای که دنبالش می‌گردید وجود ندارد یا منتقل شده است.
            می‌توانید به صفحه اصلی برگردید یا محصولات را جستجو کنید.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                صفحه اصلی
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/shop">
                <ArrowLeft className="w-4 h-4" />
                مشاهده محصولات
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
