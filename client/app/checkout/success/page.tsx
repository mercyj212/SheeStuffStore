'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AnnouncementBar from '../../../components/AnnouncementBar';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { CheckCircle2, ShoppingBag, ArrowRight, Printer, Sparkles } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('latest_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-nude-50">
      <AnnouncementBar />
      <Navbar />

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full text-center">
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-100 shadow-lg space-y-6">
          
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-1">
              ORDER CONFIRMED & DISPATCHED TO LAB
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950">
              Thank You for Your Order!
            </h1>
            <p className="text-xs text-brand-600 mt-2">
              Order Reference Code: <strong className="font-mono text-brand-950">{order?.orderId || 'SS-849102'}</strong>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-brand-800 max-w-lg mx-auto leading-relaxed">
            We have received your order! A confirmation email with tracking details has been sent to <strong>{order?.email || 'your email'}</strong>.
          </p>

          {/* Receipt Breakdown Card */}
          <div className="bg-nude-50 rounded-2xl p-6 border border-brand-200 text-left text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-brand-200 pb-3">
              <span className="font-serif font-bold text-sm text-brand-950">Order Summary</span>
              <span className="text-[11px] text-brand-500 font-medium">{order?.date || new Date().toLocaleDateString()}</span>
            </div>

            <div className="space-y-1 text-brand-800">
              <p><strong>Recipient:</strong> {order?.customerName || 'Valued Customer'}</p>
              <p><strong>Shipping Address:</strong> {order?.address || 'Standard Address'}</p>
            </div>

            {order?.items && order.items.length > 0 && (
              <div className="pt-2 border-t border-brand-200 space-y-2">
                <p className="font-bold text-brand-950">Items Ordered:</p>
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-[11px]">
                    <span>{item.product.name} (Qty: {item.quantity})</span>
                    <span className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-3 border-t border-brand-200 text-sm font-bold text-brand-950">
              <span>Total Amount Paid:</span>
              <span className="font-serif text-lg text-rose-deep">${order?.total ? order.total.toFixed(2) : '0.00'}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-950 border border-brand-200 font-bold px-6 py-3.5 rounded-full shadow-sm hover:bg-nude-50 transition text-xs"
            >
              <Printer className="w-4 h-4 text-brand-600" />
              <span>Print Receipt</span>
            </button>

            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-brand-950 text-white font-bold px-8 py-3.5 rounded-full shadow hover:bg-brand-800 transition text-xs"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4 text-rose-gold" />
            </Link>
          </div>

        </div>

      </section>

      <Footer />
    </div>
  );
}
