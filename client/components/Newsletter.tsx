'use client';

import React, { useState } from 'react';
import { Mail, Sparkles, Check } from 'lucide-react';
import { useStore } from '../lib/context/StoreContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast, applyDiscountCode } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      applyDiscountCode('SHEE15');
      showToast('🎉 Welcome to the SheeStuff Beauty Club! Check your inbox for 15% OFF code.');
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="bg-gradient-to-r from-nude-100 via-rose-blush to-nude-100 rounded-3xl p-8 sm:p-14 border border-rose-gold/20 shadow-lg">
          
          <div className="w-12 h-12 rounded-full bg-brand-950 text-rose-gold flex items-center justify-center mx-auto mb-4 shadow">
            <Mail className="w-6 h-6" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
            JOIN THE SHEESTUFF BEAUTY CLUB
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950 mb-3">
            Unlock 15% OFF Your First Order
          </h2>

          <p className="text-xs sm:text-sm text-brand-800 max-w-lg mx-auto mb-8 leading-relaxed">
            Subscribe for exclusive VIP access to new product drops, secret flash sales, skincare tips, and a complimentary 15% discount code applied instantly.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-6 py-4 rounded-full font-bold text-xs sm:text-sm shadow">
              <Check className="w-5 h-5 text-emerald-600" />
              <span>You're in! Use code <strong className="underline">SHEE15</strong> at checkout for 15% OFF.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border border-brand-200 rounded-full px-5 py-4 text-xs sm:text-sm text-brand-950 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
              />
              <button
                type="submit"
                className="bg-brand-950 text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-full hover:bg-brand-800 transition shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-rose-gold" />
                <span>Claim 15% OFF</span>
              </button>
            </form>
          )}

          <p className="text-[11px] text-brand-500 mt-4">
            We respect your privacy. Unsubscribe anytime with one click.
          </p>

        </div>

      </div>
    </section>
  );
}
