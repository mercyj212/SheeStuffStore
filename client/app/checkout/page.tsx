'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AnnouncementBar from '../../components/AnnouncementBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useStore } from '../../lib/context/StoreContext';
import { Lock, ShieldCheck, CreditCard, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, cartTotal, discountCode, discountPercentage, clearCart } = useStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '4242 •••• •••• 4242',
    expDate: '12/28',
    cvv: '888',
  });

  const [shippingSpeed, setShippingSpeed] = useState<'standard' | 'express'>('standard');
  const shippingCost = shippingSpeed === 'express' ? 9.99 : (cartSubtotal >= 50 ? 0 : 4.99);

  const finalTotal = cartTotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `SS-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Store order receipt info in sessionStorage
    sessionStorage.setItem('latest_order', JSON.stringify({
      orderId,
      customerName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
      total: finalTotal,
      date: new Date().toLocaleDateString(),
      items: cart,
    }));

    clearCart();
    router.push('/checkout/success');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-nude-50">
        <AnnouncementBar />
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-950 mb-2">Your cart is currently empty</h2>
          <p className="text-xs text-brand-700 mb-6">Add beauty formulas before proceeding to checkout.</p>
          <Link href="/shop" className="bg-brand-950 text-white font-bold text-xs px-6 py-3 rounded-full shadow">
            Return to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-nude-50">
      <AnnouncementBar />
      <Navbar />

      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full text-left">
        
        <div className="flex items-center gap-2 text-xs text-brand-600 mb-4">
          <Link href="/cart" className="hover:text-brand-950">Cart</Link>
          <ChevronRight className="w-3 h-3 text-brand-400" />
          <span className="font-bold text-brand-950">Checkout</span>
        </div>

        <div className="flex items-center gap-2 mb-8 pb-4 border-b border-brand-200">
          <Lock className="w-5 h-5 text-rose-gold" />
          <h1 className="font-serif text-3xl font-bold text-brand-950">Secure Checkout</h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Form Fields */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-sm space-y-6">
            
            {/* Contact Details */}
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-950 mb-4 pb-2 border-b border-brand-100">
                1. Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-brand-800 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="Eleanor"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-brand-950 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brand-800 mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Vance"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-brand-950 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brand-800 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="eleanor@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-brand-950 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brand-800 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-brand-950 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-950 mb-4 pb-2 border-b border-brand-100">
                2. Shipping Address
              </h3>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-brand-800 mb-1">Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="742 Evergreen Terrace"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-brand-950 focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-brand-800 mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="Springfield"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-brand-950 focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-brand-800 mb-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      placeholder="OR"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-brand-950 focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-brand-800 mb-1">Zip Code *</label>
                    <input
                      type="text"
                      name="zip"
                      required
                      placeholder="97477"
                      value={formData.zip}
                      onChange={handleChange}
                      className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-brand-950 focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Speed */}
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-950 mb-3">
                3. Shipping Speed
              </h3>
              <div className="space-y-2 text-xs">
                <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer ${shippingSpeed === 'standard' ? 'border-brand-950 bg-nude-50' : 'border-brand-200'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="speed" checked={shippingSpeed === 'standard'} onChange={() => setShippingSpeed('standard')} className="accent-brand-950" />
                    <div>
                      <p className="font-bold text-brand-950">Standard Delivery (3-5 Business Days)</p>
                      <p className="text-[11px] text-brand-500">Free for orders over $50</p>
                    </div>
                  </div>
                  <span className="font-bold text-brand-950">{cartSubtotal >= 50 ? 'FREE' : '$4.99'}</span>
                </label>

                <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer ${shippingSpeed === 'express' ? 'border-brand-950 bg-nude-50' : 'border-brand-200'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="speed" checked={shippingSpeed === 'express'} onChange={() => setShippingSpeed('express')} className="accent-brand-950" />
                    <div>
                      <p className="font-bold text-brand-950">Express Priority Air (1-2 Days)</p>
                      <p className="text-[11px] text-brand-500">Fastest courier dispatch</p>
                    </div>
                  </div>
                  <span className="font-bold text-brand-950">$9.99</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-950 mb-3">
                4. Payment Method (Demo Mode)
              </h3>
              <div className="p-4 bg-nude-50 rounded-2xl border border-brand-200 space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-brand-950">
                  <CreditCard className="w-4 h-4 text-rose-gold" />
                  <span>Credit Card Demo</span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-brand-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full bg-white border border-brand-200 rounded-xl px-4 py-2 font-mono text-brand-950"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-950 text-white font-bold py-4 rounded-full shadow-lg hover:bg-brand-800 transition text-sm"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Complete Order • ${finalTotal.toFixed(2)}</span>
            </button>

          </div>

          {/* Right Order Review Sidebar */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-brand-100 shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-brand-950 pb-3 border-b border-brand-100">
              Review Your Items ({cart.length})
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs p-2 bg-nude-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <img src={item.product.image} alt="" className="w-12 h-12 object-cover rounded-xl" />
                    <div>
                      <p className="font-bold text-brand-950 truncate max-w-[150px]">{item.product.name}</p>
                      <p className="text-[10px] text-brand-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-brand-950">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-brand-800 border-t border-brand-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-brand-950">${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountPercentage > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount ({discountCode})</span>
                  <span>-${(cartSubtotal - cartTotal).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-brand-950">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-brand-200 text-lg font-bold text-brand-950">
                <span>Total Due</span>
                <span className="font-serif text-2xl text-rose-deep">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </form>
      </section>

      <Footer />
    </div>
  );
}
