# راهنمای شروع - سایت فروشگاه پدیده

## تست سایت

### 1. صفحه اصلی
- آدرس: `http://localhost:3000`
- محصولات ویژه و پرفروش نمایش داده می‌شوند

### 2. مرور محصولات
- آدرس: `http://localhost:3000/shop`
- فیلترهای:
  - جستجو
  - دسته‌بندی
  - برند
  - نوع ارسال (عادی/اقساطی)

### 3. مشاهده محصول
- کلیک روی هر محصول
- نمایش جزئیات کامل
- افزودن به سبد خرید
- افزودن به علاقه‌مندی‌ها

### 4. سبد خرید
- آدرس: `http://localhost:3000/cart`
- مدیریت تعداد محصولات
- مشاهده قیمت نهایی
- ادامه برای تسویه حساب

### 5. تسویه حساب
- آدرس: `http://localhost:3000/checkout`
- مرحله 1: وارد کردن آدرس
- مرحله 2: انتخاب روش ارسال
- مرحله 3: انتخاب روش پرداخت
- مرحله 4: تأیید نهایی

### 6. ورود و داشبورد
**ورود:**
- آدرس: `http://localhost:3000/auth/login`
- ایمیل: `demo@example.com`
- رمز: `123456`

**داشبورد:**
- آدرس: `http://localhost:3000/dashboard`
- مشاهده سفارش‌ها
- مدیریت آدرس‌های تحویل
- مشاهده علاقه‌مندی‌ها

## ساختار Stores

### Cart Store
```javascript
import { useCartStore } from '@/lib/store/cart'

// استفاده
const { items, addItem, removeItem, updateQuantity, getTotalPrice } = useCartStore()
```

### User Store
```javascript
import { useUserStore } from '@/lib/store/user'

// استفاده
const { user, isLoggedIn, login, logout } = useUserStore()
```

## محصولات موجود

37 محصول از برندهای:
- Apple
- Samsung
- Nokia
- LG
- Sony
- HTC

## شامل شده‌ها

- [x] Product Details Page
- [x] Shopping Cart
- [x] Checkout Process
- [x] User Dashboard
- [x] Login Page
- [x] Local Product Database (37 products)
- [x] Zustand State Management
- [x] Tailwind CSS Styling
- [x] Dark Mode Support
- [x] RTL Layout
- [x] Responsive Design

## برای توسعه

### اضافه کردن محصول جدید
```typescript
// lib/data.ts میں
products.push({
  id: 'new-product',
  slug: 'new-product',
  name: 'نام محصول',
  // ... سایر فیلدها
})
```

### اتصال درگاه پرداخت
```typescript
// app/checkout/page.tsx میں
const handlePayment = async () => {
  // پرداخت از طریق درگاه
}
```

### اتصال WordPress
1. فعال کردن API درGLASS
2. تنظیم `WORDPRESS_STORE_URL`
3. Uncomment `useWCProducts` hooks

## مشکل‌ های رایج

**سبد خرید خالی است:**
- Zustand store data محلی است
- بعد از رفرش صفحه، داده‌ها در localStorage ذخیره می‌شوند

**نتوانستم وارد شوم:**
- اطمینان حاصل کنید از تطابق ایمیل و رمز
- داده‌های دمو استفاده کنید

**محصولات نمایش داده نمی‌شوند:**
- محصولات از `lib/data.ts` لود می‌شوند
- اگر WordPress متصل باشد، از آنجا لود می‌شوند

## محلی سازی (i18n)

- تمام متن‌ها به فارسی
- تاریخ‌ها در قالب شمسی
- قیمت‌ها به فارسی
- Layout RTL

## پشتیبانی

برای سوال‌های بیشتر:
- مراجعه به `FEATURES_COMPLETED.md`
- مراجعه به `WORDPRESS_CONNECTION_GUIDE.md`
- مراجعه به `STATUS_REPORT.md`

Good luck! 🚀
