import { NextResponse } from 'next/server';
import { stripe } from '../../../../lib/stripe';
import { prisma } from '../../../../lib/prisma';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret && webhookSecret !== 'whsec_placeholder') {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful payment event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;

    try {
      if (session.id) {
        await prisma.order.update({
          where: { stripeSessionId: session.id },
          data: {
            paymentStatus: 'PAID',
            status: 'PAID',
          },
        });
        console.log(`Order for session ${session.id} marked as PAID.`);
      }
    } catch (e) {
      console.error('Error updating order on webhook:', e);
    }
  }

  return NextResponse.json({ received: true });
}
