'use client';

import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../lib/types';
import { PRODUCTS } from '../lib/products';
import ProductCard from './ProductCard';
import { Filter, SlidersHorizontal, Search, Sparkles } from 'lucide-react';

interface ProductGridProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchTerm?: string;
}

const CATEGORIES_LIST: ProductCategory[] = [
  'All',
  'Skincare',
  'Serums',
  'Moisturizers',
  'Lip Care',
  'Sunscreen',
  'Makeup',
  'Sets & Kits',
];

export default function ProductGrid({
  selectedCategory,
  onSelectCategory,
  searchTerm = '',
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category Filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Search Term Filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(term);
        const matchesCategory = product.category.toLowerCase().includes(term);
        const matchesDescription = product.description.toLowerCase().includes(term);
        if (!matchesName && !matchesCategory && !matchesDescription) {
          return false;
        }
      }
      // In Stock Filter
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
  }, [selectedCategory, searchTerm, inStockOnly, sortBy]);

  return (
    <section id="catalog" className="py-16 bg-nude-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-rose-gold" />
              <span>THE COLLECTION</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950">
              Our Beauty Formulas
            </h2>
          </div>

          {/* Active Product Count & Sort Dropdown */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-brand-700">
              Showing <strong className="text-brand-950 font-bold">{filteredProducts.length}</strong> products
            </span>

            <div className="flex items-center gap-2 bg-white border border-brand-200 rounded-full px-4 py-2 text-xs font-medium text-brand-900 shadow-sm">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-500" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-bold text-brand-950 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10 border-b border-brand-200/50">
          {CATEGORIES_LIST.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-950 text-white shadow-md scale-105'
                    : 'bg-white text-brand-800 hover:bg-brand-100 border border-brand-200/80'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Grid Display */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-brand-200 p-8 max-w-md mx-auto">
            <Search className="w-10 h-10 text-brand-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-brand-950 mb-1">No products found</h3>
            <p className="text-xs text-brand-700 mb-6">
              We couldn't find anything matching your filter criteria. Try resetting your search or category selection.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All');
              }}
              className="bg-brand-950 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow hover:bg-brand-800 transition"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
