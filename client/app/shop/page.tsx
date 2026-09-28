'use client';

import React, { useState, useMemo } from 'react';
import AnnouncementBar from '../../components/AnnouncementBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { PRODUCTS } from '../../lib/products';
import { ProductCategory } from '../../lib/types';
import { Filter, SlidersHorizontal, Search, RotateCcw, Sparkles } from 'lucide-react';

const ALL_CATEGORIES: ProductCategory[] = [
  'All',
  'Skincare',
  'Serums',
  'Moisturizers',
  'Lip Care',
  'Sunscreen',
  'Makeup',
  'Sets & Kits',
];

const SKIN_TYPES = ['All Skin Types', 'Dry', 'Sensitive', 'Oily', 'Combination'];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [maxPrice, setMaxPrice] = useState<number>(150);
  const [selectedSkinType, setSelectedSkinType] = useState<string>('All Skin Types');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category Filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Price Filter
      if (product.price > maxPrice) {
        return false;
      }
      // Skin Type Filter
      if (selectedSkinType !== 'All Skin Types' && !product.skinTypes.includes(selectedSkinType) && !product.skinTypes.includes('All Skin Types')) {
        return false;
      }
      // Search Filter
      if (searchQuery.trim()) {
        const term = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(term);
        const matchesCat = product.category.toLowerCase().includes(term);
        const matchesDesc = product.description.toLowerCase().includes(term);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }
      // Stock Filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, maxPrice, selectedSkinType, searchQuery, sortBy, inStockOnly]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(150);
    setSelectedSkinType('All Skin Types');
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-nude-50">
      <AnnouncementBar />
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-rose-deep text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-gold block mb-2">
            COMPLETE COLLECTION
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mb-3">
            Shop All Beauty Formulas
          </h1>
          <p className="text-xs sm:text-sm text-nude-200 max-w-xl mx-auto">
            Discover our complete lineup of clean, botanical, and dermatologist-tested skincare, serums, moisturizers, and lip care treatments.
          </p>
        </div>
      </section>

      {/* Main Shop Catalog Container */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Filter Controls */}
          <aside className="lg:col-span-3 bg-white p-6 rounded-3xl border border-brand-100 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-brand-100">
              <div className="flex items-center gap-2 font-serif font-bold text-lg text-brand-950">
                <Filter className="w-4 h-4 text-rose-gold" />
                <span>Filter Products</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-brand-600 hover:text-brand-950 flex items-center gap-1 font-semibold"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Search filter input */}
            <div>
              <label className="block text-xs font-bold text-brand-950 mb-2">Search Catalog</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
                <input
                  type="text"
                  placeholder="Vitamin C, SPF, Serum..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-nude-50 border border-brand-200 rounded-xl py-2 pl-9 pr-3 text-xs text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xs font-bold text-brand-950 mb-2">Category</label>
              <div className="space-y-1">
                {ALL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition ${
                      selectedCategory === cat
                        ? 'bg-brand-950 text-white font-bold'
                        : 'text-brand-800 hover:bg-nude-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-brand-950 mb-2">
                <span>Max Price:</span>
                <span className="text-rose-deep font-serif text-sm">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-950 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-brand-400 mt-1">
                <span>$10</span>
                <span>$150</span>
              </div>
            </div>

            {/* Skin Type Filter */}
            <div>
              <label className="block text-xs font-bold text-brand-950 mb-2">Skin Compatibility</label>
              <div className="space-y-1.5">
                {SKIN_TYPES.map((type) => (
                  <label key={type} className="flex items-center gap-2 text-xs text-brand-800 cursor-pointer">
                    <input
                      type="radio"
                      name="skinType"
                      checked={selectedSkinType === type}
                      onChange={() => setSelectedSkinType(type)}
                      className="accent-brand-950"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* In-Stock Only */}
            <div className="pt-2 border-t border-brand-100">
              <label className="flex items-center gap-2 text-xs font-bold text-brand-950 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-brand-950 accent-brand-950"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>

          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-white p-4 px-6 rounded-2xl border border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-brand-700 font-medium">
                Showing <strong className="text-brand-950 font-bold">{filteredProducts.length}</strong> of {PRODUCTS.length} formulas
              </span>

              <div className="flex items-center gap-2 text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand-500" />
                <span className="font-semibold text-brand-800">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-nude-50 border border-brand-200 rounded-xl px-3 py-1.5 font-bold text-brand-950 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-brand-200 p-8">
                <Search className="w-12 h-12 text-brand-300 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-brand-950 mb-1">No products match your criteria</h3>
                <p className="text-xs text-brand-700 mb-6">Try adjusting your filters or price slider</p>
                <button
                  onClick={handleResetFilters}
                  className="bg-brand-950 text-white text-xs font-bold px-6 py-3 rounded-full shadow hover:bg-brand-800 transition"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </main>

        </div>
      </section>

      <Footer />
    </div>
  );
}
