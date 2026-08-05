'use client'

import Link from 'next/link'
import { ArrowLeft, Star, Clock, CheckCircle, Wrench, Package, Headphones, Shield, Zap, Award, TrendingUp, Users, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CategoryCard } from '@/components/products/category-card'
import { ProductCard } from '@/components/products/product-card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { categories } from '@/lib/data'
import { useFeaturedProducts, useBestSellerProducts } from '@/hooks/use-wc-products'

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({
  badge,
  title,
  subtitle,
  viewAllHref,
}: {
  badge?: string
  title: string
  subtitle?: string
  viewAllHref?: string
}) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        {badge && (
          <Badge className="bg-primary/10 text-primary border-0 mb-2 text-xs">{badge}</Badge>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Button variant="ghost" size="sm" className="text-primary gap-1 hover:gap-2 transition-all" asChild>
          <Link href={viewAllHref}>
            مشاهده همه
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
      )}
    </div>
  )
}

// ─── Categories Section ───────────────────────────────────────────────────────
export function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <SectionHeader
        badge="دسته‌بندی‌ها"
        title="همه چیز برای تعمیر موبایل"
        subtitle="قطعات اورجینال برای تمام برندها و مدل‌ها"
        viewAllHref="/categories"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.slice(0, 6).map((cat) => (
          <CategoryCard key={cat.id} category={cat} variant="compact" />
        ))}
      </div>
    </section>
  )
}

// ─── Featured Products ────────────────────────────────────────────────────────
export function FeaturedProductsSection() {
  const { products: displayProducts, loading, wcCount } = useFeaturedProducts(8)

  return (
    <section className="bg-surface/50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          badge="محصولات ویژه"
          title="پیشنهادات ویژه پدیده"
          subtitle={wcCount > 0 ? `محصولات محلی + ${wcCount} محصول از هاسلر شاپ` : 'با ضمانت اصالت و ارسال سریع'}
          viewAllHref="/shop?filter=featured"
        />
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Best Sellers ─────────────────────────────────────────────────────────────
export function BestSellersSection() {
  const { products: displayProducts, loading } = useBestSellerProducts(8)

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <SectionHeader
        badge="پرفروش‌ترین‌ها"
        title="محصولات پرطرفدار"
        subtitle="انتخاب هزاران تعمیرکار حرفه‌ای"
        viewAllHref="/shop?sort=bestseller"
      />
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

// ─── Installment Banner ───────────────────────────────────────────────────────
export function InstallmentBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative overflow-hidden rounded-3xl hero-bg p-8 md:p-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Badge className="bg-white/20 text-white border-0 mb-3">خرید اقساطی</Badge>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-3">
              بخر، بعداً پرداخت کن
            </h2>
            <p className="text-white/80 text-lg mb-2">تا ۲۴ ماه قسط بدون بهره</p>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" />بدون ضامن</div>
              <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" />تأیید آنی</div>
              <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" />همه محصولات</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <Zap className="w-8 h-8 text-yellow-300" />
              <div>
                <p className="text-white font-bold text-lg">از ۱۰۰,۰۰۰ تومان</p>
                <p className="text-white/70 text-sm">پیش‌پرداخت</p>
              </div>
            </div>
            <Button size="lg" className="bg-white text-brand hover:bg-white/90 font-semibold w-full" asChild>
              <Link href="/installment">شروع خرید اقساطی</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Repair Service Banner ────────────────────────────────────────────────────
export function RepairServiceBanner() {
  const steps = [
    { step: '۱', title: 'ثبت درخواست', desc: 'دستگاه و مشکل را توضیح دهید' },
    { step: '۲', title: 'ارسال دستگاه', desc: 'دستگاه خود را برای ما ارسال کنید' },
    { step: '۳', title: 'تعمیر تخصصی', desc: 'توسط متخصصان ما تعمیر می‌شود' },
    { step: '۴', title: 'تحویل با ضمانت', desc: 'با ضمانت ۳ ماهه تحویل می‌گیرید' },
  ]

  return (
    <section className="py-12 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="bg-primary/10 text-primary border-0 mb-4">خدمات تعمیر</Badge>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              تعمیر تخصصی موبایل<br />
              <span className="text-gradient-blue">در کوتاه‌ترین زمان</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              با تیم متخصص پدیده، گوشی شما در کمتر از ۲۴ ساعت تعمیر می‌شود. از صفحه شکسته تا مشکلات سخت‌افزاری پیچیده.
            </p>
            <div className="flex gap-3 flex-wrap mb-8">
              {['تعمیر LCD', 'تعویض باتری', 'مشکل شارژ', 'مشکل نرم‌افزار', 'تعمیر برد'].map((s) => (
                <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
              ))}
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <Link href="/repair/new">ثبت درخواست تعمیر</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/repair/track">پیگیری تعمیر</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {steps.map((step) => (
              <div key={step.step} className="bg-card rounded-2xl border border-border p-5 hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold mb-3">
                  {step.step}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Advantages ───────────────────────────────────────────────────────────────
export function AdvantagesSection() {
  const advantages = [
    {
      icon: Shield,
      title: 'ضمانت اصالت کالا',
      desc: 'تمام محصولات با برچسب اصالت و کد رهگیری',
      color: 'text-primary bg-primary/10',
    },
    {
      icon: Package,
      title: 'ارسال سریع',
      desc: 'تحویل در تهران ۲۴ ساعته، سراسر کشور ۴۸ ساعته',
      color: 'text-emerald-600 bg-emerald-100',
    },
    {
      icon: Headphones,
      title: 'پشتیبانی ۲۴/۷',
      desc: 'تیم پشتیبانی متخصص همیشه در دسترس شماست',
      color: 'text-purple-600 bg-purple-100',
    },
    {
      icon: Award,
      title: 'ضمانت ��ازگشت',
      desc: 'بازگشت بدون قید و شرط در ۷ روز اول',
      color: 'text-amber-600 bg-amber-100',
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {advantages.map((adv) => {
          const Icon = adv.icon
          return (
            <div key={adv.title} className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all card-hover">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${adv.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{adv.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{adv.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
export function ReviewsSection() {
  const reviews = [
    { name: 'علی رضایی', role: 'تعمیرکار موبایل', rating: 5, text: 'قطعات پدیده از نظر کیفیت در ایران بی‌نظیرن. ۳ ساله دارم باهاشون کار می‌کنم و هیچ مشکلی نداشتم.', avatar: 'ع' },
    { name: 'مریم احمدی', role: 'خریدار عادی', rating: 5, text: 'باتری آیفون ۱۴ م رو از پدیده خریدم. اورجینال بود و کاملاً مشکلم حل شد. ارسال هم خیلی سریع بود.', avatar: 'م' },
    { name: 'حسین کریمی', role: 'مدیر نمایندگی تعمیرات', rating: 5, text: 'پدیده تنها سایتیه که می‌تونم بهش اعتماد کنم. قیمت‌ها منصفانه و کیفیت قطعات عالی.', avatar: 'ح' },
    { name: 'سارا موسوی', role: 'دانشجوی مهندسی الکترونیک', rating: 4, text: 'برای پروژه دانشگاهیم ابزار تعمیر خریدم. کیفیت خوب و قیمت مناسب. پیشنهاد می‌کنم.', avatar: 'س' },
  ]

  return (
    <section className="bg-surface/50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          badge="نظرات مشتریان"
          title="تجربه مشتریان پدیده"
          subtitle="بیش از ۸۰,۰۰۰ مشتری راضی"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-5 flex flex-col gap-4">
              <Quote className="w-6 h-6 text-primary/30" />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{review.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
                <div className="mr-auto flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export function FAQSection() {
  const faqs = [
    { q: 'آیا قطعات پدیده اورجینال هستند؟', a: 'بله، تمام قطعات فروخته شده در پدیده اورجینال و با ضمانت اصالت هستند. هر محصول دارای کد رهگیری و برچسب اصالت است که می‌توانید از سایت تولیدکننده استعلام بگیرید.' },
    { q: 'مدت زمان ارسال چقدر است؟', a: 'برای سفارشات تهران، تحویل در ۲۴ ساعت کاری انجام می‌شود. برای سایر شهرها بسته به موقعیت جغرافیایی ۲ تا ۵ روز کاری زمان می‌برد.' },
    { q: 'شرایط خرید اقساطی چیست؟', a: 'خرید اقساطی در پدیده بدون ضامن و با مدارک ساده امکان‌پذیر است. حداقل پیش‌پرداخت ۲۰٪ قیمت کالا بوده و تعداد اقساط از ۳ تا ۲۴ ماه قابل انتخاب است.' },
    { q: 'آیا امکان بازگشت کالا وجود دارد؟', a: 'بله، در صورت عدم رضایت یا دریافت کالای معیوب، تا ۷ روز پس از دریافت امکان مرجوعی بدون قید و شرط وجود دارد. هزینه ارسال مرجوعی به عهده پدیده است.' },
    { q: 'چطور می‌توانم درخواست تعمیر ثبت کنم؟', a: 'از منوی "تعمیرات" وارد صفحه ثبت درخواست شوید. مشخصات دستگاه، توضیح مشکل و عکس را وارد کنید. پس از بررسی اولیه، تیم ما با شما تماس می‌گیرد.' },
    { q: 'ضمانت‌نامه محصولات چقدر است؟', a: 'قطعات الکترونیکی ۶ ماه، باتری‌ها ۳ ماه و تجهیزات تعمیر ۱ سال ضمانت دارند. محصولات تعمیر شده نیز ۳ ماه ضمانت دریافت می‌کنند.' },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <SectionHeader
        badge="سوالات متداول"
        title="پرسش‌های رایج"
        subtitle="پاسخ سوالات متداول مشتریان"
      />
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-2xl px-4 overflow-hidden">
              <AccordionTrigger className="text-right text-sm font-medium py-4 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

// ─── Stats Section ────────────────────────────────────────────────────────────
export function StatsSection() {
  const stats = [
    { icon: Package, value: '۵,۰۰۰+', label: 'محصول موجود', color: 'text-primary' },
    { icon: Users, value: '۸۰,۰۰۰+', label: 'مشتری راضی', color: 'text-emerald-600' },
    { icon: Wrench, value: '۵۰,۰۰۰+', label: 'تعمیر انجام شده', color: 'text-purple-600' },
    { icon: Award, value: '۱۰+', label: 'سال تجربه', color: 'text-amber-600' },
  ]

  return (
    <section className="hero-bg py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label}>
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Brands Slider ────────────────────────────────────────────────────────────
export function BrandsSection() {
  const brandNames = ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus', 'Oppo', 'Vivo', 'Realme']

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <SectionHeader
        title="پشتیبانی از همه برندها"
        subtitle="قطعه مناسب برای گوشی شما"
      />
      <div className="flex flex-wrap justify-center gap-4">
        {brandNames.map((brand) => (
          <Link
            key={brand}
            href={`/shop?brand=${encodeURIComponent(brand)}`}
            className="flex items-center justify-center h-16 px-8 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-md transition-all text-foreground font-semibold card-hover"
          >
            {brand}
          </Link>
        ))}
      </div>
    </section>
  )
}
