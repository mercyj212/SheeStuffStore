'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles, Star, ShoppingBag, Heart, ChevronRight, CheckCircle2, ShieldCheck, Leaf, Award, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '../lib/context/StoreContext';
import { PRODUCTS } from '../lib/products';

export default function Hero() {
  const { totalCartItems, wishlist, setIsCartOpen, setIsWishlistOpen } = useStore();
  const [activeHoverMenu, setActiveHoverMenu] = useState<string | null>(null);

  const categories = [
    { name: 'Skincare', slug: 'skincare' },
    { name: 'Serums', slug: 'serums' },
    { name: 'Moisturizers', slug: 'moisturizers' },
    { name: 'Lip Care', slug: 'lip-care' },
    { name: 'Sunscreen', slug: 'sunscreen' },
    { name: 'Makeup', slug: 'makeup' },
    { name: 'Sets & Kits', slug: 'sets-kits' },
  ];

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
              onMouseEnter={() => setActiveHoverMenu('home')}
              className="hover:text-[#B47A9A] transition py-1"
            >
              Home
            </Link>

            <Link 
              href="/shop" 
              onMouseEnter={() => setActiveHoverMenu('shop')}
              className="hover:text-[#B47A9A] transition py-1 flex items-center gap-1"
            >
              <span>Shop All</span>
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

          {/* Full Hero Preview Interactive Mega Menu Hover Drawer */}
          {activeHoverMenu && (
            <div 
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[860px] max-w-[95vw] bg-[#0B0E1A]/95 backdrop-blur-2xl border border-[#B47A9A]/40 rounded-3xl p-7 shadow-2xl text-white z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden"
            >
              {/* 1. HOME HERO PREVIEW */}
              {activeHoverMenu === 'home' && (
                <div className="relative space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5E3A5C]/40 border border-[#B47A9A]/40 text-[#B47A9A] text-[11px] font-serif font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#B47A9A]" />
                    <span>HOMEPAGE HERO PREVIEW</span>
                  </div>

                  <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-7 space-y-4">
                      <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                        Skin that holds <br />
                        <span className="italic text-[#B47A9A]">the light.</span>
                      </h2>

                      <p className="font-sans text-xs text-white/80 leading-relaxed max-w-sm">
                        Science-backed skincare formulated to restore your natural, radiant glow. 100% Organic, Cruelty Free & Dermatologist Approved.
                      </p>

                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <span className="font-sans text-xs font-bold text-white">4.9 / 5.0 Rating</span>
                      </div>

                      <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-[#B47A9A] text-[#00030E] font-sans font-bold text-xs px-6 py-2.5 rounded-full hover:bg-white transition"
                      >
                        <span>Go to Homepage</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="col-span-5 relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
                        alt="Homepage Hero Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00030E]/80 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. SHOP HERO PREVIEW */}
              {activeHoverMenu === 'shop' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="font-serif text-[11px] font-bold text-[#B47A9A] uppercase tracking-wider block">
                        COMPLETE COLLECTION
                      </span>
                      <h2 className="font-serif text-2xl font-bold text-white">
                        Shop All Beauty Formulas
                      </h2>
                    </div>
                    <Link 
                      href="/shop" 
                      className="inline-flex items-center gap-1.5 bg-[#B47A9A] text-[#00030E] font-sans font-bold text-xs px-4 py-2 rounded-full hover:bg-white transition"
                    >
                      <span>Open Shop Catalog →</span>
                    </Link>
                  </div>

                  <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-7 space-y-3 border-r border-white/10 pr-4">
                      <span className="font-serif text-xs font-bold text-[#B47A9A] uppercase tracking-wider block">
                        Explore Categories
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                        {categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-[#B47A9A]/20 border border-white/10 text-white/90 hover:text-white transition font-medium flex items-center justify-between"
                          >
                            <span>{cat.name}</span>
                            <ChevronRight className="w-3 h-3 text-[#B47A9A]" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Featured Products Spotlight */}
                    <div className="col-span-5 space-y-3">
                      <span className="font-serif text-xs font-bold text-[#B47A9A] uppercase tracking-wider block">
                        Viral Top Picks
                      </span>
                      
                      <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center gap-3">
                        <img 
                          src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200"
                          alt="Luminary Glow Serum"
                          className="w-14 h-14 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h4 className="font-serif text-xs font-bold text-white">Luminary Glow Serum</h4>
                          <p className="font-sans text-[11px] text-[#B47A9A] font-bold">$48.00 • ⭐ 4.9/5</p>
                        </div>
                        <Link href="/product/shee-radiance-serum" className="bg-[#B47A9A] text-[#00030E] text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-white transition">
                          View
                        </Link>
                      </div>

                      <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center gap-3">
                        <img 
                          src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=200"
                          alt="Velvet Petal Cream"
                          className="w-14 h-14 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h4 className="font-serif text-xs font-bold text-white">Velvet Petal Cream</h4>
                          <p className="font-sans text-[11px] text-[#B47A9A] font-bold">$54.00 • ⭐ 4.8/5</p>
                        </div>
                        <Link href="/product/velvet-petal-cream" className="bg-[#B47A9A] text-[#00030E] text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-white transition">
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. BRAND STORY HERO PREVIEW */}
              {activeHoverMenu === 'brand-story' && (
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5E3A5C]/40 border border-[#B47A9A]/40 text-[#B47A9A] text-[11px] font-serif font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#B47A9A]" />
                    <span>OUR JOURNEY & HERITAGE</span>
                  </div>

                  <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-7 space-y-3">
                      <h2 className="font-serif text-3xl font-bold tracking-tight text-white leading-tight">
                        The Brand Story of <br />
                        <span className="italic text-[#B47A9A]">SheeStuff Store</span>
                      </h2>

                      <p className="font-sans text-xs text-white/80 leading-relaxed">
                        Where clinical scientific rigor meets the pure, restorative power of organic botanicals. Formulated in Beverly Hills with zero parabens or toxin fillers.
                      </p>

                      <div className="grid grid-cols-2 gap-2 pt-1 font-sans text-xs font-bold text-white">
                        <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/10">
                          <CheckCircle2 className="w-4 h-4 text-[#B47A9A]" />
                          <span>100% Clean Actives</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/10">
                          <CheckCircle2 className="w-4 h-4 text-[#B47A9A]" />
                          <span>Dermatologist Formulated</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link
                          href="/brand-story"
                          className="inline-flex items-center gap-2 bg-[#B47A9A] text-[#00030E] font-sans font-bold text-xs px-6 py-2.5 rounded-full hover:bg-white transition"
                        >
                          <span>Read Full Brand Story</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    <div className="col-span-5 relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] group">
                      <img
                        src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600"
                        alt="Beverly Hills Formulation Lab"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00030E]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="font-serif font-bold text-xs">Beverly Hills Lab</p>
                        <p className="font-sans text-[10px] text-[#B47A9A]">Clinical Purity & Bio-Availability</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. ROUTINES HERO PREVIEW */}
              {activeHoverMenu === 'routines' && (
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5E3A5C]/40 border border-[#B47A9A]/40 text-[#B47A9A] text-[11px] font-serif font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#B47A9A]" />
                    <span>OUR ESSENCE & RITUALS</span>
                  </div>

                  <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-7 space-y-3">
                      <h2 className="font-serif text-3xl font-bold tracking-tight text-white leading-tight">
                        Reimagining Beauty Through <br />
                        <span className="italic text-[#B47A9A]">Clinical Botanicals</span>
                      </h2>

                      <p className="font-sans text-xs text-white/80 leading-relaxed">
                        At SheeStuff Store, we combine high-potency organic botanical extracts with dermatologist-backed clinical actives to reveal your skin’s healthiest natural glow.
                      </p>

                      {/* 4 Guarantees Badges */}
                      <div className="grid grid-cols-2 gap-2 font-sans text-[11px]">
                        <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10 text-white/90">
                          <Sparkles className="w-3.5 h-3.5 text-[#B47A9A]" />
                          <span className="font-semibold">Clinical Actives</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10 text-white/90">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#B47A9A]" />
                          <span className="font-semibold">Sensitive Skin Approved</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10 text-white/90">
                          <Leaf className="w-3.5 h-3.5 text-[#B47A9A]" />
                          <span className="font-semibold">Sustainable Beauty</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10 text-white/90">
                          <Award className="w-3.5 h-3.5 text-[#B47A9A]" />
                          <span className="font-semibold">100% Satisfaction</span>
                        </div>
                      </div>

                      <div className="pt-1">
                        <Link
                          href="/about"
                          className="inline-flex items-center gap-2 bg-[#B47A9A] text-[#00030E] font-sans font-bold text-xs px-6 py-2.5 rounded-full hover:bg-white transition"
                        >
                          <span>Explore Treatment Rituals</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Routine Bundle Highlight */}
                    <div className="col-span-5 bg-white/5 rounded-2xl p-4 border border-white/10 text-center space-y-2">
                      <span className="font-serif text-[11px] uppercase tracking-widest text-[#B47A9A] font-bold block">
                        Featured Ritual Bundle
                      </span>
                      <h4 className="font-serif text-sm font-bold text-white">Glass Skin Treatment Kit</h4>
                      <p className="font-sans text-xs text-white/70">Serum + Moisture Cream + Lip Oil</p>
                      <p className="font-sans text-xs text-emerald-400 font-bold pt-1">Save $24 Bundle Discount</p>
                      <Link 
                        href="/shop" 
                        className="inline-block w-full bg-[#B47A9A] text-[#00030E] font-sans text-xs font-bold py-2 rounded-full hover:bg-white transition"
                      >
                        Shop Routine Bundle
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. CONTACT HERO PREVIEW */}
              {activeHoverMenu === 'contact' && (
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5E3A5C]/40 border border-[#B47A9A]/40 text-[#B47A9A] text-[11px] font-serif font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#B47A9A]" />
                    <span>WE ARE HERE FOR YOU</span>
                  </div>

                  <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-6 space-y-3 border-r border-white/10 pr-4">
                      <h2 className="font-serif text-3xl font-bold tracking-tight text-white leading-tight">
                        Contact Beauty Advisor <br />
                        <span className="italic text-[#B47A9A]">Support</span>
                      </h2>

                      <p className="font-sans text-xs text-white/80 leading-relaxed">
                        Have questions about ingredients, custom routine recommendations, or your order status? We are here 24/7.
                      </p>

                      <div className="space-y-2 font-sans text-xs pt-1">
                        <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/10 text-white/90">
                          <Mail className="w-4 h-4 text-[#B47A9A]" />
                          <span>support@sheestuffstore.com</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/10 text-white/90">
                          <Phone className="w-4 h-4 text-[#B47A9A]" />
                          <span>+1 (800) 555-SHEE (9am - 7pm EST)</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/10 text-white/90">
                          <MapPin className="w-4 h-4 text-[#B47A9A]" />
                          <span>540 Rodeo Dr, Beverly Hills, CA</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Contact Box Preview */}
                    <div className="col-span-6 bg-white/5 rounded-2xl p-4 border border-white/10 space-y-3">
                      <span className="font-serif text-xs font-bold text-[#B47A9A] uppercase tracking-wider block">
                        Direct Support Inquiry
                      </span>
                      
                      <div className="space-y-2 font-sans text-xs">
                        <input
                          type="text"
                          disabled
                          placeholder="Your Name"
                          className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white/70 placeholder-white/40 cursor-not-allowed"
                        />
                        <input
                          type="email"
                          disabled
                          placeholder="Email Address"
                          className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white/70 placeholder-white/40 cursor-not-allowed"
                        />
                      </div>

                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 w-full bg-[#B47A9A] text-[#00030E] font-sans font-bold text-xs py-2.5 rounded-full hover:bg-white transition"
                      >
                        <span>Open Full Contact Form</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
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
              className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold text-[#F3E9EC] hover:text-[#B47A9A] border-b-2 border-[#B47A9A] pb-1 transition group font-sans"
            >
              <span>Check Treatment Eligibility & Shop Formulas</span>
              <ArrowRight className="w-4 h-4 text-[#B47A9A] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Middle Subheadline Description */}
        <div className="md:col-span-4 text-left md:text-right space-y-4">
          <p className="text-sm sm:text-base text-[#F3E9EC]/90 font-serif leading-relaxed max-w-xs md:ml-auto">
            Science-backed skincare formulated to restore your natural, radiant glow.
          </p>

          <div className="flex items-center justify-start md:justify-end gap-2 text-xs text-[#B47A9A] font-sans">
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
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between text-[11px] text-[#F3E9EC]/70 pt-4 border-t border-white/10 font-sans">
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
