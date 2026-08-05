# WooCommerce Backend Integration Guide

## نمای کلی (Overview)

این پروژه کاملاً با WooCommerce (https://hustlershop.ir) یکپارچه شده است. تمام محصولات، سبد خرید، و سفارش‌ها مستقیماً از سرور WooCommerce مدیریت می‌شوند.

## تنظیمات الزام (Required Setup)

### Environment Variables
```bash
NEXT_PUBLIC_WC_CONSUMER_KEY=ck_314edd144e5ec0ee1858ea29645304e066bdf775
NEXT_PUBLIC_WC_CONSUMER_SECRET=cs_63431e5d0742a527bc9a5213e6006cfa8a120a53
NEXT_PUBLIC_WC_STORE_URL=https://hustlershop.ir
```

توجه: این متغیرها در فایل `.env.local` یا Vercel settings تنظیم شده‌اند.

## فایل‌های کلیدی (Key Files)

### 1. API Integration (`lib/wordpress-api.ts`)
فایل اصلی برای ارتباط با WooCommerce REST API:

```typescript
// محصولات را دریافت کنید
const products = await fetchWPProducts({
  page: 1,
  per_page: 20,
  search: 'آیفون',
  category: 5,
  sort: 'popularity'
})

// محصول واحد را دریافت کنید
const product = await fetchWPProduct(productId)

// دسته‌بندی‌ها را دریافت کنید
const categories = await fetchWPCategories()

// سفارش ایجاد کنید
const order = await createWCOrder({
  customer_email: 'user@example.com',
  customer_first_name: 'علی',
  customer_last_name: 'محمدی',
  phone_number: '09120000000',
  billing: { /* ... */ },
  shipping: { /* ... */ },
  line_items: [
    { product_id: 123, quantity: 1 },
    { product_id: 456, quantity: 2 }
  ],
  payment_method: 'bank_transfer',
  payment_method_title: 'درگاه بانکی'
})
```

### 2. Hooks (Composable Hooks)

#### `useWCProducts` - محصولات را دریافت کنید
```typescript
import { useWCProducts } from '@/hooks/use-wc-products'

export function ProductsPage() {
  const { products, loading, error } = useWCProducts({
    page: 1,
    perPage: 20,
    search: query,
    sort: 'newest'
  })

  return (
    <>
      {loading && <div>بارگذاری...</div>}
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </>
  )
}
```

#### `useWCCart` - سبد خرید را مدیریت کنید
```typescript
import { useWCCart } from '@/hooks/use-wc-cart'

export function CartPage() {
  const cart = useWCCart()

  const handleCheckout = async () => {
    const result = await cart.checkout({
      firstName: 'علی',
      lastName: 'محمدی',
      email: 'ali@example.com',
      phone: '09120000000',
      province: 'تهران',
      city: 'تهران',
      address: 'خیابان ولیعصر',
      postalCode: '12345',
      paymentMethod: 'bank_transfer'
    })

    if (result.success) {
      console.log('Order ID:', result.orderId)
      // Redirect to confirmation page
    }
  }

  return (
    <>
      <div>محصولات: {cart.items.length}</div>
      <div>مجموع: {cart.total}</div>
      <button onClick={handleCheckout}>پرداخت</button>
    </>
  )
}
```

#### `useWCProduct` - محصول واحد را دریافت کنید
```typescript
import { useWCProduct } from '@/hooks/use-wc-products'

export function ProductDetail({ productId }) {
  const { product, loading, error } = useWCProduct(productId)

  return (
    <>
      {loading && <div>بارگذاری...</div>}
      {product && <div>{product.name} - {product.price}</div>}
    </>
  )
}
```

#### `useWCCategories` - دسته‌بندی‌ها را دریافت کنید
```typescript
import { useWCCategories } from '@/hooks/use-wc-products'

export function CategoriesMenu() {
  const { categories, loading } = useWCCategories()

  return (
    <select>
      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </select>
  )
}
```

## صفحات اصلی (Main Pages)

### 1. **فروشگاه** (`/shop`)
- دریافت محصولات از WooCommerce
- فیلترینگ و جستجو
- مرتب‌سازی (قیمت، محبوبیت، جدید)
- اضافه کردن به سبد خرید

### 2. **تسویه حساب** (`/checkout`)
- فرم اطلاعات ارسال (نام، آدرس، تلفن، ایمیل)
- انتخاب روش ارسال
- انتخاب روش پرداخت (درگاه بانکی / پرداخت در محل)
- تأیید و ایجاد سفارش در WooCommerce

### 3. **تأیید سفارش** (`/order-confirmation/[orderId]`)
- نمایش وضعیت سفارش
- جزئیات محصولات
- اطلاعات بیلینگ و ارسال
- پیگیری سفارش

## مدل داده‌ها (Data Models)

### Product
```typescript
interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  thumbnail: string
  images: string[]
  stock: number
  rating: number
  reviewCount: number
  category: string
  description: string
  sku?: string
  discount?: number
}
```

### CartItem
```typescript
interface CartItem {
  product: Product
  quantity: number
}
```

### Order
```typescript
interface Order {
  id: number
  number: string
  status: string
  total: string
  customer_email: string
  line_items: Array<{
    product_id: number
    quantity: number
    total: string
  }>
  billing: {
    first_name: string
    last_name: string
    email: string
    phone: string
    address_1: string
    city: string
    state: string
    postcode: string
  }
  shipping: {
    first_name: string
    address_1: string
    city: string
    state: string
    postcode: string
  }
}
```

## رایج‌ترین عملیات (Common Operations)

### 1. دریافت محصولات برای نمایش صفحه‌ای
```typescript
const { products, loading } = useWCProducts({
  page: currentPage,
  perPage: 12,
  sort: sortBy
})
```

### 2. جستجو محصولات
```typescript
const { products } = useWCProducts({
  search: searchQuery,
  perPage: 20
})
```

### 3. اضافه کردن محصول به سبد
```typescript
const cart = useWCCart()
cart.addToCart(product, quantity)
```

### 4. تخلیه سبد خرید
```typescript
const cart = useWCCart()
cart.clearCart()
```

### 5. اگر سفارش ایجاد کنید
```typescript
const cart = useWCCart()
const result = await cart.checkout(checkoutData)
if (result.success) {
  router.push(`/order-confirmation/${result.orderId}`)
}
```

## روش پرداخت (Payment Methods)

دو روش پرداخت فعال است:

1. **bank_transfer**: درگاه بانکی (پرداخت آنلاین)
2. **cod**: پرداخت در محل (Cash on Delivery)

```typescript
// شماره سفارش WooCommerce
const order = await createWCOrder({
  payment_method: 'bank_transfer', // یا 'cod'
  payment_method_title: 'درگاه بانکی',
  // ...
})
```

## مشکل‌ یابی (Troubleshooting)

### مشکل: محصولات بارگذاری نمی‌شوند
```
✓ بررسی کنید env variables صحیح تنظیم شده است
✓ بررسی کنید WiFi/اینترنت فعال است
✓ چک کنید Consumer Key و Secret درست هستند
```

### مشکل: سفارش ایجاد نمی‌شود
```
✓ بررسی کنید email معتبر است
✓ بررسی کنید تمام فیلدهای الزامی پر شده‌اند
✓ چک کنید سبد خرید خالی نیست
```

### مشکل: درخواست CORS
```
✓ این مشکل معمولاً توسط Vercel حل می‌شود
✓ اگر محلی test می‌کنید، proxy استفاده کنید
```

## API Endpoints

تمام endpoints به صورت خودکار احراز شده‌اند:

- `GET /wp-json/wc/v3/products` - محصولات
- `GET /wp-json/wc/v3/products/{id}` - محصول واحد
- `GET /wp-json/wc/v3/products/categories` - دسته‌بندی‌ها
- `POST /wp-json/wc/v3/orders` - ایجاد سفارش
- `GET /wp-json/wc/v3/orders/{id}` - جزئیات سفارش

## بهینه‌سازی (Optimization)

- محصولات ۱۰ دقیقه cache می‌شوند
- سفارش‌های فعال ۵ دقیقه cache می‌شوند
- Zustand برای مدیریت سبد خرید استفاده می‌شود (localStorage)
- SWR برای revalidation و sync

## نکات مهم (Important Notes)

1. **Authentication**: تمام درخواست‌ها با Basic Auth authenticated هستند
2. **Currency**: تمام قیمت‌ها به تومان ایران هستند
3. **RTL Support**: تمام صفحات RTL compatible هستند
4. **Persian Date**: تاریخ‌ها به تقویم جلالی نمایش داده می‌شوند

## منابع مفید (Resources)

- [WooCommerce REST API Docs](https://woocommerce.com/document/woocommerce-rest-api/)
- [WooCommerce Products API](https://woocommerce.com/document/woocommerce-rest-api/#products)
- [WooCommerce Orders API](https://woocommerce.com/document/woocommerce-rest-api/#orders)
- [Next.js Fetching Data](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [SWR Documentation](https://swr.vercel.app/)
