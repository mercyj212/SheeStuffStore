'use client';

import React from 'react';
import { Gift, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../lib/context/StoreContext';
import { PRODUCTS } from '../lib/products';

export default function PromoBanner() {
  const { setQuickViewProduct, applyDiscountCode } = useStore();

  const bundleProduct = PRODUCTS.find((p) => p.id === 'ultimate-glow-bundle') || PRODUCTS[0];

  return (
    <section id="promo" className="py-16 bg-gradient-to-br from-brand-950 via-brand-900 to-rose-deep text-nude-100 relative overflow-hidden">
      
      {/* Background glow graphics */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-gold/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text & Promo Deal */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-gold/30 text-rose-200 border border-rose-gold/40 text-xs font-semibold">
              <Gift className="w-3.5 h-3.5" />
              <span>LIMITED EDITION SPRING GIFT BUNDLE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              The Golden Hour <br />
              <span className="italic text-rose-gold font-normal">4-Piece Ritual Kit</span>
            </h2>

            <p className="text-sm sm:text-base text-nude-200 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Includes full-size Luminary Vitamin C Serum, Velvet Petal Dew Cream, Silk Lip Butter, and Dew Drop Orchid Mist in a custom vanity case. 
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <div className="bg-white/10 px-4 py-2 rounded-xl text-left border border-white/10">
                <span className="text-[10px] uppercase text-nude-300 font-bold block">Bundle Price</span>
                <span className="font-serif text-2xl font-bold text-rose-gold">$110.00</span>
                <span className="text-xs text-nude-400 line-through ml-2">$156.00</span>
              </div>

              <div className="bg-emerald-500/20 text-emerald-300 px-4 py-2.5 rounded-xl border border-emerald-400/30 text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Save $46 Instantly (30% OFF)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => setQuickViewProduct(bundleProduct)}
                className="inline-flex items-center justify-center gap-2 bg-nude-50 text-brand-950 hover:bg-white font-bold px-8 py-4 rounded-full shadow-lg transition"
              >
                <span>Claim Golden Hour Kit</span>
                <ArrowRight className="w-4 h-4 text-rose-deep" />
              </button>

              <button
                onClick={() => applyDiscountCode('SHEE15')}
                className="inline-flex items-center justify-center gap-2 bg-transparent text-nude-100 hover:bg-white/10 font-semibold px-6 py-4 rounded-full border border-white/30 transition text-xs"
              >
                <Sparkles className="w-4 h-4 text-rose-gold" />
                <span>Apply Code SHEE15</span>
              </button>
            </div>
          </div>

          {/* Right Product Bundle Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-square group">
              <img
                src={bundleProduct.image}
                alt="Golden Hour Ritual Kit"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-brand-950 text-rose-gold font-serif font-bold px-4 py-2 rounded-full text-xs shadow-xl">
                ★ 4.98 / 5 Rating
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
