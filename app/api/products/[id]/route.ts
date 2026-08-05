import { NextResponse } from 'next/server'
import { fetchWPProduct, fetchWPProductBySlug, transformWPProduct } from '@/lib/wordpress-api'
import { hasWcCredentials } from '@/lib/config'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!hasWcCredentials()) {
    return NextResponse.json({ success: false, product: null }, { status: 404 })
  }

  const numericId = /^\d+$/.test(id) ? id : null
  const wpProduct = numericId
    ? await fetchWPProduct(numericId)
    : await fetchWPProductBySlug(id)

  if (!wpProduct) {
    return NextResponse.json({ success: false, product: null }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    product: transformWPProduct(wpProduct),
  })
}
