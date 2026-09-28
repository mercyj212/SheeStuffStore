'use client';

import React, { useState } from 'react';
import { useStore } from '../lib/context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Sparkles, Tag, Check } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
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
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

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
    <>
      <div className="fixed inset-0 z-50 overflow-hidden bg-brand-950/60 backdrop-blur-xs animate-fade-in">
        <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-brand-100 animate-slide-left">
            
            {/* Header */}
            <div className="p-5 border-b border-brand-100 flex items-center justify-between bg-nude-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-rose-gold" />
                <h2 className="font-serif text-xl font-bold text-brand-950">Your Beauty Cart</h2>
                <span className="bg-brand-950 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-brand-700 hover:bg-brand-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-rose-blush/60 p-3 px-5 border-b border-rose-gold/20 text-xs">
              <div className="flex items-center justify-between font-medium text-brand-900 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-rose-deep" />
                  {amountNeeded > 0 ? (
                    <span>Add <strong>${amountNeeded.toFixed(2)}</strong> more for <strong>FREE Shipping</strong>!</span>
                  ) : (
                    <span className="text-emerald-700 font-bold">🎉 You unlocked FREE Express Shipping!</span>
                  )}
                </div>
              </div>
              <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-gold to-brand-700 transition-all duration-500"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length > 0 ? (
                cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedShade?.name || idx}`}
                    className="flex items-center gap-4 p-3 bg-nude-50/70 rounded-2xl border border-brand-100/80 group"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-xl border border-brand-100 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 text-left">
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-950 truncate">
                        {item.product.name}
                      </h4>
                      
                      {item.selectedShade && (
                        <div className="flex items-center gap-1 text-[11px] text-brand-600 mt-0.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: item.selectedShade.colorHex }}
                          />
                          <span>{item.selectedShade.name}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-brand-200 rounded-full bg-white px-2 py-0.5">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedShade?.name
                              )
                            }
                            className="text-xs font-bold text-brand-800 hover:text-brand-500 px-1"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold px-2 text-brand-950">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedShade?.name
                              )
                            }
                            className="text-xs font-bold text-brand-800 hover:text-brand-500 px-1"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-serif font-bold text-sm text-brand-950">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Trash Button */}
                    <button
                      onClick={() =>
                        removeFromCart(item.product.id, item.selectedShade?.name)
                      }
                      className="p-2 text-brand-300 hover:text-rose-deep transition opacity-80 group-hover:opacity-100"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 text-brand-500">
                  <ShoppingBag className="w-12 h-12 text-brand-300 mx-auto mb-3" />
                  <p className="font-serif font-bold text-lg text-brand-950 mb-1">Your cart is empty</p>
                  <p className="text-xs text-brand-600 mb-6">Discover our beauty collection to add items</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-brand-950 text-white text-xs font-bold px-6 py-3 rounded-full shadow hover:bg-brand-800 transition"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-brand-100 bg-nude-50 space-y-3">
                
                {/* Coupon Form */}
                {discountCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>Code <strong>{discountCode}</strong> applied (-{discountPercentage}%)</span>
                    </div>
                    <button
                      onClick={removeDiscountCode}
                      className="text-emerald-700 font-bold hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. SHEE15)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="flex-1 bg-white border border-brand-200 rounded-full px-4 py-2 text-xs text-brand-950 placeholder-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <button
                      type="submit"
                      className="bg-brand-950 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-brand-800 transition"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Subtotal & Totals */}
                <div className="space-y-1.5 text-xs text-brand-800 pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-brand-950">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  {discountPercentage > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Discount ({discountPercentage}%)</span>
                      <span>-${(cartSubtotal - cartTotal).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="text-brand-600 font-medium">
                      {amountNeeded === 0 ? 'FREE' : '$4.99'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-brand-200 text-sm font-bold text-brand-950">
                    <span>Order Total</span>
                    <span className="font-serif text-lg">
                      ${(cartTotal + (amountNeeded === 0 ? 0 : 4.99)).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-950 text-nude-50 hover:bg-brand-800 font-bold py-4 rounded-full shadow-lg transition active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-rose-gold" />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </>
  );
}
