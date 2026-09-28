'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '../lib/context/StoreContext';
import { ShoppingBag, Heart, Search, Menu, X, ChevronRight, Sparkles } from 'lucide-react';
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
    { name: 'Home', href: '/', hoverKey: null },
    { name: 'Shop All', href: '/shop', hoverKey: 'shop' },
    { name: 'Brand Story', href: '/brand-story', hoverKey: 'brand-story' },
    { name: 'Routines', href: '/about', hoverKey: 'routines' },
    { name: 'Contact', href: '/contact', hoverKey: 'contact' },
  ];

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
    <header className="sticky top-0 z-40 bg-[#F3E9EC]/95 backdrop-blur-md border-b border-[#B47A9A]/30 transition-all">
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

          {/* Desktop Navigation Links with Switzer Font & Interactive Maybelline-Style Mega Menu */}
          <div className="relative hidden lg:block" onMouseLeave={() => setActiveHoverMenu(null)}>
            <nav className="flex items-center gap-8 font-sans text-xs font-semibold uppercase tracking-widest text-[#00030E]">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setActiveHoverMenu(link.hoverKey)}
                    className={`transition-colors py-2 border-b-2 ${
                      isActive
                        ? 'border-[#00030E] font-bold text-[#00030E]'
                        : 'border-transparent hover:text-[#5E3A5C] hover:border-[#B47A9A]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Maybelline-Style Interactive Hover Mega Menu Drawer */}
            {activeHoverMenu && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[740px] max-w-[92vw] bg-white/95 backdrop-blur-2xl border border-[#B47A9A]/30 rounded-3xl p-6 shadow-2xl text-[#00030E] z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                {/* 1. SHOP MEGA MENU */}
                {activeHoverMenu === 'shop' && (
                  <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-4 space-y-2 border-r border-[#B47A9A]/20 pr-4">
                      <span className="font-serif text-sm font-bold text-[#5E3A5C] uppercase tracking-wider block mb-2">Categories</span>
                      <Link href="/category/serums" className="block text-xs text-[#00030E]/80 hover:text-[#B47A9A] transition font-sans">Vitamin C Serums</Link>
                      <Link href="/category/moisturizers" className="block text-xs text-[#00030E]/80 hover:text-[#B47A9A] transition font-sans">Barrier Moisture Creams</Link>
                      <Link href="/category/lip-care" className="block text-xs text-[#00030E]/80 hover:text-[#B47A9A] transition font-sans">Silk Lip Butters</Link>
                      <Link href="/category/sunscreen" className="block text-xs text-[#00030E]/80 hover:text-[#B47A9A] transition font-sans">Radiance Sunscreen</Link>
                      <Link href="/shop" className="block text-xs text-[#5E3A5C] font-bold hover:underline transition pt-2">Browse All Products →</Link>
                    </div>

                    <div className="col-span-4 space-y-2 border-r border-[#B47A9A]/20 pr-4">
                      <span className="font-serif text-sm font-bold text-[#5E3A5C] uppercase tracking-wider block mb-2">Collections</span>
                      <Link href="/shop?filter=bestsellers" className="block text-xs text-[#00030E]/80 hover:text-[#B47A9A] transition">🔥 Bestsellers</Link>
                      <Link href="/shop?filter=new" className="block text-xs text-[#00030E]/80 hover:text-[#B47A9A] transition">✨ Viral TikTok Picks</Link>
                      <Link href="/shop?filter=sets" className="block text-xs text-[#00030E]/80 hover:text-[#B47A9A] transition">🎁 Gift & Treatment Bundles</Link>
                    </div>

                    {/* Featured Product Spotlight Card */}
                    <div className="col-span-4 bg-[#F3E9EC] rounded-2xl p-3 border border-[#B47A9A]/30 text-center space-y-2">
                      <img 
                        src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400"
                        alt="Luminary Glow Vitamin C Serum"
                        className="w-full h-24 object-cover rounded-xl"
                      />
                      <div>
                        <h4 className="font-serif text-xs font-bold text-[#00030E]">Luminary Glow Serum</h4>
                        <p className="text-[10px] text-[#5E3A5C] font-bold">$48.00 • ⭐ 4.9/5</p>
                      </div>
                      <Link href="/product/shee-radiance-serum" className="inline-block w-full bg-[#5E3A5C] text-white text-[10px] font-bold py-1.5 rounded-full hover:bg-[#2C1B2F] transition">
                        View Formula
                      </Link>
                    </div>
                  </div>
                )}

                {/* 2. BRAND STORY MEGA MENU */}
                {activeHoverMenu === 'brand-story' && (
                  <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-7 space-y-3 pr-4">
                      <span className="font-serif text-sm font-bold text-[#5E3A5C] uppercase tracking-wider block">Our Botanical Philosophy</span>
                      <p className="text-xs text-[#00030E]/80 leading-relaxed font-sans">
                        Formulated in collaboration with leading dermatologists. 100% cruelty-free, zero toxins, and clinical-grade active botanicals for radiant skin.
                      </p>
                      <Link href="/brand-story" className="inline-flex items-center gap-1 text-xs font-bold text-[#5E3A5C] hover:underline">
                        <span>Read Full Brand Story</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="col-span-5">
                      <img 
                        src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400"
                        alt="Brand Lab"
                        className="w-full h-28 object-cover rounded-2xl border border-[#B47A9A]/30"
                      />
                    </div>
                  </div>
                )}

                {/* 3. ROUTINES MEGA MENU */}
                {activeHoverMenu === 'routines' && (
                  <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-7 space-y-2 border-r border-[#B47A9A]/20 pr-4">
                      <span className="font-serif text-sm font-bold text-[#5E3A5C] uppercase tracking-wider block mb-2">Curated Treatment Rituals</span>
                      <Link href="/about" className="block text-xs font-bold text-[#00030E] hover:text-[#5E3A5C] transition">✨ 3-Step Glass Skin Routine</Link>
                      <p className="text-[10px] text-[#00030E]/60">Serum + Barrier Cream + Radiant Lip Oil</p>
                      <Link href="/about" className="block text-xs font-bold text-[#00030E] hover:text-[#5E3A5C] transition pt-2">🌙 Night Barrier Repair Ritual</Link>
                      <p className="text-[10px] text-[#00030E]/60">Peptide Deep Moisture Cream</p>
                    </div>
                    <div className="col-span-5 bg-[#F3E9EC] rounded-2xl p-3 border border-[#B47A9A]/30 text-center space-y-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#5E3A5C] font-bold block">Routine Bundle</span>
                      <h4 className="font-serif text-xs font-bold text-[#00030E]">Glass Skin Treatment Kit</h4>
                      <p className="text-[10px] text-emerald-700 font-bold">Save $24 Bundle Discount</p>
                      <Link href="/shop" className="inline-block w-full bg-[#5E3A5C] text-white text-[10px] font-bold py-1.5 rounded-full hover:bg-[#2C1B2F] transition">
                        Shop Routine Kit
                      </Link>
                    </div>
                  </div>
                )}

                {/* 4. CONTACT MEGA MENU */}
                {activeHoverMenu === 'contact' && (
                  <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-6 space-y-2 border-r border-[#B47A9A]/20 pr-4">
                      <span className="font-serif text-sm font-bold text-[#5E3A5C] uppercase tracking-wider block mb-2">Customer Care & Support</span>
                      <Link href="/contact" className="block text-xs text-[#00030E]/80 hover:text-[#5E3A5C] transition">💬 24/7 Skin Consultation Support</Link>
                      <Link href="/contact" className="block text-xs text-[#00030E]/80 hover:text-[#5E3A5C] transition">📦 Track Your Order Status</Link>
                      <Link href="/contact" className="block text-xs text-[#00030E]/80 hover:text-[#5E3A5C] transition">🤝 Wholesale & Press Inquiries</Link>
                    </div>
                    <div className="col-span-6 space-y-2 pl-2">
                      <span className="font-serif text-sm font-bold text-[#5E3A5C] uppercase tracking-wider block mb-2">Direct Contact</span>
                      <p className="text-xs text-[#00030E]/80 font-sans">Email: support@sheestuffstore.com</p>
                      <p className="text-xs text-[#00030E]/80 font-sans">Hours: Mon - Fri, 9:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

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
              className="relative p-2.5 rounded-full text-[#00030E] hover:bg-[#B47A9A]/20 transition"
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

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#B47A9A]/30 bg-white px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#00030E] border-b border-[#F3E9EC]"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <span className="text-xs font-bold text-[#5E3A5C] uppercase tracking-wider block mb-2">Categories</span>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-[#00030E] bg-[#F3E9EC] p-2 rounded-lg hover:bg-[#B47A9A]/20 font-medium"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
