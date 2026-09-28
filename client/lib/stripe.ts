import Stripe from 'stripe';
import { loadStripe, Stripe as ClientStripe } from '@stripe/stripe-js';

// Server-side Stripe SDK instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-12-18.acacia' as any,
  appInfo: {
    name: 'SheeStuff Store',
    version: '1.0.0',
  },
});

// Client-side Stripe promise loader
let stripePromise: Promise<ClientStripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'
    );
  }
  return stripePromise;
};
