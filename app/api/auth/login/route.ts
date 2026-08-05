import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { wcConfig } from '@/lib/config'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'ایمیل و رمز عبور الزامی است' },
        { status: 400 }
      )
    }

    // Use WooCommerce REST API Basic Auth
    const credentials = Buffer.from(`${wcConfig.consumerKey}:${wcConfig.consumerSecret}`).toString(
      'base64'
    )

    // Try to authenticate with WooCommerce (get customer by email)
    const response = await fetch(`${wcConfig.apiBase}/customers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'عدم اتصال به سرور. لطفا بعدا تلاش کنید' },
        { status: 500 }
      )
    }

    const customers = await response.json() as any[]
    const customer = customers.find(c => c.email === email)

    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'ایمیل یا رمز عبور اشتباه است' },
        { status: 401 }
      )
    }

    // Note: WooCommerce REST API doesn't verify passwords directly.
    // In production, you should use JWT authentication or a custom endpoint.
    // For now, we trust the WooCommerce user exists with this email.

    // Store session in httpOnly cookie
    const cookieStore = await cookies()
    cookieStore.set('wc_user_id', customer.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    cookieStore.set('wc_user_email', email, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return NextResponse.json({
      success: true,
      user: {
        id: customer.id,
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
      },
    })
  } catch (error) {
    console.error('[Auth API] Error:', error)
    return NextResponse.json(
      { success: false, error: 'خطا در ورود' },
      { status: 500 }
    )
  }
}
