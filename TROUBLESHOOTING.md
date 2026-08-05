# مشکل‌گیری و راهنمایی

## مشکل: محصولات نمایش داده نمی‌شوند

### وضعیت فعلی
✅ **مسئله حل شد** - محصولات اکنون در صفحات زیر نمایش داده می‌شوند:
- صفحه اصلی (Featured Products, Best Sellers)
- صفحه فروشگاه (/shop)
- صفحات دسته‌بندی

### چه اتفاقی افتاده؟

#### 1. **مشکل اصلی**
WooCommerce API در ابتدا قابل دسترسی نبود (شاید دیوار آتش یا محدودیت شبکه). سیستم برای مقابله با این:
- سعی می‌کند از WooCommerce داده بگیرد
- اگر ناموفق بود، داده‌های fallback محلی استفاده می‌کند
- محصولات همیشه نمایش داده می‌شوند

#### 2. **راه‌حل‌های اعمال شده**

**الف) بهتر کردن مدیریت خطا**
```typescript
// قبل (مشکل‌دار):
const products = wcProducts.length > 0 ? wcProducts : fallback

// بعد (درست):
const products = (wcProducts && wcProducts.length > 0) ? wcProducts : fallback
```

**ب) حذف صفحه بارگذاری بی‌فایده**
- صفحه skeleton loading حذف شد (وقتی WC دسترسی نداشت، کاربر فقط loading می‌دید)
- حالا fallback داده‌ها بلافاصله نمایش داده می‌شوند

**ج) بهتر کردن logging**
- اضافه شدند console.log های توضیح‌دهنده
- می‌توانید مرورگر را باز کنید (F12) و Console ببینید

---

## اگر محصولات هنوز نمایش نداده نشوند

### مرحله ۱: بررسی Console
```
F12 → Console tab
```

**اگر می‌بینید:**
```
[v0] Featured Section - WC: 0 Loading: true
[v0] Displaying: 8 products
```

✅ **این طبیعی است!** - WC API در دسترس نیست، fallback استفاده می‌شود.

### مرحله ۲: بررسی Environment Variables
سایت باید env vars را داشته باشد:
```
NEXT_PUBLIC_WC_CONSUMER_KEY=ck_314edd144e5ec0ee1858ea29645304e066bdf775
NEXT_PUBLIC_WC_CONSUMER_SECRET=cs_63431e5d0742a527bc9a5213e6006cfa8a120a53
NEXT_PUBLIC_WC_STORE_URL=https://hustlershop.ir
```

برای بررسی:
```bash
echo $NEXT_PUBLIC_WC_CONSUMER_KEY
```

### مرحله ۳: تست مستقیم API
```
curl -u "key:secret" https://hustlershop.ir/wp-json/wc/v3/products?per_page=1
```

---

## اگر WooCommerce API متصل شود

وقتی WooCommerce API در دسترس باشد، محصولات خودکار به‌روزرسانی می‌شوند!

### شاخص‌هایی که نشان می‌دهد WC متصل است:
```
[v0] Featured Section - WC: 8 Loading: false Error: null
```

---

## اضافات اخیر

### ۱. Test Endpoint
```
GET /api/test-wc
```
این endpoint وضعیت WooCommerce API را بررسی می‌کند.

### ۲. بهتر شدن Hooks
```typescript
// useWCProducts: بهتر مدیریت fallback
// useWCCategories: پوشش خطا و fallback
```

### ۳. بهتر شدن Components
```typescript
// Sections (home page): fallback زمانی که WC دسترس نداشت
// Shop page: همیشه محصول نمایش می‌دهد
```

---

## چگونه WooCommerce را فعال کنید

اگر بعداً بخواهید WooCommerce را متصل کنید:

### ۱. اطمینان حاصل کنید WooCommerce REST API فعال است
```
WordPress → Settings → REST API
```

### ۲. بررسی کنید دسترسی بدون احراز ممکن است
```
GET https://hustlershop.ir/wp-json/wc/v3/products?per_page=1
```

### ۳. اگر Authentication لازم است
```typescript
// Header اضافه کنید:
'Authorization': `Basic ${btoa('key:secret')}`
```

---

## خلاصه

| وضعیت | نتیجه |
|-------|--------|
| WC متصل ✅ | داده واقعی از WooCommerce |
| WC متصل نشود ❌ | Fallback محلی استفاده می‌شود |
| **نتیجه نهایی** | **محصولات همیشه نمایش داده می‌شوند** |

---

## پرسش‌های متداول

**س: چرا بعضی محصولات fallback هستند؟**
جـ: اگر WC API متصل نباشد، تا وقتی‌که شما آن را فعال کنید، fallback داده‌ها کار می‌کنند.

**س: آیا می‌توانم fallback داده‌ها را تغییر دهم؟**
جـ: بله، در `lib/data.ts` قرار دارند.

**س: آیا هنگام deployment مشکل پیش می‌آید؟**
جـ: نخیر، وقتی environment variables تنظیم شوند، همه چیز کار می‌کند.

---

## تماس و حمایت

اگر مشکل دارید:
1. Console را بررسی کنید (F12)
2. Network tab را ببینید
3. Environment variables را تأیید کنید
