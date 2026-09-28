'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '../lib/context/StoreContext';
import { ShoppingBag, Heart, Search, Menu, X, ChevronRight, Sparkles, Star, CheckCircle2, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Leaf, Award, Flame, Gift, Package } from 'lucide-react';
import { PRODUCTS } from '../lib/products';

export default function Navbar() {
  const pathname = usePathname();
  const { totalCartItems, wishlist, setIsCartOpen, setIsWishlistOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHoverMenu, setActiveHoverMenu] = useState<string | null>(null);

  const filteredPreview = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const navLinks = [
    { name: 'Beauty', href: '/shop?category=makeup', hoverKey: 'beauty' },
    { name: 'Skincare', href: '/shop?category=skincare', hoverKey: 'skincare' },
    { name: 'Nails & Care', href: '/shop?category=sets-kits', hoverKey: 'nails' },
    { name: 'Hair & Wigs', href: '/shop', hoverKey: 'hair' },
    { name: 'Period Care', href: '/shop', hoverKey: 'personal-care' },
    { name: 'Brand Story', href: '/brand-story', hoverKey: 'brand-story' },
  ];

  return (
    <header 
      className="sticky top-0 z-50 bg-[#F3E9EC]/95 backdrop-blur-md border-b border-[#B47A9A]/30 transition-all relative"
      onMouseLeave={() => setActiveHoverMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#00030E] hover:bg-[#B47A9A]/20 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left-Aligned Prominent Brand Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo-dark.png"
                alt="SheeStuffstore Logo"
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-sm"
              />
            </Link>
          </div>

          {/* Desktop Top-Level Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-sans text-xs font-semibold uppercase tracking-widest text-[#00030E]">
            <Link
              href="/"
              onMouseEnter={() => setActiveHoverMenu(null)}
              className={`transition-colors py-2 border-b-2 ${
                pathname === '/'
                  ? 'border-[#00030E] font-bold text-[#00030E]'
                  : 'border-transparent hover:text-[#5E3A5C] hover:border-[#B47A9A]'
              }`}
            >
              Home
            </Link>

            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div
                  key={link.name}
                  onMouseEnter={() => setActiveHoverMenu(link.hoverKey)}
                  className="py-2"
                >
                  <Link
                    href={link.href}
                    className={`transition-colors py-2 border-b-2 ${
                      isActive || activeHoverMenu === link.hoverKey
                        ? 'border-[#00030E] font-bold text-[#00030E]'
                        : 'border-transparent hover:text-[#5E3A5C] hover:border-[#B47A9A]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Live Search Bar */}
            <div className="relative hidden md:block w-48 lg:w-60">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5E3A5C]" />
                <input
                  type="text"
                  placeholder="Search skincare..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="w-full bg-white border border-[#B47A9A]/40 rounded-full py-2 pl-9 pr-4 text-xs text-[#00030E] placeholder-[#5E3A5C]/70 focus:outline-none focus:ring-2 focus:ring-[#B47A9A] focus:bg-white transition"
                />
              </div>

              {/* Live search preview popup */}
              {searchFocused && filteredPreview.length > 0 && (
                <div className="absolute top-full right-0 left-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#B47A9A]/30 p-2 z-50">
                  {filteredPreview.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="flex items-center gap-3 p-2 hover:bg-[#F3E9EC] rounded-xl cursor-pointer transition"
                    >
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg" />
                      <div className="overflow-hidden text-left">
                        <p className="text-xs font-semibold text-[#00030E] truncate">{product.name}</p>
                        <p className="text-[11px] text-[#5E3A5C] font-bold">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Link / Drawer Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-full text-[#00030E] hover:bg-[#B47A9A]/20 transition cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B47A9A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#00030E] text-[#F3E9EC] hover:bg-[#2C1B2F] px-4 py-2.5 rounded-full shadow-md transition-transform active:scale-95 border border-[#B47A9A]/30 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#B47A9A]" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">Cart</span>
              <span className="bg-[#5E3A5C] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {totalCartItems}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* LARGE FULL-WIDTH MAYBELLINE-STYLE MEGA MENU PANEL */}
      {activeHoverMenu && (
        <div 
          className="absolute top-full left-0 right-0 w-full bg-[#00030E]/98 backdrop-blur-2xl border-t border-b border-[#B47A9A]/30 shadow-2xl text-white z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => {}}
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

                {/* Large Featured Promotional Image Banner Card */}
                <div className="col-span-3 bg-white/5 rounded-3xl p-4 border border-white/10 space-y-3">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <img 
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600"
                      alt="Velvet Silk Lip Butter"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#B47A9A]/30 bg-white px-4 pt-3 pb-6 space-y-4">
          {navLinks.map((link) => (
            <div key={link.name} className="border-b border-[#F3E9EC] pb-2">
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-bold text-[#00030E] hover:text-[#5E3A5C]"
              >
                {link.name}
              </Link>
            </div>
          ))}
          
          <div className="pt-2">
            <span className="text-xs font-bold text-[#5E3A5C] uppercase tracking-wider block mb-2 font-serif">Quick Shop Categories</span>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/shop?category=skincare" onClick={() => setMobileMenuOpen(false)} className="text-xs text-[#00030E] bg-[#F3E9EC] p-2.5 rounded-xl font-medium hover:bg-[#B47A9A]/20">Skincare</Link>
              <Link href="/shop?category=serums" onClick={() => setMobileMenuOpen(false)} className="text-xs text-[#00030E] bg-[#F3E9EC] p-2.5 rounded-xl font-medium hover:bg-[#B47A9A]/20">Vitamin C Serums</Link>
              <Link href="/shop?category=lip-care" onClick={() => setMobileMenuOpen(false)} className="text-xs text-[#00030E] bg-[#F3E9EC] p-2.5 rounded-xl font-medium hover:bg-[#B47A9A]/20">Lip Care & Combos</Link>
              <Link href="/shop?category=sets-kits" onClick={() => setMobileMenuOpen(false)} className="text-xs text-[#00030E] bg-[#F3E9EC] p-2.5 rounded-xl font-medium hover:bg-[#B47A9A]/20">Press-On Nails</Link>
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="text-xs text-[#00030E] bg-[#F3E9EC] p-2.5 rounded-xl font-medium hover:bg-[#B47A9A]/20">Hair & Wigs</Link>
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="text-xs text-[#00030E] bg-[#F3E9EC] p-2.5 rounded-xl font-medium hover:bg-[#B47A9A]/20">Period & Body Care</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
