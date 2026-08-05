# WordPress WooCommerce Backend Integration

## Overview
This project has been upgraded with a modern, professional design and integrated with the WordPress WooCommerce API from **https://hustlershop.ir** as the backend data source.

## 🎨 Design Improvements

### Color System (Modern Teal & Navy)
- **Primary Brand**: Cyan/Teal (#0891b2)
- **Dark Variant**: Deep Teal (#0e7490)
- **Light Variant**: Bright Cyan (#06b6d4)
- **Accents**: Orange (#ea580c) & Emerald (#10b981)

### Enhanced Components

#### 1. **Navbar**
- Modern gradient logo background
- Improved backdrop blur effects
- Enhanced button styling with shadows
- Better mobile responsiveness
- Professional dark/light theme support

#### 2. **Hero Section**
- Stunning gradient background with multiple animated layers
- Refined typography with gradient text effects
- Modern search box with improved UI
- Better call-to-action buttons with shadow effects
- Enhanced stats display with gradient borders

#### 3. **Product Cards**
- Rounded corners with softer shadows
- Improved hover animations (scale + shadow)
- Better badge styling for promotions
- Enhanced installment display
- Professional price formatting

#### 4. **Footer**
- Dark gradient background for premium look
- Better visual hierarchy
- Enhanced typography and spacing

### CSS Enhancements
- New utility classes: `card-hover`, `card-subtle-hover`, `btn-shadow`, `fade-in-up`
- Improved glass-morphism effects with updated blur intensity
- Modern animation keyframes
- Better transition timing functions (cubic-bezier)

---

## 🔗 WordPress WooCommerce API Integration

### API Base URL
```
https://hustlershop.ir/wp-json/wc/v3
```

### API Utility (`lib/wordpress-api.ts`)

The WordPress API integration provides the following functions:

#### **Fetch Products**
```typescript
fetchWPProducts(params?: {
  page?: number
  per_page?: number
  search?: string
  category?: number
  orderby?: string
  order?: 'asc' | 'desc'
}) => Promise<WPProduct[]>
```

#### **Fetch Single Product**
```typescript
fetchWPProduct(id: string | number) => Promise<WPProduct | null>
```

#### **Fetch Categories**
```typescript
fetchWPCategories() => Promise<WPCategory[]>
```

#### **Search Products**
```typescript
searchWPProducts(query: string) => Promise<WPProduct[]>
```

#### **Featured Products**
```typescript
fetchWPFeaturedProducts() => Promise<WPProduct[]>
```

#### **Helper Functions**
- `formatWPPrice()` - Format price in Persian Rial
- `calculateDiscount()` - Calculate discount percentage
- `transformWPProduct()` - Convert WP product to local format

### Available Product Data

Each product from WordPress contains:
```typescript
{
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  price: string
  regular_price: string
  sale_price: string
  stock_quantity: number
  rating: number
  review_count: number
  images: Array<{id, src, alt}>
  categories: Array<{id, name}>
  sku: string
}
```

---

## 🚀 Usage Examples

### Fetch Latest Products
```typescript
import { fetchWPProducts } from '@/lib/wordpress-api'

const products = await fetchWPProducts({
  per_page: 10,
  orderby: 'date',
  order: 'desc'
})
```

### Search Products
```typescript
import { searchWPProducts } from '@/lib/wordpress-api'

const results = await searchWPProducts('شارژر')
```

### Get Specific Category
```typescript
import { fetchWPProducts } from '@/lib/wordpress-api'

const categoryProducts = await fetchWPProducts({
  category: 15,
  per_page: 20
})
```

### Transform for Display
```typescript
import { fetchWPProduct, transformWPProduct } from '@/lib/wordpress-api'

const wpProduct = await fetchWPProduct(123)
const displayProduct = transformWPProduct(wpProduct)
```

---

## 🔄 Caching Strategy

API responses are cached for **1 hour** using Next.js `revalidate`:
```typescript
next: { revalidate: 3600 }
```

This reduces API calls to WordPress and improves performance. Cache is automatically invalidated after the revalidation period.

---

## 📱 Responsive Design Features

- **Mobile-first approach** with breakpoints at 768px (md) and 1024px (lg)
- **Touch-friendly buttons** with increased hit areas
- **Optimized images** with lazy loading
- **Flexible grids** that adapt to screen size
- **RTL support** for Persian language

---

## 🎯 Next Steps for Integration

1. **Fetch Products from WordPress**: Update `lib/data.ts` to use `fetchWPProducts()` instead of mock data
2. **Product Details Page**: Implement dynamic product page using `fetchWPProduct()`
3. **Shopping Cart**: Integrate cart management with WordPress
4. **Checkout**: Connect Stripe/local payment gateway with WordPress orders
5. **Authentication**: Link user login with WordPress user accounts

### Example Integration:
```typescript
// app/shop/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { fetchWPProducts } from '@/lib/wordpress-api'

export default function ShopPage() {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchWPProducts({ per_page: 20 })
      setProducts(data)
    }
    loadProducts()
  }, [])
  
  return (
    // Render products...
  )
}
```

---

## 🌐 API Documentation

For complete WordPress WooCommerce REST API documentation, visit:
- https://woocommerce.github.io/woocommerce-rest-api-docs/

---

## 📝 Notes

- All prices are in Persian Rial (IRR/تومان)
- The API supports pagination with `page` and `per_page` parameters
- Default per_page is 10, maximum is 100
- Images are returned as URLs from WordPress media library
- Product ratings scale from 0-5
- Stock quantity shows 0 for out-of-stock items

---

## 🎨 Color Reference

```css
/* Light Mode */
--primary: #0891b2 (Cyan)
--destructive: #ea580c (Orange)
--accent: #10b981 (Emerald)

/* Dark Mode adjustments handled automatically */
```

---

**Last Updated**: 2025-07-11
**Design System**: Modern Teal & Navy Theme
**Backend**: WordPress WooCommerce REST API
**Frontend Framework**: Next.js 16 + React 19 + Tailwind CSS 4
