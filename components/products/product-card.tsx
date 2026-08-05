'use client'

import Link from 'next/link'
import { Heart, ShoppingCart, Star, Zap, TrendingUp, Sparkles, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/data'
import type { Product } from '@/lib/types'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'horizontal'
  className?: string
}

const badgeConfig = {
  new: { label: 'جدید', className: 'bg-emerald-500 text-white', icon: Sparkles },
  bestseller: { label: 'پرفروش', className: 'bg-amber-500 text-white', icon: TrendingUp },
  sale: { label: 'تخفیف', className: 'bg-destructive text-white', icon: Tag },
  installment: { label: 'اقساطی', className: 'bg-primary text-primary-foreground', icon: Zap },
}

export function ProductCard({ product, variant = 'default', className }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setWishlisted(!wishlisted)
  }

  const badge = product.badge ? badgeConfig[product.badge] : null
  const BadgeIcon = badge?.icon

  if (variant === 'horizontal') {
    return (
      <Link href={`/products/${product.slug}`} className={cn('flex gap-4 p-3 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group', className)}>
        <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
          <img
            src={product.thumbnail || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <p className="text-xs text-muted-foreground">{product.brand} · {product.model}</p>
            <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-relaxed">{product.name}</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-foreground">{formatPrice(product.price)}</p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
              )}
            </div>
            {product.discount && (
              <Badge className="bg-destructive/10 text-destructive border-0 text-xs">
                {product.discount}٪ تخفیف
              </Badge>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        'group relative bg-card rounded-3xl border border-border/50 overflow-hidden',
        'hover:border-primary/60 hover:shadow-2xl transition-all duration-400 card-hover',
        'flex flex-col backdrop-blur-sm',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-primary/5 to-accent/10 overflow-hidden">
        <img
          src={product.thumbnail || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {product.source === 'woocommerce' && (
            <Badge className="bg-blue-600 text-white text-xs px-2 py-0.5">وردپرس</Badge>
          )}
          {badge && BadgeIcon && (
            <Badge className={cn('text-xs px-2 py-0.5 gap-1', badge.className)}>
              <BadgeIcon className="w-2.5 h-2.5" />
              {badge.label}
            </Badge>
          )}
          {product.discount && (
            <Badge className="bg-destructive text-white text-xs px-2 py-0.5">
              {product.discount}٪-
            </Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={cn(
            'absolute top-3 left-3 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm',
            'flex items-center justify-center transition-all duration-200',
            'opacity-0 group-hover:opacity-100 hover:scale-110',
            wishlisted && 'opacity-100'
          )}
        >
          <Heart className={cn('w-4 h-4 transition-colors', wishlisted ? 'fill-destructive text-destructive' : 'text-muted-foreground')} />
        </button>

        {/* Stock Warning */}
        {product.stock <= 5 && (
          <div className="absolute bottom-2 right-2">
            <Badge className="bg-amber-500/90 text-white text-xs backdrop-blur-sm">
              فقط {product.stock} عدد
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-xs text-muted-foreground/70 mb-1.5 font-medium">{product.brand} · {product.model}</p>
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug mb-3 flex-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn('w-3.5 h-3.5', i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300')}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-medium">({product.reviewCount})</span>
        </div>

        {/* Installment Badge */}
        {product.hasInstallment && product.monthlyPayment && (
          <div className="flex items-center gap-2 bg-cyan-50 dark:bg-cyan-950/30 rounded-xl px-3 py-2 mb-3 border border-cyan-200/50 dark:border-cyan-900/50">
            <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
            <span className="text-xs text-cyan-700 dark:text-cyan-300 font-semibold">
              {new Intl.NumberFormat('fa-IR').format(product.monthlyPayment)}/ماه
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-foreground text-lg">
                {new Intl.NumberFormat('fa-IR').format(product.price)}
              </span>
              <span className="text-xs text-muted-foreground font-medium">تومان</span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground/70 line-through">
                {new Intl.NumberFormat('fa-IR').format(product.originalPrice)}
              </span>
            )}
          </div>

          <Button
            size="sm"
            className={cn(
              'h-9 w-9 p-0 flex-shrink-0 rounded-xl transition-all shadow-md font-bold',
              addedToCart ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-primary hover:bg-primary/95'
            )}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
    </Link>
  )
}
