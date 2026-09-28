'use client';

import React from 'react';
import { ArrowRight, Sparkles, Star, ShoppingBag, Heart } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '../lib/context/StoreContext';

export default function Hero() {
  const { totalCartItems, wishlist, setIsCartOpen, setIsWishlistOpen } = useStore();

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

      {/* Top Header Navigation Bar inside Hero (Logo on Left, Nav in Center/Right) */}
      <header className="relative z-20 flex items-center justify-between max-w-7xl w-full mx-auto pt-0">
        
        {/* Left Aligned Prominent Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <img
            src="/logo-light.png"
            alt="SheeStuffstore Logo"
            className="h-14 sm:h-16 lg:h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-xl"
          />
        </Link>

        {/* Floating Glass Pill Navigation Bar with Switzer Sans Font */}
        <nav className="hidden md:flex items-center gap-6 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-sans text-xs font-semibold uppercase tracking-widest text-white shadow-2xl">
          <Link href="/" className="hover:text-[#B47A9A] transition">Home</Link>
          <Link href="/shop" className="hover:text-[#B47A9A] transition">Shop</Link>
          <Link href="/brand-story" className="hover:text-[#B47A9A] transition">Brand Story</Link>
          <Link href="/contact" className="hover:text-[#B47A9A] transition">Contact</Link>
          <Link href="/about" className="hover:text-[#B47A9A] transition">Routines</Link>
          
          <Link
            href="/admin/login"
            className="bg-[#B47A9A] text-[#00030E] font-bold px-4 py-1.5 rounded-full hover:bg-white transition text-xs shadow-md normal-case tracking-normal"
          >
            Log in
          </Link>
        </nav>

        {/* Right Action Icons: Wishlist, Cart & Catalog */}
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

          <Link
            href="/shop"
            className="hidden sm:inline-flex bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white text-white hover:text-[#00030E] font-bold text-xs px-5 py-2.5 rounded-full transition shadow"
          >
            Shop Catalog
          </Link>
        </div>
      </header>

      {/* Main Full-Screen Middle & Bottom Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-12 pb-6">
        
        {/* Left Bottom Massive Headline */}
        <div className="md:col-span-8 text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5E3A5C]/40 border border-[#B47A9A]/40 text-[#B47A9A] text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLINICALLY PROVEN BOTANICAL FORMULAS</span>
          </div>

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
