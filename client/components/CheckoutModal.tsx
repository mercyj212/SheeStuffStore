'use client';

import React, { useState } from 'react';
import { useStore } from '../lib/context/StoreContext';
import { X, ShieldCheck, CheckCircle2, CreditCard, Lock, ArrowRight, Truck } from 'lucide-react';

interface CheckoutModalProps {
  onClose: () => void;
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const { cart, cartSubtotal, cartTotal, discountCode, discountPercentage, clearCart, setIsCartOpen } = useStore();
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [orderId, setOrderId] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '4242 •••• •••• 4242',
    expDate: '12/28',
    cvv: '888',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const shippingCost = shippingMethod === 'express' ? 9.99 : (cartSubtotal >= 50 ? 0 : 4.99);

  const finalOrderTotal = cartTotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `SS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-brand-100 p-6 md:p-8 animate-slide-up text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-nude-50 hover:bg-brand-100 text-brand-900 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div>
            <div className="flex items-center gap-2 mb-6 border-b border-brand-100 pb-4">
              <Lock className="w-5 h-5 text-rose-gold" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-brand-950">Secure Checkout</h2>
                <p className="text-xs text-brand-600">256-Bit SSL Encrypted Payment</p>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Form Input Columns */}
              <div className="md:col-span-7 space-y-4">
                
                <h3 className="font-serif text-base font-bold text-brand-950">1. Shipping Information</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-brand-800 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-xs text-brand-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-800 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="eleanor@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-xs text-brand-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-800 mb-1">Shipping Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="123 Beauty Blossom Lane"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-xs text-brand-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-brand-800 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="Los Angeles"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-xs text-brand-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-800 mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="zip"
                        required
                        placeholder="90210"
                        value={formData.zip}
                        onChange={handleChange}
                        className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-xs text-brand-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-serif text-base font-bold text-brand-950 pt-3">2. Shipping Method</h3>
                <div className="space-y-2">
                  <label className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer ${shippingMethod === 'standard' ? 'border-brand-950 bg-nude-50' : 'border-brand-200'}`}>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="shipping" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} />
                      <div>
                        <p className="font-bold text-brand-950">Standard Shipping (3-5 days)</p>
                        <p className="text-[11px] text-brand-600">Free over $50</p>
                      </div>
                    </div>
                    <span className="font-bold text-brand-950">{cartSubtotal >= 50 ? 'FREE' : '$4.99'}</span>
                  </label>

                  <label className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer ${shippingMethod === 'express' ? 'border-brand-950 bg-nude-50' : 'border-brand-200'}`}>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="shipping" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} />
                      <div>
                        <p className="font-bold text-brand-950">Express Air (1-2 days)</p>
                        <p className="text-[11px] text-brand-600">Priority Dispatch</p>
                      </div>
                    </div>
                    <span className="font-bold text-brand-950">$9.99</span>
                  </label>
                </div>

                <h3 className="font-serif text-base font-bold text-brand-950 pt-3">3. Payment Details (Demo)</h3>
                <div className="p-4 bg-nude-50 rounded-2xl border border-brand-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-900">
                    <CreditCard className="w-4 h-4 text-rose-gold" />
                    <span>Credit / Debit Card</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full bg-white border border-brand-200 rounded-xl px-4 py-2 text-xs text-brand-950 font-mono"
                    />
                  </div>
                </div>

              </div>

              {/* Order Summary Sidebar */}
              <div className="md:col-span-5 bg-nude-50/80 rounded-2xl p-5 border border-brand-100 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-brand-950 mb-4 pb-2 border-b border-brand-200">
                    Order Summary
                  </h3>

                  <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img src={item.product.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          <div className="truncate max-w-[140px]">
                            <p className="font-bold text-brand-950 truncate">{item.product.name}</p>
                            <p className="text-[10px] text-brand-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-bold text-brand-950">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 border-t border-brand-200 pt-3 text-xs text-brand-800">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-brand-950">${cartSubtotal.toFixed(2)}</span>
                    </div>

                    {discountPercentage > 0 && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Promo ({discountCode})</span>
                        <span>-${(cartSubtotal - cartTotal).toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-bold text-brand-950">${shippingCost.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between pt-3 border-t border-brand-200 text-base font-bold text-brand-950">
                      <span>Total</span>
                      <span className="font-serif text-xl text-rose-deep">${finalOrderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-950 text-white font-bold py-4 rounded-full shadow-lg hover:bg-brand-800 transition mt-6"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Place Order • ${finalOrderTotal.toFixed(2)}</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Order Confirmation Screen */
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-1">
                ORDER CONFIRMED
              </span>
              <h2 className="font-serif text-3xl font-bold text-brand-950">
                Thank You for Your Order!
              </h2>
              <p className="text-xs text-brand-600 mt-1">
                Order confirmation code: <strong className="font-mono text-brand-950">{orderId}</strong>
              </p>
            </div>

            <div className="bg-nude-50 rounded-2xl p-6 border border-brand-200 max-w-md mx-auto text-left text-xs space-y-2">
              <p className="font-bold text-brand-950 border-b border-brand-200 pb-2">Receipt Overview</p>
              <div className="flex justify-between text-brand-800">
                <span>Customer:</span>
                <span className="font-medium text-brand-950">{formData.fullName || 'Valued Customer'}</span>
              </div>
              <div className="flex justify-between text-brand-800">
                <span>Shipping To:</span>
                <span className="font-medium text-brand-950">{formData.address || 'Standard Address'}, {formData.city || 'City'}</span>
              </div>
              <div className="flex justify-between text-brand-800 pt-2 border-t border-brand-200 font-bold">
                <span>Paid Total:</span>
                <span className="font-serif text-sm text-brand-950">${finalOrderTotal.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-brand-700 max-w-sm mx-auto">
              We have dispatched your receipt to <strong>{formData.email || 'your email'}</strong>. Your luxury formulas are being lovingly packed!
            </p>

            <button
              onClick={() => {
                onClose();
                setIsCartOpen(false);
              }}
              className="bg-brand-950 text-white font-bold text-xs px-8 py-3.5 rounded-full shadow hover:bg-brand-800 transition"
            >
              Back to SheeStuff Store
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
