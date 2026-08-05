import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  cookieStore.delete('wc_user_id')
  cookieStore.delete('wc_user_email')

  return NextResponse.json({
    success: true,
    message: 'خروج موفق',
  })
}
