# 🛍️ Padideh Ecommerce - پدیده فروشگاه

**فروشگاه الکترونیکی قطعات و تعمیرات موبایل - یکپارچه‌شده با WooCommerce**

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC)

---

## 📋 فهرست

- [نمای کلی](#نمای-کلی)
- [ویژگی‌های اصلی](#ویژگی‌های-اصلی)
- [شروع سریع](#شروع-سریع)
- [ساختار پروژه](#ساختار-پروژه)
- [راهنمای توسعه](#راهنمای-توسعه)
- [WooCommerce Integration](#woocommerce-integration)
- [استقرار](#استقرار)
- [مشکل‌یابی](#مشکل‌یابی)

---

## 📱 نمای کلی

**Padideh** یک فروشگاه الکترونیکی مدرن برای فروش قطعات و تعمیرات موبایل است که:

- ✨ **دیزاین حرفه‌ای و مدرن** با رنگ‌های تیل و نیلی
- 🛒 **سبد خرید کامل** با Zustand state management
- 📦 **یکپارچه‌سازی کامل با WooCommerce** - تمام محصولات و سفارش‌ها واقعی هستند
- 💳 **دو روش پرداخت**: درگاه بانکی و پرداخت در محل
- 🌍 **پشتیبانی کامل RTL** برای زبان فارسی
- 📱 **Responsive Design** برای تمام دستگاه‌ها
- ⚡ **بهینه‌سازی شده برای سرعت** با Next.js 16
- 🔐 **ایمن و محافظت‌شده** - Basic Auth برای API

---

## ✨ ویژگی‌های اصلی

### 🏪 فروشگاه
- دریافت محصولات مستقیم از WooCommerce
- جستجو و فیلترینگ پیشرفته
- مرتب‌سازی (قیمت، محبوبیت، جدید)
- مشاهده جزئیات محصول
- اضافه کردن به سبد خرید

### 🛒 سبد خرید
- مدیریت تعداد محصولات
- محاسبه خودکار مجموع (شامل مالیات و ارسال)
- ذخیره‌سازی محلی (localStorage)
- Wishlist (علاقه‌مندی‌ها)

### 💳 تسویه حساب
- فرم ثبت اطلاعات شامل:
  - نام و نام خانوادگی
  - ایمیل و تلفن
  - آدرس کامل (استان، شهر، خیابان)
  - کد پستی
- انتخاب روش پرداخت
- تأیید نهایی و ارسال سفارش

### 📊 مدیریت سفارش‌ها
- ایجاد خودکار سفارش در WooCommerce
- صفحه تأیید شامل:
  - شماره سفارش و تاریخ
  - وضعیت سفارش (Timeline)
  - جزئیات محصولات
  - اطلاعات بیلینگ و ارسال

### 🎨 طراحی مدرن
- رنگ‌های تیل و نیلی (Cyan & Blue)
- انیمیشن‌های نرم و زیبا
- Gradient backgrounds
- Glass morphism effects
- تمام صفحات RTL compatible

---

## 🚀 شروع سریع

### نیازمندی‌ها (Prerequisites)

```bash
- Node.js 18+ (یا بالاتر)
- pnpm (یا npm/yarn)
- Git
```

### نصب و راه‌اندازی

1. **کلون کردن پروژه**
```bash
git clone <repository-url>
cd padideh-ecommerce
```

2. **نصب وابستگی‌ها**
```bash
pnpm install
# یا
npm install
```

3. **تنظیم متغیرهای محیط**
```bash
# .env.local فایل ایجاد کنید
NEXT_PUBLIC_WC_CONSUMER_KEY=ck_314edd144e5ec0ee1858ea29645304e066bdf775
NEXT_PUBLIC_WC_CONSUMER_SECRET=cs_63431e5d0742a527bc9a5213e6006cfa8a120a53
NEXT_PUBLIC_WC_STORE_URL=https://hustlershop.ir
```

4. **اجرای development server**
```bash
pnpm dev
# یا
npm run dev
```

5. **باز کردن در مرورگر**
```
http://localhost:3000
```

---

## 📁 ساختار پروژه

```
padideh-ecommerce/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # صفحه اصلی
│   ├── shop/                    # صفحه فروشگاه
│   ├── checkout/                # صفحه تسویه حساب
│   ├── order-confirmation/      # صفحه تأیید سفارش
│   ├── cart/                    # صفحه سبد خرید
│   ├── products/                # جزئیات محصول
│   ├── dashboard/               # داشبورد کاربر
│   ├── admin/                   # پنل مدیریت
│   └── globals.css              # Global styles
│
├── components/                   # React Components
│   ├── layout/                  # Header, Footer, Navbar
│   ├── products/                # Product components
│   ├── home/                    # Homepage components
│   ├── ui/                      # UI library components (shadcn)
│   └── providers/               # Context & Providers
│
├── lib/                          # Utility functions
│   ├── wordpress-api.ts         # WooCommerce API integration ⭐
│   ├── store.ts                 # Zustand store (Cart)
│   ├── types.ts                 # TypeScript types
│   ├── data.ts                  # Fallback data
│   └── utils.ts                 # Helper functions
│
├── hooks/                        # Custom React Hooks
│   ├── use-wc-cart.ts          # Shopping cart hook ⭐
│   ├── use-wc-products.ts      # Products fetching hook ⭐
│   └── use-mobile.ts            # Mobile detection
│
├── public/                       # Static assets
│   └── images/                  # Image files
│
├── styles/                       # Additional styles
│
└── docs/                         # Documentation
    ├── WOOCOMMERCE_INTEGRATION.md  # Technical guide
    ├── WOOCOMMERCE_SETUP.md        # Setup complete
    ├── DESIGN_UPDATES.md           # Design changes
    └── README_FA.md               # This file
```

---

## 🔧 راهنمای توسعه

### اضافه کردن صفحه جدید

1. **ایجاد فایل صفحه**
```typescript
// app/new-page/page.tsx
'use client'

import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function NewPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* محتوا */}
      </main>
      <Footer />
    </div>
  )
}
```

### استفاده از WooCommerce API

```typescript
// محصولات را دریافت کنید
import { useWCProducts } from '@/hooks/use-wc-products'

export function MyComponent() {
  const { products, loading, error } = useWCProducts({
    page: 1,
    perPage: 20,
    search: 'query'
  })

  return (
    <>
      {products.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </>
  )
}
```

### اضافه کردن Component جدید

```typescript
// components/my-component/index.tsx
'use client'

import { Button } from '@/components/ui/button'

interface Props {
  title: string
  onClick?: () => void
}

export function MyComponent({ title, onClick }: Props) {
  return (
    <Button onClick={onClick}>
      {title}
    </Button>
  )
}
```

### استفاده از Zustand Store

```typescript
// سبد خرید
import { useCartStore } from '@/lib/store'

export function CartTotal() {
  const total = useCartStore(state => state.cartTotal())
  const count = useCartStore(state => state.cartCount())

  return <div>تعداد: {count} | مجموع: {total}</div>
}
```

---

## 🌐 WooCommerce Integration

### تمام محصولات از WooCommerce می‌آیند

```typescript
// backend: https://hustlershop.ir
// API: https://hustlershop.ir/wp-json/wc/v3

fetchWPProducts()      // تمام محصولات
fetchWPProduct(id)     // محصول واحد
fetchWPCategories()    // دسته‌بندی‌ها
createWCOrder()        // ایجاد سفارش
fetchWCOrder(id)       // جزئیات سفارش
```

### ایجاد سفارش

```typescript
const order = await createWCOrder({
  customer_email: 'user@email.com',
  customer_first_name: 'علی',
  customer_last_name: 'محمدی',
  line_items: [
    { product_id: 123, quantity: 1 }
  ],
  payment_method: 'bank_transfer',
  billing: { /* ... */ },
  shipping: { /* ... */ }
})

console.log('Order ID:', order.id)
```

### ذخیره‌سازی اطلاعات

- ✅ تمام محصولات در WooCommerce
- ✅ تمام سفارش‌ها در WooCommerce
- ✅ اطلاعات مشتری در WooCommerce
- ✅ تاریخچه خرید در WooCommerce

---

## 🚀 استقرار (Deployment)

### استقرار بر روی Vercel

1. **پوش به GitHub**
```bash
git add .
git commit -m "WooCommerce integration complete"
git push origin main
```

2. **متصل کردن به Vercel**
- [Vercel Dashboard](https://vercel.com/dashboard) باز کنید
- پروژه را import کنید
- Environment variables اضافه کنید

3. **تنظیم Environment Variables**
```
NEXT_PUBLIC_WC_CONSUMER_KEY
NEXT_PUBLIC_WC_CONSUMER_SECRET
NEXT_PUBLIC_WC_STORE_URL
```

4. **استقرار**
```bash
# اتوماتیک استقرار هنگام push
# یا دستی از Vercel Dashboard
```

### ساخت Production Build

```bash
pnpm build
# یا
npm run build
```

---

## 🐛 مشکل‌یابی

### مشکل: محصولات بارگذاری نمی‌شوند

**راه‌حل:**
```bash
# 1. بررسی متغیرهای محیط
echo $NEXT_PUBLIC_WC_CONSUMER_KEY

# 2. بررسی اتصال اینترنت
ping hustlershop.ir

# 3. بررسی logs
# در browser console (F12)
```

### مشکل: سفارش ایجاد نمی‌شود

**راه‌حل:**
```bash
# تمام فیلدهای الزامی را بررسی کنید:
- firstName, lastName
- email, phone
- address, city, province
- postalCode
- paymentMethod
```

### مشکل: "CORS" error

**راه‌حل:**
```javascript
// Vercel خودکار CORS را حل می‌کند
// اگر محلی مشکل دارید، proxy استفاده کنید
```

---

## 📚 منابع اضافی

| منبع | توضیح |
|------|-------|
| [WOOCOMMERCE_INTEGRATION.md](./WOOCOMMERCE_INTEGRATION.md) | راهنمای تکنیکی کامل |
| [WOOCOMMERCE_SETUP.md](./WOOCOMMERCE_SETUP.md) | خلاصه تنظیمات |
| [DESIGN_UPDATES.md](./DESIGN_UPDATES.md) | تغییرات طراحی |
| [Next.js Docs](https://nextjs.org/docs) | اسناد Next.js |
| [WooCommerce API](https://developer.woocommerce.com/docs/plugins/woocommerce/woocommerce-rest-api/) | WooCommerce REST API |
| [Tailwind CSS](https://tailwindcss.com/docs) | Tailwind CSS |
| [React Docs](https://react.dev) | React |

---

## 📝 لایسنس

MIT License - برای جزئیات مراجعه کنید به فایل LICENSE

---

## 👨‍💻 توسعه‌دهنده

ساخته شده توسط **v0 AI Assistant**  
با ❤️ برای **Padideh** - بزرگ‌ترین فروشگاه قطعات موبایل

---

## 🎯 چه کار می‌کنید الان؟

```
✅ محصولات واقعی از WooCommerce
✅ سبد خرید کامل
✅ تسویه حساب و پرداخت
✅ مدیریت سفارش‌ها
✅ دیزاین مدرن و خوشگل
✅ پروژه production-ready
```

---

## 📞 پشتیبانی

برای سوالات و مشکلات:
- مراجعه به [WOOCOMMERCE_INTEGRATION.md](./WOOCOMMERCE_INTEGRATION.md)
- بررسی console logs (F12)
- تماس با پشتیبانی Vercel

---

**نوشته شده با ❤️ - آخرین به‌روزرسانی: 11 جولای 2026**
