import { NextResponse } from 'next/server'
import { fetchWPCategories } from '@/lib/wordpress-api'
import { hasWcCredentials } from '@/lib/config'

export async function GET() {
  if (!hasWcCredentials()) {
    return NextResponse.json({ success: false, categories: [] })
  }

  const categories = await fetchWPCategories()
  return NextResponse.json({ success: true, categories })
}
