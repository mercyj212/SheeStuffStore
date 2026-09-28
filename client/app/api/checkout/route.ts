import { NextResponse } from 'next/server';
import { stripe } from '../../../lib/stripe';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, discountCode, shippingSpeed } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const orderNumber = `SS-${Math.floor(100000 + Math.random() * 900000)}`;

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
          images: [item.product.image],
          description: item.selectedShade ? `Shade: ${item.selectedShade.name}` : item.product.tagline,
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    const subtotal = items.reduce((sum: number, i: any) => sum + i.product.price * i.quantity, 0);
    const shippingFee = shippingSpeed === 'express' ? 9.99 : (subtotal >= 50 ? 0 : 4.99);

    let order;
    try {
      order = await prisma.order.create({
        data: {
          orderNumber,
          customerName: customer?.fullName || 'Valued Customer',
          email: customer?.email || 'customer@example.com',
          address: customer?.address || 'Standard Shipping Address',
          city: customer?.city || 'City',
          state: customer?.state || 'State',
          zip: customer?.zip || '00000',
          total: subtotal + shippingFee,
          status: 'PENDING',
          paymentStatus: 'UNPAID',
        },
      });
    } catch (e) {
      console.warn('Database order record skipped for local dev mode:', e);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customer?.email || undefined,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderNumber}`,
      cancel_url: `${appUrl}/cart`,
      metadata: {
        orderId: order?.id || orderNumber,
        orderNumber: orderNumber,
        customerName: customer?.fullName || '',
      },
    });

    if (order) {
      try {
        await prisma.order.update({
          where: { id: order.id },
          data: { stripeSessionId: session.id },
        });
      } catch (e) {
        console.warn('Order update warning:', e);
      }
    }

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      orderNumber: orderNumber,
    });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create checkout session' }, { status: 500 });
  }
}
