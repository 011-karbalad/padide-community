import Link from 'next/link'
import { Phone, Mail, MapPin, Camera, MessageCircle, Video, AtSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const footerLinks = {
  shop: {
    title: 'فروشگاه',
    links: [
      { label: 'همه محصولات', href: '/shop' },
      { label: 'پیشنهادات ویژه', href: '/offers' },
      { label: 'خرید اقساطی', href: '/installment' },
      { label: 'جدیدترین‌ها', href: '/shop?sort=newest' },
      { label: 'پرفروش‌ترین‌ها', href: '/shop?sort=bestseller' },
    ],
  },
  services: {
    title: 'خدمات',
    links: [
      { label: 'سرویس تعمیر', href: '/repair' },
      { label: 'پیگیری تعمیر', href: '/repair/track' },
      { label: 'ضمانت‌نامه', href: '/warranty' },
      { label: 'ارسال و تحویل', href: '/shipping' },
      { label: 'پشتیبانی', href: '/support' },
    ],
  },
  info: {
    title: 'اطلاعات',
    links: [
      { label: 'درباره ما', href: '/about' },
      { label: 'بلاگ', href: '/blog' },
      { label: 'سوالات متداول', href: '/faq' },
      { label: 'شرایط استفاده', href: '/terms' },
      { label: 'حریم خصوصی', href: '/privacy' },
    ],
  },
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-background">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg">پ</span>
              </div>
              <span className="font-bold text-xl text-background">پدیده</span>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed mb-6">
              پدیده، بزرگترین فروشگاه آنلاین قطعات یدکی موبایل و تجهیزات تعمیر در ایران.
              با بیش از ۵۰۰۰ محصول اورجینال، ارسال سریع و ضمانت اصالت کالا.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3 mb-6">
              <a href="tel:02112345678" className="flex items-center gap-2 text-sm text-background/80 hover:text-background transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0 text-brand-muted" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </a>
              <a href="mailto:info@padideh.ir" className="flex items-center gap-2 text-sm text-background/80 hover:text-background transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0 text-brand-muted" />
                <span>info@padideh.ir</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-background/80">
                <MapPin className="w-4 h-4 flex-shrink-0 text-brand-muted" />
                <span>ارومیه فلکه خیام موبایل پدیده</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a href="#" aria-label="اینستاگرام" className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center hover:bg-brand transition-colors">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" aria-label="تلگرام" className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center hover:bg-brand transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" aria-label="آپارات" className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center hover:bg-brand transition-colors">
                <Video className="w-4 h-4" />
              </a>
              <a href="#" aria-label="ایمیل" className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center hover:bg-brand transition-colors">
                <AtSign className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-background mb-4">{section.title}</h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <Separator className="my-8 bg-background/10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-background mb-1">خبرنامه پدیده</h3>
            <p className="text-sm text-background/70">از جدیدترین محصولات و تخفیف‌ها باخبر شوید</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              placeholder="آدرس ایمیل شما"
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50 h-10 w-64"
            />
            <Button className="bg-brand hover:bg-brand-dark text-white h-10 flex-shrink-0">
              عضویت
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-background/60">
            © ۱۴۰۳ پدیده. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-background/60">نماد اعتماد</span>
            <div className="w-10 h-10 bg-background/10 rounded-lg border border-background/20 flex items-center justify-center text-xs text-background/70">
              e‌نماد
            </div>
            <div className="w-10 h-10 bg-background/10 rounded-lg border border-background/20 flex items-center justify-center text-xs text-background/70">
              ساماد
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
