'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles, Star, ShoppingBag, Heart, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '../lib/context/StoreContext';

export default function Hero() {
  const { totalCartItems, wishlist, setIsCartOpen, setIsWishlistOpen } = useStore();
  const [activeHoverMenu, setActiveHoverMenu] = useState<string | null>(null);

  return (
    <section className="relative w-full h-screen min-h-[700px] max-h-[1080px] overflow-hidden bg-[#00030E] text-[#F3E9EC] flex flex-col justify-between px-4 sm:px-8 lg:px-12 pt-3 sm:pt-5 pb-6 sm:pb-10 lg:pb-14">
      
      {/* Background High-Res Full-Screen Image with Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=2000"
          alt="SheeStuff Store Radiant Skin"
          className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05]"
        />
        {/* Soft Radial & Linear Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00030E] via-[#00030E]/30 to-[#00030E]/60 opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00030E]/80 via-transparent to-[#00030E]/60" />
      </div>

      {/* Top Header Navigation Bar inside Hero */}
      <header className="relative z-30 flex items-center justify-between max-w-7xl w-full mx-auto pt-0">
        
        {/* Left Aligned Prominent Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <img
            src="/logo-light.png"
            alt="SheeStuffstore Logo"
            className="h-14 sm:h-16 lg:h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-xl"
          />
        </Link>

        {/* Floating Glass Pill Navigation Bar with Interactive Hover Mega Menu Trigger */}
        <div className="relative" onMouseLeave={() => setActiveHoverMenu(null)}>
          <nav className="hidden md:flex items-center gap-7 px-7 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-sans text-xs font-semibold uppercase tracking-widest text-white shadow-2xl">
            <Link 
              href="/" 
              onMouseEnter={() => setActiveHoverMenu(null)}
              className="hover:text-[#B47A9A] transition py-1"
            >
              Home
            </Link>

            <Link 
              href="/shop" 
              onMouseEnter={() => setActiveHoverMenu('shop')}
              className="hover:text-[#B47A9A] transition py-1 flex items-center gap-1"
            >
              <span>Shop</span>
            </Link>

            <Link 
              href="/brand-story" 
              onMouseEnter={() => setActiveHoverMenu('brand-story')}
              className="hover:text-[#B47A9A] transition py-1"
            >
              Brand Story
            </Link>

            <Link 
              href="/about" 
              onMouseEnter={() => setActiveHoverMenu('routines')}
              className="hover:text-[#B47A9A] transition py-1"
            >
              Routines
            </Link>

            <Link 
              href="/contact" 
              onMouseEnter={() => setActiveHoverMenu('contact')}
              className="hover:text-[#B47A9A] transition py-1"
            >
              Contact
            </Link>
          </nav>

          {/* Maybelline-Style Interactive Mega Menu Hover Drawer */}
          {activeHoverMenu && (
            <div 
              onMouseEnter={() => {}}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] max-w-[92vw] bg-[#0B0E1A]/95 backdrop-blur-2xl border border-[#B47A9A]/30 rounded-3xl p-6 shadow-2xl text-white z-50 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {/* 1. SHOP MEGA MENU */}
              {activeHoverMenu === 'shop' && (
                <div className="grid grid-cols-12 gap-6 items-center">
                  <div className="col-span-4 space-y-2 border-r border-white/10 pr-4">
                    <span className="font-serif text-sm font-bold text-[#B47A9A] uppercase tracking-wider block mb-2">Categories</span>
                    <Link href="/category/serums" className="block text-xs text-white/90 hover:text-[#B47A9A] transition font-sans">Vitamin C Serums</Link>
                    <Link href="/category/moisturizers" className="block text-xs text-white/90 hover:text-[#B47A9A] transition font-sans">Barrier Moisture Creams</Link>
                    <Link href="/category/lip-care" className="block text-xs text-white/90 hover:text-[#B47A9A] transition font-sans">Silk Lip Butters</Link>
                    <Link href="/category/sunscreen" className="block text-xs text-white/90 hover:text-[#B47A9A] transition font-sans">Radiance Sunscreen</Link>
                    <Link href="/shop" className="block text-xs text-[#B47A9A] font-bold hover:underline transition pt-2">Browse All Products →</Link>
                  </div>

                  <div className="col-span-4 space-y-2 border-r border-white/10 pr-4">
                    <span className="font-serif text-sm font-bold text-[#B47A9A] uppercase tracking-wider block mb-2">Collections</span>
                    <Link href="/shop?filter=bestsellers" className="block text-xs text-white/90 hover:text-[#B47A9A] transition">🔥 Bestsellers</Link>
                    <Link href="/shop?filter=new" className="block text-xs text-white/90 hover:text-[#B47A9A] transition">✨ Viral TikTok Picks</Link>
                    <Link href="/shop?filter=sets" className="block text-xs text-white/90 hover:text-[#B47A9A] transition">🎁 Gift & Treatment Bundles</Link>
                  </div>

                  {/* Featured Product Spotlight Card */}
                  <div className="col-span-4 bg-white/5 rounded-2xl p-3 border border-white/10 text-center space-y-2">
                    <img 
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400"
                      alt="Luminary Glow Vitamin C Serum"
                      className="w-full h-24 object-cover rounded-xl"
                    />
                    <div>
                      <h4 className="font-serif text-xs font-bold text-white">Luminary Glow Serum</h4>
                      <p className="text-[10px] text-[#B47A9A] font-bold">$48.00 • ⭐ 4.9/5</p>
                    </div>
                    <Link href="/product/shee-radiance-serum" className="inline-block w-full bg-[#B47A9A] text-[#00030E] text-[10px] font-bold py-1 rounded-full hover:bg-white transition">
                      View Formula
                    </Link>
                  </div>
                </div>
              )}

              {/* 2. BRAND STORY MEGA MENU */}
              {activeHoverMenu === 'brand-story' && (
                <div className="grid grid-cols-12 gap-6 items-center">
                  <div className="col-span-7 space-y-3 pr-4">
                    <span className="font-serif text-sm font-bold text-[#B47A9A] uppercase tracking-wider block">Our Botanical Philosophy</span>
                    <p className="text-xs text-white/80 leading-relaxed font-sans">
                      Formulated in collaboration with leading dermatologists. 100% cruelty-free, zero toxins, and clinical-grade active botanicals for radiant skin.
                    </p>
                    <Link href="/brand-story" className="inline-flex items-center gap-1 text-xs font-bold text-[#B47A9A] hover:underline">
                      <span>Read Full Brand Story</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="col-span-5">
                    <img 
                      src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400"
                      alt="Brand Lab"
                      className="w-full h-28 object-cover rounded-2xl border border-white/10"
                    />
                  </div>
                </div>
              )}

              {/* 3. ROUTINES MEGA MENU */}
              {activeHoverMenu === 'routines' && (
                <div className="grid grid-cols-12 gap-6 items-center">
                  <div className="col-span-7 space-y-2 border-r border-white/10 pr-4">
                    <span className="font-serif text-sm font-bold text-[#B47A9A] uppercase tracking-wider block mb-2">Curated Treatment Rituals</span>
                    <Link href="/about" className="block text-xs font-bold text-white hover:text-[#B47A9A] transition">✨ 3-Step Glass Skin Routine</Link>
                    <p className="text-[10px] text-white/60">Serum + Barrier Cream + Radiant Lip Oil</p>
                    <Link href="/about" className="block text-xs font-bold text-white hover:text-[#B47A9A] transition pt-2">🌙 Night Barrier Repair Ritual</Link>
                    <p className="text-[10px] text-white/60">Peptide Deep Moisture Cream</p>
                  </div>
                  <div className="col-span-5 bg-white/5 rounded-2xl p-3 border border-white/10 text-center space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#B47A9A] font-bold block">Routine Bundle</span>
                    <h4 className="font-serif text-xs font-bold text-white">Glass Skin Treatment Kit</h4>
                    <p className="text-[10px] text-emerald-400 font-bold">Save $24 Bundle Discount</p>
                    <Link href="/shop" className="inline-block w-full bg-[#B47A9A] text-[#00030E] text-[10px] font-bold py-1 rounded-full hover:bg-white transition">
                      Shop Routine Kit
                    </Link>
                  </div>
                </div>
              )}

              {/* 4. CONTACT MEGA MENU */}
              {activeHoverMenu === 'contact' && (
                <div className="grid grid-cols-12 gap-6 items-center">
                  <div className="col-span-6 space-y-2 border-r border-white/10 pr-4">
                    <span className="font-serif text-sm font-bold text-[#B47A9A] uppercase tracking-wider block mb-2">Customer Care & Support</span>
                    <Link href="/contact" className="block text-xs text-white/90 hover:text-[#B47A9A] transition">💬 24/7 Skin Consultation Support</Link>
                    <Link href="/contact" className="block text-xs text-white/90 hover:text-[#B47A9A] transition">📦 Track Your Order Status</Link>
                    <Link href="/contact" className="block text-xs text-white/90 hover:text-[#B47A9A] transition">🤝 Wholesale & Press Inquiries</Link>
                  </div>
                  <div className="col-span-6 space-y-2 pl-2">
                    <span className="font-serif text-sm font-bold text-[#B47A9A] uppercase tracking-wider block mb-2">Direct Contact</span>
                    <p className="text-xs text-white/80 font-sans">Email: support@sheestuffstore.com</p>
                    <p className="text-xs text-white/80 font-sans">Hours: Mon - Fri, 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Action Icons: Wishlist & Cart */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:text-[#B47A9A] hover:bg-white/20 transition shadow"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B47A9A] text-[#00030E] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:text-[#B47A9A] hover:bg-white/20 transition shadow"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B47A9A] text-[#00030E] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Full-Screen Middle & Bottom Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-12 pb-6">
        
        {/* Left Bottom Massive Headline */}
        <div className="md:col-span-8 text-left space-y-6">

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]">
            Skin that holds <br />
            <span className="italic text-[#B47A9A]">the light.</span>
          </h1>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold text-[#F3E9EC] hover:text-[#B47A9A] border-b-2 border-[#B47A9A] pb-1 transition group"
            >
              <span>Check Treatment Eligibility & Shop Formulas</span>
              <ArrowRight className="w-4 h-4 text-[#B47A9A] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Middle Subheadline Description (Right-aligned text like the image) */}
        <div className="md:col-span-4 text-left md:text-right space-y-4">
          <p className="text-sm sm:text-base text-[#F3E9EC]/90 font-serif leading-relaxed max-w-xs md:ml-auto">
            Science-backed skincare formulated to restore your natural, radiant glow.
          </p>

          <div className="flex items-center justify-start md:justify-end gap-2 text-xs text-[#B47A9A]">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-white text-xs">4.9 / 5.0 Rating</span>
          </div>
        </div>

      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between text-[11px] text-[#F3E9EC]/70 pt-4 border-t border-white/10">
        <span>© 2026 SheeStuff Store • Luxe Clinical Botanicals</span>
        <div className="flex items-center gap-4">
          <span>100% Organic</span>
          <span>•</span>
          <span>Cruelty Free</span>
          <span>•</span>
          <span>Dermatologist Approved</span>
        </div>
      </div>

    </section>
  );
}
