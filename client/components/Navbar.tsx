'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '../lib/context/StoreContext';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { PRODUCTS } from '../lib/products';

export default function Navbar() {
  const pathname = usePathname();
  const { totalCartItems, wishlist } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);

  const filteredPreview = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop All', href: '/shop' },
    { name: 'Brand Story', href: '/brand-story' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
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

          {/* Desktop Navigation Links with Switzer Sans Font */}
          <nav className="hidden lg:flex items-center gap-8 font-sans text-xs font-semibold uppercase tracking-widest text-[#00030E]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors py-1 border-b-2 ${
                    isActive
                      ? 'border-[#00030E] font-bold text-[#00030E]'
                      : 'border-transparent hover:text-[#5E3A5C] hover:border-[#B47A9A]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCategoriesDropdown(true)}
              onMouseLeave={() => setCategoriesDropdown(false)}
            >
              <button className="flex items-center gap-1 py-1 hover:text-[#5E3A5C] transition-colors cursor-pointer">
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-[#B47A9A]" />
              </button>

              {categoriesDropdown && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-2xl shadow-xl border border-[#B47A9A]/30 py-2 z-50 animate-fade-in">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block px-4 py-2 text-xs font-medium text-[#00030E] hover:bg-[#F3E9EC] hover:text-[#5E3A5C] transition"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-full text-[#00030E] hover:bg-[#B47A9A]/20 transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B47A9A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 bg-[#00030E] text-[#F3E9EC] hover:bg-[#2C1B2F] px-4 py-2.5 rounded-full shadow-md transition-transform active:scale-95 border border-[#B47A9A]/30"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#B47A9A]" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">Cart</span>
              <span className="bg-[#5E3A5C] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {totalCartItems}
              </span>
            </Link>
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
