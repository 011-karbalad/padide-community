import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Category } from '@/lib/types'

interface CategoryCardProps {
  category: Category
  variant?: 'default' | 'compact'
  className?: string
}

export function CategoryCard({ category, variant = 'default', className }: CategoryCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href={`/categories/${category.slug}`}
        className={cn(
          'flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-card',
          'hover:border-primary/40 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5',
          className
        )}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: category.color + '15' }}
        >
          {category.icon}
        </div>
        <span className="text-xs font-medium text-foreground text-center leading-tight">{category.name}</span>
        <span className="text-[10px] text-muted-foreground">{category.count} کالا</span>
      </Link>
    )
  }

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border bg-card p-5',
        'hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ backgroundColor: category.color + '15' }}
        >
          {category.icon}
        </div>
        <div
          className="text-xs font-medium px-2 py-1 rounded-full"
          style={{ backgroundColor: category.color + '15', color: category.color }}
        >
          {category.count} کالا
        </div>
      </div>

      <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
      {category.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{category.description}</p>
      )}

      {/* Hover accent line */}
      <div
        className="absolute bottom-0 right-0 left-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"
        style={{ backgroundColor: category.color }}
      />
    </Link>
  )
}
