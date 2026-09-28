'use client';

import React, { useState } from 'react';
import AnnouncementBar from '../../components/AnnouncementBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Mail, Phone, MapPin, MessageSquare, ChevronDown, Check, Send } from 'lucide-react';
import { useStore } from '../../lib/context/StoreContext';

const FAQS = [
  {
    q: 'How quickly do orders ship?',
    a: 'All orders are processed and dispatched from our beauty laboratory within 24 hours. Standard shipping takes 3-5 business days, while Express Air takes 1-2 days.',
  },
  {
    q: 'Are your formulas safe for sensitive or acne-prone skin?',
    a: 'Yes! All SheeStuff Store formulas are 100% dermatologist tested, non-comedogenic (won’t clog pores), and free of synthetic fragrances and paraben toxins.',
  },
  {
    q: 'What is your 30-day return & refund policy?',
    a: 'If you are not 100% satisfied with your results after 30 days of use, simply contact our support team to receive a prepaid return label and full refund.',
  },
  {
    q: 'Do you offer international shipping?',
    a: 'We currently ship directly across North America, Europe, Australia, and Asia with real-time tracking.',
  },
];

export default function ContactPage() {
  const { showToast } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [form, setForm] = useState({ name: '', email: '', subject: 'Order Inquiry', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('✨ Message received! A beauty advisor will reply within 4 hours.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-nude-50">
      <AnnouncementBar />
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-rose-deep text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-gold block mb-2">
            WE ARE HERE FOR YOU
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mb-3">
            Contact Beauty Advisor Support
          </h1>
          <p className="text-xs sm:text-sm text-nude-200 max-w-xl mx-auto">
            Have questions about product ingredients, routine recommendations, or your order? Send us a message anytime!
          </p>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full text-left space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Contact Cards & info */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950">
              Get in Touch
            </h2>
            <p className="text-xs text-brand-700 leading-relaxed">
              Our team of licensed estheticians and beauty advisors are available Monday through Saturday to help tailor your routine.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-brand-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-rose-blush text-rose-deep flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-950">Email Customer Care</p>
                  <p className="text-xs text-brand-600">support@sheestuffstore.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-brand-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-rose-blush text-rose-deep flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-950">Toll-Free Hotline</p>
                  <p className="text-xs text-brand-600">+1 (800) 555-SHEE (9am - 7pm EST)</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-brand-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-rose-blush text-rose-deep flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-950">HQ & Beauty Lab</p>
                  <p className="text-xs text-brand-600">540 Rodeo Drive, Beverly Hills, CA 90210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-brand-950 mb-4 pb-2 border-b border-brand-100">
              Send Us a Direct Message
            </h3>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-brand-950">Message Sent Successfully!</h4>
                <p className="text-xs text-brand-700 max-w-sm mx-auto">
                  Thank you for reaching out to SheeStuff Store. One of our skin specialists will review your message and respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-brand-900 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Camilla Vance"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-brand-950 focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-brand-900 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="camilla@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-brand-950 focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-brand-900 mb-1">Topic / Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 font-bold text-brand-950"
                  >
                    <option value="Order Inquiry">Order Status & Tracking</option>
                    <option value="Product Recommendation">Skincare Routine Advice</option>
                    <option value="Returns & Refunds">Return & Refund Support</option>
                    <option value="Wholesale Inquiry">Wholesale & Business Partnerships</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-brand-900 mb-1">Message Details *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can our beauty advisors assist you today?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2.5 text-brand-950 focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-950 text-white font-bold py-4 rounded-full shadow hover:bg-brand-800 transition text-xs"
                >
                  <Send className="w-4 h-4 text-rose-gold" />
                  <span>Send Message to Support</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-100 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950 mb-2">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-brand-600">Quick answers to common inquiries</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-brand-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 px-6 text-left font-serif font-bold text-sm text-brand-950 bg-nude-50/50 hover:bg-nude-50 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-brand-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 px-6 text-xs text-brand-800 leading-relaxed border-t border-brand-100 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}
