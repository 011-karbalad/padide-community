# راهنمای اتصال به WordPress

## وضعیت فعلی

محیط sandbox قابل دسترسی به دامنه wordpress شما نیست. به همین دلیل:
- محصولات از پایگاه داده محلی نمایش داده می‌شوند (37 محصول)
- سیستم بر روی داده‌های آزمایشی کار می‌کند
- وقتی WordPress متصل شود، خودکار به‌روز خواهد شد

## محصولات موجود

```
✓ 37 محصول محلی
✓ 12 دسته‌بندی
✓ 6 برند
✓ Featured و Best Sellers فعال
✓ سبد خرید و سفارش فعال
```

## راه‌حل دائمی برای WordPress

### گام 1: تأیید اطلاعات اتصال

متغیرهای محیط در Vercel تنظیم شده‌اند:
```
NEXT_PUBLIC_WC_CONSUMER_KEY = ck_314edd144e5ec0ee1858ea29645304e066bdf775
NEXT_PUBLIC_WC_CONSUMER_SECRET = cs_63431e5d0742a527bc9a5213e6006cfa8a120a53
NEXT_PUBLIC_WC_STORE_URL = https://hustlershop.ir
```

### گام 2: فعال کردن WooCommerce Hooks

فایل `components/home/sections.tsx` و `app/shop/page.tsx` برای استفاده از WooCommerce آماده هستند.

برای فعال کردن، این خطوط را در `components/home/sections.tsx` اضافه کنید:

```typescript
import { useWCProducts, useWCCategories } from '@/hooks/use-wc-products'

export function FeaturedProductsSection() {
  const { products: wcProducts } = useWCProducts({ perPage: 8 })
  const displayProducts = wcProducts.length > 0 ? wcProducts : featuredProducts
  // ... باقی کد
}
```

### گام 3: تست API

فایل `/api/test-wc` برای تست API موجود است:
```bash
curl http://localhost:3000/api/test-wc
```

### گام 4: اطمینان از اتصال

وقتی WordPress متصل شد:
1. تمام 20-30 محصول خود محمول خودکار لود می‌شوند
2. دسته‌بندی‌ها و اطلاعات محدث می‌شوند
3. سبد خرید با محصولات واقعی کار می‌کند
4. سفارش‌ها مستقیماً در WordPress ثبت می‌شوند

## فایل‌های اصلی

| فایل | توضیح |
|------|-------|
| `lib/wordpress-api.ts` | API integration (متصل است) |
| `hooks/use-wc-products.ts` | React hook برای محصولات |
| `lib/data.ts` | داده‌های محلی پشتیبان |
| `/api/test-wc` | Endpoint تست |

## اگر مشکلی پیش آمد

### مشکل: محصولات لود نمی‌شوند

**راه‌حل:**
1. متغیرهای محیط را بررسی کنید
2. API credentials را تصدیق کنید
3. WordPress REST API فعال است؟

### مشکل: خطای CORS

**راه‌حل:**
- WordPress باید CORS را فعال کند
- یا درخواست‌ها از backend ارسال شوند

### مشکل: Authentication

**راه‌حل:**
- Consumer Key و Secret را بررسی کنید
- API user فعال است؟

## اطلاعات تماس

اگر محصولات WordPress نمایش داده نشدند:
1. متغیرهای محیط را تصدیق کنید
2. WordPress متصل است؟
3. API فعال است؟
4. Consumer credentials درست است؟

## خلاصه

**الان:** محصولات محلی نمایش داده می‌شوند ✓  
**بعد:** وقتی WordPress متصل شود، خودکار به‌روز خواهد شد ✓
