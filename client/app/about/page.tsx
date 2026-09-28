'use client';

import React from 'react';
import AnnouncementBar from '../../components/AnnouncementBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Sparkles, ShieldCheck, Heart, Leaf, Award, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-nude-50">
      <AnnouncementBar />
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-rose-deep text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-gold block mb-2">
            OUR ESSENCE & STORY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mb-4">
            Reimagining Beauty Through Clinical Botanicals
          </h1>
          <p className="text-xs sm:text-base text-nude-200 max-w-2xl mx-auto leading-relaxed">
            At SheeStuff Store, we combine high-potency organic botanical extracts with dermatologist-backed clinical actives to create formulas that reveal your skin’s healthiest natural glow.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 flex-1 w-full text-left">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">THE PHILOSOPHY</span>
            <h2 className="font-serif text-3xl font-bold text-brand-950">
              Formulated Without Compromise
            </h2>
            <p className="text-xs sm:text-sm text-brand-800 leading-relaxed">
              Founded with a singular mission: to eliminate filler ingredients, synthetic fragrances, and aggressive parabens from modern skincare routines. 
            </p>
            <p className="text-xs sm:text-sm text-brand-800 leading-relaxed">
              Every formula in our line—from our Luminary Vitamin C Serum to our Velvet Petal Moisture Cream—undergoes rigorous dermatological testing for maximum bioavailability and gentle efficacy on sensitive skin.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-brand-950">
              <div className="flex items-center gap-1.5 bg-white p-3 rounded-2xl border border-brand-100 shadow-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>100% Cruelty-Free</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-3 rounded-2xl border border-brand-100 shadow-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Zero Synthetic Fragrance</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-3 rounded-2xl border border-brand-100 shadow-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Eco Glass Bottles</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000"
                alt="Botanical skincare lab"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-100 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950 mb-2">
              Our 4 Beauty Guarantees
            </h3>
            <p className="text-xs text-brand-600">The standards behind every bottle we craft</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2 text-center p-4 bg-nude-50 rounded-2xl border border-brand-100">
              <div className="w-12 h-12 rounded-2xl bg-white border border-brand-200 flex items-center justify-center mx-auto text-rose-gold shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-brand-950">Clinical Actives</h4>
              <p className="text-xs text-brand-700">15% L-Ascorbic Acid, Ferulic Acid, & Niacinamide at proven therapeutic doses.</p>
            </div>

            <div className="space-y-2 text-center p-4 bg-nude-50 rounded-2xl border border-brand-100">
              <div className="w-12 h-12 rounded-2xl bg-white border border-brand-200 flex items-center justify-center mx-auto text-rose-gold shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-brand-950">Sensitive Skin Approved</h4>
              <p className="text-xs text-brand-700">Formulated at optimal 5.5 pH balance to protect lipid moisture barriers.</p>
            </div>

            <div className="space-y-2 text-center p-4 bg-nude-50 rounded-2xl border border-brand-100">
              <div className="w-12 h-12 rounded-2xl bg-white border border-brand-200 flex items-center justify-center mx-auto text-rose-gold shadow-sm">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-brand-950">Sustainable Beauty</h4>
              <p className="text-xs text-brand-700">Recyclable frosted glass jars and FSC-certified biodegradable cartons.</p>
            </div>

            <div className="space-y-2 text-center p-4 bg-nude-50 rounded-2xl border border-brand-100">
              <div className="w-12 h-12 rounded-2xl bg-white border border-brand-200 flex items-center justify-center mx-auto text-rose-gold shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-brand-950">100% Satisfaction</h4>
              <p className="text-xs text-brand-700">Try any product risk-free for 30 days with full refund protection.</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center py-8">
          <h3 className="font-serif text-2xl font-bold text-brand-950 mb-4">
            Ready to Experience the Glow?
          </h3>
          <Link
            href="/shop"
            className="inline-block bg-brand-950 text-white font-bold text-xs px-8 py-4 rounded-full shadow-lg hover:bg-brand-800 transition"
          >
            Explore SheeStuff Shop Catalog
          </Link>
        </div>

      </section>

      <Footer />
    </div>
  );
}
