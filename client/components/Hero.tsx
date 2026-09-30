'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Star, ShoppingBag, Heart, ChevronRight, ChevronLeft, CheckCircle2, ShieldCheck, Leaf, Award, Flame, Gift, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '../lib/context/StoreContext';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Glass Skin Radiance',
    badge: '15% VITAMIN C & HYALURONIC',
    desc: 'Science-backed clinical botanicals formulated to illuminate and restore your natural glow.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=2000',
    link: '/shop?category=serums',
    cta: 'Explore Radiant Serums',
  },
  {
    id: 2,
    title: 'Velvet Silk Lip Care',
    badge: 'HYDRATING ROSEHIP & PEPTIDES',
    desc: 'Overnight lip masks and rose oils that lock in 24-hour hydration with zero stickiness.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=2000',
    link: '/shop?category=lip-care',
    cta: 'Shop Silk Lip Combos',
  },
  {
    id: 3,
    title: 'Lipid Barrier Protection',
    badge: 'DERMATOLOGIST TESTED 5.5 pH',
    desc: 'Formulated for sensitive skin to strengthen the natural lipid moisture barrier and soothe redness.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=2000',
    link: '/shop?category=moisturizers',
    cta: 'View Barrier Moisture Creams',
  },
  {
    id: 4,
    title: 'Glazed Donut Gel Nails',
    badge: 'REUSABLE SALON QUALITY',
    desc: 'Reusable gel press-on nails that last up to 3 weeks with zero damage to natural nails.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=2000',
    link: '/shop?category=sets-kits',
    cta: 'Browse Press-On Sets',
  },
];

export default function Hero() {
  const { totalCartItems, wishlist, setIsCartOpen, setIsWishlistOpen } = useStore();
  const [activeHoverMenu, setActiveHoverMenu] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const navLinks = [
    { name: 'Beauty', href: '/shop?category=makeup', hoverKey: 'beauty' },
    { name: 'Skincare', href: '/shop?category=skincare', hoverKey: 'skincare' },
    { name: 'Nails & Care', href: '/shop?category=sets-kits', hoverKey: 'nails' },
    { name: 'Hair & Wigs', href: '/shop', hoverKey: 'hair' },
    { name: 'Period Care', href: '/shop', hoverKey: 'personal-care' },
    { name: 'Brand Story', href: '/brand-story', hoverKey: 'brand-story' },
  ];

  // Auto-play timer for sliding faces
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNextSlide();
    } else if (diff < -50) {
      handlePrevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section 
      className="relative w-full h-screen min-h-[720px] max-h-[1080px] overflow-hidden bg-[#00030E] text-[#F3E9EC] flex flex-col justify-between px-4 sm:px-8 lg:px-12 pt-3 sm:pt-5 pb-6 sm:pb-10 lg:pb-14 select-none"
      onMouseLeave={() => {
        setActiveHoverMenu(null);
        setIsPaused(false);
      }}
      onMouseEnter={() => setIsPaused(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Dynamic 3D Face-Turning Slide Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                isActive
                  ? 'opacity-100 scale-100 rotate-0 translate-x-0 filter brightness-[0.88] contrast-[1.05]'
                  : 'opacity-0 scale-105 -rotate-y-12 translate-x-10 pointer-events-none filter brightness-50'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out scale-105"
              />
              {/* Soft Gradient Overlays for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#00030E] via-[#00030E]/40 to-[#00030E]/70 opacity-95" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#00030E]/85 via-transparent to-[#00030E]/70" />
            </div>
          );
        })}
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

        {/* Floating Glass Pill Navigation Bar */}
        <div className="relative">
          <nav className="hidden md:flex items-center gap-7 px-7 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-sans text-xs font-semibold uppercase tracking-widest text-white shadow-2xl">
            <Link 
              href="/" 
              onMouseEnter={() => setActiveHoverMenu(null)}
              className="hover:text-[#B47A9A] transition py-1"
            >
              Home
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => setActiveHoverMenu(link.hoverKey)}
                className={`hover:text-[#B47A9A] transition py-1 ${
                  activeHoverMenu === link.hoverKey ? 'text-[#B47A9A] font-bold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Action Icons: Wishlist & Cart */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:text-[#B47A9A] hover:bg-white/20 transition shadow cursor-pointer"
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
            className="relative p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:text-[#B47A9A] hover:bg-white/20 transition shadow cursor-pointer"
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

      {/* LARGE FULL-WIDTH MAYBELLINE-STYLE MEGA MENU PANEL INSIDE HERO */}
      {activeHoverMenu && (
        <div 
          className="absolute top-24 left-0 right-0 w-full bg-[#00030E]/98 backdrop-blur-2xl border-t border-b border-[#B47A9A]/30 shadow-2xl text-white z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => setIsPaused(true)}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
            
            {/* 1. BEAUTY MEGA MENU */}
            {activeHoverMenu === 'beauty' && (
              <div className="grid grid-cols-12 gap-8 items-start">
                
                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Lip Products
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop?category=lip-care" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Silk Lip Glosses & Shimmers</Link></li>
                    <li><Link href="/shop?category=lip-care" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Velvet Lip Combos & Liners</Link></li>
                    <li><Link href="/shop?category=lip-care" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Overnight Lip Repair Masks</Link></li>
                    <li><Link href="/shop?category=lip-care" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Tinted Rose Lip Oils</Link></li>
                    <li><Link href="/shop?category=lip-care" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Hydrating Lip Balms</Link></li>
                  </ul>
                </div>

                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Face & Masks
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop?category=skincare" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Bio-Cellulose Face Masks</Link></li>
                    <li><Link href="/shop?category=makeup" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Radiance Illuminating Primers</Link></li>
                    <li><Link href="/shop?category=makeup" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Botanical Dewy Setting Sprays</Link></li>
                    <li><Link href="/shop?category=skincare" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Hydrating Glow Mist</Link></li>
                  </ul>
                </div>

                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Trending Drops
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop?filter=new" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-amber-400" /> Viral TikTok Beauty Picks</Link></li>
                    <li><Link href="/shop?filter=bestsellers" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#B47A9A]" /> Glass Skin Glow Essentials</Link></li>
                    <li><Link href="/shop?filter=sets" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-flex items-center gap-1.5"><Gift className="w-3.5 h-3.5 text-emerald-400" /> Deluxe Beauty & Lip Kits</Link></li>
                  </ul>
                </div>

                {/* Large Featured Promotional Card */}
                <div className="col-span-3 bg-white/5 rounded-3xl p-4 border border-white/10 space-y-3">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <img 
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600"
                      alt="Velvet Silk Lip Butter"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#B47A9A] text-[#00030E] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                      LIMITED EDITION
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm font-bold text-white">Velvet Silk Lip Butter Kit</h4>
                    <p className="font-sans text-[11px] text-white/70 leading-relaxed">
                      Organic rosehip oil & triple hyaluronic spheres for 24-hour hydration.
                    </p>
                  </div>
                  <Link 
                    href="/shop?category=lip-care"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#B47A9A] text-[#00030E] font-sans font-bold text-xs py-2.5 rounded-full hover:bg-white transition"
                  >
                    <span>Shop Lip Kits</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            )}

            {/* 2. SKINCARE MEGA MENU */}
            {activeHoverMenu === 'skincare' && (
              <div className="grid grid-cols-12 gap-8 items-start">
                
                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Serums & Actives
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop?category=serums" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Luminary Vitamin C 15% Serum</Link></li>
                    <li><Link href="/shop?category=serums" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Triple Hyaluronic Hydrating Serum</Link></li>
                    <li><Link href="/shop?category=serums" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Niacinamide 10% Pore Refiner</Link></li>
                    <li><Link href="/shop?category=serums" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Ferulic Botanical Radiance Elixir</Link></li>
                  </ul>
                </div>

                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Moisturizers & Oils
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop?category=moisturizers" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Velvet Petal Moisture Cream</Link></li>
                    <li><Link href="/shop?category=moisturizers" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Peptide Lipid Barrier Repair Cream</Link></li>
                    <li><Link href="/shop?category=moisturizers" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Cold-Pressed Jojoba Beauty Oil</Link></li>
                    <li><Link href="/shop?category=moisturizers" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Overnight Recovery Treatment</Link></li>
                  </ul>
                </div>

                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Protection & Cleanse
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop?category=sunscreen" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Invisible Mineral Sunscreen SPF 50</Link></li>
                    <li><Link href="/shop?category=skincare" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Gentle Botanical Gel Cleanser</Link></li>
                    <li><Link href="/shop?category=skincare" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Bulgarian Rose Hydrosol Toner</Link></li>
                    <li><Link href="/shop?category=skincare" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Gentle AHA/BHA Exfoliating Drops</Link></li>
                  </ul>
                </div>

                {/* Large Featured Promotional Card */}
                <div className="col-span-3 bg-white/5 rounded-3xl p-4 border border-white/10 space-y-3">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <img 
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600"
                      alt="Luminary Vitamin C Serum"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#B47A9A] text-[#00030E] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                      DERMATOLOGIST FAVORED
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm font-bold text-white">Luminary Radiance Glow Serum</h4>
                    <p className="font-sans text-[11px] text-white/70 leading-relaxed">
                      Potent 15% L-Ascorbic Acid + Ferulic Acid for hyperpigmentation & glass skin.
                    </p>
                  </div>
                  <Link 
                    href="/product/shee-radiance-serum"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#B47A9A] text-[#00030E] font-sans font-bold text-xs py-2.5 rounded-full hover:bg-white transition"
                  >
                    <span>View Formula</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            )}

            {/* 3. NAILS & CARE MEGA MENU */}
            {activeHoverMenu === 'nails' && (
              <div className="grid grid-cols-12 gap-8 items-start">
                
                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Press-On Nails
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop?category=sets-kits" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">French Ombre Almond Press-Ons</Link></li>
                    <li><Link href="/shop?category=sets-kits" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Velvet Cat-Eye Gel Nails</Link></li>
                    <li><Link href="/shop?category=sets-kits" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Nude Minimalist Short Square</Link></li>
                    <li><Link href="/shop?category=sets-kits" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Glazed Donut Stiletto Nails</Link></li>
                  </ul>
                </div>

                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Gel Strips & Glue
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop?category=sets-kits" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Semi-Cured Gel Nail Strips</Link></li>
                    <li><Link href="/shop?category=sets-kits" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Ultra-Hold Waterproof Nail Glue</Link></li>
                    <li><Link href="/shop?category=sets-kits" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Adhesive Prep Alcohol Wipes</Link></li>
                    <li><Link href="/shop?category=sets-kits" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Pocket UV LED Curing Light</Link></li>
                  </ul>
                </div>

                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Nail Care & Accessories
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop?category=sets-kits" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Botanical Cuticle Oil Pens</Link></li>
                    <li><Link href="/shop?category=sets-kits" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Glass Nail File & Buffer Kit</Link></li>
                    <li><Link href="/shop?category=sets-kits" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Keratin Nail Strengthening Serum</Link></li>
                  </ul>
                </div>

                {/* Featured Promotional Card */}
                <div className="col-span-3 bg-white/5 rounded-3xl p-4 border border-white/10 space-y-3">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <img 
                      src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600"
                      alt="Press-On Gel Nails"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#B47A9A] text-[#00030E] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                      SALON AT HOME
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm font-bold text-white">Glazed Donut Press-On Nails</h4>
                    <p className="font-sans text-[11px] text-white/70 leading-relaxed">
                      Reusable salon-grade gel nails lasting up to 3 weeks with zero damage.
                    </p>
                  </div>
                  <Link 
                    href="/shop?category=sets-kits"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#B47A9A] text-[#00030E] font-sans font-bold text-xs py-2.5 rounded-full hover:bg-white transition"
                  >
                    <span>Browse Nail Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            )}

            {/* 4. HAIR & WIGS MEGA MENU */}
            {activeHoverMenu === 'hair' && (
              <div className="grid grid-cols-12 gap-8 items-start">
                
                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Wigs & Extensions
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">HD Lace Front Human Hair Wigs</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Glueless Ready-to-Wear Wigs</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Seamless Clip-In Hair Extensions</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Wrap-Around Ponytail Extensions</Link></li>
                  </ul>
                </div>

                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Silk Protection & Care
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">100% Mulberry Silk Bonnets</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Mulberry Silk Pillowcases & Scrunchies</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Edge Control & Sleek Gel</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Scalp Nourishing Growth Oils</Link></li>
                  </ul>
                </div>

                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Hair Accessories
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Lace Wig Melting Elastic Band</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Wide Tooth Sandalwood Combs</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Heatless Satin Curling Rod Set</Link></li>
                  </ul>
                </div>

                {/* Featured Promotional Card */}
                <div className="col-span-3 bg-white/5 rounded-3xl p-4 border border-white/10 space-y-3">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <img 
                      src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600"
                      alt="Mulberry Silk Bonnet"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#B47A9A] text-[#00030E] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                      OVERNIGHT CARE
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm font-bold text-white">Pure Mulberry Silk Bonnet Kit</h4>
                    <p className="font-sans text-[11px] text-white/70 leading-relaxed">
                      Protect curls, wigs, and blowouts from friction, frizz, and breakage while sleeping.
                    </p>
                  </div>
                  <Link 
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#B47A9A] text-[#00030E] font-sans font-bold text-xs py-2.5 rounded-full hover:bg-white transition"
                  >
                    <span>Shop Hair Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            )}

            {/* 5. PERIOD & PERSONAL CARE MEGA MENU */}
            {activeHoverMenu === 'personal-care' && (
              <div className="grid grid-cols-12 gap-8 items-start">
                
                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Period Care
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">100% Organic Cotton Sanitary Pads</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Ultra-Thin Everyday Panty Liners</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Herbal Period Cramp Relief Patches</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Medical Grade Menstrual Cup & Wash</Link></li>
                  </ul>
                </div>

                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Body Care & Shaving
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Botanical Body Wash & In-Shower Oil</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Smooth Shave Butter & Safety Razor</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Exfoliating Sugar Body Scrubs</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Intimate Balanced Wash</Link></li>
                  </ul>
                </div>

                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Everyday Essentials
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Organic Cotton Rounds & Swabs</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Travel Beauty Organizers</Link></li>
                    <li><Link href="/shop" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">All-Day Hydration Body Mists</Link></li>
                  </ul>
                </div>

                {/* Featured Promotional Card */}
                <div className="col-span-3 bg-white/5 rounded-3xl p-4 border border-white/10 space-y-3">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <img 
                      src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600"
                      alt="Organic Cotton Care"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#B47A9A] text-[#00030E] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                      100% ORGANIC COTTON
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm font-bold text-white">Gentle Care Essentials Bundle</h4>
                    <p className="font-sans text-[11px] text-white/70 leading-relaxed">
                      Zero toxin, dye-free, and hypoallergenic organic cotton period & personal care.
                    </p>
                  </div>
                  <Link 
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#B47A9A] text-[#00030E] font-sans font-bold text-xs py-2.5 rounded-full hover:bg-white transition"
                  >
                    <span>Shop Personal Care</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            )}

            {/* 6. BRAND STORY MEGA MENU */}
            {activeHoverMenu === 'brand-story' && (
              <div className="grid grid-cols-12 gap-8 items-start">
                
                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Our Heritage
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/brand-story" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">The Botanical Philosophy</Link></li>
                    <li><Link href="/brand-story" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Beverly Hills Formulation Lab</Link></li>
                    <li><Link href="/brand-story" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Dermatologist Clinical Validation</Link></li>
                    <li><Link href="/brand-story" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">Eco Glass & Sustainability Standards</Link></li>
                  </ul>
                </div>

                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Curated Rituals
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/about" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">✨ 3-Step Glass Skin Ritual</Link></li>
                    <li><Link href="/about" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">🌙 Night Lipid Barrier Repair Ritual</Link></li>
                    <li><Link href="/about" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">💋 Velvet Silk Lip Treatment Ritual</Link></li>
                  </ul>
                </div>

                <div className="col-span-3 space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#B47A9A] tracking-wide border-b border-white/10 pb-2">
                    Support & Contact
                  </h3>
                  <ul className="space-y-2.5 font-sans text-xs text-white/80">
                    <li><Link href="/contact" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">💬 24/7 Skin Consultation Support</Link></li>
                    <li><Link href="/contact" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">📦 Order Tracking & Status</Link></li>
                    <li><Link href="/contact" className="hover:text-[#B47A9A] hover:translate-x-1 transition-all inline-block">📍 Beverly Hills HQ & Lab Location</Link></li>
                  </ul>
                </div>

                {/* Featured Promotional Card */}
                <div className="col-span-3 bg-white/5 rounded-3xl p-4 border border-white/10 space-y-3">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <img 
                      src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600"
                      alt="Formulation Lab"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#B47A9A] text-[#00030E] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                      OUR PHILOSOPHY
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm font-bold text-white">Clinical Rigor Meets Botanicals</h4>
                    <p className="font-sans text-[11px] text-white/70 leading-relaxed">
                      Discover how we formulate pure bio-available skincare without synthetic fillers.
                    </p>
                  </div>
                  <Link 
                    href="/brand-story"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#B47A9A] text-[#00030E] font-sans font-bold text-xs py-2.5 rounded-full hover:bg-white transition"
                  >
                    <span>Read Our Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* Main Interactive Carousel Content Overlay */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-12 pb-6">
        
        {/* Left Slide Headline & Subtitle spotlight */}
        <div className="lg:col-span-8 text-left space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#B47A9A] text-xs font-serif font-bold uppercase tracking-wider shadow">
            <Sparkles className="w-3.5 h-3.5 text-[#B47A9A]" />
            <span>{HERO_SLIDES[currentSlide].badge}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] transition-all duration-500">
            {HERO_SLIDES[currentSlide].title}
          </h1>

          <p className="font-sans text-xs sm:text-sm text-white/80 max-w-lg leading-relaxed">
            {HERO_SLIDES[currentSlide].desc}
          </p>

          <div className="pt-2">
            <Link
              href={HERO_SLIDES[currentSlide].link}
              className="inline-flex items-center gap-3 bg-[#B47A9A] text-[#00030E] font-sans font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-xl hover:bg-white transition group"
            >
              <span>{HERO_SLIDES[currentSlide].cta}</span>
              <ArrowRight className="w-4 h-4 text-[#00030E] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Carousel Slide Controls & Indicator Pills */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between space-y-6">
          
          {/* Prev / Next Slide Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevSlide}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-[#B47A9A] transition shadow-lg cursor-pointer active:scale-95"
              aria-label="Previous Face Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-sans text-xs font-bold text-white/80 tracking-widest px-2">
              0{currentSlide + 1} / 0{HERO_SLIDES.length}
            </span>
            <button
              onClick={handleNextSlide}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-[#B47A9A] transition shadow-lg cursor-pointer active:scale-95"
              aria-label="Next Face Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Slide Progress Dots */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === currentSlide ? 'w-8 bg-[#B47A9A]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
