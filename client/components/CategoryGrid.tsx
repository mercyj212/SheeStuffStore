'use client';

import React from 'react';
import { ProductCategory } from '../lib/types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
}

const CATEGORIES: { name: ProductCategory; subtitle: string; image: string; badge?: string }[] = [
  {
    name: 'Serums',
    subtitle: 'Vitamin C & Hyaluronic Elixirs',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    badge: 'Popular'
  },
  {
    name: 'Moisturizers',
    subtitle: 'Ceramide Barrier Restoration',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Lip Care',
    subtitle: 'Silk Hydrating Lip Butters & Oils',
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=600',
    badge: 'Trending'
  },
  {
    name: 'Sunscreen',
    subtitle: 'Invisible Clear SPF 50 Defense',
    image: 'https://images.unsplash.com/photo-1556228722-d119f829c580?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Sets & Kits',
    subtitle: 'Curated Beauty Gift Bundles',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    badge: 'Save 30%'
  },
  {
    name: 'Makeup',
    subtitle: 'Satin Liquid Blushes & Glazes',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
  }
];

export default function CategoryGrid({ selectedCategory, onSelectCategory }: CategoryGridProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
            CURATED ESSENTIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-brand-700 mt-2">
            Discover targeted solutions formulated for your unique skin goals
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className={`relative group rounded-2xl overflow-hidden aspect-[4/5] text-left transition-all duration-300 border-2 ${
                  isSelected ? 'border-brand-950 ring-4 ring-rose-gold/20 scale-105 shadow-xl' : 'border-transparent hover:border-brand-300'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/30 to-transparent" />

                {cat.badge && (
                  <span className="absolute top-3 left-3 bg-white/90 text-brand-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    {cat.badge}
                  </span>
                )}

                <div className="absolute bottom-4 left-3 right-3 text-white">
                  <p className="font-serif font-bold text-base sm:text-lg leading-snug">{cat.name}</p>
                  <p className="text-[10px] text-nude-200 line-clamp-1 mt-0.5">{cat.subtitle}</p>
                  
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-rose-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
