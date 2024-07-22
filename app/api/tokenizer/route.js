import { Snap } from '@/lib/midtrans-nodejs-client-master/index';
import { NextResponse } from 'next/server'

const snap = new Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
})

export async function POST(request) {
  console.log('haloo')
  try {
    const { id, name, price, quantity } = await request.json()

    const parameter = {
      item_details: [{
        id: id,
        name: name,
        price: price,
        quantity: quantity,
      }],
      transaction_details: {
        order_id: id,
        gross_amount: price * quantity,
      },
    }

    const token = await snap.createTransactionToken(parameter)
    return NextResponse.json({ token })
  } catch (error) {
    console.error('Error parsing request', error)
    console.error('Error processing request', error)
    return new Response('Invalid request', { status: 400 })
  }
}
