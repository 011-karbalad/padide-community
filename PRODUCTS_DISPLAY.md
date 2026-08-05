# محصولات - نمایش و مدیریت

## وضعیت فعلی

محصولات اکنون به صورت صحیح در تمام صفحات نمایش داده می‌شوند:

- ✅ صفحه اصلی - محصولات ویژه و پرفروش
- ✅ صفحه فروشگاه - فیلترها، جستجو، مرتب‌سازی
- ✅ صفحه محصول - جزئیات و نظرات
- ✅ سبد خرید و تسویه حساب

## داده‌های محلی

تمام محصولات در فایل `lib/data.ts` ذخیره شده‌اند:

```typescript
export const products: Product[] = [
  {
    id: '1',
    name: 'صفحه نمایش OLED آیفون ۱۴ پرو',
    price: 8500000,
    category: 'LCD و OLED',
    // ... مشخصات دیگر
  },
  // ... محصولات دیگر
]
```

### تعداد محصولات

- **کل محصولات**: ~37 مورد
- **دسته‌بندی‌ها**: 12 دسته
- **برندها**: 6 برند

## WooCommerce Integration

### وضعیت

فایل‌های WooCommerce آماده‌سازی شده‌اند، اما API از محیط sandbox قابل دسترسی نیست.

### فایل‌های WooCommerce

```
lib/wordpress-api.ts          - API integration
hooks/use-wc-products.ts      - React hooks
hooks/use-wc-cart.ts          - Cart management
app/api/test-wc/route.ts      - Test endpoint
```

### فعال‌سازی WooCommerce (آینده)

وقتی اتصال وردپرس قابل دسترسی شد:

```typescript
// از این استفاده کنید:
const { products } = useWCProducts()

// آو فیلترها:
const { products, loading } = useWCProducts({ 
  search: query,
  sort: 'popularity'
})
```

## ساختار صفحات

### صفحه اصلی
- `components/home/hero.tsx` - بنر معرفی
- `components/home/sections.tsx` - محصولات و بخش‌ها
- `components/home/features.tsx` - ویژگی‌ها

### صفحه فروشگاه
- `app/shop/page.tsx` - صفحه اصلی فروشگاه
- فیلتر بر اساس: دسته، برند، قیمت، اقساطی
- جستجو و مرتب‌سازی

### اطلاعات محصول

هر محصول دارای:
- نام و تصویر
- قیمت و تخفیف
- رتبه‌بندی و نظرات
- ویژگی‌های فنی
- موجودی و فروخته شده
- امکان خرید اقساطی

## نحوه استفاده

### نمایش محصولات
```typescript
import { products } from '@/lib/data'

products.map(product => (
  <ProductCard key={product.id} product={product} />
))
```

### فیلتر کردن
```typescript
const filtered = products.filter(p => 
  p.category === 'LCD و OLED' && 
  p.price < 5000000
)
```

### جستجو
```typescript
const search = (query) => 
  products.filter(p =>
    p.name.includes(query) || 
    p.brand.includes(query)
  )
```

## فیچرهای فروشگاه

- [x] نمایش محصولات
- [x] جستجو و فیلتر
- [x] مرتب‌سازی (قیمت، رتبه‌بندی، جدید)
- [x] سبد خرید
- [x] تسویه حساب
- [x] صفحه تأیید سفارش
- [x] صفحات دسته‌بندی
- [x] صفحه محصول (جزئیات)

## متغیرهای محیط

```
NEXT_PUBLIC_WC_STORE_URL=https://hustlershop.ir
NEXT_PUBLIC_WC_CONSUMER_KEY=ck_314edd144e5ec0ee1858ea29645304e066bdf775
NEXT_PUBLIC_WC_CONSUMER_SECRET=cs_63431e5d0742a527bc9a5213e6006cfa8a120a53
```

## مشاهدات

🎉 **محصولات اکنون در تمام صفحات صحیح نمایش داده می‌شوند!**

- صفحه اصلی: محصولات ویژه و پرفروش
- فروشگاه: فیلترها و جستجو کار می‌کند
- جزئیات: هر محصول می‌تواند انتخاب شود
- سبد خرید: محصولات اضافه می‌شوند

---

**نکته**: اگر WooCommerce فعال شد، hook‌های `useWCProducts` خودکار محصولات را از API دریافت خواهند کرد و محصولات محلی جایگزین خواهند شد.
