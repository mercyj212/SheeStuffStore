'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AnnouncementBar from '../../components/AnnouncementBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useStore } from '../../lib/context/StoreContext';
import { ShoppingBag, Trash2, ArrowRight, Truck, Tag, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    discountCode,
    discountPercentage,
    applyDiscountCode,
    removeDiscountCode,
  } = useStore();

  const [inputCode, setInputCode] = useState('');

  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyDiscountCode(inputCode);
      setInputCode('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-nude-50">
      <AnnouncementBar />
      <Navbar />

      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full text-left">
        
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-1">
              YOUR SHOPPING BAG
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950">
              Shopping Cart ({cart.length})
            </h1>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-950 hover:text-brand-600 underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Items Table */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Progress Indicator */}
              <div className="bg-white p-4 rounded-2xl border border-brand-100 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-brand-950">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-rose-gold" />
                    {amountNeeded > 0 ? (
                      <span>Add <strong>${amountNeeded.toFixed(2)}</strong> more to unlock <strong>FREE Express Shipping</strong>!</span>
                    ) : (
                      <span className="text-emerald-700">🎉 Congratulations! You unlocked FREE Express Shipping!</span>
                    )}
                  </div>
                  <span className="text-[11px] text-brand-500">{progressToFreeShipping.toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 bg-nude-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-gold to-brand-700 transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Cart Items Cards */}
              <div className="bg-white rounded-3xl p-6 border border-brand-100 shadow-sm space-y-4">
                {cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedShade?.name || idx}`}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-nude-50/60 rounded-2xl border border-brand-100/80"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-2xl border border-brand-100 flex-shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-brand-500 uppercase tracking-wider block">
                          {item.product.category}
                        </span>
                        <Link href={`/product/${item.product.id}`} className="font-serif font-bold text-base text-brand-950 hover:underline">
                          {item.product.name}
                        </Link>
                        {item.selectedShade && (
                          <div className="flex items-center gap-1.5 text-xs text-brand-600 mt-1">
                            <span className="w-3 h-3 rounded-full border border-black/10 inline-block" style={{ backgroundColor: item.selectedShade.colorHex }} />
                            <span>Shade: {item.selectedShade.name}</span>
                          </div>
                        )}
                        <p className="text-xs text-brand-500 font-semibold mt-1">${item.product.price} each</p>
                      </div>
                    </div>

                    {/* Quantity & Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                      <div className="flex items-center border border-brand-200 rounded-full bg-white px-3 py-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedShade?.name)}
                          className="font-bold text-brand-900 hover:text-brand-500 px-1 text-sm"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-brand-950">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedShade?.name)}
                          className="font-bold text-brand-900 hover:text-brand-500 px-1 text-sm"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif font-bold text-lg text-brand-950">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedShade?.name)}
                        className="p-2 text-brand-400 hover:text-rose-deep transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* Right Summary Sidebar */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-brand-100 shadow-sm space-y-6">
              
              <h3 className="font-serif text-xl font-bold text-brand-950 pb-3 border-b border-brand-100">
                Order Summary
              </h3>

              {/* Promo Coupon Form */}
              {discountCode ? (
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-3 rounded-2xl border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2 font-bold">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span>Code {discountCode} Applied (-{discountPercentage}%)</span>
                  </div>
                  <button onClick={removeDiscountCode} className="text-emerald-700 underline text-[11px]">Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. SHEE15)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-xs text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                  <button type="submit" className="bg-brand-950 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-brand-800 transition">
                    Apply
                  </button>
                </form>
              )}

              {/* Financial Totals */}
              <div className="space-y-3 text-xs text-brand-800 border-t border-brand-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-brand-950">${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountPercentage > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({discountPercentage}%)</span>
                    <span>-${(cartSubtotal - cartTotal).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-brand-950">
                    {amountNeeded === 0 ? 'FREE' : '$4.99'}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-brand-200 text-base font-bold text-brand-950">
                  <span>Total Due</span>
                  <span className="font-serif text-2xl text-rose-deep">
                    ${(cartTotal + (amountNeeded === 0 ? 0 : 4.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-950 text-white font-bold py-4 rounded-full shadow-lg hover:bg-brand-800 transition text-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-rose-gold" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-brand-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-brand-200 p-8 max-w-md mx-auto">
            <ShoppingBag className="w-12 h-12 text-brand-300 mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-bold text-brand-950 mb-1">Your cart is empty</h3>
            <p className="text-xs text-brand-700 mb-6">Explore our beauty formulas to add products to your cart</p>
            <Link
              href="/shop"
              className="bg-brand-950 text-white text-xs font-bold px-8 py-4 rounded-full shadow hover:bg-brand-800 transition inline-block"
            >
              Start Shopping Now
            </Link>
          </div>
        )}

      </section>

      <Footer />
    </div>
  );
}
