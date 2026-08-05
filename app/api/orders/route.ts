import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { wcConfig } from '@/lib/config'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('wc_user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'لطفا ابتدا وارد حساب کاربری خود شوید' },
        { status: 401 }
      )
    }

    const orderData = await request.json()

    const credentials = Buffer.from(
      `${wcConfig.consumerKey}:${wcConfig.consumerSecret}`
    ).toString('base64')

    // Create order in WooCommerce
    const response = await fetch(`${wcConfig.apiBase}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        customer_id: Number(userId),
        ...orderData,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('[Order API] WooCommerce Error:', errorData)
      return NextResponse.json(
        {
          success: false,
          error: 'خطا در ثبت سفارش',
        },
        { status: response.status }
      )
    }

    const order = await response.json()

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        order_number: order.number,
        total: order.total,
        status: order.status,
      },
    })
  } catch (error) {
    console.error('[Order API] Error:', error)
    return NextResponse.json(
      { success: false, error: 'خطا در ثبت سفارش' },
      { status: 500 }
    )
  }
}
