import { NextResponse } from 'next/server'
import { fetchWPProducts, fetchAllWPProducts, transformWPProduct } from '@/lib/wordpress-api'
import { hasWcCredentials, wcConfig } from '@/lib/config'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')
  const perPage = Number(searchParams.get('per_page') || '100')
  const fetchAll = searchParams.get('all') === 'true' || !page
  const search = searchParams.get('search') || undefined
  const category = searchParams.get('category') ? Number(searchParams.get('category')) : undefined
  const orderby = searchParams.get('orderby') || undefined
  const order = (searchParams.get('order') as 'asc' | 'desc') || undefined

  if (!hasWcCredentials()) {
    return NextResponse.json({
      success: false,
      products: [],
      message: 'WooCommerce credentials not configured',
      storeUrl: wcConfig.storeUrl,
    })
  }

  try {
    const wpProducts = fetchAll
      ? await fetchAllWPProducts({ search, category, orderby, order })
      : await fetchWPProducts({
          page: Number(page || '1'),
          per_page: perPage,
          search,
          category,
          orderby,
          order,
        })

    const products = wpProducts.map(transformWPProduct)

    // Cache headers for ISR (Incremental Static Regeneration)
    const response = NextResponse.json({
      success: true,
      products,
      count: products.length,
      storeUrl: wcConfig.storeUrl,
      shopUrl: wcConfig.shopUrl,
      source: 'wordpress',
    })

    // Revalidate every 10 minutes for popular pages, 1 hour for category filters
    const revalidateTime = search ? 3600 : 600
    response.headers.set(
      'Cache-Control',
      `public, s-maxage=${revalidateTime}, stale-while-revalidate=86400`
    )

    return response
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        products: [],
        error: error instanceof Error ? error.message : 'اتصال به وردپرس برقرار نشد',
        storeUrl: wcConfig.storeUrl,
      },
      { status: 500 }
    )
  }
}
