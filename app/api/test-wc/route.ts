import { NextResponse } from 'next/server'
import { fetchWPProducts } from '@/lib/wordpress-api'
import { hasWcCredentials, wcConfig } from '@/lib/config'

export async function GET() {
  if (!hasWcCredentials()) {
    return NextResponse.json({
      success: false,
      message: 'WooCommerce credentials not configured',
      credentials: { hasKey: false, hasSecret: false },
      storeUrl: wcConfig.storeUrl,
    })
  }

  try {
    const products = await fetchWPProducts({ per_page: 3 })
    return NextResponse.json({
      success: true,
      status: 200,
      productCount: products.length,
      message: 'WooCommerce API connected successfully',
      storeUrl: wcConfig.storeUrl,
      shopUrl: wcConfig.shopUrl,
      credentials: {
        hasKey: true,
        hasSecret: true,
      },
      sample: products.slice(0, 1).map((p) => ({ id: p.id, name: p.name, slug: p.slug, price: p.price })),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        storeUrl: wcConfig.storeUrl,
        credentials: { hasKey: true, hasSecret: true },
      },
      { status: 500 }
    )
  }
}
